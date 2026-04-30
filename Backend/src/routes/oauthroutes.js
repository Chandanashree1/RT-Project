const express = require('express')
const router = express.Router()
const OAuth2Server = require('oauth2-server')

const oauth = require('../config/oauth')
const Request = OAuth2Server.Request
const Response = OAuth2Server.Response

// Token api
router.post('/token',async(req,res) => {
    const request = new Request(req)
    const response = new Response(res)
    try{
        const token = await oauth.token(request,response)
        res.json(token)
    }
    catch(err){
        res.status(err.code || 500).json({error : err.message})
    }
    console.log("body" , req.body)
})
router.get('/secure',async (req,res) =>{
    const request = new Request(req)
    const response = new Response(res)
    try{
        const data = await oauth.authenticate(request,response)
        res.json({message : "Protected data accessed",
            user :  data.user
        })
    }
    catch(err){
        res.status(err.code || 500).json({error:err.message})
    }
}
)
module.exports = router