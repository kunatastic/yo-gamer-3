const Joi = require("joi");

const userSchemaValidator = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z]+$/, { name: "name" })
    .required(),
  password: Joi.string().min(4).max(1024).required(),
  confirmPassword: Joi.ref("password"),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = userSchemaValidator;
