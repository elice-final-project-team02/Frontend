import React from 'react';
import styles from './Header.module.scss';
import cs from 'classnames/bind';
import { Link } from 'react-router-dom';
import { LogoClam } from 'assets/images';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { roleState } from 'recoil/roleState';

const cx = cs.bind(styles);

export default function Header() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const role = useRecoilValue(roleState);

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      // logout api 호출
      setIsLoggedIn(false);
    }
  };

  return (
    <header>
      <div className={cx('wrapper')}>
        <h1>
          <Link to="/">
            <img src={LogoClam} alt="" />
          </Link>
        </h1>
        <div className={cx('navigations-wrapper')}>
          <nav>
            <ul>
              <li>
                <Link to="about-us">서비스 소개</Link>
              </li>
              <li>{role === 'user' ? <Link to="/posts/new">돌봄서비스</Link> : <Link to="/posts">돌봄서비스</Link>}</li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
            </ul>
          </nav>
          <ul>
            {isLoggedIn ? (
              <li onClick={handleLogout}>로그아웃</li>
            ) : (
              <li>
                <Link to="/login">로그인</Link>
              </li>
            )}
            <li>
              <Link to="/register">회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
