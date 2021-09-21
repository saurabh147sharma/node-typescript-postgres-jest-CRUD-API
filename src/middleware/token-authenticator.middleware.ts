import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import ResponseService from "../common/services/response.service";
import JwtConfig from "../config/jwt.config";
import * as messages from "./messages.json";

export default class TokenAuthenticator {
  public static validateToken(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    //Get the jwt token from the head
    const token = <string>request.headers["token"];
    try {
      const jwtPayload = <any>jwt.verify(token, JwtConfig.jwtSecret);
      response.locals.jwtPayload = jwtPayload;
      let newToken: string = TokenAuthenticator.getAuthToken({id: jwtPayload.id, name: jwtPayload.name, email: jwtPayload.email});
      response.setHeader("token", newToken);
      //Call the next middleware or controller
      next();
    } catch (error) {
        // Bad request
        console.log(error,'error');
        ResponseService.errorResponse({ request, response, httpStatusCode: 400, message: messages.invalid_token });
    }
  }

  public static getAuthToken(user: {
    id: number;
    name: string;
    email: string;
  }): string {
    const token = jwt.sign(user, JwtConfig.jwtSecret, {
      expiresIn: JwtConfig.tokenExpiryTime,
    });
    return token;
  }
}
