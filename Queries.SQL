:r MarvelDDl.SQL

-- INSERT QUERY
-- This works for insert query since the user is able to specify the values to insert.
-- references a foreign key aka Superhero as it needs to verify HeroActorName and HeroAlias.
-- also another foreign key as PowerID references Power.

-- checks if there is a superhero that exists with those attributes
SELECT COUNT(*) AS heroCount
FROM Superhero
WHERE ActorName = :heroActorName
  AND Alias = :heroAlias;

SELECT COUNT(*) AS powerCount
FROM Power
WHERE ID = :powerID;

INSERT INTO HeroHasPower(HeroActorName, HeroAlias, PowerID, DateGained)
VALUES
    (:heroActorName, :heroAlias, :powerID, :dateGained);

-- UPDATE QUERY
-- choosing to implement update on Power
-- can update Skillset and/or Weapon (non-primary)
-- Weapon is a foreign key and references WeaponSource
-- The application should display the tuples that are available for the relation so the user
-- can select which tuple they want to update (based on the key).

--Displaying Tuples
SELECT ID, SkillSet, Weapon, WeaponType
FROM Power
ORDER BY ID;

-- Validate foreign key if weapon is updated
SELECT COUNT(*) AS weaponCount
FROM WeaponSource
WHERE Weapon = :weapon;

-- If all attributes are changes
UPDATE Power
SET SkillSet = :skillSet,
    Weapon = :weapon,
    WeaponType = :weaponType
WHERE ID = :id;

-- DELETE QUERY
-- Deleting from Power
-- Implementing a cascade on delete

-- This displays tuples
SELECT ID, SkillSet, Weapon, WeaponType
FROM Power
ORDER BY ID;

-- cascade delete
DELETE FROM HeroHasPower
WHERE PowerID = :id;

DELETE FROM VillainHasPower
WHERE PowerID = :id;

DELETE FROM PowerFrom
WHERE PowerID = :id;

DELETE FROM Power
WHERE ID = :id;

--SELECTION Query
-- This is implemented for Superhero
SELECT ActorName, Alias, CharacterName, Standing, Species, PublicIdentity
FROM Superhero
WHERE (Standing = :standing1 AND Species = :species1)
   OR (PublicIdentity = :publicIdentity1)
ORDER BY Alias;


