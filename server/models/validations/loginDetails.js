const Joi = require("joi");

const userLoginSchemaValidator = Joi.object({
  password: Joi.string().min(4).max(1024).required(),
  email: Joi.string().email().required(),
});

module.exports = userLoginSchemaValidator;
