/*
서버 실행 파일 (Express 앱 구동)
Express 서버를 구동하는 진입점(entry point) 파일입니다.
포트 설정, 미들웨어 사용, 라우터 연결 등을 여기서 설정합니다.
*/

// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB 연결
connectDB();

// 미들웨어
app.use(cors());
app.use(express.json());

// 인증 라우트
app.use('/api/auth', authRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

