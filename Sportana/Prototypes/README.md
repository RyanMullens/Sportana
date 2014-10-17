Overview
--------

This is a general prototype that combines node,express,psql, angular, and bootstrap. 


Setup
-----

To set this up on your machine, you must first set up the database. Copy what is in the setup.sql file and paste it into the psql shell. From there, start up the server by calling "node app.js". Next, go to http://localhost:8888 to view it.

What does it do?
----------------

As of right now, you enter an email and password, click submit, and then the user will be added to the table. When you click submit, the form will call POST on /users with the new data, and the user will be added to the table "Users" in the db. To populate the table, a GET call is issued on /users.