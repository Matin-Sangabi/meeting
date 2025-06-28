const authController = require('./auth.controller');

const router = require('express').Router();

router.post('/login', authController.login);

module.exports = {
  authRouter: router,
};
