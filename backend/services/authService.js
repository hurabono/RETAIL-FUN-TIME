/*
비즈니스 로직(주로 Controller와 분리해둠)
Controller와 Model 사이에서 처리할 복잡한 비즈니스 로직을 두는 레이어입니다.
예: 여러 모델을 동시에 사용해야 할 때나, DB 트랜잭션 처리 등을 서비스 레이어에서 분리해 관리합니다.
*/

// ../services/authService.ts

// authService.js (또는 원하는 파일명으로)
// services/authService.js
import axios from 'axios';

// 회원가입
export async function signUp(email, password, role, employeeNumber) {
  // 로컬 서버 주소(http://localhost:4000) → 실제 기기에서 테스트시엔 PC IP로 변경
  const res = await axios.post('http://localhost:4000/api/auth/register', {
    email,
    password,
    role,
    employeeNumber,
  });
  return res.data;
}

// 로그인 (원하면 사용)
export async function signIn(email, password) {
  const res = await axios.post('http://localhost:4000/api/auth/login', {
    email,
    password,
  });
  return res.data;
}
