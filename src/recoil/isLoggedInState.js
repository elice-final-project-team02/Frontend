import { atom } from 'recoil';

// 로그인 상태를 저장
export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});
