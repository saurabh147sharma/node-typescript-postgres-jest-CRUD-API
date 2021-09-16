import express from "express";
import http from "http";
import cors from "cors";

import dbConnection from './config/db/pg-connector';
import {Routes} from './routes';

class App {
    private app: any;
    private httpServer: any;
    private port = 30002;

    constructor() {

    }

    public async initApplication(): Promise<void>{
        this.connectToDatabase();
        this.startServer();
        this.configureExpress();
        this.configureRoutes();
    }

    private configureExpress() {
        const corsOptions = {
            origin: `http://localhost:${this.port}`
          };
          
        this.app.use(cors(corsOptions));
        this.app.use(express.urlencoded({ extended:true }));
        this.app.use(express.json({ limit: '1mb' })); // 100kb default
    }

    private startServer(): void{
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.httpServer.listen(this.port, () => {
            console.log(`Node server is runnning on port ${this.port}`)
        }).on('error', (err: Object) => console.error(err));
    }

    private connectToDatabase(): void{
        dbConnection.authenticate()
        .then(()=>{
            console.log('Database connected successfully...');
        })
        .catch((err)=>{
            console.log('There was an error while connecting to the database...');
            console.log('db error', err);
        })
    }

    private configureRoutes(): void {
        new Routes(this.app);
        console.log('Routes configured');
    }

}

export default App;