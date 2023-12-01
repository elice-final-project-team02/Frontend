import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import cs from 'classnames/bind';
import { usePostLogin } from '../../../hooks/postLogin';
import Logo from '../../../assets/images/logo.png';
import InfantItem from '../../../assets/images/infant-item.png';
import SeniorItem from '../../../assets/images/senior-item.png';
import DisabledItem from '../../../assets/images/disabled-item.png';
const cx = cs.bind(styles);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const { mutate } = usePostLogin(email, password);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email.trim() !== '' && password.trim() !== '') {
      mutate();
    } else {
      if (email.trim() === '') {
        emailInputRef.current.focus();
      } else {
        passwordInputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={cx('wrapper')}>
      <img className={cx('logo')} src={Logo} alt="로고" />
      <div className={cx('loginContainer')}>
        <input
          type="text"
          placeholder="이메일"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={email}
          ref={emailInputRef}
        />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={password}
          ref={passwordInputRef}
        />
        <button onClick={handleSubmit}>로그인</button>
        <div className={cx('register')}>
          아직 쓰담쓰담 회원이 아니신가요?
          <br />
          <p
            onClick={() => {
              navigate('/register');
            }}
          >
            회원가입 하기
          </p>
        </div>
      </div>
      <div className={cx('imageBox')}>
        <img className={cx('infantItem')} src={InfantItem} alt="아동이미지" />
        <img className={cx('seniorItem')} src={SeniorItem} alt="노인이미지" />
        <img className={cx('disabledItem')} src={DisabledItem} alt="장애인이미지" />
      </div>
    </div>
  );
}
