const { Router } = require("express");
const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/login/author", userController.loginAuthor);
userRouter.post("/sign-up", userController.signUp);
userRouter.post("/sign-up/author", userController.signUpAuthor);
userRouter.post("/convertUserToAuthor", userController.convertUserToAuthor);

module.exports = userRouter;
