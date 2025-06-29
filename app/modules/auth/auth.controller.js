const { default: autoBind } = require('auto-bind');
const authService = require('./auth.service');
const { loginValidation } = require('./auth.validation');

class AuthController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async login(req, res, next) {
    try {
      const { email, password, signature } =
        await loginValidation.validateAsync(req.body);
      const user = await this.#service.login({ email, password, signature });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUserInfo(req, res, next) {
    try {
      const { _id: userId } = req.user;
      const user = await this.#service.getUserInfo(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
