const express = require('express')
const router = express.Router()
const { registerSchema, loginSchema } = require('../validation/userValidation')
const { createHash, compareHash } = require('../config/bcrypt')
const { createToken } = require('../config/jwt')
const User = require('../DB/userModel')

router.post('/register', async (req,res) => {
    try {
        let { userName, email, password } = await registerSchema.validateAsync(req.body, { abortEarly: false })
        password = await createHash(password)

        const isUserExists = await User.find({ userName: userName })
        if(isUserExists.length !== 0) 
            throw `Username ${userName} is already registered, please login.`

        const isEmailExists = await User.find({ email: email })
        if(isEmailExists.length !== 0) 
            throw `${email} is already in our system, please login.`

        const user = new User({userName, email, password})
        await user.save()
        res.status(200).send('Request sent successfully')
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.post('/login', async (req,res) => {
    try {
        const { email, password } = await loginSchema.validateAsync(req.body, { abortEarly: false })

        const checkEmail = await User.find({ email: email })
        if(checkEmail.length === 0)throw 'Wrong email or username'
        
        const isPassOk = await compareHash(password, checkEmail[0].password)
        if(!isPassOk) throw 'Wrong password'

        const token = await createToken({
            userName: checkEmail[0].userName,
            adminLevel: checkEmail[0].adminLevel
        })
        res.status(200).send(token)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

module.exports = router