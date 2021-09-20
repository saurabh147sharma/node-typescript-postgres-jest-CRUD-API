import { Router } from 'express';
import UserController from "./user.controller";

export class UserRoutes{
    constructor(){

    }

    public init(){
        const router = Router();

        router.get('/', UserController.findAll);
        router.get('/:id', UserController.findOne);
        router.post('/', UserController.create);
        router.put('/:id', UserController.update);
        router.delete('/:id', UserController.delete);

        return router;
    }
}