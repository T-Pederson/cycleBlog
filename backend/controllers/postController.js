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

module.exports = {
  getAllPosts,
};
