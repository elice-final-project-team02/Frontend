import React, { useState } from 'react';
import styles from './MessageButton.module.scss';
import { MessageBtn } from 'assets/images';
import MessageBox from './MessageBox';
import cs from 'classnames/bind';
const cx = cs.bind(styles);


// 메시지함(채팅하기) 버튼 (회원만 해당 서비스 이용 가능)
export default function MessageButton() {

  const [popup, setPopup] = useState(false);

  // 팝업 애니메이션 효과 클래스를 붙이기위한 state
  const [showmessagebox, setShowMessageBox] = useState(false);

  const toggleMessageBox = (flag) => {
    if (!flag) {
      setPopup(!flag);
      setTimeout(() => {
        setShowMessageBox(!flag);
      }, 200);
    } else {
      setShowMessageBox(!flag);
      setTimeout(() => {
        setPopup(!flag);
      }, 400);
    }

  }

  return (
    <>
      <div className={cx('wrapper')}>
        <button
          onClick={() => { toggleMessageBox(popup) }}
          className={cx('message-box-btn')}>
          <img src={MessageBtn} alt="메시지함 버튼 이미지" />
        </button>

        {
          popup === true ? <MessageBox showmessagebox={ showmessagebox } /> : null
        }
      </div>
    </>
    
  );
}