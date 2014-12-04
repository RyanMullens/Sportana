\c sportana;


INSERT INTO Users(login, emailSuffix, password, firstName, lastName, city, birthday, numNotifications, auth, profilePicture) values
('myoda', 'gmail.com', 'password' , 'Master' , 'Yoda', 'Dagobah', '1972-10-01' , 0 , 'ahsdkl34a', 'http://static.comicvine.com/uploads/scale_medium/0/2532/156856-39717-yoda.jpg');

insert INTO Users(login, emailSuffix, password, firstName, lastName, city, birthday, numNotifications, auth, profilePicture) values
('jbond', 'yahoo.com', 'iam007' , 'James' , 'Bond', 'London', '1964-09-23' , 0 , 'luinkel9la', 'http://cbsnews1.cbsistatic.com/hub/i/r/2012/10/13/09d9d6e1-a645-11e2-a3f0-029118418759/thumbnail/620x350/2edfb0193dd29f2393297d20949a5109/JamesBondWide.jpg');

insert INTO Users(login, emailSuffix, password, firstName, lastName, city, birthday, numNotifications, auth, profilePicture) values
('mscott', 'gmail.com', 'paper99' , 'Michael' , 'Scott', 'Scranton', '1964-04-14' , 0 , 'sodhfuih23o489s', 'http://4.bp.blogspot.com/-KjNwN3r4Vjw/UQSJE9C9zKI/AAAAAAAAMzo/LOK2j7e_qrU/s1600/Michael-in-Fun-Run-michael-scott-1533483-1212-682.jpg');

insert INTO Users(login, emailSuffix, password, firstName, lastName, city, birthday, numNotifications, auth, profilePicture) values
('bwayne', 'comcast.com', 'batmobile32' , 'Bruce' , 'Wayne', 'Gotham', '1983-08-12' , 0 , 'bvuebs9lse0', 'http://cdn.wegotthiscovered.com/wp-content/uploads/THE-DARK-KNIGHT.jpeg');

insert INTO Users(login, emailSuffix, password, firstName, lastName, city, birthday, numNotifications, auth, profilePicture) values
('ckent', 'verizon.com', 'kryptonite' , 'Clark' , 'Kent', 'Smallville', '1990-02-24' , 0 , 'uegelwls53n', 'http://www.scifinow.co.uk/wp-content/uploads/2014/07/Batman-V-Superman2.jpg');


INSERT INTO Friends(userA , userB) values
('myoda' , 'jbond');
INSERT INTO Friends(userA , userB) values
('myoda' , 'mscott');
INSERT INTO Friends(userA , userB) values
('myoda' , 'ckent');
INSERT INTO Friends(userA , userB) values
('myoda' , 'bwayne');
INSERT INTO Friends(userA , userB) values
('jbond' , 'myoda');
INSERT INTO Friends(userA , userB) values
('jbond' , 'mscott');
INSERT INTO Friends(userA , userB) values
('mscott' , 'jbond');

INSERT INTO Ratings(userRated , rater , friendliness , timeliness, skillLevel) values
('jbond' , 'myoda' , 4 , 2 , 5);
INSERT INTO Ratings(userRated , rater , friendliness , timeliness, skillLevel) values
('ckent' , 'bwayne' , 2 , 1 , 3);
INSERT INTO Ratings(userRated , rater , friendliness , timeliness, skillLevel) values
('mscott' , 'myoda' , 5 , 4 , 5);
INSERT INTO Ratings(userRated , rater , friendliness , timeliness, skillLevel) values
('myoda' , 'ckent' , 2 , 3 , 4);

INSERT INTO Sport(sport , imageURL) values
('Soccer' , '/assets/img/sports/soccer.png');
INSERT INTO Sport(sport , imageURL) values
('Baseball' , '/assets/img/sports/baseball.png');
INSERT INTO Sport(sport , imageURL) values
('Football' , '/assets/img/sports/football.png');
INSERT INTO Sport(sport , imageURL) values
('Basketball' , '/assets/img/sports/basketball.png');

INSERT INTO FavoriteSports(login , sport) values
('myoda' , 'Soccer');
INSERT INTO FavoriteSports(login , sport) values
('myoda' , 'Baseball');
INSERT INTO FavoriteSports(login , sport) values
('myoda' , 'Football');
INSERT INTO FavoriteSports(login , sport) values
('myoda' , 'Basketball');
INSERT INTO FavoriteSports(login , sport) values
('mscott' , 'Soccer');
INSERT INTO FavoriteSports(login , sport) values
('ckent' , 'Football');

INSERT INTO Game(creator , gameDate , gameStart , gameEnd , sport , location , numParticipants , maxPlayers , minPlayers , reservedSpots , minAge , maxAge, isPublic, isCompetitive) values
('mscott' , '2014-11-20' , '10:00:00' , '11:00:00' , 'Basketball' , 'Orchard Hill courts', 0 , 20 , 8 , 4 , 10 , 30 , true, false);
INSERT INTO Game(creator , gameDate , gameStart , gameEnd , sport , location , numParticipants , maxPlayers , minPlayers , reservedSpots , minAge , maxAge, isPublic, isCompetitive) values
('ckent' , '2014-12-20' , '08:00:00' , '09:00:00' , 'Soccer' , 'umass', 0 , 30 , 10 , 6 , 10 , 30 , true, true);
INSERT INTO Game(creator , gameDate , gameStart , gameEnd , sport , location , numParticipants , maxPlayers , minPlayers , reservedSpots , minAge , maxAge, isPublic, isCompetitive) values
('jbond' , '2014-11-21' , '13:00:00' , '15:00:00' , 'Football' , 'Mcguirk', 0 , 50 , 20 , 15 , 15 , 35 , true, false);

INSERT INTO Participant(login , creator , gameID , status , numUnreadNotifications) values
('bwayne' , 'mscott' , 1 , 0 , 0);
INSERT INTO Participant(login , creator , gameID , status , numUnreadNotifications) values
('mscott' , 'mscott' , 1 , 0 , 0);
INSERT INTO Participant(login , creator , gameID , status , numUnreadNotifications) values
('ckent' , 'mscott' , 1 , 0 , 0);
INSERT INTO Participant(login , creator , gameID , status , numUnreadNotifications) values
('myoda' , 'mscott' , 1 , 0 , 0);

INSERT INTO Notifications(userTo , userFrom , type , creator , gameID) values
('ckent' , 'myoda' , 3 , 'mscott' , 1);
INSERT INTO Notifications(userTo , userFrom , type , creator , gameID) values
('bwayne' , 'jbond' , 1 , 'ckent' , 1);
INSERT INTO Notifications(userTo , userFrom , type) values
('jbond' , 'bwayne' , 0);
INSERT INTO Notifications(userTo , userFrom , type , creator , gameID) values
('myoda' , 'bwayne' , 2 , 'mscott' , 1);
INSERT INTO Notifications(userTo , userFrom , type , creator , gameID) values
('myoda' , 'bwayne' , 1 , 'ckent' , 1);

INSERT INTO GameWallPost(userPosting , gameCreator , gameID , post) values
('ckent' , 'jbond' , 1 , 'This game is going to be awesome!');
INSERT INTO GameWallPost(userPosting , gameCreator , gameID , post) values
('jbond' , 'mscott' , 1 , 'What time is the game?');
INSERT INTO GameWallPost(userPosting , gameCreator , gameID , post) values
('myoda' , 'jbond' , 1 , 'So are we going to play today?');

INSERT INTO Queue(login , sport , minAge , maxAge , location) values
('bwayne' , 'Soccer' , 10 , 20 , 'umass');
INSERT INTO Queue(login , sport , minAge , maxAge , location) values
('bwayne' , 'Basketball' , 10 , 20 , 'Orchard Hill courts');
INSERT INTO Queue(login , sport , minAge , maxAge , location) values
('jbond' , 'Soccer' , 10 , 20 , 'umass');
INSERT INTO Queue(login , sport , minAge , maxAge , location) values
('myoda' , 'Basketball' , 10 , 20 , 'Orchard Hill courts');
INSERT INTO Queue(login , sport , minAge , maxAge , location) values
('ckent' , 'Soccer' , 10 , 20 , 'umass');
INSERT INTO Queue(login , sport , minAge , maxAge , location) values
('mscott' , 'Basketball' , 10 , 20 , 'Orchard Hill courts');
INSERT INTO Queue(login , sport , minAge , maxAge , location) values
('bwayne' , 'Football' , 10 , 20 , 'Mcguirk');
INSERT INTO Queue(login , sport , minAge , maxAge , location) values
('mscott' , 'Football' , 10 , 20 , 'Mcguirk');

INSERT INTO Times(login , dateAvailable , startTime , endTime) values
('mscott' , '2014-09-09' , '10:00:00' , '11:00:00');
INSERT INTO Times(login , dateAvailable , startTime , endTime) values
('bwayne' , '2014-11-15' , '11:00:00' , '12:00:00');
INSERT INTO Times(login , dateAvailable , startTime , endTime) values
('ckent' , '2014-12-20' , '13:00:00' , '15:00:00');
INSERT INTO Times(login , dateAvailable , startTime , endTime) values
('jbond' , '2014-11-03' , '07:00:00' , '09:30:00');