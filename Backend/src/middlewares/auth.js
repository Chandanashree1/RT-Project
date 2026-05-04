const OAuth2Server = require('oauth2-server')
const oauth = require('../config/oauth')

const Request = OAuth2Server.Request
const Response = OAuth2Server.Response

const aunthenticate = async (req,res,next) => {
    const request = new Request(req)
    const response = new Response(res)
    try{
        const data = await oauth.authenticate(request,response)
        req.adminId = data.user.id
        next()
    }
    catch(err){
        return res.status(401).json({error : "Unauthorized"})
    }
}
module.exports = aunthenticate