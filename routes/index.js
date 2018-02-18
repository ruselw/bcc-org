var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //res.render('index.html');
    res.sendFile("E:\\Projects\\BCC\\bcc-org\\dist\\index.html");
});

module.exports = router;