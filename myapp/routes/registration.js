var express = require('express');
var router = express.Router();
var connection = require('./dbconnect');

/* GET registration page. */
router.get('/', function(req, res, next) {
	res.render('registration', {title: 'User Registration', message: ''});
});

//connection = dbconnect.connection;
/* POST registration page. */
router.post('/', function(req, res, next) {
	password = req.body.password;
	cpassword = req.body.cpassword;
	if (password != cpassword) {
		res.render('registration', {
			title: 'User Registration',
			message: 'Password not matching'
		});
		return null;
	}
	else {
		connection.query('select username from users where username=?', [req.body.username], function(err, rows) {
			if (rows.length > 0) {
				res.render('registration', {
					title: 'User Registration',
					message: 'Username already exists'
				});
				return null;
			}
			else {
				connection.query('insert into users(fullname, username, password) values (?, ?, ?)',[req.body.name, req.body.username, password], function(err, rows) {
					res.redirect('/login');
				});
			}
		});
	}
});

module.exports = router;