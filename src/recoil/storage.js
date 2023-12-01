import { atom } from 'recoil';

// 원하는 전역변수를 아래와 같이 선언해주시고 사용하시면 됩니다.
// 원하는 위치에서 이렇게 사용하시면 됩니다.
// const [text, setText] = useRecoilState(globalState);

// export const globalState = atom({
//   key: 'globalState', // unique ID
//   default: '야호',
// });

// MessageButton 열림/닫힘 상태
export const messageBoxState = atom({
  key: 'messageBoxState', // unique ID
  default: false,
});

// MessageButton 채팅방 아이디
export const chatId = atom({
  key: 'chatId',
  default: '',
});