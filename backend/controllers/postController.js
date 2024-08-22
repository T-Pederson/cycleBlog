const passport = require("passport");
const db = require("../prisma/queries");

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
    if (parseInt(req.params.authorId) !== req.user.id) {
      res.status(401).json({ msg: "User not authorized to view these posts" });
    }

    try {
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
      res.status(200).json({ post: post });
    } catch (err) {
      return next(err);
    }
  },
];

const editPost = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const post = await db.getPostById(parseInt(req.params.postId));
    if (post.author.id !== req.user.id) {
      res.status(401).json({ msg: "User not authorized to edit this post" });
    }

    try {
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
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const post = await db.createPost(
        req.user.id,
        req.body.title,
        req.body.content,
        req.body.published,
      );
      res.status(200).json({ post: post });
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
};
