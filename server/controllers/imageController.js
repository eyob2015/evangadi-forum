const dbconnection = require("../db/dbconfig");
const path = require("path");
const createImage = async (req, res) => {
  try {
    const file = req.file;
    if (file) {
      const filename = file.filename;
      //check if the user already has an image
      const [imageData] = await dbconnection.query(
        "SELECT * FROM user_images WHERE user_id = ?",
        [req.body.userId]
      );
      if (imageData.length > 0) {
        //update the image
        const result = await dbconnection.query(
          "UPDATE user_images SET filename = ? WHERE user_id = ?",
          [filename, req.body.userId]
        );
        return res.status(201).json({ msg: "Image updated" });
      }
      //create a new image
      const result = await dbconnection.query(
        "INSERT INTO user_images (user_id, filename) VALUES (?, ?)",
        [req.body.userId, filename]
      );

      res.status(201).json({ msg: "Image created" });
    } else {
      res.status(400).json({ msg: "No image provided" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userid;
    console.log(userId);
    const [userData] = await dbconnection.query(
      "SELECT filename FROM user_images WHERE user_id = ?",
      [userId]
    );
    console.log(userData[0].filename);
    if (!userData[0].filename) {
      return res.status(404).end();
    }

    const imagePath = path.join(
      __dirname,
      "..",
      "images",
      userData[0].filename
    );

    // Send the image file as a response
    res.sendFile(imagePath);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get alluser images and userids so that we can display them on the profile page
const getAllUserImages = async (req, res) => {
  try {
    const [allUserImages] = await dbconnection.query(
      "SELECT user_id, filename FROM user_images"
    );

    if (allUserImages.length === 0) {
      return res.status(404).json({ msg: "No images found" });
    }

    const userImagesMap = {};
    allUserImages.forEach((userData) => {
      userImagesMap[userData.userid] = userData.filename;
    });
    console.log(userImagesMap);
    res.status(200).json(userImagesMap);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createImage,
  getUserProfile,
  getAllUserImages,
};
