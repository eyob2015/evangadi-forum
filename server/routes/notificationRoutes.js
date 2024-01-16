const express = require("express");
const notificationRouter = express.Router();

const {
  getNotifications,
  createNotification,
  deleteNotification,
} = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

notificationRouter.get("/", authMiddleware, getNotifications);
notificationRouter.post("/", authMiddleware, createNotification);
notificationRouter.delete(
  "/:notificationid",
  authMiddleware,
  deleteNotification
);

module.exports = notificationRouter;
