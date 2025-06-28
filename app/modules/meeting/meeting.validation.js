const Joi = require('joi');

const createAndUpdateMeeting = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = {
  createAndUpdateMeeting,
};
