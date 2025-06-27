const { default: autoBind } = require('auto-bind')
const authService = require('./auth.service')
const { signMessageValidation, loginValidation } = require('./auth.validation')

class AuthController {
    #service

    constructor() {
        autoBind(this)
        this.#service = authService
    }

    async signMessage(req, res, next) {
        try {
            const { signature, message } =
                await signMessageValidation.validateAsync(req.body)
            const user = await this.#service.SignMessage({
                signature,
                message,
            })
            res.status(200).json({ user })
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = await loginValidation.validateAsync(
                req.body
            )
            const user = await this.#service.login({ email, password })
            res.status(200).json({ user })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()
