const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
//process .env config
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/answers", require("./routes/answerRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));
app.use("/api/likes", require("./routes/likeRoutes"));
app.use("/api/all/images", express.static(path.join(__dirname, "/images")));
app.get("/", (req, res) => {
  res.send("API is running....");
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
