import { Router } from 'express';
import AuthController from "./auth.controller";

export class UserRoutes{
    constructor(){

    }

    public init(){
        const router = Router();

        router.post('/', AuthController.login);

        return router;
    }
}