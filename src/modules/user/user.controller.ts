import {Request, Response} from "express"
import { IUser } from "./interfaces/i-user";
import { UserModel } from "../../models/user.model";

export default class UserController{



    public static async create(request:Request, response: Response){
        const user: IUser = request.body;
        const result = await UserModel.create(user);
        response.statusCode = 200;
        response.send({user});
    }

    public static update(){

    }

    public static delete(){

    }

    public static async get(request:Request, response: Response) {
        const users = await UserModel.findAll();
        response.statusCode = 200;
        response.send({users});
    }
}