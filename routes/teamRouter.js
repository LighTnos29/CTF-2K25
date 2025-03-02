const express = require('express')
const { login } = require('../controllers/teamControllers')
const router = express.Router()

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://www.thecloudclub.in");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

router.post('/login',login)

module.exports = router