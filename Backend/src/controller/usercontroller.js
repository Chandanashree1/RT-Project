const User = require('../models/usermodel')

exports.home = (req,res) => {
    res.send("Node is working")
}
// get user
exports.getUser = async (req,res) => {
    try{
        const users = await User.find({isDelete:false})
        res.json(users)
    }
    catch(error){
        res.status(500).json({error : error.message})
    }
}
// create user
exports.createUser = async (req,res) => {
    try{
        const {name,email,phone,test,role,date} = req.body
        const user = await User.create({name,email,createdBy : req.adminId,phone,test,role,date})
        res.status(201).json(user)
    }
    catch(error){
        console.log("ERROR:", error.message);
        res.status(500).json({error : error.message})
    }
}
//soft delete
exports.deleteUser = async (req,res) => {
    try{
        const {id} = req.params
        await User.findByIdAndUpdate(id, {isDelete:true})
        res.json({message : "User soft deleted"})
    }
    catch(error){
        res.status(500).json({error : error.message})
    }
}
// Update user
exports.updateUser = async (req,res) => {
    try{
        const {id} =  req.params
        const {name,email,test,date} = req.body 
        console.log("Body",req.body)
        const updateuser = await User.findByIdAndUpdate(id,{name,email,createdBy : req.adminId,test,date},{new : true})
        if(!updateuser){
        return res.status(404).json({message : "User not found"})
        }
        res.json(updateuser)
    }
    catch(error){
        res.status(500).json({error : error.message})
    }
    
}

