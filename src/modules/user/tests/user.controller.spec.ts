import * as httpMocks from "node-mocks-http";
import UserController from "../user.controller";

describe("Create user", () => {
  test("Should create a new user and return 200 status code", async () => {
    let requestBody = {
      name: "Test User2",
      email: "testuser2@gmail.com",
      password: "1234",
    };
    let expectedResponse = {
      message: "User created successfully",
    };
    let request = httpMocks.createRequest({
      body: requestBody,
    });
    let response = httpMocks.createResponse();
    UserController.create = jest.fn().mockResolvedValue(expectedResponse);
    await UserController.create(request, response);
    expect(response._getStatusCode()).toEqual(200);
    expect(JSON.parse(response._getData())).toEqual(expectedResponse);
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
      let response = httpMocks.createResponse();
      await UserController.create(request, response);
      expect(response._getStatusCode()).toEqual(400);
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
    UserController.create = jest.fn().mockRejectedValueOnce(new Error("Something went wrong"));
    await UserController.create(request, response);
    expect(response._getStatusCode()).toEqual(500);
  });
});
