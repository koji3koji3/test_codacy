let express = require('express');
let router = express.Router();
let config = require('config');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(config.db_path);

/* GET users listing. */
router.get('/', function(req, res, next) {


});

module.exports = router;
