const bcrypt = require('bcrypt')
const Admin = require('../models/adminmodel')


// create admin
exports.createAdmin = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body
        // const defaultPassword = "Admin@123"
        const hashedPassword = await bcrypt.hash(password, 10)
        const admin = await Admin.create({
            fullName, email, phone, password: hashedPassword
        })
        res.status(201).json({
            message: "Admin Created"
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
// login

exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(201).json({ message: "Admin not found" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(201).json({ message: "Invalid password" });
        }
        res.status(200).json({
            status: "success",
            message: "Login successful"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// reset password
exports.resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(404).json({ message: "Admin not Found" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        admin.password = hashPassword
        admin.isFirstLogin = false
        admin.passwordChangeAt = new Date()
        await admin.save()
        res.json({ message: "Password Updated" })
    }
    catch (error) {
        res.status(404).json({ error: error.message })
    }
}
// soft delete
exports.deleteAdmin = async(req,res) => {
    try{
        const{id} = req.params
        await Admin.findByIdAndUpdate(id,{isDelete : true})
        res.json({message : "User soft deleted"})
    }
    catch(error){
        res.status(500).json({error : error.message})
    }
}
// update admin
exports.updateAdmin = async (req,res) => {
    try{
        const{id} = req.params
        const{fullName,email,phone} = req.body
        console.log("Body",req.body)
        const updateadmin = await Admin.findOneAndUpdate({_id : id},{fullName,email,phone},{new : true})
        if(!updateadmin){
            return res.status(404).json({message : "User not found"})
        }
        res.json(updateadmin)
    }
    catch(error){
        res.status(500).json({error : error.message})
    }
}