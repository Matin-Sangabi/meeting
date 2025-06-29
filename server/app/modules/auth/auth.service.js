const { default: autoBind } = require('auto-bind');
const createError = require('http-errors');
const { ethers } = require('ethers');
const { createJwt } = require('../../common/jwt/jwt');
const { userModel } = require('../../models/user.model');
const { USER_INFO, SIGN_MESSAGE_TEXT } = require('../../common/constants/enum');
const createHttpError = require('http-errors');
const { verifyPassword } = require('../../common/guard/bcryptPassword');

class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }

  async login(loginDto) {
    const { email, password, signature } = loginDto;
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw createHttpError[400]('User Not Exists !');
    }
    const verifyPasswordConfirm = await verifyPassword(
      password,
      user?.password
    );
    if (user?.email === USER_INFO?.email && verifyPasswordConfirm) {
      const walletAddress = ethers.verifyMessage(SIGN_MESSAGE_TEXT, signature);
      await this.#model.findOneAndUpdate(
        { email },
        { walletAddress, signature }
      );
      const access_token = createJwt({ id: user._id }, '1d');
      const refresh_token = createJwt({ id: user._id }, '7d');
      return { access_token, refresh_token };
    }
    throw createError.Unauthorized('Invalid email or password');
  }

  async findUserByEmail(email) {
    const user = await this.#model.findOne({ email });
    return user;
  }

  async findUserByWalletAddress(walletAddress) {
    const user = await this.#model.findOne({ walletAddress });

    return user;
  }
  async getUserInfo(userId) {
    const user = await this.#model.findById(userId, {
      password: 0,
      signature: 0,
    });
    return user;
  }
}

module.exports = new AuthService();
