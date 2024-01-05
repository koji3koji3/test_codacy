let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log("ss");
  res.render('index', {
    title: 'Express' ,
    path: '/aa'
  });
});

module.exports = router;