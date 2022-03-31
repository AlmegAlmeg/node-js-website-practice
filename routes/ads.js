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
        const { title, phone, address, notes, isAvailable } = await newAdSchema.validateAsync(req.body, { abortEarly: false })
        const { id } = await User.findOne({ userName: req.user.userName })
        const newAd = new Ad({ 
            creator: id, 
            title, 
            phone, 
            address, 
            notes, 
            isAvailable 
        })
        await newAd.save()
        res.status(200).send("Your ad has been created")
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.get('/:id', async (req,res) => {
    try {
        const { id } = req.params
        const currentAd = await Ad.findById(id)
        res.status(200).send(currentAd)
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.put('/:id', authMiddleware, async (req,res) => {
    try {
        const { id } = req.params
        const updatedBody = await newAdSchema.validateAsync(req.body, { abortEarly: false })
        const currentAd = await Ad.findById(id)
        const currentUser = await User.findOne({ userName: req.user.userName })
        if(currentUser.id != currentAd.creator && currentUser.adminLevel < 2)
            throw 'Only the original creator or admin can edit this ad'
        await Ad.findByIdAndUpdate(id, updatedBody)
        res.status(200).send('Ad has been updated')
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

router.delete('/:id', authMiddleware, async (req,res)=>{
    try {
        const { id } = req.params
        const currentAd = await Ad.findById(id)
        const currentUser = await User.findOne({ userName: req.user.userName })
        if(currentUser.id != currentAd.creator && currentUser.adminLevel < 2)
            throw 'Only the original creator or admin can delete this ad'
        await Ad.findByIdAndDelete(id)
        res.status(200).send('Ad has been deleted')
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

module.exports = router