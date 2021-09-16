import { Router } from 'express';
import UserController from "./user.controller";

export class UserRoutes{
    constructor(){

    }

    public init(){
        const router = Router();

        router.get('/', UserController.get);
        router.post('/', UserController.create);
        router.put('/', UserController.update);
        router.delete('/', UserController.delete);

        return router;
    }
}