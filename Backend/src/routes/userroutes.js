const express = require('express')
const router = express.Router()
const userController = require('../controller/usercontroller')

const authenticate = require('../middlewares/auth')


router.get('/', userController.home)
// db controller
router.get('/users',authenticate,userController.getUser)
router.post('/users',authenticate,userController.createUser)
router.delete('/users/:id',authenticate,userController.deleteUser)
router.put('/users/:id',authenticate,userController.updateUser)
module.exports = router