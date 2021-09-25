import * as httpMocks from "node-mocks-http";
import UserController from "../user.controller";
import UserService from "../user.service";

describe("Create user", () => {
  test("Should create a new user and return 200 status code", async () => {
    let requestBody = {
      name: "Test User2",
      email: "testuser2@gmail.com",
      password: "1234",
    };
    let expectedResponse = 2
    let request = httpMocks.createRequest({
      body: requestBody,
    });
    let response = httpMocks.createResponse();
    UserService.createUser = jest.fn().mockResolvedValue(expectedResponse);
    jest.spyOn(UserService,"createUser");
    await UserController.create(request, response);
    expect(UserService.createUser).toHaveBeenCalledTimes(1);
    expect(UserService.createUser).toHaveBeenCalledWith(requestBody);
    expect(response._getStatusCode()).toEqual(200);
    expect(response._getData()).toEqual({
      "message": "User created successfully"
    });
  });

  test("Should return 400 if any validation error", async () => {
    let requestBody = [
      {
        name: "Test User2",
        email: "testuser2@gmail.com",
      },
      {
        name: "Test User2",
        password: "1234",
      },
      {
        email: "testuser2@gmail.com",
        password: "1234",
      },
    ];
    for (const body of requestBody) {
      let request = httpMocks.createRequest({
        body,
      });
      let expectedResponseMessage = "Validation Error!";
      let response = httpMocks.createResponse();
      await UserController.create(request, response);
      expect(response._getStatusCode()).toEqual(400);
      expect(response._getData().message).toEqual(expectedResponseMessage);
    }
  });

  test("Should return 500 if any error occured while creating a new user", async () => {
    let requestBody = {
      name: "Test User2",
      email: "testuser2@gmail.com",
      password: "1234",
    };
    let request = httpMocks.createRequest({
      body: requestBody,
    });
    let response = httpMocks.createResponse();
    UserService.createUser = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    jest.spyOn(UserService,"createUser");
    await UserController.create(request, response);
    expect(UserService.createUser).toHaveBeenCalledTimes(1);
    expect(UserService.createUser).toHaveBeenCalledWith(requestBody)
    
    expect(response._getStatusCode()).toEqual(500);
  });
});
