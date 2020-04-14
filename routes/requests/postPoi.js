const collections = require('../../collections')

module.exports = async (req, res, next) => {
    var poi = (req.body.poi || '').toString()

    try {
        await collections.Poi.create({
            poi
        })
        res.status(200).send({ ok: true })
    }
    catch (error) {
        res.status(500).send('ERROR WHEN CREATING DATA', error)
    }
}