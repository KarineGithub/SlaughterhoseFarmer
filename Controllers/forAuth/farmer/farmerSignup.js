const express = require('express')
const router = express()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.use(bodyParser.json())

router.post('/', (req,res)=>{
    let {firstName, lastName, username, password} = req.body
    bcrypt.hash(password, 10)
    .then(data => {
        const hashed = data
        sequelize.transaction().then(function(t) {
            User.create({
                username,
                password:hashed
            })
        .then(function() {
        sequelize.query("SELECT TOP 1 id FROM users ORDER BY id DESC")
         .then(data1=> {
            var userId = data1[0][0].id  
              Farmer.create({
                  firstName,
                  lastName,
                  userId
             })
             .then(function() {
                t.commit();
              })
              .catch(function(error) {
                res.send('error ')
                t.rollback();
                });
          })
         .catch(err=>{
             res.send(err)
         })
            }).catch(function(error) {
                res.send(error)
                t.rollback();
            });
        });
        })
    .catch(err => {
        console.log(err)
        res.status(500).send(err.detail)
    })
})

module.exports = router