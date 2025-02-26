const express = require('express')
const { login } = require('../controllers/teamControllers')
const router = express.Router()

router.post('/login',login)

module.exports = router