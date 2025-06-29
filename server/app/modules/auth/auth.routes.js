const AuthGuard = require('../../common/guard/AuthGuard');
const authController = require('./auth.controller');

const router = require('express').Router();

router.post('/login', authController.login);
router.get('/user-info', AuthGuard, authController.getUserInfo);

module.exports = {
  authRouter: router,
};
