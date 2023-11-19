import React from 'react';
import styles from './Withdraw.module.scss';
import cs from 'classnames/bind';
import { MySideBar, MyTitle } from 'components';

const cx = cs.bind(styles);

export default function Withdraw() {
  const handelDeleteUser = () => {
    alert('회원 탈퇴가 완료되었습니다.');
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('mypage')}>
        <div className={cx('sidebar')}>
          <MySideBar />
        </div>
        <main>
          <MyTitle text="회원탈퇴" />
          <div className={cx('content')}>
            <h1>회원을 탈퇴하시겠습니까?</h1>
            <p>비밀번호를 입력하시면 최종 탈퇴가 진행됩니다.</p>
            <input type="password" placeholder="비밀번호" />
            <input type="password" placeholder="비밀번호 확인" />
            <button onClick={handelDeleteUser}>탈퇴하기</button>
          </div>
        </main>
      </div>
    </div>
  );
}
