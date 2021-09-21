import Joi from "joi";

export default class UserValidation {
  public static userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
  }).options({ allowUnknown: false });

  public static userUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
  }).options({ allowUnknown: false });

  public static userIdSchema = Joi.object({
    id: Joi.string().required(),
  }).options({ allowUnknown: false });
}
