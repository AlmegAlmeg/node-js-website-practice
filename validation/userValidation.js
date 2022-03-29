const Joi = require('joi')

const registerSchema = Joi.object({
    userName: Joi.string().min(3).max(16).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(16).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(16).required()
})

module.exports = {
    registerSchema,
    loginSchema
}