const express = require('express')
const router = express()
router.get('/', check, async (req, res) => {
    let slaughterhouses = await Slaughterhouse.findAll({
        attributes: ['id', 'name'],
        raw: true
    })
    res.send(slaughterhouses)
})
module.exports = router