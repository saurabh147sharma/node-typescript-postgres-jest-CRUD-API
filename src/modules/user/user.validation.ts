import Joi from "joi";

export default class UserValidation {

 public static registerUserValidation = 
    Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(2).required()
    }).options({allowUnknown: false});
 

}