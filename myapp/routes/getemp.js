var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('employee', { title: 'employee', id: req.query['id'] });
});

module.exports = router;