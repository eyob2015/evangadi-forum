const { v4: uuidv4 } = require("uuid");
const dbconnection = require("../db/dbconfig");
const getQuestions = async (req, res) => {
  try {
    const questions = await dbconnection.query(
      "SELECT users.user_name,questions.*FROM questions  INNER JOIN users ON questions.user_id = users.user_id ORDER BY questions.id DESC"
    );
    console.log(questions)
    if (questions && questions.length === 0) {
      return res.status(404).json({ msg: "No questions found" });
    }

    res.json(questions);
   
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const createQuestion = async (req, res) => {
  const { title, description } = req.body;
  const userid = req.user.userid;
  console.log(userid);
  if (!title || !description) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const questionid = uuidv4();
  try {
    await dbconnection.query(
      "INSERT INTO questions (question_id, user_id, title, discription) VALUES (?, ?, ?, ?)",
      [questionid, userid, title, description]
    );
    res.status(201).json({ msg: "Question created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getQuestions,
  createQuestion,
};
