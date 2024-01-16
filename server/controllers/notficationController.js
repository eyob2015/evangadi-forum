const dbconnection = require("../db/dbconfig");

const createNotification = async (req, res) => {
  const { userid, questionid } = req.body;
  try {
    await dbconnection.query(
      "INSERT INTO notifications (user_id, question_id) VALUES (?, ?)",
      [userid, questionid]
    );
    res.status(201).json({ msg: "Notification created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getNotifications = async (req, res) => {
  const userid = req.user.userid;
  try {
    const [notifications] = await dbconnection.query(
      "SELECT notifications.notification_id, notifications.user_id, notifications.question_id, questions.title, questions.discription, questions.time FROM notifications INNER JOIN questions ON notifications.question_id = questions.question_id WHERE notifications.user_id = ? ORDER BY notifications.time DESC",
      [userid]
    );
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteNotification = async (req, res) => {
  const { notificationid } = req.params;
  try {
    await dbconnection.query(
      "DELETE FROM notifications WHERE notification_id = ?",
      [notificationid]
    );
    res.status(201).json({ msg: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  deleteNotification,
};