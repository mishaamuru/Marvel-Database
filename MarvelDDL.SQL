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

INSERT INTO
    Superhero
VALUES
    (
        "Robert Downey Jr.",
        "IronMan",
        "Tony Stark",
        "Dead",
        "Human",
        "Known"
    );

INSERT INTO
    Superhero
VALUES
    (
        "Chris Evans",
        "CaptainAmerica",
        "Steve Rogers",
        "Retired",
        "Human",
        "Known"
    );

INSERT INTO
    Superhero
VALUES
    (
        "Chris Hemsworth",
        "Thor",
        "Thor Odinson",
        "Alive",
        "Asgardian",
        "Known"
    );

INSERT INTO
    Superhero
VALUES
    (
        "Mark Ruffalo",
        "Hulk",
        "Bruce Banner",
        "Alive",
        "Human",
        "Known"
    );

INSERT INTO
    Superhero
VALUES
    (
        "Scarlett Johansson",
        "BlackWidow",
        "Natasha Romanoff",
        "Dead",
        "Human",
        "Unknown"
    );

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

INSERT INTO
    Villain
VALUES
    (
        "Tom Hiddleston",
        "Loki",
        "Loki Laufeyson",
        "Alive",
        "Frost Giant",
        "Known",
        "Power"
    );

INSERT INTO
    Villain
VALUES
    (
        "Josh Brolin",
        "Thanos",
        "Thanos",
        "Dead",
        "Titan",
        "Known",
        "Overpopulation"
    );

INSERT INTO
    Villain
VALUES
    (
        "James Spader",
        "Ultron",
        "Ultron",
        "Destroyed",
        "AI",
        "Known",
        "Evolution"
    );

INSERT INTO
    Villain
VALUES
    (
        "Michael B. Jordan",
        "Killmonger",
        "Erik Stevens",
        "Dead",
        "Human",
        "Known",
        "Revenge"
    );

INSERT INTO
    Villain
VALUES
    (
        "Cate Blanchett",
        "Hela",
        "Hela",
        "Dead",
        "Asgardian",
        "Known",
        "Conquest"
    );

CREATE TABLE
    Universe (
        EarthNumber INTEGER,
        Name VARCHAR(20),
        Status VARCHAR(20),
        Timeline VARCHAR(20),
        PRIMARY KEY (EarthNumber)
    );

INSERT INTO
    Universe
VALUES
    (616, "Earth-616", "Active", "Main");

INSERT INTO
    Universe
VALUES
    (199999, "Earth-199999", "Active", "MCU");

INSERT INTO
    Universe
VALUES
    (838, "Earth-838", "Destroyed", "Alternate");

INSERT INTO
    Universe
VALUES
    (2149, "Earth-2149", "Destroyed", "Zombie");

INSERT INTO
    Universe
VALUES
    (1610, "Earth-1610", "Destroyed", "Ultimate");

CREATE TABLE
    Team (
        Name VARCHAR(50),
        NumberOfPeople INTEGER,
        Standing VARCHAR(50),
        Mentor VARCHAR(50),
        Leader VARCHAR(50),
        PRIMARY KEY (Name)
    );

INSERT INTO
    Team
VALUES
    (
        "Avengers",
        6,
        "Active",
        "Nick Fury",
        "Captain America"
    );

INSERT INTO
    Team
VALUES
    (
        "Guardians of the Galaxy",
        5,
        "Active",
        "Yondu",
        "Star-Lord"
    );

INSERT INTO
    Team
VALUES
    (
        "Young Avengers",
        5,
        "Active",
        "Hawkeye",
        "Kate Bishop"
    );

INSERT INTO
    Team
VALUES
    ("Defenders", 4, "Inactive", "Stick", "Daredevil");

INSERT INTO
    Team
VALUES
    (
        "Fantastic Four",
        4,
        "Active",
        "Reed Richards",
        "Mr. Fantastic"
    );

CREATE TABLE
    Organization (
        Name VARCHAR(50),
        Leader VARCHAR(50),
        Status VARCHAR(50),
        Type VARCHAR(50),
        Founder VARCHAR(50),
        PRIMARY KEY (Name)
    );

INSERT INTO
    Organization
VALUES
    (
        "S.H.I.E.L.D.",
        "Nick Fury",
        "Active",
        "Intelligence",
        "Howard Stark"
    );

INSERT INTO
    Organization
VALUES
    (
        "HYDRA",
        "Red Skull",
        "Inactive",
        "Terrorist",
        "Johann Schmidt"
    );

INSERT INTO
    Organization
VALUES
    (
        "Stark Industries",
        "Tony Stark",
        "Active",
        "Corporation",
        "Howard Stark"
    );

INSERT INTO
    Organization
VALUES
    (
        "Wakandan Royal Guard",
        "Okoye",
        "Active",
        "Military",
        "T'Chaka"
    );

INSERT INTO
    Organization
VALUES
    (
        "Ten Rings",
        "Xu Wenwu",
        "Active",
        "Criminal",
        "Xu Wenwu"
    );

CREATE TABLE
    Location (
        Name VARCHAR(50),
        Species VARCHAR(50),
        Planet VARCHAR(50),
        Population VARCHAR(50),
        PRIMARY KEY (Name)
    );

INSERT INTO
    Location
VALUES
    ("Wakanda", "Human", "Earth", "6000000");

INSERT INTO
    Location
VALUES
    ("Asgard", "Asgardian", "Asgard", "Unknown");

INSERT INTO
    Location
VALUES
    ("Knowhere", "Various", "Cosmic", "Unknown");

INSERT INTO
    Location
VALUES
    ("Titan", "Titanian", "Titan", "Extinct");

INSERT INTO
    Location
VALUES
    ("Sokovia", "Human", "Earth", "Unknown");

CREATE TABLE
    StoneColour (
        Name VARCHAR(50),
        Colour VARCHAR(50),
        PRIMARY KEY (Name)
    );

INSERT INTO
    StoneColour
VALUES
    ("Space Stone", "Blue");

INSERT INTO
    StoneColour
VALUES
    ("Mind Stone", "Yellow");

INSERT INTO
    StoneColour
VALUES
    ("Reality Stone", "Red");

INSERT INTO
    StoneColour
VALUES
    ("Power Stone", "Purple");

INSERT INTO
    StoneColour
VALUES
    ("Time Stone", "Green");

CREATE TABLE
    MovieOrderPhase (
        NumberOfOrder INTEGER,
        Phase INTEGER,
        PRIMARY KEY (NumberOfOrder)
    );

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

CREATE TABLE
    InfinityStone (
        EarthNumber INTEGER,
        Name VARCHAR(50),
        Status VARCHAR(50),
        Owner VARCHAR(50),
        PRIMARY KEY (Name, EarthNumber),
        FOREIGN KEY (EarthNumber) REFERENCES Universe (EarthNumber),
        FOREIGN KEY (Name) REFERENCES StoneColour (Name)
    );

INSERT INTO
    InfinityStone
VALUES
    (199999, "Space Stone", "Destroyed", "Thanos");

INSERT INTO
    InfinityStone
VALUES
    (199999, "Mind Stone", "Destroyed", "Vision");

INSERT INTO
    InfinityStone
VALUES
    (199999, "Reality Stone", "Destroyed", "Collector");

INSERT INTO
    InfinityStone
VALUES
    (199999, "Power Stone", "Destroyed", "Nova Corps");

INSERT INTO
    InfinityStone
VALUES
    (
        199999,
        "Time Stone",
        "Destroyed",
        "Doctor Strange"
    );

CREATE TABLE
    Movie (
        Name VARCHAR(50),
        ReleaseYear INTEGER,
        NumberOfOrder INTEGER,
        RottenTomato INTEGER,
        PRIMARY KEY (Name, ReleaseYear),
        FOREIGN KEY (NumberOfOrder) REFERENCES MovieOrderPhase (NumberOfOrder)
    );

INSERT INTO
    Movie
VALUES
    ("Iron Man", 2008, 1, 94);

INSERT INTO
    Movie
VALUES
    ("The Incredible Hulk", 2008, 2, 67);

INSERT INTO
    Movie
VALUES
    ("Thor", 2011, 3, 77);

INSERT INTO
    Movie
VALUES
    ("Captain America: The First Avenger", 2011, 4, 80);

INSERT INTO
    Movie
VALUES
    ("The Avengers", 2012, 5, 91);

CREATE TABLE
    Avenger (
        ActorName VARCHAR(50),
        Alias VARCHAR(50),
        AvailabilityLevel INTEGER,
        DateJoined INTEGER,
        PRIMARY KEY (ActorName, Alias),
        FOREIGN KEY (ActorName, Alias) REFERENCES Superhero (ActorName, Alias)
    );

INSERT INTO
    Avenger
VALUES
    ("Robert Downey Jr.", "IronMan", 5, 2012);

INSERT INTO
    Avenger
VALUES
    ("Chris Evans", "CaptainAmerica", 5, 2012);

INSERT INTO
    Avenger
VALUES
    ("Chris Hemsworth", "Thor", 5, 2012);

INSERT INTO
    Avenger
VALUES
    ("Mark Ruffalo", "Hulk", 4, 2012);

INSERT INTO
    Avenger
VALUES
    ("Scarlett Johansson", "BlackWidow", 4, 2012);

CREATE TABLE
    WeaponSource (
        Weapon VARCHAR(30),
        Source VARCHAR(30),
        PRIMARY KEY (Weapon)
    );

INSERT INTO
    WeaponSource
VALUES
    ("Mjolnir", "Asgard");

INSERT INTO
    WeaponSource
VALUES
    ("Shield", "Vibranium");

INSERT INTO
    WeaponSource
VALUES
    ("Arc Reactor", "Stark Tech");

INSERT INTO
    WeaponSource
VALUES
    ("Widow Bite", "S.H.I.E.L.D.");

INSERT INTO
    WeaponSource
VALUES
    ("Stormbreaker", "Nidavellir");

CREATE TABLE
    Power(
        ID INTEGER,
        SkillSet VARCHAR(30),
        Weapon VARCHAR(30),
        WeaponType VARCHAR(30),
        PRIMARY KEY (ID),
        FOREIGN KEY (Weapon) REFERENCES WeaponSource (Weapon)
    );

INSERT INTO
    Power
VALUES
    (1, "Super Strength", "Mjolnir", "Godly");

INSERT INTO
    Power
VALUES
    (2, "Energy Blasts", "Arc Reactor", "Tech");

INSERT INTO
    Power
VALUES
    (3, "Hand to Hand Combat", "Widow Bite", "Combat");

INSERT INTO
    Power
VALUES
    (4, "Shield Mastery", "Shield", "Defense");

INSERT INTO
    Power
VALUES
    (5, "Lightning Control", "Stormbreaker", "Godly");

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

INSERT INTO
    Fights
VALUES
    (
        "Robert Downey Jr.",
        "IronMan",
        "Josh Brolin",
        "Thanos"
    );

INSERT INTO
    Fights
VALUES
    (
        "Chris Evans",
        "CaptainAmerica",
        "Tom Hiddleston",
        "Loki"
    );

INSERT INTO
    Fights
VALUES
    (
        "Chris Hemsworth",
        "Thor",
        "Cate Blanchett",
        "Hela"
    );

INSERT INTO
    Fights
VALUES
    ("Mark Ruffalo", "Hulk", "James Spader", "Ultron");

INSERT INTO
    Fights
VALUES
    (
        "Scarlett Johansson",
        "BlackWidow",
        "Michael B. Jordan",
        "Killmonger"
    );

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

INSERT INTO
    VillainHasPower
VALUES
    (1, "Tom Hiddleston", "Loki", "2011-05-06");

INSERT INTO
    VillainHasPower
VALUES
    (2, "Josh Brolin", "Thanos", "2018-04-27");

INSERT INTO
    VillainHasPower
VALUES
    (
        3,
        "Michael B. Jordan",
        "Killmonger",
        "2018-02-16"
    );

INSERT INTO
    VillainHasPower
VALUES
    (4, "James Spader", "Ultron", "2015-05-01");

INSERT INTO
    VillainHasPower
VALUES
    (5, "Cate Blanchett", "Hela", "2017-11-03");

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

INSERT INTO
    HeroHasPower
VALUES
    ("Chris Hemsworth", "Thor", 1, "2011-04-21");

INSERT INTO
    HeroHasPower
VALUES
    ("Robert Downey Jr.", "IronMan", 2, "2008-05-02");

INSERT INTO
    HeroHasPower
VALUES
    (
        "Scarlett Johansson",
        "BlackWidow",
        3,
        "2012-05-04"
    );

INSERT INTO
    HeroHasPower
VALUES
    ("Chris Evans", "CaptainAmerica", 4, "2011-07-22");

INSERT INTO
    HeroHasPower
VALUES
    ("Chris Hemsworth", "Thor", 5, "2018-04-27");

CREATE TABLE
    MemberOfTeam (
        ActorName VARCHAR(50),
        Alias VARCHAR(50),
        Name VARCHAR(50),
        PRIMARY KEY (ActorName, Alias, Name),
        FOREIGN KEY (ActorName, Alias) REFERENCES Superhero (ActorName, Alias),
        FOREIGN KEY (Name) REFERENCES Team (Name)
    );

INSERT INTO
    MemberOfTeam
VALUES
    ("Robert Downey Jr.", "IronMan", "Avengers");

INSERT INTO
    MemberOfTeam
VALUES
    ("Chris Evans", "CaptainAmerica", "Avengers");

INSERT INTO
    MemberOfTeam
VALUES
    ("Chris Hemsworth", "Thor", "Avengers");

INSERT INTO
    MemberOfTeam
VALUES
    ("Mark Ruffalo", "Hulk", "Avengers");

INSERT INTO
    MemberOfTeam
VALUES
    ("Scarlett Johansson", "BlackWidow", "Avengers");

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

INSERT INTO
    AppearsIn
VALUES
    (
        "Robert Downey Jr.",
        "IronMan",
        "Tom Hiddleston",
        "Loki",
        "The Avengers",
        2012
    );

INSERT INTO
    AppearsIn
VALUES
    (
        "Chris Evans",
        "CaptainAmerica",
        "Tom Hiddleston",
        "Loki",
        "The Avengers",
        2012
    );

INSERT INTO
    AppearsIn
VALUES
    (
        "Chris Hemsworth",
        "Thor",
        "Tom Hiddleston",
        "Loki",
        "Thor",
        2011
    );

INSERT INTO
    AppearsIn
VALUES
    (
        "Mark Ruffalo",
        "Hulk",
        "Josh Brolin",
        "Thanos",
        "The Avengers",
        2012
    );

INSERT INTO
    AppearsIn
VALUES
    (
        "Scarlett Johansson",
        "BlackWidow",
        "James Spader",
        "Ultron",
        "The Avengers",
        2012
    );

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

    INSERT INTO
    Features
VALUES
    (
        199999,
        "Space Stone",
        "Avengers",
        "The Avengers",
        2012
    );

INSERT INTO
    Features
VALUES
    (
        199999,
        "Mind Stone",
        "Avengers",
        "The Avengers",
        2012
    );

INSERT INTO
    Features
VALUES
    (
        199999,
        "Reality Stone",
        "Guardians of the Galaxy",
        "Thor",
        2011
    );

INSERT INTO
    Features
VALUES
    (
        199999,
        "Power Stone",
        "Guardians of the Galaxy",
        "The Avengers",
        2012
    );

INSERT INTO
    Features
VALUES
    (
        199999,
        "Time Stone",
        "Avengers",
        "Captain America: The First Avenger",
        2011
    );


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
        "Avengers",
        199999
    );

INSERT INTO
    ExistsIn
VALUES
    (
        "Guardians of the Galaxy",
        199999
    );

INSERT INTO
    ExistsIn
VALUES
    (
        "Fantastic Four",
        828
    );

INSERT INTO
    ExistsIn
VALUES
    (
        "Agents of Wakanda",
        616
    );

INSERT INTO
    ExistsIn
VALUES
    (
        "Black Order",
        199999
    );


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
    (199999, "Iron Man", 2008);

INSERT INTO
    SetIn
VALUES
    (199999, "The Incredible Hulk", 2008);

INSERT INTO
    SetIn
VALUES
    (199999, "Thor", 2011);

INSERT INTO
    SetIn
VALUES
    (
        199999,
        "Captain America: The First Avenger",
        2011
    );

INSERT INTO
    SetIn
VALUES
    (199999, "The Avengers", 2012);

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
    ("Avengers", "Wakanda");

INSERT INTO
    LocatedIn
VALUES
    ("Guardians of the Galaxy", "Knowhere");

INSERT INTO
    LocatedIn
VALUES
    ("Fantastic Four", "Wakanda");

INSERT INTO
    LocatedIn
VALUES
    ("Defenders", "Sokovia");

INSERT INTO
    LocatedIn
VALUES
    ("Young Avengers", "Wakanda");

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

INSERT INTO
    MemberOfOrganization
VALUES
    (
        "Robert Downey Jr.",
        "IronMan",
        "Josh Brolin",
        "Thanos",
        "Stark Industries"
    );

INSERT INTO
    MemberOfOrganization
VALUES
    (
        "Chris Evans",
        "CaptainAmerica",
        "Tom Hiddleston",
        "Loki",
        "S.H.I.E.L.D."
    );

INSERT INTO
    MemberOfOrganization
VALUES
    (
        "Chris Hemsworth",
        "Thor",
        "Cate Blanchett",
        "Hela",
        "Wakandan Royal Guard"
    );

INSERT INTO
    MemberOfOrganization
VALUES
    (
        "Mark Ruffalo",
        "Hulk",
        "James Spader",
        "Ultron",
        "Stark Industries"
    );

INSERT INTO
    MemberOfOrganization
VALUES
    (
        "Scarlett Johansson",
        "BlackWidow",
        "Michael B. Jordan",
        "Killmonger",
        "S.H.I.E.L.D."
    );

CREATE TABLE
    TakesPlace (
        MovieName VARCHAR(50),
        MovieReleaseYear INTEGER,
        LocationName VARCHAR(50),
        PRIMARY KEY (MovieName, MovieReleaseYear, LocationName),
        FOREIGN KEY (MovieName, MovieReleaseYear) REFERENCES Movie (Name, ReleaseYear),
        FOREIGN KEY (LocationName) REFERENCES Location (Name)
    );

INSERT INTO
    TakesPlace
VALUES
    ("Iron Man", 2008, "Wakanda");

INSERT INTO
    TakesPlace
VALUES
    ("The Incredible Hulk", 2008, "Sokovia");

INSERT INTO
    TakesPlace
VALUES
    ("Thor", 2011, "Asgard");

INSERT INTO
    TakesPlace
VALUES
    (
        "Captain America: The First Avenger",
        2011,
        "Wakanda"
    );

INSERT INTO
    TakesPlace
VALUES
    ("The Avengers", 2012, "Knowhere");

CREATE TABLE
    BasedIn (
        LocationName VARCHAR(50),
        OrganizationName VARCHAR(50),
        PRIMARY KEY (LocationName, OrganizationName),
        FOREIGN KEY (LocationName) REFERENCES Location (Name),
        FOREIGN KEY (OrganizationName) REFERENCES Organization (Name)
    );

INSERT INTO
    BasedIn
VALUES
    ("Wakanda", "Wakandan Royal Guard");

INSERT INTO
    BasedIn
VALUES
    ("Knowhere", "Ten Rings");

INSERT INTO
    BasedIn
VALUES
    ("Sokovia", "HYDRA");

INSERT INTO
    BasedIn
VALUES
    ("Asgard", "S.H.I.E.L.D.");

INSERT INTO
    BasedIn
VALUES
    ("Wakanda", "Stark Industries");

CREATE TABLE
    PowerFrom (
        PowerID INTEGER,
        StoneName VARCHAR(50),
        EarthNumber INTEGER,
        PRIMARY KEY (PowerID, StoneName, EarthNumber),
        FOREIGN KEY (PowerID) REFERENCES Power(ID),
        FOREIGN KEY (StoneName, EarthNumber) REFERENCES InfinityStone (Name, EarthNumber)
    );

INSERT INTO
    PowerFrom
VALUES
    (1, "Space Stone", 199999);

INSERT INTO
    PowerFrom
VALUES
    (2, "Mind Stone", 199999);

INSERT INTO
    PowerFrom
VALUES
    (3, "Reality Stone", 199999);

INSERT INTO
    PowerFrom
VALUES
    (4, "Power Stone", 199999);

INSERT INTO
    PowerFrom
VALUES
    (5, "Time Stone", 199999);