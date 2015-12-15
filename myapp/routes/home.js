var express = require('express');
var router = express.Router();

//var dbconnect = require('./dbconnect');

//connection = dbconnect.connection;
var connection = require('./dbconnect');

/* POST home page. */
router.post('/', function(req, res, next) {
	username = req.body.username;
	connection.query('select password, fullname from users where username=?',[username], function(err, rows) {
		//console.log('username : ', rows[0].username);
		if (rows.length > 0) {
			pwd = rows[0].password;
			if (req.body.password == pwd) {
				res.render('home', {
					title: 'Home Page',
					name: rows[0].fullname
				});
			}
			else {
				res.render('login', {
					title: 'login'
				});
			}
		}
		else {
			res.render('login', {
				title: 'login'
			});
		}
	});
});

router.get('/sd', function(req, res, next) {
	res.render('home', {
		title: 'Home Page',
		name: 'sd'
	});
});

module.exports = router;
