const Joi = require('joi');

const createAndUpdateMeeting = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
  }),
  start_time: Joi.date().optional().allow(null),
  end_time: Joi.date().optional().allow(null),
});

module.exports = {
  createAndUpdateMeeting,
};
