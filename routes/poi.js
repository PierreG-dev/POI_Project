var express = require('express')
var router = express.Router()

//GET
router.get('/', (req, res, next) => {
    res.send({
        poh: ['List of POH']
    })
})

module.exports = router