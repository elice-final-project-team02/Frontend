import React, { useState } from 'react';
import styles from './MessageButton.module.scss';
import { MessageBtn } from 'assets/images';
import MessageBox from './MessageBox';
import cs from 'classnames/bind';
const cx = cs.bind(styles);


// 메시지함(채팅하기) 버튼 (회원만 해당 서비스 이용 가능)
export default function MessageButton() {

  let [popup, setPopup] = useState(false);

  return (
    <>
      <div className={cx('wrapper')}>
        <button
          onClick={() => { setPopup(!popup) }}
          className={cx('message-box-btn')}>
          <img src={MessageBtn} alt="메시지함 버튼 이미지" />
        </button>

        {
          popup === true ? <MessageBox /> : null
        }
      </div>
    </>
    
  );
}