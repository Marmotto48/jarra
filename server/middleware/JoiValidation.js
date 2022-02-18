const joi = require("joi");

const registerValidation = (data) => {
  const UserRegister = joi
    .object({
      email: joi.string().required().email(),
      password: joi
        .string()
        .min(8)
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]+$")),
    })
    .options({ allowUnknown: true }); // allow other info;
  return UserRegister.validate(data);
};

const loginValidation = (data) => {
  //User Register Schema
  const CustomerLogin = joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(8)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]+$")),
  });

  return CustomerLogin.validate(data);
};

exports.registerValidation = registerValidation;
exports.loginValidation = loginValidation;
