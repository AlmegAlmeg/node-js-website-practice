const Joi = require('joi')

const newAdSchema = Joi.object({
    title: Joi.string().min(3).required(),
    phone: Joi.string().min(8).max(11).required(),
    address: Joi.string().required(),
    notes: Joi.array(),
    isAvaliable: Joi.boolean()
})

module.exports = {
    newAdSchema
}