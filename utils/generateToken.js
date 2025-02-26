var jwt = require('jsonwebtoken');

const generateToken = (teamCode)=>{
    return jwt.sign(teamCode, process.env.JWT_KEY);
}

module.exports = generateToken