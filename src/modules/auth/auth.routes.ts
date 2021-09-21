import { Router } from 'express';
import AuthController from "./auth.controller";

export class AuthRoutes{
    constructor(){

    }

    public init(){
        const router = Router();

        router.post('/login', AuthController.login);

        return router;
    }
}