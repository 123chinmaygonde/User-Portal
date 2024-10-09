const jwt = require("jsonwebtoken")
const Admin = require('../models/Admin')

exports.verifyAdmin = async(req,res,next)=>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(403).json({message:'no token'})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.admin = await Admin.findById(decoded.id)
        next();
        
    } catch (error) {
        return res.status(401).json({message:'unauthorized'})
    }
}