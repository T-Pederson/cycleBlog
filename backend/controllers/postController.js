const passport = require("passport");
const db = require("../prisma/queries");
const { body, validationResult } = require("express-validator");

const getAllPostsForUser = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const userPosts = await db.getAllPostsForUser(req.user.id);
      res.status(200).json({ posts: userPosts });
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  getAllPostsForUser,
};
