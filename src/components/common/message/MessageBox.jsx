import React, {useState} from 'react';
import styles from './MessageBox.module.scss';
import MessageList from './MessageList';
import ChattingRoom from './ChattingRoom';
import cs from'classnames/bind';
const cx = cs.bind(styles); 


// 메시지함 전체 감싸기 용도 컴포넌트(부모 컴포넌트)
export default function MessageBox (props) {

  const [selectedChatId ,setSelectedChatId] = useState("");

  // 채팅 리스트에서 선택한 채팅방의 id값을 채팅방으로 전달하는 함수
  const chatInfoSelect = (chatId) => {
    setSelectedChatId(chatId);

  }

  return (
      <div className={cx('wrapper', {open: props.showmessagebox} )}>
      <MessageList chatInfoSelect={ chatInfoSelect }/>

        {
        selectedChatId !== "" ? <ChattingRoom chatInfoSelect={ chatInfoSelect } selectedChatId={selectedChatId} /> : null
        }

      </div>
  );
}

