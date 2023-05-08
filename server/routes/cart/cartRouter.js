var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('HelloWorld from cartRouter!')
})

module.exports = router