Authentication:
=========

Authentication is the binding of an identity to a subject.

An authentication layer (like passport) is a layer that sits between the received requests and the API trying to be accessed.  It provides the service of identifying the user making the request and turning the identification into a user that the API layer can then use.

Back End View:
------------

Using passport.js makes this process fairly simple for us.  To implement this all we need to do is:
1) Configure authentication strategies (i.e. make our login function to include the passport middleware)

2) Implement the functions for assigning an identity to a user and then getting that identity from the user:
```js
passport.serializeUser(function(user, done) {
  done(null, user.id); // Here we should generate and assign an id to the user
});
```

```js
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) { // This would be a call to the database to
    done(err, user);			 // get the user associated with the given id
  });
}); 
```

On logging in we need to write a cookie with the users authentication out to the response for the front end to use in subsequent calls:
```js
	res.cookie(“SportanaAuth”, auth);
```

Example login function:
```js
app.get('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) { // run this function
		if (err) { return next(err); }			   // when authentication successful
		if (!user) { return res.redirect('/login'); }
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			res.cookie(“SportanaAuth”, user.id); // this gets its value from serializeUser 
			return res.redirect('/users/' + user.username);
		});
	})(req, res, next);
}); 
```

In subsequent calls we will get this cookie back and can reassign the user entity to the particular id referenced.

```js
/* GET Home Page */
router.get('/home', isAuthenticated, function(req, res){
  res.render('home', { user: req.user }); // This comes from deSerializeUser
});

// As with any middleware it is quintessential to call next()
// if the user is authenticated
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
```


Front End View:
--------------
The front end will basically just get an authentication token from the front end on logging in, store that authentication token in a cookie in the browser, and then will send it back with other requests to the API so that the server can assert the identity of the user sending that particular authentication.

To send a login request for authentication:
```html
<form action="/login" method="post">
	<div>
		<label>Email:</label> <input type="text" name="username"/>
	</div>
	<div>
		<label>Password:</label> <input type="password" name="password"/>
	</div>
	<div>
		<input type="submit" value="Log In"/>
	</div>
</form>
```

In the response we will set a cookie with a field called “SportanaAuth” which will contain the users token and we will automatically redirect the user to the home page.

In future requests, simply include this cookie in the request header and the backend will be able to associate it with a particular user: (you can do this with ajax or whatever you're using for making requests by just putting a cookie in the header)

```js
var cookie = 'SportanaAuth=' + authenticationToken;

var url = url.parse('www.somewebsite.com/someResource/subdirectory');
var authCookie = 'SportanaAuth=' + authenticationToken;

var header = {
    host: url.hostname,
    path: url.path,
    port: url.port || 80,
    method: 'GET',
    cookie : authCookie
  };
http.request(header, handlerFunction() { /* Handle response */ });
```