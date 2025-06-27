const router = require('express').Router()

const { authRouter } = require('../modules/auth/auth.routes')

router.use('/auth', authRouter)

module.exports = {
    routes: router,
}