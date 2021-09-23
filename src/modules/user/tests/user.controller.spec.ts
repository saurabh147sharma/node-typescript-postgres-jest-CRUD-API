import { Request, Response } from "express";
import UserController from "../user.controller";

describe("Create users", () => {

  // Should return validation error if any with the status code 400/bad request
  // if no error in creating new user it should return success response with status code 200
  // if there is any error it should return the error message with status code 500

});

describe("Get users list", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let response = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      statusCode: 0,
      send: jest.fn().mockImplementation((result) => {
        response = result;
      }),
    };
  });

  test("Users list", () => {
    const expectedStatusCode = 200;
    const expectedResponse = {
      users: [
        {
          name: "Saurabh",
          age: 30,
        },
        {
          name: "Gaurav",
          age: 25,
        },
      ],
    };

    UserController.findAll(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
    expect(response).toEqual(expectedResponse);
  });
});
