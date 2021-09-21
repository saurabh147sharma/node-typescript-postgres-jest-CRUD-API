import {Request, Response} from "express"

import { AuthRoutes } from "./modules/auth/auth.routes";
import {UserRoutes} from './modules/user/user.routes';

export class Routes {

    private app: any;
    constructor(app: any){
        this.app = app;
        this.initRoutes();
    }

    private initRoutes(): void{
        this.app.get('/', (req: Request, res: Response) => {
            res.json({"message": "This is API home page"});
        });
        this.app.use('/user', new UserRoutes().init());
        this.app.use('/auth', new AuthRoutes().init());
    }

}