const express = require('express')
const router = express()
router.get('/', check, async (req, res) => {
    let farmers = await Farmer.findAll({
        attributes: ['id', 'firstName', 'lastName'],
        raw: true
    })
    res.send(farmers)
})
module.exports = router