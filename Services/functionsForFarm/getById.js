const express = require('express')
const router = express()
router.get('/:id', check, async (req, res) => {
    let farmers = await Farmer.findAll({
        attributes: ['id', 'firstName', 'ladtName'],
        raw: true,
        where:{
          userId:req.params.id
        }
    })
    res.send(farmers)
})
module.exports = router