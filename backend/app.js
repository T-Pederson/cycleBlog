const express = require("express");
const cors = require("cors");
const passport = require("passport");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

require("dotenv").config();
require("./passport")(passport);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", userRouter);
app.use("/posts", postRouter);
app.use("/comment", commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`cycleBlog listening on port ${PORT}!`));
