const express = require('express');
const appService = require('./appService');
const validation = require('./validation');
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


//these are the REST APIs, the hard code is in appService.js -> all the endpoints reference functions in it

//this is for insertion, and it is to insert into table HeroHasPower
router.post("/heroHasPower", async (req, res) => {
    const {heroActorName, heroAlias, powerID, dateGained} = req.body;
    //validation to ensure that the fields have values
    const checkValidation = validation.insertValidate(heroActorName, heroAlias, powerID, dateGained);
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
    const checkValidation = validation.updateValidate(SkillSet, Weapon, WeaponType);
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



//this is for delete, and it is to delete from Power
//How it is done: By specifying the primary key
router.delete("/powers/:powerid", async (req, res) => {
    const powerID = Number(req.params.powerid);
    const exists = await validation.deleteValidate(powerID);
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



//this is for selection, this is implemented for the table Superhero
router.post("/superhero/search", async (req, res) => {
    const validateBody = validation.validateSearchBody(req.body);
    if (validateBody !== "everything looks good") {
        res.status(422).json({error: validateBody});
        return;
    }
    //now actually do the implementation
    const parseData = await appService.searchBody(req.body);
    res.status(200).json({ data: parseData });
})

//projection query, implementing it on universes
router.get("/universes", async (req, res) => {
    //Universe table
    /*  Universe (
        EarthNumber INTEGER,
        Name VARCHAR(20),
        Status VARCHAR(20),
        Timeline VARCHAR(20),
        PRIMARY KEY (EarthNumber)
    ); */
    const fieldParams = req.query.fields;
    if (!fieldParams) {
        res.status(422).json({error: "there needs to be a fields query parameter"});
        return;
    }
    //this will give an array splitting the elements based on where the comma is
    const fields = fieldsParam.split(",");
    const validationCheck = validation.validateProjection(fields);
    if (validationCheck !== "everything looks good") {
        res.status(422).json({error: validation});
        return;
    }
    const result = await appService.universeProjection(fields);
    res.status(200).json({data: result});
    return;

})

//join query 
//TODO

//aggregation with GROUP BY
//implemented on the Villian relation, grouping with Standing, and it will show the count of those dead/alive
router.get("/villains/standing-count", async (req, res) => {
    try {
        const result = await appService.getVillainStandingCount();
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


//aggregation with HAVING
//implemented on the Villian relation, grouping with Species, where the count of Species is greater than 5
router.get("/villains/species-count", async (req, res) => {
    try {
        const result = await appService.getVillainSpeciesCount();
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

//nested aggregation with group by
//TODO

//division query for the table HeroHasPower
//this will find superheroes whose power comes from the Space Stone
//hardcoded, so no input from user
router.get("/superheroes/space-stone-powers", async (req, res) => {
    try {
        const result = await appService.getSuperheroesWithSpaceStonePowers();
        return res.status(200).json({ data: result });
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
        return;
    }
})

