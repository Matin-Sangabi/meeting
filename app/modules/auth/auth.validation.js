const Joi = require('joi')

const signMessageValidation = Joi.object({
    signature: Joi.string().required(),
    message: Joi.string().required(),
})

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

module.exports = {
    signMessageValidation,
    loginValidation,
}
