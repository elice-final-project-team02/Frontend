import React, { useState } from 'react';
import styles from './Withdraw.module.scss';
import cs from 'classnames/bind';
import { MySideBar, MyTitle } from 'components';
import { useDeleteUser } from '../../../../hooks/useDeleteUser';
const cx = cs.bind(styles);

export default function Withdraw() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { mutate } = useDeleteUser(password);

  const handelDeleteUser = () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (window.confirm('정말 쓰담쓰담을 떠나시겠습니까?😢')) {
      mutate();
    }
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
            <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="비밀번호 확인" onChange={(e) => setPasswordConfirm(e.target.value)} />
            <button onClick={handelDeleteUser}>탈퇴하기</button>
          </div>
        </main>
      </div>
    </div>
  );
}
