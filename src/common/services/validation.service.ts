import Joi from "joi";
import { startCase } from "lodash";

export default class ValidationService{

    constructor() {}

    public static joiValidator(schema: any, payload: any): {errors?: any[], value?: object}{
        const joiDefaultOptions = {
            abortEarly: false,
            allowUnknown: true
        };
        
        const errors: any = [];
        const validation = schema.validate(payload,joiDefaultOptions);
        if(validation.error){
            const errorDetails = validation.error.details;
            errorDetails.forEach((error: any)=>{
                let message = error.message.replace(/\"/g, '');
                let field = error.path[0];
                errors.push({
                    field,
                    message: message.replace(field, startCase(field))
                });
            });
            return {errors};
        }
        return {value: validation.value};
    }
}