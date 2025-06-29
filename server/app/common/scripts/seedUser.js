const createHttpError = require('http-errors');

const { userModel } = require('../../models/user.model');
const { USER_INFO } = require('../constants/enum');
const { hashPassword } = require('../guard/bcryptPassword');

async function ensureDefaultUser() {
  try {
    const existUser = await userModel.findOne({ email: USER_INFO.email });
    if (!existUser) {
      const password = await hashPassword(USER_INFO.password);
      await userModel.create({
        email: USER_INFO.email,
        password,
      });
      console.log('Default User Created');
    } else {
      console.log('Default User Already Exists !');
    }
  } catch (error) {
    throw createHttpError[500]('User Not Created', error);
  }
}

module.exports = {
  ensureDefaultUser,
};
