const express = require('express')
const router = express()
router.put('/:id', check, async (req, res) => {
    sequelize.transaction().then(function (t) {
    let { username, name } = req.body
    let id = req.params.id
    Slaughterhouse.update({
        name
    },
        { where: { id } 
    })
    .then(data => {
        User.update({ username },
            {
                where: { id }
            })
            .then(data1 => {
                t.commit()
                res.send('updated')
              })
              .catch(err => {
                t.rollback()
                res.send(err)
              })   

    })
    .catch(err => {
        t.rollback()
        res.send(err)
      })
})
.catch(function (error) {
  res.send(error)
  t.rollback()
});
})
module.exports = router