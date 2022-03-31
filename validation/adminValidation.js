const Joi = require('joi')

const adminLevelSchame = Joi.object({
    newLevel: Joi.number().min(0).max(3).required()
})

module.exports = {
    adminLevelSchame
}