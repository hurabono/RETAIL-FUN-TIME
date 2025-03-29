/*
DB 스키마/모델 정의
데이터베이스 스키마 정의(ORM 사용 시 모델) 파일이 들어갑니다.
예: userModel.js에서 User 스키마 정의 후 Export.
*/

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String, // 'manager' or 'employee'
    default: 'employee',
  },
  employeeNumber: {
    type: String, // 있으면 저장, 없어도 null
    default: '',
  },
});

// 비밀번호 저장 전에 해싱
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 비밀번호 비교
userSchema.methods.matchPassword = async function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
