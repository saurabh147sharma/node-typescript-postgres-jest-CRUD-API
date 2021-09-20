import { Request, Response } from "express";
import LogService from "./log.service";

 interface ResponseParamsInterface {
    request?: Request; 
    response: Response;
    message?: string;
    data?:  Object | Array<any>;
    error? : any;
}

interface ApiResponse {
    message? : string;
    data? : Object | Array<any>;
}

export default class ResponseService {
    constructor(){
    }
    
        public static successResponse({response, message, data}: ResponseParamsInterface) {
            const res: ApiResponse = {};
            if(message) res.message = message;
            if(data) res.data = data;
            response.status(200).send(res);
        }

        public static errorResponse({request,response,error, message}: ResponseParamsInterface){
            LogService.error({request,error});
            const res: ApiResponse = {};
            res.message = message ? message : 'Something went wrong, Please contact to Administrator!';
            response.status(500).send(res);
        }
    
}