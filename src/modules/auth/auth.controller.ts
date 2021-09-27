import { Request, Response } from "express";

import { ILogin } from "../../interfaces/login/i-login";
import ResponseService from "../../common/services/response.service";
import AuthUtil from "../../utils/auth.util";
import ValidationService from "../../common/services/validation.service";
import * as messages from "./messages.json";
import AuthValidation from "./auth.validation";
import TokenAuthenticator from "../../middleware/token-authenticator.middleware";
import UserService from "../user/user.service";

export default class AuthController {
  // function to login user
  public static async login(request: Request, response: Response) {
    try {
      const loginRequest: ILogin = request.body;
      const validationErrors = ValidationService.joiValidator(AuthValidation.userLoginSchema, loginRequest);
      if (validationErrors.errors && validationErrors.errors.length) {
        const errors = validationErrors.errors;
        ResponseService.validationErrorResponse({ response, errors });
      } else {
        const user = await UserService.getUserDetail({ match: { email: loginRequest.email }, attributes: ["password"] });
        if (user && await AuthUtil.comparePassword(loginRequest.password, user.password)) {
          const token = TokenAuthenticator.getAuthToken({
            id: user.id,
            name: user.name,
            email: user.email,
          });
          ResponseService.successResponse({
            response,
            data: { id: user.id, name: user.name, email: user.email, token },
          });
        } else {
          // Bad request
          ResponseService.errorResponse({
            request,
            response,
            httpStatusCode: 401,
            message: messages.invalid_login,
          });
        }
      }
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }
}
