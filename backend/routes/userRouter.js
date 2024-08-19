const { Router } = require("express");
const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/sign-up", userController.signUp);

module.exports = userRouter;
