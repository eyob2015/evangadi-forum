const mysql = require("mysql2/promise");
require("dotenv").config('');
const pool = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

 /*const connection = pool.getConnection().then(() => console.log("DB Connected!"));

async function query(sql,params){
  const [rows, fields] = await (sql, params);
  return rows;
  pool.
}*/

async function query(sql, params) {
  const connection = await pool.getConnection();
  try {
    const [rows, fields] = await connection.execute(sql, params);
    return rows;
  } catch (err) {
    console.error(err);
  } finally {
    connection.release();
  }
}
let registration = `CREATE TABLE if not exists users(
    user_id int auto_increment,
    user_name varchar(100) not null,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id),
    UNIQUE KEY (user_name)
    )`;
let profile = `CREATE TABLE if not exists profile(user_profile_id int auto_increment,
    user_id int not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    PRIMARY KEY (user_profile_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)`

let question = `CREATE TABLE if not exists questions(user_id int(20) not null,
    title varchar(200) not null,
    id int(20) not null auto_increment,
    discription varchar(200) not null,
    question varchar(200) not null,
    time DateTime not null,
    comment_count int,
    like_count int,  
    question_id varchar(100) not null UNIQUE,     
    PRIMARY KEY (id,question_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)

)`;
let answer = `CREATE TABLE if not exists answer(
    answer_id int auto_increment,
    user_id int(20) not null,
    question_id varchar(100) not null,
    answer varchar(200) not null,
    time DateTime not null,        
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
)`

let question_likes = `CREATE TABLE if not exists question_likes(question_likes_id int auto_increment,user_id int not null,question_id int not null,like_count int,PRIMARY KEY (question_likes_id),FOREIGN KEY (user_id) REFERENCES users(user_id),FOREIGN KEY (question_id) REFERENCES questions(question_id)
  )`

  let user_images = `CREATE TABLE if not exists user_images(user_image_id int auto_increment,
    user_id int not null,
    filename varchar(255),
    PRIMARY KEY (user_image_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`

    let notification = `CREATE TABLE if not exists notifications(notification_id int auto_increment,
      user_id int not null,
      question_id int not null,
      PRIMARY KEY (notification_id),
      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (question_id) REFERENCES questions(question_id)
      )`





async function db_excute(){
await query(registration)
await query(profile)
await query(question)
await query(answer)
await query(notification)
await query(question_likes)
await query(user_images)}
db_excute();




module.exports = {query};
