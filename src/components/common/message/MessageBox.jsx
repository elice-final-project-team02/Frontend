import React, {useState} from 'react';
import styles from './MessageBox.module.scss';
import MessageList from './MessageList';
import ChattingRoom from './ChattingRoom';
import cs from'classnames/bind';
const cx = cs.bind(styles); 


// 메시지함 전체 감싸기 용도 컴포넌트
export default function MessageBox () {

  //  채팅창 UI 작업을 위해서 우선 상태를 true로 해두었습니다.
  let [chatroom, setChatRoom] = useState(true);

  return (
    <>
      <div className={cx('wrapper')}>
        <MessageList onClick={() => { setChatRoom(!chatroom) }} />

        {
          chatroom === true ? <ChattingRoom/> : null
        }

      </div>
    </>
  );
}

