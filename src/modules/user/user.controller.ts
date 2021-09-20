import {Request, Response} from "express";
import { IUser } from "./interfaces/i-user";
import { UserModel } from "../../models/user.model";
import ResponseService from "../../common/services/response.service";
import * as messages from "./messages.json";

export default class UserController{


    // function to create new user
    public static async create(request:Request, response: Response){
        try{
        const user: IUser = request.body;
        await UserModel.create(user);
        ResponseService.successResponse({response, message: messages.user_created});
        }
        catch(error){
            ResponseService.errorResponse({request,response,error});
        }
    }

    // function to update the existing user by user id
    public static async update(request:Request, response: Response){
        try{
        const user: IUser = request.body;
        await UserModel.update(user, {
            where: {
                id: request.params.id
            }
          });
          ResponseService.successResponse({response, message: messages.user_updated});
        }
        catch(error){
            ResponseService.errorResponse({request,response,error});
        }
    }

    // function to delete the user by user id
    public static async delete(request:Request, response: Response){
        try{
        await UserModel.destroy({
            where: {
              id: request.params.id
            }
          });
          ResponseService.successResponse({response, message: messages.user_deleted});
        }
        catch(error){
            ResponseService.errorResponse({request,response,error});
        }
    }

    // function to get all the users from users table
    public static async findAll(request:Request, response: Response) {
        try{
        const users = await UserModel.findAll({attributes: ['name', 'email']});
        ResponseService.successResponse({response,data: users});
        }
        catch(error){
            ResponseService.errorResponse({request,response,error});
        }
    }

    // function to get single user detail by id
    public static async findOne(request:Request, response: Response){
        try{
        const user = UserModel.findOne({
            attributes: ['name', 'email'],
            where: {
              id: request.params.id
            }
          });
          ResponseService.successResponse({response,data: user});
        }
        catch(error){
            ResponseService.errorResponse({request,response,error});
        }
    }
}