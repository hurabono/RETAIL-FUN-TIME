/*
DB 연결이나 환경변수 세팅 등
db.js 등을 두어 데이터베이스 연결 정보나 환경변수 설정을 모아둡니다.
예: MongoDB 연결(mongoose.connect()), PostgreSQL, MySQL 등 DB 연결 설정.
*/
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
