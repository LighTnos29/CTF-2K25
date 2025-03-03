const { checkGameStatus } = require('../controllers/gameController')
const express = require('express')
const router = express.Router()

<<<<<<< HEAD
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://www.thecloudclub.in");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

=======
>>>>>>> 564e96e0bc21bd3b17e971cbc18a103ccc117cf2
router.get('/',checkGameStatus)


module.exports = router