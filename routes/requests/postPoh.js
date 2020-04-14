const collections = require('../../collections')

module.exports = async (req, res, next) => {
    var poh = (req.body.poh || '').toString()

    try {
        await collections.Poh.create({
            poh
        })
        res.status(200).send({ ok: true })
    }
    catch(error) {
        res.status(500).send('ERROR WHEN CREATING DATA', error)
    }
}