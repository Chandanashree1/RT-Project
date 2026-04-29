const express = require('express')
const router = express.Router()
const userController = require('../controller/usercontroller')


router.get('/', userController.home)
// db controller
router.get('/users',userController.getUser)
router.post('/users',userController.createUser)
router.delete('/users/:id',userController.deleteUser)
router.put('/users/:id',userController.updateUser)
module.exports = router