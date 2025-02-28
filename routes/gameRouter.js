const { checkGameStatus } = require('../controllers/gameController')
const express = require('express')
const router = express.Router()

router.get('/',checkGameStatus)


module.exports = router