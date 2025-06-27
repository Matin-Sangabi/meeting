const { default: autoBind } = require('auto-bind')
const { ethers } = require('ethers')
const { createJwt } = require('../../common/jwt/jwt')
const { userModel } = require('../../models/user.model')
const { USER_INFO } = require('../../common/constants/enum')

class AuthService {
    #model
    constructor() {
        autoBind(this)
        this.#model = userModel
    }

    async SignMessage(signDto) {
        const { signature, message } = signDto

        const recoverAddress = ethers.verifyMessage(message, signature)
        const user = await this.findUserByWalletAddress(recoverAddress)
        if (!user) {
            await this.#model.create({
                walletAddress: recoverAddress,
            })
        }
        return user
    }

    async login(loginDto) {
        const { email, password } = loginDto
        if (email === USER_INFO.email && password === USER_INFO.password) {
            const access_token = createJwt(
                {
                    id: USER_INFO.id,
                    email: USER_INFO.email,
                },
                '1d'
            )
            const refresh_token = createJwt(
                {
                    id: USER_INFO.id,
                    email: USER_INFO.email,
                },
                '7d'
            )
            return {
                access_token,
                refresh_token,
            }
        }
        throw createError.Unauthorized('Invalid email or password')
    }

    async findUserByEmail(email) {
        const user = await this.#model.findOne({ email })
        return user
    }

    async findUserByWalletAddress(walletAddress) {
        const user = await this.#model.findOne({ walletAddress })

        return user
    }
}

module.exports = new AuthService()
