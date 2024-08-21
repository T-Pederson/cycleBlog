const { Router } = require("express");
const commentController = require("../controllers/commentController");
const commentRouter = Router();

commentRouter.post("/:postId", commentController.createComment);

module.exports = commentRouter;
