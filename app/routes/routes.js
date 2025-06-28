const router = require('express').Router();

const AuthGuard = require('../common/guard/AuthGuard');
const { authRouter } = require('../modules/auth/auth.routes');
const { meetRoutes } = require('../modules/meeting/meeting.routes');

router.use('/auth', authRouter);
router.use('/meeting', AuthGuard, meetRoutes);

module.exports = {
  routes: router,
};
