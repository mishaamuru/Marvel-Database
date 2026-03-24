async function insertHeroHasPower(db, formData) {
    const { heroActorName, heroAlias, powerID, dateGained } = formData;

    if (!heroActorName || !heroAlias || !powerID || !dateGained) {
        throw new Error("All fields are required.");
    }

    // Check superhero exists
    const heroCheckSql = `
        SELECT COUNT(*) AS count
        FROM Superhero
        WHERE ActorName = :heroActorName
          AND Alias = :heroAlias
    `;

    const heroCheck = await db.execute(heroCheckSql, {
        heroActorName,
        heroAlias
    });

    const heroExists =
        heroCheck.rows?.[0]?.COUNT === 1 ||
        heroCheck.rows?.[0]?.count === 1;

    if (!heroExists) {
        throw new Error("Hero does not exist in Superhero.");
    }

    // Check power exists
    const powerCheckSql = `
        SELECT COUNT(*) AS count
        FROM Power
        WHERE ID = :powerID
    `;

    const powerCheck = await db.execute(powerCheckSql, { powerID });

    const powerExists =
        powerCheck.rows?.[0]?.COUNT === 1 ||
        powerCheck.rows?.[0]?.count === 1;

    if (!powerExists) {
        throw new Error("Power ID does not exist in Power.");
    }

    // Insert
    const insertSql = `
        INSERT INTO HeroHasPower (HeroActorName, HeroAlias, PowerID, DateGained)
        VALUES (:heroActorName, :heroAlias, :powerID, :dateGained)
    `;

    await db.execute(insertSql, {
        heroActorName,
        heroAlias,
        powerID,
        dateGained
    });

    return { success: true, message: "HeroHasPower inserted successfully." };
}

async function updatePower(db, formData) {
    const { id, skillSet, weapon, type } = formData;

    if (!id) {
        throw new Error("Power ID is required.");
    }

    // Optional: check power row exists first
    const powerExistsSql = `
        SELECT COUNT(*) AS count
        FROM Power
        WHERE ID = :id
    `;

    const powerExistsResult = await db.execute(powerExistsSql, { id });
    const powerExists =
        powerExistsResult.rows?.[0]?.COUNT === 1 ||
        powerExistsResult.rows?.[0]?.count === 1;

    if (!powerExists) {
        throw new Error("Selected Power ID does not exist.");
    }

    const setClauses = [];
    const params = { id };

    if (skillSet && skillSet.trim() !== "") {
        setClauses.push("SkillSet = :skillSet");
        params.skillSet = skillSet.trim();
    }

    if (weapon && weapon.trim() !== "") {
        // Check FK only if weapon is being changed
        const weaponCheckSql = `
            SELECT COUNT(*) AS count
            FROM WeaponSource
            WHERE Weapon = :weapon
        `;

        const weaponCheck = await db.execute(weaponCheckSql, {
            weapon: weapon.trim()
        });

        const weaponExists =
            weaponCheck.rows?.[0]?.COUNT === 1 ||
            weaponCheck.rows?.[0]?.count === 1;

        if (!weaponExists) {
            throw new Error("Weapon does not exist in WeaponSource.");
        }

        setClauses.push("Weapon = :weapon");
        params.weapon = weapon.trim();
    }

    if (type && type.trim() !== "") {
        setClauses.push("Type = :type");
        params.type = type.trim();
    }

    if (setClauses.length === 0) {
        throw new Error("No fields were provided to update.");
    }

    const updateSql = `
        UPDATE Power
        SET ${setClauses.join(", ")}
        WHERE ID = :id
    `;

    await db.execute(updateSql, params);

    return { success: true, message: "Power updated successfully." };
}

async function deletePower(db, id) {
    if (!id) {
        throw new Error("Power ID is required.");
    }

    // Optional: check row exists first
    const existsSql = `
        SELECT COUNT(*) AS count
        FROM Power
        WHERE ID = :id
    `;

    const existsResult = await db.execute(existsSql, { id });
    const exists =
        existsResult.rows?.[0]?.COUNT === 1 ||
        existsResult.rows?.[0]?.count === 1;

    if (!exists) {
        throw new Error("Selected Power ID does not exist.");
    }

    // Manual cascade delete
    await db.execute(
        `DELETE FROM HeroHasPower WHERE PowerID = :id`,
        { id }
    );

    await db.execute(
        `DELETE FROM VillainHasPower WHERE PowerID = :id`,
        { id }
    );

    await db.execute(
        `DELETE FROM PowerFrom WHERE PowerID = :id`,
        { id }
    );

    await db.execute(
        `DELETE FROM Power WHERE ID = :id`,
        { id }
    );

    return { success: true, message: "Power deleted successfully." };
}

function buildSelectionQuery(filters) {
    const baseQuery = `
        SELECT ActorName, Alias, CharacterName, Standing, Species, PublicIdentity
        FROM Superhero
    `;

    const allowedAttributes = [
        "ActorName",
        "Alias",
        "CharacterName",
        "Standing",
        "Species",
        "PublicIdentity"
    ];

    const allowedOperators = ["=", "!=", "<", ">", "<=", ">=", "LIKE"];
    const allowedConnectors = ["AND", "OR"];

    let whereClause = "";
    let params = {};
    let paramCount = 1;

    filters.forEach((filter, index) => {
        let { attribute, operator, value, connector } = filter;
        if (!value) return;
        if (!allowedAttributes.includes(attribute)) return;
        if (!allowedOperators.includes(operator)) return;

        let paramName = `param${paramCount}`;
        let condition = `${attribute} ${operator} :${paramName}`;

        if (whereClause === "") {
            whereClause = condition;
        } else {
            if (!allowedConnectors.includes(connector)) return;
            whereClause += ` ${connector} ${condition}`;
        }

        params[paramName] = value;
        paramCount++;
    });

    let finalQuery = baseQuery;

    if (whereClause !== "") {
        finalQuery += " WHERE " + whereClause;
    }

    finalQuery += " ORDER BY Alias";

    return { query: finalQuery, params };
}