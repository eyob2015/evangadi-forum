const dbconnection = require("../db/dbconfig");

const createQuestionLike = async (req, res) => {
  const { questionid } = req.params;
  const userid = req.user.userid;
  try {
    const like = await dbconnection.query(
      "SELECT * FROM question_likes WHERE user_id = ? AND question_id = ?",
      [userid, questionid]
    );
    if (like.length > 0) {
      return res.status(400).json({ msg: "Question already liked" });
    }
    await dbconnection.query(
      "INSERT INTO question_likes (user_id, question_id) VALUES (?, ?)",
      [userid, questionid]
    );
    await dbconnection.query(
      "UPDATE questions SET like_count = (SELECT COUNT(*) FROM question_likes WHERE question_id = ?) WHERE question_id = ?",
      [questionid, questionid]
    );
    res.status(201).json({ msg: "Question liked" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createQuestionLike,
};
