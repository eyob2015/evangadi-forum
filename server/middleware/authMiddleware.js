
let JWT_SECRET = 'secrete'
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ msg: "No authentication token, authorization denied" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const { username, userid } = jwt.verify(token, JWT_SECRET);
    req.user = { username, userid };
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = authMiddleware;
