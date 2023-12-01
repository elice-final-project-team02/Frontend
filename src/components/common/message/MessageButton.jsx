import React, { useState, useEffect } from 'react';
import styles from './MessageButton.module.scss';
import { useNavigate, useLocation } from 'react-router';
import { MessageBtn, NewMessageImage } from 'assets/images';
import MessageBox from './MessageBox';
import cs from 'classnames/bind';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { useRecoilValue } from 'recoil';
import { useGetCheckUpdateMessage } from 'hooks';

const cx = cs.bind(styles);

// 메시지함(채팅하기) 버튼 (회원만 해당 서비스 이용 가능)
export default function MessageButton({ checkUpdate }) {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  // 팝업 애니메이션 효과 클래스를 붙이기위한 state
  const [showmessagebox, setShowMessageBox] = useState(false);
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();

  const toggleMessageBox = (flag) => {
    if (isLoggedIn === 'LOGGED_IN') {
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
    } else {
      alert('로그인된 유저만 이용 가능한 서비스입니다.');
      navigate('/login');
    }
  };

  return (
    <>
      <div className={cx('wrapper')}>
        <button
          onClick={() => {
            toggleMessageBox(popup);
          }}
          className={cx('message-box-btn')}
        >
          <img className={cx('img-message')} src={MessageBtn} alt="메시지함 버튼 이미지" />
          {checkUpdate && <img className={cx('img-newmessage')} src={NewMessageImage} alt="새메시지이미지" />}
        </button>

        {popup === true ? <MessageBox showmessagebox={showmessagebox} toggleMessageBox={toggleMessageBox} /> : null}
      </div>
    </>
  );
}
