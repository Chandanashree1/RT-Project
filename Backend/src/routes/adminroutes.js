const express = require('express')
const router =  express.Router()
const adminController = require('../controller/admincontroller')

router.post('/admin',adminController.createAdmin)
router.post('/admin/login',adminController.loginAdmin)
router.post('/admin/reset-password',adminController.resetPassword)
module.exports = router