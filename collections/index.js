const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db_url = process.env.DB_URL || 'mongodb://localhost/POI'

var connection
function tryConnect() {
    connection = mongoose.createConnection(db_url, err => {
        if (err) {
            console.error('MongoDB connection error: ', err)
        }
        else {
            console.log('MongoDB connexion success')
        }
    })
}

tryConnect()

const Poi = require('./Poi')(connection)
const Poh = require('./Poh')(connection)

const collections = {
    Poi,
    Poh
}

module.exports = collections