const express = require("express");
const imageRouter = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
const {
  createImage,
  getUserProfile,
  getAllUserImages,
} = require("../controllers/imageController");

imageRouter.post(
  "/upload",
  authMiddleware,
  upload.single("avatar"),
  createImage
);
imageRouter.get("/profile", authMiddleware, getUserProfile);
imageRouter.get("/", authMiddleware, getAllUserImages);
module.exports = imageRouter;
