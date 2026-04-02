
//this class is just to make validation easier for the APIs
class Validation {

    //validation of SearchBody
    validateSearchBody(body) {
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

    //helper for insert, checks for validation
    insertValidate(heroActorName, heroAlias, powerID, dateGained) {
        if (!Number.isInteger(powerID)) return "The Power ID must be an integer";
        //if (!isValidDate(dateGained)) return "The Date must be in a valid format";
        if (typeof heroActorName != "string") return "The Actor Name must be a string";
        if (typeof heroAlias != "string") return "The Alias Name must be a string";
        if (!heroActorName || !heroAlias || powerID === undefined || powerID === null || !dateGained) {
            return "All fields must be non-empty.";
        }
        if (typeof dateGained !== "string" || isNaN(Date.parse(dateGained))) {
            return "The date gained must be a valid date string";
        }
        return "everything looks good";
    }

    //validation for update
    updateValidate(SkillSet, Weapon, WeaponType) {
        if (SkillSet === undefined && Weapon === undefined && WeaponType === undefined) {
            return "At least one field for update must be provided";
        }
        if (typeof SkillSet != "string" && SkillSet !== undefined ) return "Skill Set must be a string";
        if (typeof WeaponType != "string" && WeaponType !== undefined ) return "Weapon Type must be a string";
        if (typeof Weapon != "string" && Weapon !== undefined ) return "Weapon must be a string";
        return "everything looks good";
    }
    
    //validation for delete, to see if the powerID exists
    async deleteValidate(powerID) {
        if (typeof powerID != "string") {
            return false;
        }
        return true;
    }

    validateProjection(fields) {
        const allowedAttributes = [
            "EarthNumber",
            "Name",
            "Status",
            "Timeline"
        ];
        if (!Array.isArray(fields) || fields.length === 0) {
            return "At least one field must be selected";
        }
    
        for (const field of fields) {
            if (!allowedAttributes.includes(field)) {
                return `Invalid field: ${field}`;
            }
        }
    
        return "everything looks good";
    }

}

module.exports = new Validation();