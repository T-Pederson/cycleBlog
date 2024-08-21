const db = require("../prisma/queries");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const validateComment = [
  body("comment")
    .isLength({ min: 1 })
    .withMessage("Comment must be at least 1 character long."),
];

const createComment = [
  validateComment,
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const comment = await db.createComment(
        parseInt(req.params.postId),
        req.user.id,
        req.body.comment
      );
      res.status(200).json({ comment: comment });
    } catch (err) {
      return next(err);
    }
  },
];

const deleteComment = [
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const comment = await db.getComment(parseInt(req.params.commentId));
      if (comment.authorId !== req.user.id) {
        res
          .status(401)
          .json({ msg: "User not authorized to delete this comment" });
      }

      const deletedComment = await db.deleteComment(
        parseInt(req.params.commentId)
      );
      res.status(200).json({ comment: deletedComment });
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  createComment,
  deleteComment,
};
