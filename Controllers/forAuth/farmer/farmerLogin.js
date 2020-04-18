const express = require('express')
const router = express()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = 'aasdsadlsakaasnddfgf231f'
const refreshSecret = 'basdsadlsakaasnddfgf231f'
function createAccessToken(username) {
  return jwt.sign({ username }, secret, { expiresIn: '150s' })
}
function createRefreshToken(username) {
  return jwt.sign({ username }, refreshSecret)
}
router.use(bodyParser.json())
router.post('/', async (req, res) => {
        let { username, password } = req.body
        const userId = await User.findAll({
          include: [
            {
                model: Farmer,
                attributes:['userId']
            }
          ],
          where: {
            username
          },
          raw: true
        })
        if(userId.length !== 0){
        const pass = await User.findAll({
          include: [
            {
                model: Farmer,
            }
          ],
          attributes: ['password'],
          where: {
            username,
            id:userId[0].id
          },
          raw: true
        })
           if(pass !== undefined){
           bcrypt.compare(password, pass[0].password)
           .then(resolve => {
             if(resolve){             
            let accessToken = createAccessToken(username)
            let refreshToken = createRefreshToken(username)
            res.status(200).send("access token " + accessToken + " refresh token "+ refreshToken)
           } else {
            res.status(403).send('bad password')
          }
           })
            .catch(err=>{
              res.send(err)
            })
          }
            else{ 
              res.send(err)
             }   
            }
            else{
              res.send('wrong username')
            }
      })
router.use('/', require('../../../Middleware/farmerCheck'))
module.exports = router