const express = require('express')
const router = express.Router()
const userController = require('../controller/usercontroller')
const {verifyAdmin} = require('../middlewares/auth')

router.get('/', userController.home)
// db controller
router.get('/users',verifyAdmin,userController.getUser)
router.post('/users',verifyAdmin,userController.createUser)
router.delete('/users/:id',userController.deleteUser)
router.put('/users/:id',userController.updateUser)
module.exports = router