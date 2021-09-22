import Joi from "joi";
import { startCase } from "lodash";
import { Response } from "express";

export interface ErrorResponse {
  field: string;
  message: string;
}

export default class ValidationService {
  constructor() {}

  public static validateRequest(schema: any, requestPayload: any, response: Response) {}

  public static joiValidator(schema: any, payload: any): { errors?: ErrorResponse[]; value?: object } {
    const joiDefaultOptions = {
      abortEarly: false,
      allowUnknown: true,
    };

    const errors: any = [];
    const validation = schema.validate(payload, joiDefaultOptions);
    if (validation.error) {
      const errorDetails = validation.error.details;
      errorDetails.forEach((error: any) => {
        let message = error.message.replace(/\"/g, "");
        let field = error.path[0];
        errors.push({
          field,
          message: message.replace(field, startCase(field)),
        });
      });
      return { errors };
    }
    return { value: validation.value };
  }
}
