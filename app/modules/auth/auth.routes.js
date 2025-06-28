const authController = require('./auth.controller');

const router = require('express').Router();

router.post('/sign-message', authController.signMessage);
router.post('/login', authController.login);

module.exports = {
  authRouter: router,
};
