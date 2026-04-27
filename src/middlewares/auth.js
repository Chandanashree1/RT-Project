const jwt = require('jsonwebtoken')
const {ACCESS_SECRET} = require('../config/jwt')

exports.verifyAdmin = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({meassage : "No Token"})
    }
    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token,ACCESS_SECRET)
        req.adminId = decoded.id
        next()
    }
    catch(error){
        res.status(401).json({message : "Invalid Token"})
    }
} 