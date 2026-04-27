const bcrypt = require('bcrypt')
const Admin = require('../models/adminmodel')
const jwt = require('jsonwebtoken')
const {ACCESS_SECRET, REFRESH_SECRET} = require('../config/jwt')
// create admin
exports.createAdmin = async (req,res) => {
    try{
        console.log('createAdmin')
        const {fullName,email,phone, password} = req.body
        // const defaultPassword = "Admin@123"
        const hashedPassword = await bcrypt.hash(password,10)
        const admin = await Admin.create({
            fullName,email,phone,password : hashedPassword
        })
        res.status(201).json({
            message : "Admin Created"
        })
    }
    catch(error){
        console.log('createAdmin', error.message)
        res.status(500).json({error: error.message})
    }
}
// login
exports.loginAdmin = async (req,res) => {
    try{
        const {email,password} = req.body
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(500).json({message : "Admin not Found"})
        }
        const isMatch = await bcrypt.compare(password,admin.password)
        if(!isMatch){
            return res.status(400).json({message : "Invalid Password"})
        }
        if(admin.isFirstLogin){
            return res.json({
                message : "First login - reset password",resetRequired : true
            })
        }
        const accesstoken = jwt.sign(
            {id : admin._id},ACCESS_SECRET,
            {expiresIn : "15m"}
        )
        const refreshtokens = jwt.sign(
            {id : admin._id},REFRESH_SECRET,
            {expiresIn : "7d"}
        ) 
        admin.refreshToken = refreshtokens
        admin.lastLogin = new Date()
        await admin.save()
        res.json({message : "Login Successfully",accesstoken,refreshtokens})
    }
    catch(error){
        res.status(404).json({error : error.message})
    }
}
// refresh -> new access token
exports.refreshtoken = async (req,res) => {
    try{
        const {refreshToken} = req.body
        if(!refreshToken){
            return res.status(401).json({message : "No refresh Token"})
        }
        const decode = jwt.verify(refreshToken,REFRESH_SECRET)
        const admin = await Admin.findById(decode.id)
        if(!admin || admin.refreshToken !== refreshToken){
            return res.status(401).json({message : "Invalid refresh Token"})
        }
        const newAccessToken = jwt.sign(
            {id : admin._id},ACCESS_SECRET,
            {expiresIn : "15m"}
        )
        res.json({accesstoken : newAccessToken})
    }
    catch(error){
        res.status(401).json({message : "Invalid or expired refresh token"})
    }
}
// logout -> revoke refresh token
exports.logoutAdmin = async (req,res) => {
    try{
        const {refreshToken} = req.body
        const admin = await Admin.findOne({refreshToken})
        if(admin){
            admin.refreshToken = null
            await admin.save()
        }
        res.json({meaasge : "Loged Out"})
    }
    catch(error){
        res.status(401).json({error : error.message})
    }
}
// reset password
exports.resetPassword = async (req,res) => {
    try{
        const {email,password} = req.body
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(404).json({message : "Admin not Found"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        admin.password = hashPassword
        admin.isFirstLogin = false
        admin.passwordChangeAt = new Date()
        await admin.save()
        res.json({message : "Password Updated"})
    }
    catch(error){
        res.status(404).json({error : error.message})
    }
}