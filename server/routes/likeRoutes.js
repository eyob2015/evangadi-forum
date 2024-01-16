const express = require("express");
const likeRouter = express.Router();
const { createQuestionLike } = require("../controllers/likeController");
const authMiddleware = require("../middleware/authMiddleware");
likeRouter.post(
  "/questions/:questionid/like",
  authMiddleware,
  createQuestionLike
);

module.exports = likeRouter;
