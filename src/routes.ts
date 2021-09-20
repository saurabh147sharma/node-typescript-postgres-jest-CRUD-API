import {Request, Response} from "express"

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
    }

}