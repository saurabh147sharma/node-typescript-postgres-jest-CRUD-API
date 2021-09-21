import { Request, Response } from "express";
import { ICreateUser, IUser } from "./interfaces/i-user";
import UserValidation from "./user.validation";
import ResponseService from "../../common/services/response.service";
import ValidationService from "../../common/services/validation.service";
import * as messages from "./messages.json";
import UserService from "./user.service";

export default class UserController {
  // function to create new user
  public static async create(request: Request, response: Response) {
    try {
      const user: ICreateUser = request.body;
      const validationErrors = ValidationService.joiValidator(
        UserValidation.userRegisterSchema,
        user
      );
      if (validationErrors.errors && validationErrors.errors.length) {
        const errors = validationErrors.errors;
        ResponseService.validationErrorResponse({ response, errors });
      } else {
        await UserService.createUser(user);
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
        user.id = parseInt(request.params.id);
        await UserService.updateUser(user);
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
        const userId = parseInt(request.params.id);
        await UserService.destroyUser(userId);
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
      const users = await UserService.getUsers();
      ResponseService.successResponse({ response, data: users });
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }

  // function to get single user detail by id
  public static async findOne(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);
      const validationErrors = ValidationService.joiValidator(
        UserValidation.userIdSchema,
        { id: userId }
      );
      if (validationErrors.errors && validationErrors.errors.length) {
        const errors = validationErrors.errors;
        ResponseService.validationErrorResponse({ response, errors });
      } else {
        const user = await UserService.getUserDetail(userId);
        ResponseService.successResponse({ response, data: user });
      }
    } catch (error) {
      ResponseService.errorResponse({ request, response, error });
    }
  }
}
