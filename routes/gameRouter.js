const { checkGameStatus } = require('../controllers/gameController')
const express = require('express')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()

router.get('/',isLoggedIn,checkGameStatus)


module.exports = router