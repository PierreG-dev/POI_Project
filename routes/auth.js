var express = require('express')
var router = express.Router()

//GET pour l'affichage de la page
router.get('/', (req, res, next) => {
    res.render('auth', {
        isConnected: req.session.isConnected
    })
})

//POST pour la connection
router.post('/', (req, res, next) => {
    let password = (req.body.password || '').toString()

    req.session.isConnected = password === 'godgod82100'
    res.render('auth', {
        isConnected: req.session.isConnected
    })
})

module.exports = router