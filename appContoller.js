const express = require('express');
const appService = require('./appService');

const router = express.Router();

//checking for connection
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiateDemotable();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

//this is for insertion, and it is to insert into table HeroHasPower
router.post("/heroHasPower", async (req, res) => {
    const {heroActorName, heroAlias, powerID, dateGained} = req.body;
    //validation to ensure that the fields have values
    const checkValidation = insertValidate(heroActorName, heroAlias, powerID, dateGained);
    if (checkValidation !== "everything looks good") {
        res.status(422).json({error: checkValidation});
        return;
    }
    
    //check that the superhero itself exists
    const heroCheck = await appService.checkHeroExists(heroActorName, heroAlias);
    if (heroCheck !== "exists") {
        res.status(404).json({error: "Hero does not exist in Superhero"});
        return;
    }
    const powerCheck = await appService.checkPowerExists(powerID);
    if (!powerCheck) {
        res.status(404).json({error: "Power ID does not exist in Power"});
        return;
    }
    const insertion = await appService.insertHeroHasPower(heroActorName, heroAlias, powerID, dateGained);
    if (insertion) res.status(201).json({success: "Successfully inserted the HeroHasPower"});
    else res.status(404).json({error: "Failed to insert"});
    return;
})

//helper for insert, checks for validation
function insertValidate(heroActorName, heroAlias, powerID, dateGained) {
    if (!heroActorName || !heroAlias || powerID === undefined || powerID === null || !dateGained) {
        return "All fields must be non-empty.";
    }
    if (typeof heroActorName != "string") return "The Actor Name must be a string";
    if (typeof heroAlias != "string") return "The Alias Name must be a string";
    if (!Number.isInteger(powerID)) return "The Power ID must be an integer";
    if (typeof dateGained !== "string" || isNaN(Date.parse(dateGained))) {
        return "The date gained must be a valid date string";
    }
    return "everything looks good";
}

//this is for update, and this will update power
router.put("/powers/:powerid", async (req, res) => {
    /* what Power looks like:
     Power(
        ID INTEGER,
        SkillSet VARCHAR(30),
        Weapon VARCHAR(30),
        WeaponType VARCHAR(30),
        PRIMARY KEY (ID),
        FOREIGN KEY (Weapon) REFERENCES WeaponSource (Weapon)
    );*/
    const powerID = Number(req.params.powerid);
    const {SkillSet, Weapon, WeaponType} = req.body;
    const checkValidation = updateValidate(SkillSet, Weapon, WeaponType);
    if (checkValidation !== "everything looks good") {
        res.status(422).json({error: checkValidation});
        return;
    }
    const updatePower = await appService.updatePower(powerID, SkillSet, Weapon, WeaponType);
    if (updatePower) {
        res.status(200).json({success: "Updated successfully"});
        return;
    }
    res.status(404).json({error: "Failed to update"});
    return;
})

//Since for update, it needs to support powers, I need to make a get as well
router.get("/powers", async (req, res) => {
    const getPowers = await appService.getPowers();
    res.status(200).json({data: getPowers});
})

//validation for update
function updateValidate(SkillSet, Weapon, WeaponType) {
    if (SkillSet === undefined && Weapon === undefined && WeaponType === undefined) {
        return "At least one field for update must be provided";
    }
    if (typeof SkillSet != "string" && SkillSet !== undefined ) return "Skill Set must be a string";
    if (typeof WeaponType != "string" && WeaponType !== undefined ) return "Weapon Type must be a string";
    if (typeof Weapon != "string" && Weapon !== undefined ) return "Weapon must be a string";
    return "everything looks good";
}

//this is for delete, and it is to delete from Power
//How it is done: By specifying the primary key
router.delete("/powers/:powerid", async (req, res) => {
    const powerID = Number(req.params.powerid);
    const exists = await deleteValidate(powerID);
    if (!exists) {
        res.status(422).json({error: "There is no power with Power ID: " + powerID});
        return;
    }
    const deletePower = await appService.deletePower(powerID);
    if (!deletePower) {
        res.status(404).json({error: "Unable to delete"});
        return;
    }
    res.status(200).json({success: "Able to delete Power with Power ID: " + powerID});
    return
})

//validation for delete, to see if the powerID exists
async function deleteValidate(powerID) {
    if (!Number.isInteger(powerID)) {
        return false;
    }
    const getPowers = await appService.getPowers();
    const check = getPowers.filter((p) => p.ID === powerID);
    if (check.length === 0) return false;
    return true;
}

//this is for selection, this is implemented for the table Superhero
router.post("/superhero/search", async (req, res) => {
    const validateBody = validateSearchBody(req.body);
    if (validateBody !== "everything looks good") {
        res.status(422).json({error: validateBody});
        return;
    }
    //now actually do the implementation
    const parseData = await appService.searchBody(req.body);
    res.status(200).json({ data: parseData });
})

function validateSearchBody(body) {
    /* Superhero (
        ActorName VARCHAR(50),
        Alias VARCHAR(50),
        CharacterName VARCHAR(50),
        Standing VARCHAR(30),
        Species VARCHAR(30),
        PublicIdentity VARCHAR(30),
        PRIMARY KEY (ActorName, Alias)
    ); */
    const allowedConnectors = ["AND", "OR"];
    //these are all the attributes in the table Superhero, which is what Selection is implemented on.
    const allowedAttributes = [
        "ActorName",
        "Alias",
        "CharacterName",
        "Standing",
        "Species",
        "PublicIdentity"
    ];
    
    if (!Array.isArray(body) || body.length === 0) {
        return "Conditions must be a non-empty array";
    }

    for (let i = 0; i < body.length; i++) {
        const condition = body[i];
        const { field, value, logic } = condition;

        if (!allowedAttributes.includes(field)) {
            return `Invalid field: ${field}`;
        }

        if (typeof value !== "string" && typeof value !== "number") {
            return `Invalid value for field: ${field}`;
        }

        if (i > 0 && logic !== "AND" && logic !== "OR") {
            return `Condition ${i} must have logic AND or OR`;
        }

        if (i === 0 && logic !== undefined) {
            return "The first condition cannot have logic";
        }
    }

    return "everything looks good";

}