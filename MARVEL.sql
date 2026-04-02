-- cmd + f 'name of the table' + "table" to find which table you're looking for
/* DROP TABLE Features CASCADE CONSTRAINTS;
DROP TABLE AppearsIn CASCADE CONSTRAINTS;
DROP TABLE MemberOfTeam CASCADE CONSTRAINTS;
DROP TABLE HeroHasPower CASCADE CONSTRAINTS;
DROP TABLE VillainHasPower CASCADE CONSTRAINTS;
DROP TABLE Fights CASCADE CONSTRAINTS;
DROP TABLE Power CASCADE CONSTRAINTS;
DROP TABLE WeaponSource CASCADE CONSTRAINTS;
DROP TABLE Avenger CASCADE CONSTRAINTS;
DROP TABLE Movie CASCADE CONSTRAINTS;
DROP TABLE InfinityStone CASCADE CONSTRAINTS;
DROP TABLE StoneColour CASCADE CONSTRAINTS;
DROP TABLE Location CASCADE CONSTRAINTS;
DROP TABLE Organization CASCADE CONSTRAINTS;
DROP TABLE PowerFrom CASCADE CONSTRAINTS;
DROP TABLE Team CASCADE CONSTRAINTS;
DROP TABLE Universe CASCADE CONSTRAINTS;
DROP TABLE Villain CASCADE CONSTRAINTS;
DROP TABLE Superhero CASCADE CONSTRAINTS;
DROP TABLE MovieOrderPhase CASCADE CONSTRAINTS;
DROP TABLE BasedIn CASCADE CONSTRAINTS;
DROP TABLE TakesPlace CASCADE CONSTRAINTS;
DROP TABLE MemberOfOrganization CASCADE CONSTRAINTS;
DROP TABLE LocatedIn CASCADE CONSTRAINTS;
DROP TABLE SetIn CASCADE CONSTRAINTS;
DROP TABLE ExistsIn CASCADE CONSTRAINTS;
--      SUPERHERO TABLE     -- */
CREATE TABLE
    Superhero (
        ActorName VARCHAR(50),
        Alias VARCHAR(50),
        CharacterName VARCHAR(50),
        Standing VARCHAR(30),
        Species VARCHAR(30),
        PublicIdentity VARCHAR(30),
        PRIMARY KEY (ActorName, Alias)
    );

--      DATA FOR SUPERHERO      --

INSERT INTO
    Superhero
VALUES
    (
        'Robert Downey Jr.',
        'IronMan',
        'Tony Stark',
        'Dead',
        'Human',
        'Known'
    );

INSERT INTO
    Superhero
VALUES
    (
        'Chris Evans',
        'CaptainAmerica',
        'Steve Rogers',
        'Retired',
        'Human',
        'Known'
    );

INSERT INTO
    Superhero
VALUES
    (
        'Chris Hemsworth',
        'Thor',
        'Thor Odinson',
        'Alive',
        'Asgardian',
        'Known'
    );

INSERT INTO
    Superhero
VALUES
    (
        'Mark Ruffalo',
        'Hulk',
        'Bruce Banner',
        'Alive',
        'Human',
        'Known'
    );

INSERT INTO
    Superhero
VALUES
    (
        'Scarlett Johansson',
        'BlackWidow',
        'Natasha Romanoff',
        'Dead',
        'Human',
        'Unknown'
    );


INSERT INTO
    Superhero
VALUES
    (
        'Tom Holland',
        'SpiderMan',
        'Peter Parker',
        'Active',
        'Human',
        'Secret'
    );

INSERT INTO
    Superhero
VALUES
    (
        'Vin Diesel',
        'Groot',
        'Groot',
        'Active',
        'Flora Colossus',
        'Unknown'
    );

INSERT INTO
    Superhero
VALUES
    (
        'Bradley Cooper',
        'Rocket',
        'Rocket Raccoon',
        'Active',
        'Genetically Modified Raccoon',
        'Unknown'
    );

INSERT INTO
    Superhero
VALUES
    (
        'Paul Rudd',
        'AntMan',
        'Scott Lang',
        'Active',
        'Human',
        'Secret'
    );

INSERT INTO
    Superhero
VALUES
    (
        'Elizabeth Olsen',
        'ScarletWitch',
        'Wanda Maximoff',
        'Unknown',
        'Enhanced Human',
        'Known'
    );

--      VILLIAN TABLE       --

CREATE TABLE
    Villain (
        ActorName VARCHAR(50),
        Alias VARCHAR(50),
        CharacterName VARCHAR(50),
        Standing VARCHAR(30),
        Species VARCHAR(30),
        PublicIdentity VARCHAR(30),
        Reason VARCHAR(30),
        PRIMARY KEY (ActorName, Alias)
    );

--      VILLAIN DATA        --

INSERT INTO
    Villain
VALUES
    (
        'Tom Hiddleston',
        'Loki',
        'Loki Laufeyson',
        'Alive',
        'Frost Giant',
        'Known',
        'Power'
    );

INSERT INTO
    Villain
VALUES
    (
        'Josh Brolin',
        'Thanos',
        'Thanos',
        'Dead',
        'Titan',
        'Known',
        'Overpopulation'
    );

INSERT INTO
    Villain
VALUES
    (
        'James Spader',
        'Ultron',
        'Ultron',
        'Destroyed',
        'AI',
        'Known',
        'Evolution'
    );

INSERT INTO
    Villain
VALUES
    (
        'Michael B. Jordan',
        'Killmonger',
        'Erik Stevens',
        'Dead',
        'Human',
        'Known',
        'Revenge'
    );

INSERT INTO
    Villain
VALUES
    (
        'Cate Blanchett',
        'Hela',
        'Hela',
        'Dead',
        'Asgardian',
        'Known',
        'Conquest'
    );

INSERT INTO
    Villain
VALUES
    (
        'Julian McMahon',
        'DoctorDoom',
        'Victor Von Doom',
        'Alive',
        'Human',
        'Known',
        'Power'
    );

INSERT INTO
    Villain
VALUES
    (
        'Hugo Weaving',
        'RedSkull',
        'Johann Schmidt',
        'Dead',
        'Enhanced Human',
        'Known',
        'Domination'
    );

INSERT INTO
    Villain
VALUES
    (
        'Willem Dafoe',
        'GreenGoblin',
        'Norman Osborn',
        'Dead',
        'Human',
        'Known',
        'Insanity'
    );

INSERT INTO
    Villain
VALUES
    (
        'Michael Keaton',
        'Vulture',
        'Adrian Toomes',
        'Alive',
        'Human',
        'Known',
        'Profit'
    );

--      UNIVERSE TABLE      --
CREATE TABLE
    Universe (
        EarthNumber INTEGER,
        Name VARCHAR(20),
        Status VARCHAR(20),
        Timeline VARCHAR(20),
        PRIMARY KEY (EarthNumber)
    );

--      UNIVERSE DATA       --
INSERT INTO
    Universe
VALUES
    (616, 'Earth-616', 'Active', 'Main');

INSERT INTO
    Universe
VALUES
    (199999, 'Earth-199999', 'Active', 'MCU');

INSERT INTO
    Universe
VALUES
    (838, 'Earth-838', 'Destroyed', 'Alternate');

INSERT INTO
    Universe
VALUES
    (2149, 'Earth-2149', 'Destroyed', 'Zombie');

INSERT INTO
    Universe
VALUES
    (1610, 'Earth-1610', 'Destroyed', 'Ultimate');

--      TEAM TABLE      --
CREATE TABLE
    Team (
        Name VARCHAR(50),
        NumberOfPeople INTEGER,
        Standing VARCHAR(50),
        Mentor VARCHAR(50),
        Leader VARCHAR(50),
        PRIMARY KEY (Name)
    );

--      TEAM DATA       --

INSERT INTO
    Team
VALUES
    (
        'Avengers',
        6,
        'Active',
        'Nick Fury',
        'Captain America'
    );

INSERT INTO
    Team
VALUES
    (
        'Guardians of the Galaxy',
        5,
        'Active',
        'Yondu',
        'Star-Lord'
    );

INSERT INTO
    Team
VALUES
    (
        'Young Avengers',
        5,
        'Active',
        'Hawkeye',
        'Kate Bishop'
    );

INSERT INTO
    Team
VALUES
    (
        'Asgardians',
        5,
        'Active',
        'Fandral',
        'Fandral'
    );

INSERT INTO
    Team
VALUES
    (
        'Masters of the Mystic Arts',
        5,
        'Active',
        'Doctor Strange',
        'Doctor Strange'
    );

INSERT INTO
    Team
VALUES
    ('Defenders', 4, 'Inactive', 'Stick', 'Daredevil');

INSERT INTO
    Team
VALUES
    (
        'Fantastic Four',
        4,
        'Active',
        'Reed Richards',
        'Mr. Fantastic'
    );

--      ORGANIZATION TABLE      --

CREATE TABLE
    Organization (
        Name VARCHAR(50),
        Leader VARCHAR(50),
        Status VARCHAR(50),
        Type VARCHAR(50),
        Founder VARCHAR(50),
        PRIMARY KEY (Name)
    );

--      ORGANIZATION DATA       --
INSERT INTO
    Organization
VALUES
    (
        'S.H.I.E.L.D.',
        'Nick Fury',
        'Active',
        'Intelligence',
        'Howard Stark'
    );

INSERT INTO
    Organization
VALUES
    (
        'HYDRA',
        'Red Skull',
        'Inactive',
        'Terrorist',
        'Johann Schmidt'
    );

INSERT INTO
    Organization
VALUES
    (
        'Stark Industries',
        'Tony Stark',
        'Active',
        'Corporation',
        'Howard Stark'
    );

INSERT INTO
    Organization
VALUES
    (
        'Wakandan Royal Guard',
        'Okoye',
        'Active',
        'Military',
        'TChaka'
    );

INSERT INTO
    Organization
VALUES
    (
        'Ten Rings',
        'Xu Wenwu',
        'Active',
        'Criminal',
        'Xu Wenwu'
    );

--      LOCATION TABLE      --
CREATE TABLE
    Location (
        Name VARCHAR(50),
        Species VARCHAR(50),
        Planet VARCHAR(50),
        Population VARCHAR(50),
        PRIMARY KEY (Name)
    );

--      LOCATION DATA       --
INSERT INTO
    Location
VALUES
    ('Wakanda', 'Human', 'Earth', '6000000');

INSERT INTO
    Location
VALUES
    ('Asgard', 'Asgardian', 'Asgard', 'Unknown');

INSERT INTO
    Location
VALUES
    ('Knowhere', 'Various', 'Cosmic', 'Unknown');

INSERT INTO
    Location
VALUES
    ('Titan', 'Titanian', 'Titan', 'Extinct');

INSERT INTO
    Location
VALUES
    ('Sokovia', 'Human', 'Earth', 'Unknown');

--      STONE COLOR     --
CREATE TABLE
    StoneColour (
        StoneName VARCHAR(50),
        Colour VARCHAR(50),
        PRIMARY KEY (StoneName)
    );

--      STONE DATA      --
INSERT INTO
    StoneColour
VALUES
    ('Space Stone', 'Blue');

INSERT INTO
    StoneColour
VALUES
    ('Mind Stone', 'Yellow');

INSERT INTO
    StoneColour
VALUES
    ('Reality Stone', 'Red');

INSERT INTO
    StoneColour
VALUES
    ('Power Stone', 'Purple');

INSERT INTO
    StoneColour
VALUES
    ('Time Stone', 'Green');

--      MOVIEORDERPHASE TABLE       --
CREATE TABLE
    MovieOrderPhase (
        NumberOfOrder INTEGER,
        Phase INTEGER,
        PRIMARY KEY (NumberOfOrder)
    );

--      MOVIEORDERPHASE DATA        --
INSERT INTO
    MovieOrderPhase
VALUES
    (1, 1);

INSERT INTO
    MovieOrderPhase
VALUES
    (2, 1);

INSERT INTO
    MovieOrderPhase
VALUES
    (3, 1);

INSERT INTO
    MovieOrderPhase
VALUES
    (4, 1);

INSERT INTO
    MovieOrderPhase
VALUES
    (5, 2);

INSERT INTO
    MovieOrderPhase
VALUES
    (6, 2);

INSERT INTO
    MovieOrderPhase
VALUES
    (7,1);

INSERT INTO
    MovieOrderPhase
VALUES
    (8, 1);

--      INFINITYSTONE TABLE        --
CREATE TABLE
    InfinityStone (
        EarthNumber INTEGER,
        Name VARCHAR(50),
        Status VARCHAR(50),
        Owner VARCHAR(50),
        PRIMARY KEY (Name, EarthNumber),
        FOREIGN KEY (EarthNumber) REFERENCES Universe (EarthNumber),
        FOREIGN KEY (Name) REFERENCES StoneColour (StoneName)
    );

--      INFINITYSTONE DATA     --  
INSERT INTO
    InfinityStone
VALUES
    (616, 'Space Stone', 'Destroyed', 'Thanos');

INSERT INTO
    InfinityStone
VALUES
    (616, 'Mind Stone', 'Destroyed', 'Vision');

INSERT INTO
    InfinityStone
VALUES
    (616, 'Reality Stone', 'Destroyed', 'Collector');

INSERT INTO
    InfinityStone
VALUES
    (616, 'Power Stone', 'Destroyed', 'Nova Corps');

INSERT INTO
    InfinityStone
VALUES
    (
        616,
        'Time Stone',
        'Destroyed',
        'Doctor Strange'
    );

--      MOVIE TABLE     --
CREATE TABLE
    Movie (
        Name VARCHAR(50),
        ReleaseYear INTEGER,
        NumberOfOrder INTEGER,
        RottenTomato INTEGER,
        PRIMARY KEY (Name, ReleaseYear),
        FOREIGN KEY (NumberOfOrder) REFERENCES MovieOrderPhase (NumberOfOrder)
    );

--      MOVIE DATA      --
INSERT INTO
    Movie
VALUES
    ('Iron Man', 2008, 1, 94);

INSERT INTO
    Movie
VALUES
    ('The Incredible Hulk', 2008, 2, 67);

INSERT INTO
    Movie
VALUES
    ('Thor', 2011, 3, 77);

INSERT INTO
    Movie
VALUES
    ('Captain America: The First Avenger', 2011, 4, 80);

INSERT INTO
    Movie
VALUES
    ('The Avengers', 2012, 5, 91);

INSERT INTO
    Movie
VALUES
    ('Avengers: Age of Ultron', 2015, 8, 87);

INSERT INTO
    Movie
VALUES
    ('Guardians of the Galaxy', 2014, 6, 91);

INSERT INTO
    Movie
VALUES
    ('Doctor Strange', 2016, 7, 91);


--      AVENGER TABLE       --
CREATE TABLE
    Avenger (
        ActorName VARCHAR(50),
        Alias VARCHAR(50),
        AvailabilityLevel INTEGER,
        DateJoined INTEGER,
        PRIMARY KEY (ActorName, Alias),
        FOREIGN KEY (ActorName, Alias) REFERENCES Superhero (ActorName, Alias)
    );


--      AVENGER DATA        --
INSERT INTO
    Avenger
VALUES
    ('Robert Downey Jr.', 'IronMan', 5, 2012);

INSERT INTO
    Avenger
VALUES
    ('Chris Evans', 'CaptainAmerica', 5, 2012);

INSERT INTO
    Avenger
VALUES
    ('Chris Hemsworth', 'Thor', 5, 2012);

INSERT INTO
    Avenger
VALUES
    ('Mark Ruffalo', 'Hulk', 4, 2012);

INSERT INTO
    Avenger
VALUES
    ('Scarlett Johansson', 'BlackWidow', 4, 2012);

--      WEAPONSOURCE TABLE      --
CREATE TABLE
    WeaponSource (
        Weapon VARCHAR(30),
        Source VARCHAR(30),
        PRIMARY KEY (Weapon)
    );

--      WEAPONWOURCE DATA       --
INSERT INTO
    WeaponSource
VALUES
    ('Mjolnir', 'Asgard');

INSERT INTO
    WeaponSource
VALUES
    ('Shield', 'Vibranium');

INSERT INTO
    WeaponSource
VALUES
    ('ArcReactor', 'Tech');

INSERT INTO
    WeaponSource
VALUES
    ('Widow Bite', 'S.H.I.E.L.D.');

INSERT INTO
    WeaponSource
VALUES
    ('Stormbreaker', 'Nidavellir');

INSERT INTO
    WeaponSource
VALUES
    ('Necrosword', 'Nidavellir');

INSERT INTO
    WeaponSource
VALUES
    ('WebShooter', 'Nidavellir');

INSERT INTO
    WeaponSource
VALUES
    ('AntSuit', 'Nidavellir');

INSERT INTO
    WeaponSource
VALUES
    ('Body', 'Nidavellir');

INSERT INTO
    WeaponSource
VALUES
    ('ChaosEnergy', 'Nidavellir');

INSERT INTO
    WeaponSource
VALUES
    ('MindStone', 'Nidavellir');   

INSERT INTO
    WeaponSource
VALUES
    ('Suit', 'Nidavellir');

INSERT INTO
    WeaponSource
VALUES
    ('Marksmanship', 'Nidavellir');

INSERT INTO
    WeaponSource
VALUES
    ('Bow', 'Nidavellir');

INSERT INTO
    WeaponSource
VALUES
    ('StealthSuit', 'Nidavellir');

INSERT INTO
    WeaponSource
VALUES
    ('Scepter', 'Nidavellir');

INSERT INTO
    WeaponSource
VALUES
    ('InfinityGauntlet', 'Cosmic Strength');

INSERT INTO
    WeaponSource
VALUES
    ('VibraniumBody', 'Synthetic');

INSERT INTO
    WeaponSource
VALUES
    ('PantherHabit', 'Tech');


--      POWER TABLE     --
CREATE TABLE
    Power(
        ID INTEGER,
        SkillSet VARCHAR(30),
        Weapon VARCHAR(30),
        WeaponType VARCHAR(30),
        PRIMARY KEY (ID),
        FOREIGN KEY (Weapon) REFERENCES WeaponSource (Weapon)
    );

--      POWER DATA      --
INSERT INTO
    Power
VALUES
    (
        1,
        'Super Strength',
        'Shield',
        'Vibranium'
    );

INSERT INTO
    Power
VALUES
    (
        2,
        'Web Slinging',
        'WebShooter',
        'Tech'
    );

INSERT INTO
    Power
VALUES
    (
        3,
        'Size Manipulation',
        'AntSuit',
        'Tech'
    );

INSERT INTO
    Power
VALUES
    (
        4,
        'Regeneration',
        'Body',
        'Biological'
    );

INSERT INTO
    Power
VALUES
    (
        5,
        'Magic',
        'ChaosEnergy',
        'Mystic'
    );

INSERT INTO
    Power
VALUES
    (
        6,
        'Telekinesis',
        'MindStone',
        'InfinityStone'
    );

INSERT INTO
    Power
VALUES
    (
        7,
        'Flight',
        'Suit',
        'Tech'
    );

INSERT INTO
    Power
VALUES
    (
        8,
        'Marksmanship',
        'Bow',
        'Weapon'
    );

INSERT INTO
    Power
VALUES
    (
        9,
        'Invisibility',
        'StealthSuit',
        'Tech'
    );

INSERT INTO
    Power
VALUES
    (
        10,
        'Energy Blasts',
        'ArcReactor',
        'Tech'
    );

INSERT INTO
    Power
VALUES
    (
        11,
        'Illusion Magic',
        'Scepter',
        'Mystic'
    );

INSERT INTO
    Power
VALUES
    (
        12,
        'Cosmic Strength',
        'InfinityGauntlet',
        'Cosmic'
    );

INSERT INTO
    Power
VALUES
    (
        13,
        'Artificial Intelligence',
        'VibraniumBody',
        'Synthetic'
    );

INSERT INTO
    Power
VALUES
    (
        14,
        'Enhanced Combat',
        'PantherHabit',
        'Tech'
    );

INSERT INTO
    Power
VALUES
    (
        15,
        'Death Magic',
        'Necrosword',
        'Mystic'
    );

--      FIGHTS TABLE        --

CREATE TABLE
    Fights (
        HeroActorName VARCHAR(50),
        HeroAlias VARCHAR(50),
        VillainActorName VARCHAR(50),
        VillainAlias VARCHAR(50),
        PRIMARY KEY (
            HeroActorName,
            HeroAlias,
            VillainActorName,
            VillainAlias
        ),
        FOREIGN KEY (HeroActorName, HeroAlias) REFERENCES Superhero (ActorName, Alias),
        FOREIGN KEY (VillainActorName, VillainAlias) REFERENCES Villain (ActorName, Alias)
    );

--      FIGHTS DATA     --

INSERT INTO
    Fights
VALUES
    (
        'Robert Downey Jr.',
        'IronMan',
        'Josh Brolin',
        'Thanos'
    );

INSERT INTO
    Fights
VALUES
    (
        'Chris Evans',
        'CaptainAmerica',
        'Tom Hiddleston',
        'Loki'
    );

INSERT INTO
    Fights
VALUES
    (
        'Chris Hemsworth',
        'Thor',
        'Cate Blanchett',
        'Hela'
    );

INSERT INTO
    Fights
VALUES
    (
        'Mark Ruffalo', 
        'Hulk', 
        'James Spader', 
        'Ultron'
    );

INSERT INTO
    Fights
VALUES
    (
        'Scarlett Johansson',
        'BlackWidow',
        'Michael B. Jordan',
        'Killmonger'
    );

--      VILLAINHASPOWER TABLE       --
CREATE TABLE
    VillainHasPower (
        PowerID INTEGER,
        VillainActorName VARCHAR(50),
        VillainAlias VARCHAR(50),
        DateGained DATE,
        PRIMARY KEY (VillainActorName, VillainAlias, PowerID),
        FOREIGN KEY (VillainActorName, VillainAlias) REFERENCES Villain (ActorName, Alias),
        FOREIGN KEY (PowerID) REFERENCES Power(ID)
    );

--      VILLAIN DATA        --
INSERT INTO
    VillainHasPower
VALUES
    (
        11,
        'Tom Hiddleston',
        'Loki',
        DATE '2011-05-04'
    );

INSERT INTO
    VillainHasPower
VALUES
    (
        12,
        'Josh Brolin',
        'Thanos',
        DATE '2018-04-27'
    );

INSERT INTO
    VillainHasPower
VALUES
    (
        13,
        'James Spader',
        'Ultron',
        DATE '2015-05-01'
    );

INSERT INTO
    VillainHasPower
VALUES
    (
        14,
        'Michael B. Jordan',
        'Killmonger',
        DATE '2018-02-16'
    );

INSERT INTO
    VillainHasPower
VALUES
    (
        15,
        'Cate Blanchett',
        'Hela',
        DATE '2017-11-03'
    );


--      HEROHASPOWER TABLE      --
CREATE TABLE
    HeroHasPower (
        HeroActorName VARCHAR(50),
        HeroAlias VARCHAR(50),
        PowerID INTEGER,
        DateGained DATE,
        PRIMARY KEY (HeroActorName, HeroAlias, PowerID),
        FOREIGN KEY (HeroActorName, HeroAlias) REFERENCES Superhero (ActorName, Alias),
        FOREIGN KEY (PowerID) REFERENCES Power(ID)
    );

--      HEROHASPOWER DATA       --

INSERT INTO
    HeroHasPower
VALUES
    (
        'Chris Evans',
        'CaptainAmerica',
        1,
        DATE '2011-07-22'
    );

INSERT INTO
    HeroHasPower
VALUES
    (
        'Tom Holland',
        'SpiderMan',
        2,
        DATE '2016-07-07'
    );

INSERT INTO
    HeroHasPower
VALUES
    (
        'Paul Rudd',
        'AntMan',
        3,
        DATE '2015-07-17'
    );

INSERT INTO
    HeroHasPower
VALUES
    (
        'Vin Diesel',
        'Groot',
        4,
        DATE '2014-08-01'
    );

INSERT INTO
    HeroHasPower
VALUES
    (
        'Elizabeth Olsen',
        'ScarletWitch',
        5,
        DATE '2015-05-01'
    );


--      MEMBEROFTEAM TABLE      --
CREATE TABLE
    MemberOfTeam (
        ActorName VARCHAR(50),
        Alias VARCHAR(50),
        Name VARCHAR(50),
        PRIMARY KEY (ActorName, Alias, Name),
        FOREIGN KEY (ActorName, Alias) REFERENCES Superhero (ActorName, Alias),
        FOREIGN KEY (Name) REFERENCES Team (Name)
    );

--      MEMBEROFTEAM DATA       --
INSERT INTO
    MemberOfTeam
VALUES
    (
        'Chris Evans',
        'CaptainAmerica',
        'Avengers'
    );

INSERT INTO
    MemberOfTeam
VALUES
    (
        'Tom Holland',
        'SpiderMan',
        'Avengers'
    );

INSERT INTO
    MemberOfTeam
VALUES
    (
        'Paul Rudd',
        'AntMan',
        'Avengers'
    );

INSERT INTO
    MemberOfTeam
VALUES
    (
        'Elizabeth Olsen',
        'ScarletWitch',
        'Avengers'
    );

INSERT INTO
    MemberOfTeam
VALUES
    (
        'Chris Hemsworth',
        'Thor',
        'Asgardians'
    );

--      APPEARSIN TABLE     --

CREATE TABLE
    AppearsIn (
        HeroActorName VARCHAR(50),
        HeroAlias VARCHAR(50),
        VillainActorName VARCHAR(50),
        VillainAlias VARCHAR(50),
        MovieName VARCHAR(50),
        MovieReleaseYear INTEGER,
        PRIMARY KEY (
            HeroActorName,
            HeroAlias,
            VillainActorName,
            VillainAlias,
            MovieName,
            MovieReleaseYear
        ),
        FOREIGN KEY (HeroActorName, HeroAlias) REFERENCES Superhero (ActorName, Alias),
        FOREIGN KEY (VillainActorName, VillainAlias) REFERENCES Villain (ActorName, Alias),
        FOREIGN KEY (MovieName, MovieReleaseYear) REFERENCES Movie (Name, ReleaseYear)
    );

--      APPEARSIN DATA      --

INSERT INTO
    AppearsIn
VALUES
    (
        'Chris Evans',
        'CaptainAmerica',
        'Hugo Weaving',
        'RedSkull',
        'Captain America: The First Avenger',
        2011
    );

INSERT INTO
    AppearsIn
VALUES
    (
        'Chris Hemsworth',
        'Thor',
        'Tom Hiddleston',
        'Loki',
        'Thor',
        2011
    );

INSERT INTO
    AppearsIn
VALUES
    (
        'Chris Evans',
        'CaptainAmerica',
        'Tom Hiddleston',
        'Loki',
        'The Avengers',
        2012
    );

INSERT INTO
    AppearsIn
VALUES
    (
        'Robert Downey Jr.',
        'IronMan',
        'Tom Hiddleston',
        'Loki',
        'The Avengers',
        2012
    );

INSERT INTO
    AppearsIn
VALUES
    (
        'Chris Hemsworth',
        'Thor',
        'Tom Hiddleston',
        'Loki',
        'The Avengers',
        2012
    );

--      FEATURES TABLE      --

CREATE TABLE
    Features (
        EarthNum INTEGER,
        InfinityStoneName VARCHAR(50),
        TeamName VARCHAR(50),
        MovieName VARCHAR(50),
        MovieReleaseYear INTEGER,
        PRIMARY KEY (
            EarthNum,
            InfinityStoneName,
            TeamName,
            MovieName,
            MovieReleaseYear
        ),
        FOREIGN KEY (InfinityStoneName, EarthNum) REFERENCES InfinityStone (Name, EarthNumber),
        FOREIGN KEY (TeamName) REFERENCES Team (Name),
        FOREIGN KEY (MovieName, MovieReleaseYear) REFERENCES Movie (Name, ReleaseYear)
    );

--      FEAUTURES DATA      --
INSERT INTO Features VALUES (616, 'Space Stone', 'Avengers', 'The Avengers', 2012);

INSERT INTO Features VALUES (616, 'Mind Stone', 'Avengers', 'Avengers: Age of Ultron', 2015);

INSERT INTO Features VALUES (616, 'Time Stone', 'Masters of the Mystic Arts', 'Doctor Strange', 2016);

INSERT INTO Features VALUES (616, 'Reality Stone', 'Guardians of the Galaxy', 'Guardians of the Galaxy', 2014);

INSERT INTO Features VALUES (616, 'Power Stone', 'Guardians of the Galaxy', 'Guardians of the Galaxy', 2014);

--      EXISTSIN TABLE      --

CREATE TABLE
    ExistsIn (
        TeamName VARCHAR(50),
        EarthNumber INTEGER,
        PRIMARY KEY (TeamName, EarthNumber),
        FOREIGN KEY (TeamName) REFERENCES Team (Name),
        FOREIGN KEY (EarthNumber) REFERENCES Universe (EarthNumber)
    );

INSERT INTO
    ExistsIn
VALUES
    (
        'Avengers',
        199999
    );

INSERT INTO
    ExistsIn
VALUES
    (
        'Guardians of the Galaxy',
        199999
    );

INSERT INTO
    ExistsIn
VALUES
    (
        'Asgardians',
        838
    );

INSERT INTO
    ExistsIn
VALUES
    (
        'Young Avengers',
        616
    );

INSERT INTO
    ExistsIn
VALUES
    (
        'Guardians of the Galaxy',
        616
    );


--      SETIN TABLE     --
CREATE TABLE
    SetIn (
        EarthNumber INTEGER,
        MovieName VARCHAR(50),
        MovieReleaseYear INTEGER,
        PRIMARY KEY (EarthNumber, MovieName, MovieReleaseYear),
        FOREIGN KEY (EarthNumber) REFERENCES Universe (EarthNumber),
        FOREIGN KEY (MovieName, MovieReleaseYear) REFERENCES Movie (Name, ReleaseYear)
    );

INSERT INTO
    SetIn
VALUES
    (199999, 'Iron Man', 2008);

INSERT INTO
    SetIn
VALUES
    (199999, 'The Incredible Hulk', 2008);

INSERT INTO
    SetIn
VALUES
    (199999, 'Thor', 2011);

INSERT INTO
    SetIn
VALUES
    (
        199999,
        'Captain America: The First Avenger',
        2011
    );
INSERT INTO
    SetIn
VALUES
    (199999, 'The Avengers', 2012);

--      LOCATEDIN TABLE     --
CREATE TABLE
    LocatedIn (
        TeamName VARCHAR(50),
        LocationName VARCHAR(50),
        PRIMARY KEY (TeamName, LocationName),
        FOREIGN KEY (TeamName) REFERENCES Team (Name),
        FOREIGN KEY (LocationName) REFERENCES Location (Name)
    );

INSERT INTO
    LocatedIn
VALUES
    ('Avengers', 'Wakanda');

INSERT INTO
    LocatedIn
VALUES
    ('Guardians of the Galaxy', 'Knowhere');

INSERT INTO
    LocatedIn
VALUES
    ('Young Avengers', 'Wakanda');

INSERT INTO
    LocatedIn
VALUES
    ('Asgardians', 'Sokovia');

INSERT INTO
    LocatedIn
VALUES
    ('Young Avengers', 'Sokovia');

--      MEMBEROFORGANIZATION TABLE       --
CREATE TABLE
    MemberOfOrganization (
        HeroActorName VARCHAR(50),
        HeroAlias VARCHAR(50),
        VillainActorName VARCHAR(50),
        VillainAlias VARCHAR(50),
        OrganizationName VARCHAR(50),
        PRIMARY KEY (
            HeroActorName,
            HeroAlias,
            VillainActorName,
            VillainAlias,
            OrganizationName
        ),
        FOREIGN KEY (HeroActorName, HeroAlias) REFERENCES Superhero (ActorName, Alias),
        FOREIGN KEY (VillainActorName, VillainAlias) REFERENCES Villain (ActorName, Alias),
        FOREIGN KEY (OrganizationName) REFERENCES Organization (Name)
    );

--      MEMBEROFORGANIZATION DATA       --
INSERT INTO
    MemberOfOrganization
VALUES
    (
        'Robert Downey Jr.',
        'IronMan',
        'Josh Brolin',
        'Thanos',
        'Stark Industries'
    );

INSERT INTO
    MemberOfOrganization
VALUES
    (
        'Chris Evans',
        'CaptainAmerica',
        'Tom Hiddleston',
        'Loki',
        'S.H.I.E.L.D.'
    );

INSERT INTO
    MemberOfOrganization
VALUES
    (
        'Chris Hemsworth',
        'Thor',
        'Cate Blanchett',
        'Hela',
        'Wakandan Royal Guard'
    );

INSERT INTO
    MemberOfOrganization
VALUES
    (
        'Mark Ruffalo',
        'Hulk',
        'James Spader',
        'Ultron',
        'Stark Industries'
    );

INSERT INTO
    MemberOfOrganization
VALUES
    (
        'Scarlett Johansson',
        'BlackWidow',
        'Michael B. Jordan',
        'Killmonger',
        'S.H.I.E.L.D.'
    );

--      TAKESPLACE TABLE     --
CREATE TABLE
    TakesPlace (
        MovieName VARCHAR(50),
        MovieReleaseYear INTEGER,
        LocationName VARCHAR(50),
        PRIMARY KEY (MovieName, MovieReleaseYear, LocationName),
        FOREIGN KEY (MovieName, MovieReleaseYear) REFERENCES Movie (Name, ReleaseYear),
        FOREIGN KEY (LocationName) REFERENCES Location (Name)
    );

--      TAKESPLACE DATA     --  
INSERT INTO
    TakesPlace
VALUES
    ('Iron Man', 2008, 'Wakanda');

INSERT INTO
    TakesPlace
VALUES
    ('The Incredible Hulk', 2008, 'Sokovia');

INSERT INTO
    TakesPlace
VALUES
    ('Thor', 2011, 'Asgard');

INSERT INTO
    TakesPlace
VALUES
    (
        'Captain America: The First Avenger',
        2011,
        'Wakanda'
    );

INSERT INTO
    TakesPlace
VALUES
    ('The Avengers', 2012, 'Knowhere');


--      BASEDIN TABLE       --
CREATE TABLE
    BasedIn (
        LocationName VARCHAR(50),
        OrganizationName VARCHAR(50),
        PRIMARY KEY (LocationName, OrganizationName),
        FOREIGN KEY (LocationName) REFERENCES Location (Name),
        FOREIGN KEY (OrganizationName) REFERENCES Organization (Name)
    );

--      BASEDIN DATA        --
INSERT INTO
    BasedIn
VALUES
    ('Wakanda', 'Wakandan Royal Guard');

INSERT INTO
    BasedIn
VALUES
    ('Knowhere', 'Ten Rings');

INSERT INTO
    BasedIn
VALUES
    ('Sokovia', 'HYDRA');

INSERT INTO
    BasedIn
VALUES
    ('Asgard', 'S.H.I.E.L.D.');



--      POWERFROM TABLE     --
CREATE TABLE
    PowerFrom (
        PowerID INTEGER,
        StoneName VARCHAR(50),
        EarthNumber INTEGER,
        PRIMARY KEY (PowerID, StoneName, EarthNumber),
        FOREIGN KEY (PowerID) REFERENCES Power(ID),
        FOREIGN KEY (StoneName, EarthNumber) REFERENCES InfinityStone (Name, EarthNumber)
    );

--      POWERFROM DATA      --
INSERT INTO
    PowerFrom
VALUES
    (1, 'Space Stone', 616);

INSERT INTO
    PowerFrom
VALUES
    (6, 'Mind Stone', 616);

INSERT INTO
    PowerFrom
VALUES
    (3, 'Reality Stone', 616);

INSERT INTO
    PowerFrom
VALUES
    (4, 'Power Stone', 616);

INSERT INTO
    PowerFrom
VALUES
    (5, 'Time Stone', 616);
