const bcrypt = require('bcrypt')
const Admin = require('../models/adminmodel')
const Client = require('../models/clientmodel')
const Token = require('../models/tokenmodel')

module.exports = {
    // client from db
    getClient: async (clientId, clientSecret) => {

        console.log("Postman :", clientId, clientSecret);

        const client = await Client.findOne({
            clientId: clientId.trim(),
            clientSecret: clientSecret.trim()
        });

        console.log("DB :", client);

        if (!client) return null;

        return {
            id: client.clientId,
            grants: client.grants
        };
    },
    // User login
    getUser: async (username, password) => {
        const admin = await Admin.findOne({ email: username })
        if (!admin) return null
        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) return null
        return admin
    },
    // save token(access+refresh)
    saveToken: async (token, client, user) => {
        const newToken = await Token.create({
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            client: { id: client.id ,grants: client.grants},
            user: {
                id: user._id,
                email: user.email
            }
        })
        return {
            accessToken: newToken.accessToken,
            accessTokenExpiresAt: newToken.accessTokenExpiresAt,
            refreshToken: newToken.refreshToken,
            refreshTokenExpiresAt: newToken.refreshTokenExpiresAt,
            client: client,
            user: newToken.user
        }
    },
    // get access token
    getAccessToken: async (accessToken) => {
        const token = await Token.findOne({ accessToken })
        if (!token) return null
        return {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: {
                id: token.client.id,
                grants: token.client.grants
            },

            user: {
                id: token.user.id,
                email: token.user.email
            }
        }
    },
    // refersh token flow
    getRefreshToken: async (refreshToken) => {

        const token = await Token.findOne({ refreshToken });

        if (!token) return null;

        return {
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            client: token.client,
            user: token.user
        };
    },
    // delete old token
    revokeToken: async (token) => {
        await Token.deleteOne({ refreshToken: token.refreshToken });
        return true;
    },
}