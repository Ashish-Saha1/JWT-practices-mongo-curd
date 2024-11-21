var jwt = require('jsonwebtoken');

async function checkLoggedIn (req,res,next){
    try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const decoded  = await jwt.verify(token, process.env.JWT_KEY)
    const { userName, userId } = decoded;
    req.userName = userName
    req.userId = userId
    next()
    } catch (error) {
        console.log(error);
        
        next("JWT Virified Failed")
    }
    
}


module.exports = checkLoggedIn;