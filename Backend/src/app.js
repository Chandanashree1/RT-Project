const express = require('express')
const app = express()


const userRoutes = require('./routes/userroutes')
const adminRoutes = require('./routes/adminroutes')
const oauthRoutes = require('./routes/oauthroutes')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api', userRoutes)

// admin
app.use('/api', adminRoutes)
// oauth
app.use('/oauth',oauthRoutes)

module.exports =  app