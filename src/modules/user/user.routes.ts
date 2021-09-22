import { Router } from "express";
import TokenAuthenticator from "../../middleware/token-authenticator.middleware";
import UserController from "./user.controller";

export class UserRoutes {
  constructor() {}

  public init() {
    const router = Router();

    router.get("/", [TokenAuthenticator.validateToken], UserController.findAll);
    router.get("/:id", [TokenAuthenticator.validateToken], UserController.findOne);
    router.post("/", [TokenAuthenticator.validateToken], UserController.create);
    router.put("/:id", [TokenAuthenticator.validateToken], UserController.update);
    router.delete("/:id", [TokenAuthenticator.validateToken], UserController.delete);

    return router;
  }
}
