const express = require('express')
const { allFlags ,submitFlag, getTeamInfo } = require('../controllers/flagController')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()

router.post('/submitflag/:flagId',isLoggedIn ,submitFlag)
router.get('/all', allFlags)
router.get('/points',isLoggedIn,getTeamInfo)


module.exports = router