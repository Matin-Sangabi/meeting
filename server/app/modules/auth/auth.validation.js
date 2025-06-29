const Joi = require('joi');

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
  signature: Joi.string().required().messages({
    'string.empty': 'Signature is required',
  }),
});

module.exports = {
  loginValidation,
};
