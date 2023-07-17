import Joi from "joi";

export function validateUser(user) {
  const schemaOfUser = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    allowExtraEmails: Joi.boolean(),
    rememberMe: Joi.boolean(),
  });

  return schemaOfUser.validate(user);
}
