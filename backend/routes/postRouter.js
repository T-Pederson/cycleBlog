const { Router } = require("express");
const postController = require("../controllers/postController");
const postRouter = Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:postId", postController.getPostById);

module.exports = postRouter;
