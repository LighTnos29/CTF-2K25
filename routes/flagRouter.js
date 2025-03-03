const express = require('express')
<<<<<<< HEAD
const cors = require('cors');
const { allFlags ,submitFlag,getTeamInfo } = require('../controllers/flagController')
=======
const { allFlags ,submitFlag, getTeamInfo } = require('../controllers/flagController')
>>>>>>> 564e96e0bc21bd3b17e971cbc18a103ccc117cf2
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()

const corsOptions = {
  origin: 'https://www.thecloudclub.in', // Allow only this origin
  methods: ['GET'], // Allow only  requests
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};


  const validateOrigin = (req, res, next) => {
    const allowedOrigin = 'https://www.thecloudclub.in';
    const requestOrigin = req.headers.origin;
  
    if (requestOrigin === allowedOrigin) {
      next(); // Allow the request to proceed
    } else {
      res.status(403).json({ message: 'Unauthorized: Access denied' }); // Block the request
    }
  };
  

router.post('/submitflag/:flagId',isLoggedIn ,submitFlag)
<<<<<<< HEAD
router.get('/all',cors(corsOptions), validateOrigin,  isLoggedIn ,allFlags)
=======
router.get('/all', allFlags)
>>>>>>> 564e96e0bc21bd3b17e971cbc18a103ccc117cf2
router.get('/points',isLoggedIn,getTeamInfo)


module.exports = router