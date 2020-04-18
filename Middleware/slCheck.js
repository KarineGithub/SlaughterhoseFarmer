const express = require('express')
const router = express()
const jwt = require('jsonwebtoken')

global.check = function checkToken(req, res, next) {
const authHeader = req.headers['auth']
const token = authHeader && authHeader.split(' ')[1]
if (token === null) {
  res.status(402).send("Token is null. Please, send a token")
}
jwt.verify(token, secret, (err, user) => {
  if (err) {
    console.log(err)
    res.status(404).send("Wrong token")
  }
  else {
    req.user = user
    next()
  }
})
}
router.post('/token', (req, res) => {
const refreshToken = req.body.token
if (!refreshToken) {
  res.status(404).send('Please, send refresh token')
}
jwt.verify(refreshToken, refreshSecret, (err, user) => {
  if (err) {
    res.send('wrong refresh token')
  } else {
    let accessToken = createAccessToken(user)
    res.send(accessToken)
  }
})
})
router.use('/getAll', require('../Services/functionsForSl/getAll'))
router.use('/delete', require('../Services/functionsForSl/delete'))
router.use('/update', require('../Services/functionsForSl/update'))
router.use('/get', require('../Services/functionsForSl/getById'))

module.exports = router