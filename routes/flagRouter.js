const express = require('express')
const { allFlags ,submitFlag } = require('../controllers/flagController')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()

router.post('/submitflag/:flagId',isLoggedIn ,submitFlag)
router.get('/all', allFlags)


module.exports = router