// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * 회원가입
 * - email, password, role, employeeNumber를 전달받아 User 생성
 * - JWT 발급(선택 사항) → 여기선 가입 직후 토큰도 응답
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, employeeNumber } = req.body;

    // 중복 이메일 체크
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 새 유저 생성 & 저장
    const newUser = new User({
      email,
      password,
      role,
      employeeNumber,
    });
    await newUser.save();

    // 회원가입 후 JWT 발급 (원치 않으면 생략 가능)
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Registration successful',
      token, // 가입 직후 토큰
      role: newUser.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * 로그인
 * - email, password
 * - user.matchPassword 로 검증 후 토큰 발급
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // JWT 발급
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login success',
      token,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
