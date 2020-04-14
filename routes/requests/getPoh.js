const collections = require('../../collections')

module.exports = async (req, res, next) => {
    try {
        const list = await collections.Poh.find().lean()
        res.status(200).send({ list })
    }
    catch(error) {
        res.status(500).send('ERROR WHEN RETRIEVING DATA', error)
    }
}