import {UserRoutes} from './modules/user/user.routes';

export class Routes {

    private app: any;
    constructor(app: any){
        this.app = app;
        this.initRoutes();
    }

    private initRoutes(): void{
        this.app.use('/user', new UserRoutes().init());
    }

}