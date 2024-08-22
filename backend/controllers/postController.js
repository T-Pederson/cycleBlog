const passport = require("passport");
const db = require("../prisma/queries");
const { body, validationResult } = require("express-validator");

const validateTitle = [
  body("title")
    .isLength({ min: 1 })
    .withMessage("Title must be at least 1 character long."),
];

async function getAllPosts(req, res, next) {
  try {
    const userPosts = await db.getAllPosts();
    res.status(200).json({ posts: userPosts });
  } catch (err) {
    return next(err);
  }
}

const getAuthorPosts = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      if (parseInt(req.params.authorId) !== req.user.id) {
        res
          .status(401)
          .json({ msg: "User not authorized to view these posts" });
      }

      const posts = await db.getAuthorPosts(req.user.id);
      res.status(200).json({ posts: posts });
    } catch (err) {
      return next(err);
    }
  },
];

async function getPostById(req, res, next) {
  try {
    const post = await db.getPostById(parseInt(req.params.postId));
    res.status(200).json({ post: post });
  } catch (err) {
    return next(err);
  }
}

const getAuthorPostById = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const post = await db.getPostById(parseInt(req.params.postId));
      if (post.author.id !== req.user.id) {
        return res
          .status(401)
          .json({ msg: "User is not authorized to view this post" });
      }
      res.status(200).json({ post: post });
    } catch (err) {
      return next(err);
    }
  },
];

const editPost = [
  validateTitle,
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: "Title must be at least 1 character long." });
    }

    try {
      const post = await db.getPostById(parseInt(req.params.postId));
      if (post.author.id !== req.user.id) {
        res.status(401).json({ msg: "User not authorized to edit this post" });
      }

      const updatedPost = await db.updatePost(
        post.id,
        req.body.title,
        req.body.content,
        req.body.published
      );
      res.status(200).json({ post: updatedPost });
    } catch (err) {
      return next(err);
    }
  },
];

const createPost = [
  validateTitle,
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: "Title must be at least 1 character long." });
    }

    try {
      const post = await db.createPost(
        req.user.id,
        req.body.title,
        req.body.content,
        req.body.published,
        req.body.published ? new Date() : null
      );
      res.status(200).json({ post: post });
    } catch (err) {
      return next(err);
    }
  },
];

const deletePost = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const post = await db.getPostById(parseInt(req.params.postId));
      if (post.author.id !== req.user.id) {
        res
          .status(401)
          .json({ msg: "User not authorized to delete this post" });
      }

      const deletedPost = await db.deletePost(post.id);
      res.status(200).json({ deletedPost: deletedPost });
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  getAllPosts,
  getPostById,
  getAuthorPosts,
  getAuthorPostById,
  editPost,
  createPost,
  deletePost,
};
