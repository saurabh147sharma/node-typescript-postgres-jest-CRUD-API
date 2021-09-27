import * as httpMocks from "node-mocks-http";
import { userLoginInvalidRequestBody, userLoginRequest } from "./auth.controller.spec.data";
import { expectedUserDetailResponseFromService } from "./auth.controller.spec.data";
import AuthController from "../auth.controller";
import UserService from "../../user/user.service";
import AuthUtil from "../../../utils/auth.util";
import TokenAuthenticator from "../../../middleware/token-authenticator.middleware";

describe("User Login", () => {
  test("Should return 400 if any validation error", async () => {
    for (const body of userLoginInvalidRequestBody) {
      let request = httpMocks.createRequest({
        body,
      });
      let expectedResponseMessage = "Validation Error!";
      let response = httpMocks.createResponse();
      await AuthController.login(request, response);
      expect(response._getStatusCode()).toEqual(400);
      expect(response._getData().message).toEqual(expectedResponseMessage);
    }
  });

  test("Should return Invalid login credentials message and 401 http status code if credentials does not match", async () => {
    let request = httpMocks.createRequest({
      body: userLoginRequest,
    });
    let response = httpMocks.createResponse();
    UserService.getUserDetail = jest.fn().mockResolvedValueOnce(expectedUserDetailResponseFromService);
    jest.spyOn(UserService, "getUserDetail");
    AuthUtil.comparePassword = jest.fn().mockResolvedValueOnce(false);
    jest.spyOn(AuthUtil, "comparePassword");
    await AuthController.login(request, response);
    expect(UserService.getUserDetail).toHaveBeenCalledTimes(1);
    expect(UserService.getUserDetail).toHaveBeenCalledWith({ match: { email: userLoginRequest.email }, attributes: ["password"] });
    expect(AuthUtil.comparePassword).toHaveBeenCalledTimes(1);
    expect(AuthUtil.comparePassword).toHaveBeenCalledWith(userLoginRequest.password, expectedUserDetailResponseFromService.password);
    expect(response._getStatusCode()).toEqual(401);
  });

  test("Should return 200 http status code if credentials are matched", async () => {
    let request = httpMocks.createRequest({
      body: userLoginRequest,
    });
    let response = httpMocks.createResponse();
    UserService.getUserDetail = jest.fn().mockResolvedValueOnce(expectedUserDetailResponseFromService);
    jest.spyOn(UserService, "getUserDetail");
    AuthUtil.comparePassword = jest.fn().mockResolvedValueOnce(true);
    jest.spyOn(AuthUtil, "comparePassword");
    jest.spyOn(TokenAuthenticator, "getAuthToken");
    await AuthController.login(request, response);
    expect(UserService.getUserDetail).toHaveBeenCalledTimes(1);
    expect(UserService.getUserDetail).toHaveBeenCalledWith({ match: { email: userLoginRequest.email }, attributes: ["password"] });
    expect(AuthUtil.comparePassword).toHaveBeenCalledTimes(1);
    expect(AuthUtil.comparePassword).toHaveBeenCalledWith(userLoginRequest.password, expectedUserDetailResponseFromService.password);
    expect(TokenAuthenticator.getAuthToken).toHaveBeenCalledTimes(1);

    expect(TokenAuthenticator.getAuthToken).toHaveBeenCalledWith({
      id: expectedUserDetailResponseFromService.id,
      name: expectedUserDetailResponseFromService.name,
      email: expectedUserDetailResponseFromService.email,
    });
    expect(response._getStatusCode()).toEqual(200);
  });

  test("Should return 500 http status code if any error occured while fetching user details", async () => {
    let request = httpMocks.createRequest({
      body: userLoginRequest,
    });
    let response = httpMocks.createResponse();
    UserService.getUserDetail = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(UserService, "getUserDetail");
    await AuthController.login(request, response);
    expect(UserService.getUserDetail).toHaveBeenCalledTimes(1);
    expect(UserService.getUserDetail).toHaveBeenCalledWith({ match: { email: userLoginRequest.email }, attributes: ["password"] });
    expect(response._getStatusCode()).toEqual(500);
  });

  test("Should return 500 http status code if any error occured while comparing password", async () => {
    let request = httpMocks.createRequest({
      body: userLoginRequest,
    });
    let response = httpMocks.createResponse();
    UserService.getUserDetail = jest.fn().mockResolvedValueOnce(expectedUserDetailResponseFromService);
    jest.spyOn(UserService, "getUserDetail");
    AuthUtil.comparePassword = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(AuthUtil, "comparePassword");
    await AuthController.login(request, response);
    expect(UserService.getUserDetail).toHaveBeenCalledTimes(1);
    expect(UserService.getUserDetail).toHaveBeenCalledWith({ match: { email: userLoginRequest.email }, attributes: ["password"] });
    expect(AuthUtil.comparePassword).toHaveBeenCalledTimes(1);
    expect(AuthUtil.comparePassword).toHaveBeenCalledWith(userLoginRequest.password, expectedUserDetailResponseFromService.password);
    expect(response._getStatusCode()).toEqual(500);
  });
});
