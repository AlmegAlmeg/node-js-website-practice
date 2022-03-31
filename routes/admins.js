const express = require('express')
const router = express.Router()
const User = require('../DB/userModel')
const { adminLevelSchame } = require('../validation/adminValidation')
const authMiddleware = require('../middleware/authMiddleware')

router.put('/:id', authMiddleware, async (req,res)=>{
    try {
        const { adminLevel } = req.user
        const { id } = req.params
        if(adminLevel !== 3) throw 'Only owners can change admin ranks'

        const userToChange = await User.findById(id)
        if(userToChange.adminLevel === 3 ) throw "You cannot change owner's rank"
        
        const { newLevel } = await adminLevelSchame.validateAsync(req.body)
        await User.findByIdAndUpdate(id, { adminLevel: newLevel })
        res.status(200).send('Admin level has changed!')
    } catch (err) {
        res.status(400).json({ message: err })
    }
})

module.exports = router