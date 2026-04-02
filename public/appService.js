const oracledb = require('oracledb');
require('dotenv').config(); // loads .env automatically

const dbConfig = {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASS,
    connectString: `${process.env.ORACLE_HOST}:${process.env.ORACLE_PORT}/${process.env.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

initializeConnectionPool();

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);


// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool 
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

async function fetchDemotableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM DEMOTABLE');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function initiateDemotable() {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE DEMOTABLE`);
        } catch(err) {
            console.log('Table might not exist, proceeding to create...');
        }

        const result = await connection.execute(`
            CREATE TABLE DEMOTABLE (
                id NUMBER PRIMARY KEY,
                name VARCHAR2(20)
            )
        `);
        return true;
    }).catch(() => {
        return false;
    });
}

async function insertDemotable(id, name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
            [id, name],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateNameDemotable(oldName, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
            [newName, oldName],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM DEMOTABLE');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

//check that the hero exists in the database
async function checkHeroExists(heroActorName, heroAlias) {
    return await withOracleDB(async (connection) => {
        const heroCheckSql = `
        SELECT COUNT(*) AS count
        FROM Superhero
        WHERE ActorName = :heroActorName
          AND Alias = :heroAlias`
        ;

        const heroCheck = await connection.execute(
            heroCheckSql,
            { heroActorName, heroAlias }
        );

        return heroCheck.rows[0][0] > 0;
    }).catch(() => {
        return false;
    })
}

//this is to check if the power with that power ID even exists in the database
async function checkPowerExists(powerID) {
    return await withOracleDB(async (connection) => {
        const powerCheckSql = `
        SELECT COUNT(*) AS count
        FROM Power
        WHERE ID = :powerID`
        ;
        const powerCheck = await connection.execute(powerCheckSql,
            {powerID}
        );
        return powerCheck.rows[0][0] > 0;
    }).catch(() => {
        return false;
    });
}

//insertion of the Hero with that Power
async function insertHeroHasPower(heroActorName, heroAlias, powerID, dateGained) {
    return await withOracleDB(async (connection) => {
        const insertSql = `
        INSERT INTO HeroHasPower (HeroActorName, HeroAlias, PowerID, DateGained)
        VALUES (:heroActorName, :heroAlias, :powerID, TO_DATE(:dateGained, 'YYYY-MM-DD'))
        `;

        result = await connection.execute(insertSql, 
            {heroActorName, heroAlias, powerID, dateGained},
            {autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return [];
    });
}

//updtates power with the new fields, also checks if any of the parameters are undefined
async function updatePower(powerID, skillSet, weapon, weaponType) {
    return await withOracleDB(async (connection) => {
        const updates = [];
        const params = {powerID};
        if (skillSet !== undefined) {
            updates.push("SkillSet = :SkillSet")
            params.SkillSet = skillSet;
        }
        if (weapon !== undefined) {
            updates.push("Weapon = :Weapon")
            params.Weapon = weapon;
        }
        if (weaponType !== undefined) {
            updates.push("WeaponType = :WeaponType")
            params.WeaponType = weaponType;
        }
        const sql = `
            UPDATE Power
            SET ${updates.join(", ")}
            WHERE ID = :powerID
        `;

        const result = await connection.execute(sql, params, { autoCommit: true });

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    })
}

//this will retrieve all the power tuples that the user can update on
async function getPowers() {
    return await withOracleDB(async (connection) => {
        const sql = `
            SELECT *
            FROM Power`;
        const result = await connection.execute(sql);
        console.log("Power rows:", result.rows);
        return result.rows;
    }).catch(() => {
        console.error("getPowers error:", err);
        return [];
    });
}

//this will retieve all tables for superhero
async function getSuperheros() {
    return await withOracleDB(async (connection) => {
        const sql = `
            SELECT *
            FROM Superhero`;
        const result = await connection.execute(sql);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//heroHasPower
async function getHeroHasPower() {
    return await withOracleDB(async (connection) => {
        const sql = `
            SELECT *
            FROM HeroHasPower`;
        const result = await connection.execute(sql);
        return result.rows;
    }).catch(() => {
        return [];
    })
}

//this will retieve all tables for teams
async function getTeams() {
    return await withOracleDB(async (connection) => {
        const sql = `
            SELECT *
            FROM Team`;
        const result = await connection.execute(sql);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//this will retieve all tables for villains
async function getVillains() {
    return await withOracleDB(async (connection) => {
        const sql = `
            SELECT *
            FROM Villain`;
        const result = await connection.execute(sql);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

//this will delete the tuples with this powerID
async function deletePower(powerID) {
    return await withOracleDB(async (connection) => {
        const sql = `
        DELETE FROM Power 
        WHERE ID = :powerID`;
        const result = await connection.execute(sql, {powerID}, { autoCommit: true });
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    })
}

//this will search through SuperHero and Select Tuples where 
async function searchBody(body) {
    return await withOracleDB(async (connection) => {
        const conditions = [];
        const params = {};
        for (let i = 0; i < body.length; i++) {
            const condition = body[i];
            const { field, value, logic } = condition;

            const bindName = `value${i}`;

            if (i === 0) {
                conditions.push(`${field} = :${bindName}`);
            } else {
                conditions.push(`${logic} ${field} = :${bindName}`);
            }

            params[bindName] = value;
        }

        const sql = `
        SELECT *
        FROM Superhero
        WHERE ${conditions.join(" ")}`;

        const result = await connection.execute(sql, params, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });

        return result.rows;
    }).catch(() => {
        return [];
    })
}

//this is for Universes and projection
async function universeProjection(fields) {
    return await withOracleDB(async (connection) => {
        //the fields are which ones to diplay and in that order
        const fieldsToDisplay = [];
        const params = {};
        for (const field of fields) {
            fieldsToDisplay.push(field);
        }
        const sql = `
        SELECT ${fieldsToDisplay.join(",")}
        FROM Universe`;
        const result = await connection.execute(sql, params, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });

        return result.rows;
    }).catch(() => {
        return [];
    });
}

//this is to get a grouping of Villians by Standing, and it should show the Count of Number of Villians
async function getVillainStandingCount() {
    return await withOracleDB(async (connection) =>{
        const sql = `SELECT Standing, Count(*) AS Count
                    FROM Villain
                    GROUP BY Standing`;
        const result = await connection.execute(sql, {}, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });

        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function getSuperheroSpeciesCount() {
    return await withOracleDB(async (connection) =>{
        const sql = `SELECT Species,
                    COUNT(*) AS numHeroes
                    FROM Superhero
                    GROUP BY Species
                    HAVING COUNT(*) > 1
                    ORDER BY numHeroes DESC`
                    ;
        const result = await connection.execute(sql, {}, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });

        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function getSuperheroesWithSpaceStonePowers() {
    return await withOracleDB(async (connection) =>{
        const sql = `
        SELECT s.ActorName, s.Alias
        FROM Superhero s
        WHERE NOT EXISTS (
            SELECT DISTINCT p.PowerID
            FROM PowerFrom p
            WHERE p.StoneName = 'Space Stone'
              AND NOT EXISTS (
                  SELECT 1
                  FROM HeroHasPower h
                  WHERE h.HeroActorName = s.ActorName
                    AND h.HeroAlias = s.Alias
                    AND h.PowerID = p.PowerID
              )
        )
        `;
        const result = await connection.execute(sql, {}, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });

        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function getSuperheroesAndPowersBySpecies(species) {
    return await withOracleDB(async (connection) => {
        const sql = `
            SELECT s.ActorName,
                   s.Alias,
                   s.CharacterName,
                   h.PowerID
            FROM Superhero s
            JOIN HeroHasPower h
              ON s.ActorName = h.HeroActorName
             AND s.Alias = h.HeroAlias
            WHERE s.Species = :species
            ORDER BY s.Alias, h.PowerID
        `;

        const result = await connection.execute(
            sql,
            { species: species.trim() },
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function getTopSpecies() {
    return await withOracleDB(async (connection) => {
        const sql = `
            SELECT s.Species,
                   COUNT(*) AS HeroCount
            FROM Superhero s
            GROUP BY s.Species
            HAVING COUNT(*) >= ALL (
                SELECT COUNT(*)
                FROM Superhero s2
                GROUP BY s2.Species
            )
        `;

        const result = await connection.execute(sql, {}, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });

        return result.rows;
    }).catch(() => {
        return [];
    });
}

module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    initiateDemotable, 
    insertDemotable, 
    updateNameDemotable, 
    countDemotable,
    checkHeroExists,
    checkPowerExists,
    insertHeroHasPower,
    updatePower,
    getPowers,
    getSuperheros,
    getVillains,
    getTeams,
    deletePower,
    searchBody,
    universeProjection,
    getVillainStandingCount,
    getSuperheroSpeciesCount,
    getSuperheroesWithSpaceStonePowers,
    getSuperheroesAndPowersBySpecies,
    getTopSpecies,
    getHeroHasPower
};