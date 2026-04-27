const express = require('express')
const app = express()


const userRoutes = require('./routes/userroutes')
const adminRoutes = require('./routes/adminroutes')

app.use(express.json())
app.use('/api', userRoutes)

// admin
app.use('/api', adminRoutes)

module.exports =  app