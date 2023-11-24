import React from 'react';
import { PinkClam3D, BlueClam3D, PinkPearl, BluePearl } from 'assets/images';
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
          className={cx('user-button')}
          onClick={() => {
            nav('/register/authInfo', { state: { role: 'user' } });
          }}
        >
          <div className={cx('container')}>
            <img src={BlueClam3D} className={cx('blue-clam-image')} alt="Blue Clam" />
            <img src={BluePearl} className={cx('blue-pearl-image')} alt="Blue Pearl" />
            <div className={cx('general')}>
              <span>“ 돌봄 서비스를 신청하고 싶어요 “</span>
              <p>일반유저 회원가입</p>
            </div>
          </div>
        </button>
        <button
          className={cx('care-button')}
          onClick={() => {
            nav('/register/authInfo', { state: { role: 'careUser' } });
          }}
        >
          <div className={cx('container')}>
            <img src={PinkClam3D} className={cx('pink-clam-image')} alt="Pink Clam" />
            <img src={PinkPearl} className={cx('pink-pearl-image')} alt="Pink Pearl" />
            <div className={cx('care')}>
              <span>“ 돌봄 서비스를 제공하고 싶어요 “</span>
              <p>돌봄유저 회원가입</p>
            </div>
          </div>
        </button>
        <div className={cx('is-user')}>
          <span>이미 쓰담쓰담 회원이신가요?</span>
          <Link to={'/login'} className={cx('go-login')}>
            로그인 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
