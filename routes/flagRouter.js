const express = require('express')
const { allFlags ,submitFlag } = require('../controllers/flagController')
const router = express.Router()

router.post('/submitflag/:flagId' ,submitFlag)
router.get('/all', allFlags)


module.exports = router