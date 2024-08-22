const { Router } = require("express");
const postController = require("../controllers/postController");
const postRouter = Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get("/authorPosts/:authorId", postController.getAuthorPosts);
postRouter.get("/:postId", postController.getPostById);
postRouter.get("/:postId/author", postController.getAuthorPostById);
postRouter.post("/edit/:postId", postController.editPost);

module.exports = postRouter;
