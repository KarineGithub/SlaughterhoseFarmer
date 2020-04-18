const express = require('express')
const router = express()
router.get('/:id', check, async (req, res) => {
    let slaughterhouses = await Slaughterhouse.findAll({
        attributes: ['id', 'name'],
        raw: true,
        where:{
          userId:req.params.id
        }
    })
    res.send(slaughterhouses)
})
module.exports = router