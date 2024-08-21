const { Router } = require("express");
const commentController = require("../controllers/commentController");
const commentRouter = Router();

commentRouter.post("/:postId", commentController.createComment);
commentRouter.post("/delete/:commentId", commentController.deleteComment);
commentRouter.post("/edit/:commentId", commentController.editComment);

module.exports = commentRouter;
