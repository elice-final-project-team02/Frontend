import React from 'react';
import styles from './ChattingRoom.module.scss';
import { FiSend } from 'react-icons/fi';
import cs from 'classnames/bind';

const cx = cs.bind(styles);

export default function ChatFooter({
  isChatRoomClosed,
  inputmessage,
  handleInputChange,
  handleInputSend,
  useSendMessageRequest,
}) {
  return (
    <div className={cx('chat-room-footer')}>
      <input
        disabled={isChatRoomClosed}
        className={cx('inputbox')}
        placeholder={isChatRoomClosed ? '상대방이 채팅을 종료했습니다.' : '메시지를 입력해주세요.'}
        value={inputmessage}
        onChange={handleInputChange}
        onKeyUp={handleInputSend}
        maxLength="100"
      ></input>
      <button disabled={isChatRoomClosed} onClick={useSendMessageRequest} className={cx('send-message')}>
        <FiSend size="30" color="var(--crl-blue-900) " />
      </button>
    </div>
  );
}
