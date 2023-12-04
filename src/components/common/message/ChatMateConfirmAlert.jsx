import React from 'react';
import styles from './ChatMateConfirmAlert.module.scss';
import cs from'classnames/bind';
import { ChatBlackbox } from 'assets/images';
const cx = cs.bind(styles); 

export default function ChatMateConfirmAlert() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('mate-confirm-alertbox')}>

        <div className={cx('confirm-box')}>
          <img src={ChatBlackbox} alt="메이트확정시 글씨 배경 이미지" />
          <p>돌봄메이트가 확정되었습니다.<br/>연락처는 이메일에서 확인해주세요!</p>
        </div>

      </div>
    </div>
  );
}



