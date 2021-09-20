import {Request} from "express";
import fs from "fs";
import path from "path"
import DateUtil from "../../utils/date.util";

interface Log{
    request?: Request;
    error: any;
}

export default class LogService{
    
    constructor(){

    }

    public static error({request, error}: Log) {
        const requestHeaders = JSON.stringify(request?.headers);
        const requestPayload = JSON.stringify(request?.body);
        const requestQueryParams = JSON.stringify(request?.params);
        let log = `\r\n\r\n${DateUtil.getCurrentDateTime()}`;
        if(error && error.message){
            log = `${log} \r\n Error Message: ${error.message}`;
        }
        if(error){
            log = `${log} \r\n Error Stack: ${JSON.stringify(error)}`;
        }
        if(requestHeaders){
            log = `${log} \r\n Request Headers: ${requestHeaders}`;
        }
        if(requestPayload){
            log = `${log} \r\n Request Payload: ${requestPayload}`;
        }
        if(requestQueryParams){
            log = `${log} \r\n Request Query Params: ${requestQueryParams}`;
        }
        
        
        const fileName = this.getLogFileName();
        const filePath = path.join(__dirname, '../../logs') + `/${fileName}`;

        fs.stat(filePath,(e)=>{
            if(e){
                fs.open(filePath, 'w', function(err, fd) {
                    if (err) {
                        console.log('Error in creating new log file', err);
                        throw 'error opening file: ' + err;
                    }
                
                    LogService.writeLog(filePath, log)
                });
            }
            else{
                LogService.writeLog(filePath, log)
            }
        })

        
    }

    private static writeLog(filePath: string, log: string){
        fs.appendFile(filePath, log, err => {
            if (err) {
              console.error(`Error while writting logs in the log file ${filePath}`,err)
              return
            }
            //log written successfully
          });
    }

    private static getLogFileName(){
        return `${DateUtil.getCurrentDate()}.txt`;
    }

}