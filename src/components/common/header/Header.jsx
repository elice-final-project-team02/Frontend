import React, { useState } from 'react';
import styles from './Header.module.scss';
import cs from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { LogoClam } from 'assets/images';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState } from 'recoil/isLoggedInState';
import { roleState } from 'recoil/roleState';
import { usePostLogout } from 'hooks';

const cx = cs.bind(styles);

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const role = useRecoilValue(roleState);
  const { mutate } = usePostLogout();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      mutate();
      navigate('/');
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
              <li onMouseEnter={handleDropdown} onMouseLeave={handleDropdown}>
                <Link to={role === 'user' ? '/posts/new' : '/posts'}>돌봄서비스</Link>
                <ul className={cx('dropdown', { open: dropdownOpen })}>
                  <li>
                    <Link to={role === 'user' ? '/posts/new?careTarget=아동' : '/posts?careTarget=아동'}>아동</Link>
                  </li>
                  <li>
                    <Link to={role === 'user' ? '/posts/new?careTarget=노인' : '/posts?careTarget=노인'}>노인</Link>
                  </li>
                  <li>
                    <Link to={role === 'user' ? '/posts/new?careTarget=장애인' : '/posts?careTarget=장애인'}>
                      장애인
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
            </ul>
          </nav>
          <ul>
            {isLoggedIn === 'LOGGED_IN' ? (
              <li onClick={handleLogout}>로그아웃</li>
            ) : (
              <>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/register">회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
