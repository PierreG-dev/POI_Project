const mongoose = require('mongoose')
const Schema = mongoose.Schema

var schema = new Schema(
    {
        nom: String,
        position: String,
        description: String
    }
)

schema.statics.create = packet => {
    let poh = new Poh(packet)
    return poh.save()
        .then(snapshot => {
            return Promise.resolve(snapshot)
        })
        .catch(err => {
            console.error(
                'Poh.create failed when saving ' + packet.username + ' ==> ',
                err
            )
            return Promise.reject(err)
        })
}

var Poh
function make(connection) {
    if (Poh) {
        return Poh
    }
    Poh = connection.model('Poh', schema)
    return Poh
}

module.exports = make