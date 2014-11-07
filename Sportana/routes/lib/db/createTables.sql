CREATE DATABASE Sportana;
\c sportana;

CREATE TABLE IF NOT EXISTS Users (
login VARCHAR(50),
emailSuffix VARCHAR(25),
password VARCHAR(50) NOT NULL,
firstName VARCHAR(50),
lastName VARCHAR(50),
city VARCHAR(50),
birthday DATE,
isActive BOOLEAN DEFAULT TRUE,
numNotifications INT,
auth VARCHAR(100) UNIQUE,
friendliness REAL,
timeliness REAL,
skillLevel REAL,
profilePicture VARCHAR(500),
PRIMARY KEY(login)
);

CREATE TABLE IF NOT EXISTS Friends (
userA VARCHAR(50),
userB VARCHAR(50),
PRIMARY KEY (userA, userB),
FOREIGN KEY (userA)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (userB)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Ratings(
userRated VARCHAR(50),
rater VARCHAR(50),
friendliness INT,
timeliness INT,
skillLevel INT,
PRIMARY KEY (userRated, rater),
FOREIGN KEY (userRated)
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
imageURL VARCHAR(500),
PRIMARY KEY (sport)
);

CREATE TABLE IF NOT EXISTS FavoriteSports(
login VARCHAR(50),
sport VARCHAR(50),
PRIMARY KEY (login, sport),
FOREIGN KEY (login)
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
gameID SERIAL,
gameDate DATE,
gameStart TIME,
gameEnd TIME,
sport VARCHAR(50),
location VARCHAR(100),
numParticipants INT,
minPlayers INT,
maxPlayers INT,
reservedSpots INT,
minAge INT,
maxAge INT,
isPublic BOOLEAN,
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
login VARCHAR(50),
creator VARCHAR(50),
gameID INT,
status INT, -- 0: going, 1: queued, 2: no response
numUnreadNotifications INT,
PRIMARY KEY (login, creator, gameID),
FOREIGN KEY (login)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (creator, gameID)
REFERENCES Game(creator, gameID)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Notifications(
userTo VARCHAR(50),
userFrom VARCHAR(50),
nid SERIAL,
type INT, -- 0: friend, 1: game, 2: queue, 3: game reminder
timeSent TIMESTAMP,
creator VARCHAR(50),
gameID INT,
PRIMARY KEY (userTo, userFrom, nid),
FOREIGN KEY (userTo)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (userFrom)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (creator, gameID)
REFERENCES Game(creator, gameID)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS GameWallPost(
userPosting VARCHAR(50),
gameCreator VARCHAR(50),
gameID INT,
pid INT,
post VARCHAR(500),
PRIMARY KEY(gameCreator, gameID, userPosting, pid),
FOREIGN KEY (gameCreator, gameID)
REFERENCES Game(creator, gameID)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (userPosting)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Queue(
login VARCHAR(50),
sport VARCHAR(50),
minAge INT,
maxAge INT,
location VARCHAR(100),
PRIMARY KEY(login, sport),
FOREIGN KEY (login)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (sport)
REFERENCES Sport(sport)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS SearchProfile(
login VARCHAR(50),
sport VARCHAR(50),
minAge INT,
maxAge INT,
location VARCHAR(100),
pid SERIAL,
PRIMARY KEY (login, pid),
FOREIGN KEY (login)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE,
FOREIGN KEY (sport)
REFERENCES Sport(sport)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Times(
login VARCHAR(50),
dateAvailable DATE,
startTime TIME,
endTime TIME,
PRIMARY KEY(login, dateAvailable, startTime, endTime),
FOREIGN KEY (login)
REFERENCES Users(login)
ON DELETE NO ACTION
ON UPDATE CASCADE
);

