import React from 'react';
import { PinkClam, BlueClam } from 'assets/images';
import styles from './Register.module.scss';
import cs from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
const cx = cs.bind(styles);

export default function Register() {
  const nav = useNavigate();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('buttonRole')}>
        <button
          onClick={() => {
            nav('/register/authInfo', { state: { role: '일반유저' } });
          }}
        >
          <div className={cx('container')}>
            <div>
              <img src={BlueClam} className={cx('clamImg')} alt="Pink Clam" />
            </div>
            <div className={cx('general')}>
              <span>"돌봄 서비스를 신청하고싶어요."</span>
              <p>일반유저 회원가입</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => {
            nav('/register/authInfo', { state: { role: '돌봄유저' } });
          }}
        >
          <div className={cx('container')}>
            <div>
              <img src={PinkClam} className={cx('clamImg')} alt="Pink Clam" />
            </div>
            <div className={cx('care')}>
              <span>"돌봄 서비스를 제공하고싶어요."</span>
              <p>돌봄유저 회원가입</p>
            </div>
          </div>
        </button>
        <div className={cx('isUser')}>
          <span>이미 쓰담쓰담 회원이신가요?</span>
          <Link to={'/login'} className={cx('goLogin')}>
            로그인 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
