var express = require('express')
var router = express.Router()

//GET
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Bonjour' })
})

module.exports = router