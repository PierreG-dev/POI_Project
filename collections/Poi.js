const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema (
    {
        nom: String,
        position: String,
        description: String
    }
)

schema.statics.create = packet => {
    let poi = new Poi(packet)
    return poi.save()
    .then(snapshot => {
        return Promise.resolve(snapshot)
    })
    .catch(err => {
        console.error(
            'Poi.create failed when saving ' + packet.username + ' ==> ',
            err
        )
        return Promise.reject(err)
    })
}

var Poi
function make(connection) {
    if (Poi) {
        return Poi
    }
    Poi = connection.model('Poi', schema)
    return Poi
}

module.exports = make