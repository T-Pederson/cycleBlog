const jwt = require("jsonwebtoken");
const db = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const validateUser = [
  body("username")
    .trim()
    .matches(/^[A-Za-z0-9-_]+$/)
    .withMessage('Username must only contain alphanumeric or "-_" characters')
    .isLength({ min: 1, max: 20 })
    .withMessage("Username must be between 1 and 20 characters long")
    .custom(async (value) => {
      const user = await db.findUserByUsername(value);
      if (user) {
        throw new Error("Username taken");
      }
    }),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password and Confirm Password must match"),
];

async function login(req, res, next) {
  try {
    const user = await db.findUserByUsername(req.body.username);
    if (!user) {
      return res.status(401).json({ msg: "Invalid username" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({ msg: "Invalid password " });
    }

    const expiresIn = "7d";

    const payload = {
      sub: user.id,
      iat: Date.now(),
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: expiresIn,
    });

    res.status(200).json({ token: token, expiresIn: expiresIn });
  } catch (err) {
    next(err);
  }
}

const signUp = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const user = await db.createUser(req.body.username, hashedPassword);
        res.status(200).json({ userId: user.id, username: user.username });
      });
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  login,
  signUp,
};
