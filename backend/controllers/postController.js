const passport = require("passport");
const db = require("../prisma/queries");
const { body, validationResult } = require("express-validator");

async function getAllPosts(req, res, next) {
  try {
    const userPosts = await db.getAllPosts();
    res.status(200).json({ posts: userPosts });
  } catch (err) {
    return next(err);
  }
}

async function getPostById(req, res, next) {
  try {
    const post = await db.getPostById(parseInt(req.params.postId));
    res.status(200).json({ post: post });
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

module.exports = {
  getAllPosts,
  getPostById,
  getAuthorPosts,
};
