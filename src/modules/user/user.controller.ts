import { Request, Response } from "express";
import { IUser } from "./interfaces/i-user";
import { UserModel } from "../../models/user.model";
import UserValidation from "./user.validation";
import ResponseService from "../../common/services/response.service";
import AuthUtil from "../../utils/auth.util";
import ValidationService from "../../common/services/validation.service";
import * as messages from "./messages.json";

export default class UserController {
  // function to create new user
  public static async create(request: Request, response: Response) {
    try {
      const user: IUser = request.body;
      const validationErrors = ValidationService.joiValidator(
        UserValidation.userRegisterSchema,
        user
      );
      if (validationErrors.errors && validationErrors.errors.length) {
        const errors = validationErrors.errors;
        ResponseService.validationErrorResponse({ response, errors });
      } else {
        user.password = await AuthUtil.getHashedPassword(user.password);
        await UserModel.create(user);
        ResponseService.successResponse({
          response,
          message: messages.user_created,
        });
      }
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }

  // function to update the existing user by user id
  public static async update(request: Request, response: Response) {
    try {
      const user: IUser = request.body;
      const validationErrors = ValidationService.joiValidator(
        UserValidation.userUpdateSchema,
        user
      );
      if (validationErrors.errors && validationErrors.errors.length) {
        const errors = validationErrors.errors;
        ResponseService.validationErrorResponse({ response, errors });
      } else {
        await UserModel.update(user, {
          where: {
            id: request.params.id,
          },
        });
        ResponseService.successResponse({
          response,
          message: messages.user_updated,
        });
      }
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }

  // function to delete the user by user id
  public static async delete(request: Request, response: Response) {
    try {
      const validationErrors = ValidationService.joiValidator(
        UserValidation.userIdSchema,
        { id: request.params.id }
      );
      if (validationErrors.errors && validationErrors.errors.length) {
        const errors = validationErrors.errors;
        ResponseService.validationErrorResponse({ response, errors });
      } else {
        await UserModel.destroy({
          where: {
            id: request.params.id,
          },
        });
        ResponseService.successResponse({
          response,
          message: messages.user_deleted,
        });
      }
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }

  // function to get all the users from users table
  public static async findAll(request: Request, response: Response) {
    try {
      const users = await UserModel.findAll({
        attributes: ["id", "name", "email"],
      });
      ResponseService.successResponse({ response, data: users });
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }

  // function to get single user detail by id
  public static async findOne(request: Request, response: Response) {
    try {
      const userId = request.params.id;  
      const validationErrors = ValidationService.joiValidator(
        UserValidation.userIdSchema,
        { id: userId }
      );
      if (validationErrors.errors && validationErrors.errors.length) {
        const errors = validationErrors.errors;
        ResponseService.validationErrorResponse({ response, errors });
      } else {
        const user = await UserModel.findOne({
          attributes: ["id", "name", "email"],
          where: {
            id: userId,
          },
        });
        ResponseService.successResponse({ response, data: user });
      }
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }
}
