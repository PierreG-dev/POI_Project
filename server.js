var express = require('express')
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')

var createError = require('http-errors')
var path = require('path')
var logger = require('morgan')
var session = require('express-session')

//Instanciation du serveur
var server = express()

//Définition des vues au format 'jade'
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');

//logs du logger au format 'dev'
server.use(logger('dev'))

//Toutes les requêtes entrantes seront au format JSON
server.use(express.json())

server.use(express.urlencoded({extended: false}))

//middleware pour les cookies
server.use(cookieParser())

//Définition du dossier avec les ressources statiques
server.use(express.static(path.join(__dirname, 'public')))

//A chaque requête la session est renouvellée pour 1500 secondes
server.use(session({
    secret: 'nfjerizopgbjroepzgnk',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1500
    }
}))

//Paramètres du serveur
server.use(require('./headersConf'))

//Instanciation de mongoose (BDD)
mongoose.connect('mongodb://localhost/POI');

//========== ROUTES ==========//

var indexRouter = require('./routes/index')
var authRouter = require('./routes/auth')
var poiRouter = require('./routes/poi')
var pohRouter = require('./routes/poh')

//Définition des routes
server.use('/', indexRouter)
server.use('/auth', authRouter)
server.use('/points_of_interest', poiRouter)
server.use('/points_of_host', pohRouter)

//Gestion des requêtes

//POI
server.get('/points_of_interest/get', require('./routes/requests/getPoi'))
server.get('/points_of_interest/post', require('./routes/requests/postPoi'))

//POH
server.get('/points_of_host/get', require('./routes/requests/getPoh'))
server.get('/points_of_host/post', require('./routes/requests/postPoh'))

//--- Erreurs ---//
//Erreur 404 page inexistante
server.use((req, res, next) => {
    next(createError(404))
})

//Erreurs
server.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //Affichage de la page d'erreur
    res.status(err.status || 500);
    res.render('error', {
        error: err
    });
})

module.exports = server