const express = require('express')
const router = express()
router.delete('/:id', check, (req, res) => {
    sequelize.transaction().then(function (t) {
      Farmer.destroy({
        where: {
          userId: req.params.id
        }
      })
        .then(data => {
          User.destroy({
            where: {
              id: req.params.id
            }
          })
            .then(data => {
              t.commit()
              res.send('deleted')
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