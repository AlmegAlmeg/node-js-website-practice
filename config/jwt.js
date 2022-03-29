const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = data =>{
    return new Promise((res,rej)=>{
        jwt.sign(data, process.env.JWT_SECRET_KEY, (err, token)=>{
            if (err) rej(err)
            else res(token)
        })
    })
}

const verifyToken = token =>{
    return new Promise((res,rej)=>{
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decoded)=>{
            if (err) rej(err)
            else res(decoded)
        })
    })
}

module.exports = {
    createToken,
    verifyToken
}