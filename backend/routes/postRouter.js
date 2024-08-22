const { Router } = require("express");
const postController = require("../controllers/postController");
const postRouter = Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:postId", postController.getPostById);
postRouter.get("/authorPosts/:authorId", postController.getAuthorPosts);

module.exports = postRouter;
