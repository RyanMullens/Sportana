CREATE DATABASE Sportana;
\c sportana;
INSERT INTO USERS(login, emailSuffix, password, firstName, lastName, city, birthday, numNotifications, auth, profilePicture) values
("myoda", "gmail.com", "password" , "Master" , "Yoda", "Dagobah", "1972-10-01" , 5 , "ahsdkl34a", "http://static.comicvine.com/uploads/scale_medium/0/2532/156856-39717-yoda.jpg");

insert INTO USERS(login, emailSuffix, password, firstName, lastName, city, birthday, numNotifications, auth, profilePicture) values
("jbond", "yahoo.com", "iam007" , "James" , "Bond", "London", "1964-09-23" , 2 , "luinkel9la", "http://cbsnews1.cbsistatic.com/hub/i/r/2012/10/13/09d9d6e1-a645-11e2-a3f0-029118418759/thumbnail/620x350/2edfb0193dd29f2393297d20949a5109/JamesBondWide.jpg");

insert INTO USERS(login, emailSuffix, password, firstName, lastName, city, birthday, numNotifications, auth, profilePicture) values
("mscott", "gmail.com", "paper99" , "Michael" , "Scott", "Scranton", "1964-04-14" , 8 , "luinkel9la", "http://4.bp.blogspot.com/-KjNwN3r4Vjw/UQSJE9C9zKI/AAAAAAAAMzo/LOK2j7e_qrU/s1600/Michael-in-Fun-Run-michael-scott-1533483-1212-682.jpg");

insert INTO USERS(login, emailSuffix, password, firstName, lastName, city, birthday, numNotifications, auth, profilePicture) values
("bwayne", "comcast.com", "batmobile32" , "Bruce" , "Wayne", "Gotham", "1983-08-12" , 12 , "bvuebs9lse0", "http://cdn.wegotthiscovered.com/wp-content/uploads/THE-DARK-KNIGHT.jpeg");

insert INTO USERS(login, emailSuffix, password, firstName, lastName, city, birthday, numNotifications, auth, profilePicture) values
("ckent", "verizon.com", "kryptonite" , "Clark" , "Kent", "Smallville", "1990-02-24" , 6 , "uegelwls53n", "http://www.scifinow.co.uk/wp-content/uploads/2014/07/Batman-V-Superman2.jpg");


INSERT INTO Friends(userA , userB) values
("myoda" , "jbond");
INSERT INTO Friends(userA , userB) values
("jbond" , "myoda");
INSERT INTO Friends(userA , userB) values
("jbond" , "mscott");
INSERT INTO Friends(userA , userB) values
("mscott" , "jbond");

INSERT INTO Ratings(userRated , rater , friendliness , timeliness, skillLevel) values
("jbond" , "myoda" , 4 , 2 , 5);
INSERT INTO Ratings(userRated , rater , friendliness , timeliness, skillLevel) values
("ckent" , "bwayne" , 2 , 1 , 3);
INSERT INTO Ratings(userRated , rater , friendliness , timeliness, skillLevel) values
("mscott" , "myoda" , 5 , 4 , 5);
INSERT INTO Ratings(userRated , rater , friendliness , timeliness, skillLevel) values
("myoda" , "ckent" , 2 , 3 , 4);

INSERT INTO Sport(sport , imageURL) values
("soccer" , "http://stuffyoudontwant.com/wp-content/uploads/2011/10/soccer-ball.jpg");
INSERT INTO Sport(sport , imageURL) values
("basketball" , "http://kindersay.com/files/images/basketball.png");
INSERT INTO Sport(sport , imageURL) values
("football" , "http://nelsonrural.nbed.nb.ca/sites/nelsonrural.nbed.nb.ca/files/football1.png");
INSERT INTO Sport(sport , imageURL) values
("billiards" , "http://www.glennsfireplaceandspa.com/components/com_fpslideshow/images/billiards_slide.jpg");

INSERT INTO FavoriteSports(login , sport) values
("myoda" , "basketball");
INSERT INTO FavoriteSports(login , sport) values
("mscott" , "soccer");
INSERT INTO FavoriteSports(login , sport) values
("ckent" , "billiards");