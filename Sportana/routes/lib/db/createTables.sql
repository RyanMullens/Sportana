CREATE TABLE IF NOT EXISTS Users (
login VARCHAR(50),
password VARCHAR(50) NOT NULL,
firstName VARCHAR(50),
lastName VARCHAR(50),
city VARCHAR(50),
birthday DATE,
isActive BOOLEAN DEFAULT TRUE,
numNotifications INT,
auth VARCHAR(100) UNIQUE,
friendliness DOUBLE,
timeliness DOUBLE,
skillLevel DOUBLE,
sportsmanship DOUBLE,
profilePicture VARCHAR(100),
PRIMARY KEY(login)
);

CREATE TABLE IF NOT EXISTS Friends (
loginA VARCHAR(50),
loginB VARCHAR(50),
PRIMARY KEY (loginA, loginB),
FOREIGN KEY (loginA)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (loginB)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Ratings(
user VARCHAR(50),
rater VARCHAR(50),
friendliness INT,
timeliness INT,
skillLevel INT,
sportsmanship INT,
PRIMARY KEY (user, rater),
FOREIGN KEY (user)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY(rater)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Sport(
sport VARCHAR(50),
PRIMARY KEY (sport)
);

CREATE TABLE IF NOT EXISTS FavoriteSports(
user VARCHAR(50),
sport VARCHAR(50),
PRIMARY KEY (user, sport),
FOREIGN KEY (user)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (sport)
REFERENCES Sport(sport)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Game(
creator VARCHAR(50),
gameID INT,
gameDate DATE,
gameTime TIME,
sport VARCHAR(50),
location VARCHAR(100),
numParticipants INT,
minPlayers INT,
maxPlayers INT,
reservedSpots INT,
minAge INT,
maxAge INT,
isPublic BOOLEAN
PRIMARY KEY (creator, gameID),
FOREIGN KEY (creator)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (sport)
REFERENCES Sport(sport)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Participant(
user VARCHAR(50),
creator VARCHAR(50),
gameID INT,
status INT,
numUnreadNotifications INT,
PRIMARY KEY (user, creator, gameID),
FOREIGN KEY (user)
REFERENCES Users(login),
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (creator)
REFERENCES Game(creator)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (gameID)
REFERENCES Game(gameID)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

