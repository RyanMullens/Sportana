var express = require('express');
var router = express.Router();

var pg = require('pg');
var connString = "postgres://student:student@localhost:5432/sportana";

var dbc = require('./lib/db/DatabaseController.js'); // Database Controller

var authenticator = require('./authentication'); // Authentication Handler

var formidable = require('formidable');

//For password-reset
var Mailgun = require('mailgun-js');


/* GET retrieves a user profile */
router.get('/:login', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			var login = req.params.login;
			dbc.getUserProfile(username, login, function(err, data){
				//res.send(JSON.stringify(data));
				res.write(JSON.stringify(data));
				res.end();
			});
		}
	});
});

/* PUT creates a new user */
router.put('/', function(req, res) {
	var email = req.body.email.split("@");
	var login = email[0];
	var emailSuffix = email[1];
	var userObject = {
			login: login, emailSuffix: emailSuffix, password: req.body.password,
			firstname: req.body.firstname, lastname: req.body.lastname,
			dateOfBirth: req.body.dateOfBirth, city: req.body.city,
			};
	console.log("\n" + "Attempting to create user... " + JSON.stringify(userObject) + "\n");
	dbc.createUser(userObject, function(err, data){
		res.send(JSON.stringify(data));
	});
});

/* POST edits city */
router.post('/editCity', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			var city = req.body.city;
			dbc.editCity(username, city, function(err, data){
				res.send(JSON.stringify(data));
			});
		}
	});
});

/* POST edits favorite sports, one at a time */
router.post('/addFavoriteSport', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			var sport = req.body.sport;
			dbc.addFavoriteSport(username, sport, function(err, data){
				res.send(JSON.stringify(data));
			});
		}
	});
});

/* DELETE deletes a favorite sport, one at a time */
router.delete('/deleteFavoriteSport/:sportName', function(req, res) {
	var sportName = req.params.sportName;
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else {
			dbc.deleteFavoriteSport(username, sportName, function(err, data){
				res.send(JSON.stringify(data));
			});
		}
	});
});

/* POST edits profile picture */
// TO-DO
router.post('/photoUpload', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) 
	{
		var form = new formidable.IncomingForm();

		form.keepExtensions = true;
		form.uploadDir = "app/assets/img/users";

	    form.parse(req, function(err, fields, files) 
	    {
	    	//console.log(files);
	    	
	    	if(files.file != undefined && files.file.path != undefined)
	    	{
	    		var urlPart = files.file.path.split("/");
	    		var fileName = urlPart[urlPart.length-1];
	    		//console.log(fileName);

	    		var dbFinalPath = "/assets/img/users/" + fileName;

	    		//TODO update db entry
	    		//TODO pass back correct img?

	    		dbc.editPicture(username, dbFinalPath, function(err, data){
					
					if(data.success)
					{
			    		var obj = {};
			    		obj.error = undefined;
			    		obj.img = dbFinalPath;
			    		obj.success = true;

			    		res.send(obj);
			    	}else{
			    		var obj = {};
			    		obj.error = "Database failure...";
			    		obj.img = undefined;
			    		obj.success = false;
			    		res.send(obj);
			    	}
	    		});
	    	}else{
	    		var obj = {};
	    		obj.error = "Improper uploading...";
	    		obj.img = undefined;
	    		obj.success = false;
	    		res.send(obj);
	    	}
	    	
	    });
	});
});

/* POST rates users */
// Must rate all 3 fields though.
router.post('/ratings', function(req, res) {
	var auth = req.get('SportanaAuthentication');
	authenticator.deserializeUser(auth, function(err, username) {
		var response = {};
		if (err || (!username)) {
			response.message = "Error with authentication";
			response.success = false;
          res.write(JSON.stringify(response));
          res.end();
		} else { 
			var userRated = req.body.userRated;
			var friendliness = req.body.friendliness;
			var timeliness = req.body.timeliness;
			var skilllevel = req.body.skilllevel;
			var userObject = {
				userRated: userRated, rater: username, 
				friendliness: friendliness, timeliness: timeliness, skilllevel: skilllevel
				};
			dbc.rate(userObject, function(err, data){
				var json = JSON.stringify(data);
				res.write(json);
				res.end();
			});
		}
	});
});

router.put('/password-reset', function (req, res) {
	var email = req.body.email.split("@");
	var login = email[0];
	var emailSuffix = email[1];

		//Your api key, from Mailgun’s Control Panel
	var api_key = 'key-82764a94438e77d6e3647f63555d8f51';

	//Your domain, from the Mailgun Control Panel
	var domain = 'sportana.ryanmullens.me';

	//Your sending email address
	var from_who = 'Kiwi@sportana.ryanmullens.me';

	//Who we're sending to
	var to_who = req.body.email;



	 //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    var data = {
    //Specify email data
      from: from_who,
    //The email to contact
      to: to_who,
    //Subject and text data  
      subject: 'Reset Sportana Password',
      html: 'Hey there... Sorry about you Alzheimer\'s. <a href="https://google.com">Click here</a> to reset your password.'
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) 
    {
    		res.send("Done!");
    		console.log(err);
    		console.log(body);
    });
});


router.post('/account/password', function (req, res) 
{
	res.send("not finished yet");
});

router.post('/account/status', function (req, res) {
	res.send("not finished yet");
});

module.exports = router;
