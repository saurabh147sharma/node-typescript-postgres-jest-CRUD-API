import Joi from "joi";

export default class AuthValidation {
  public static userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
  }).options({ allowUnknown: false });
}
