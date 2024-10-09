const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Assignment = require('../models/Assignment')


exports.registerUser = async(req,res)=>{
    const {username,password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({username,password:hashedPassword})
        await user.save()
        res.status(201).json({message:'user registered successfully'})


        
    } catch (error) {
        res.status(400).json({message:'error registering user'})
        
    }
}

exports.loginUser = async(req,res)=>{
    const {username,password} = req.body;
    try {
        const user = await User.findOne({username})
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(401).json({message:'invalid credential'})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.json({token})

        
    } catch (error) {
        res.status(400).json({message:'error logging in'})
        
    }
}

exports.uploadAssignment =async(req,res)=>{
    const {userId,task,admin} = req.body;
    try {
        const assignment = new Assignment({userId,task,admin})
        await assignment.save()
        res.status(201).json({message:'Assignment uploaded successfully'})
    } catch (error) {
        res.status(400).json({message:'error uploading assignment'})
    }
}