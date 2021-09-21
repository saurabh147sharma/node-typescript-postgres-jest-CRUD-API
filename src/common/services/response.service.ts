import { Request, Response } from "express";
import LogService from "./log.service";

 interface ResponseParamsInterface {
    request?: Request; 
    response: Response;
    message?: string;
    data?:  Object | Array<any> | null;
    error? : any;
    errors?: Array<object>;
}

interface ApiResponse {
    message? : string;
    data? : Object | Array<any>;
    errors?: Array<any>
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

        public static validationErrorResponse({response,errors}: ResponseParamsInterface){
            const res: ApiResponse = {};
            res.message = 'Validation Error!';
            res.errors = errors
            response.status(400).send(res);
        }
    
}