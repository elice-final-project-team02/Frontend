import { atom } from 'recoil';

// 로딩 상태를 저장
export const isLoadingState = atom({
  key: 'isLoadingState',
  default: true,
});
