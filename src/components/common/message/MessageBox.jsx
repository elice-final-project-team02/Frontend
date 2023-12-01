import React, { useState } from 'react';
import styles from './MessageBox.module.scss';
import MessageList from './MessageList';
import ChattingRoom from './ChattingRoom';
import cs from 'classnames/bind';
import { useClickOutsideDetector } from 'hooks';
const cx = cs.bind(styles);
// 메시지함 전체 감싸기 용도 컴포넌트(부모 컴포넌트)
export default function MessageBox({ showmessagebox, toggleMessageBox }) {
  const [selectedChatId, setSelectedChatId] = useState('');

  // 채팅 리스트에서 선택한 채팅방의 id값을 채팅방으로 전달하는 함수
  const chatInfoSelect = (chatId) => {
    setSelectedChatId(chatId);
  };

  const outsideRef = useClickOutsideDetector(() => {
    if (showmessagebox) {
      chatInfoSelect('');
      toggleMessageBox(true);
    }
  });

  return (
    <div ref={outsideRef} className={cx('wrapper', { open: showmessagebox })}>
      <MessageList chatInfoSelect={chatInfoSelect} />

      {selectedChatId !== '' ? <ChattingRoom selectedChatId={selectedChatId} chatInfoSelect={chatInfoSelect} /> : null}
    </div>
  );
}

