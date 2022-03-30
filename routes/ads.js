const express = require('express')
const router = express.Router()
const { newAdSchema } = require('../validation/adValidation')
const Ad = require('../DB/adModel')
const User = require('../DB/userModel')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/all-ads', async (req,res) => {
    try {
        const adsArr = await Ad.find()
        res.status(200).send(adsArr)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.post('/new-ad', authMiddleware, async (req,res) => {
    try {
        const { title, phone, address, notes, isAvaliable } = await newAdSchema.validateAsync(req.body, { abortEarly: false })
        const { id } = await User.findOne({ userName: req.user.userName })
        const newAd = new Ad({ creator: id, title, phone, address, notes, isAvaliable })
        await newAd.save()
        res.status(200).send("Your ad has been created")
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

module.exports = router