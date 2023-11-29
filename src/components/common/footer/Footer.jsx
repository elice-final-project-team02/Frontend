import React, { useState } from 'react';
import styles from './Footer.module.scss';
import cs from 'classnames/bind';
import Logo from '../../../assets/images/logo-clam.png';
const cx = cs.bind(styles);

export default function Footer() {
  const [isClicked, setIsClicked] = useState(false);

  const handleLogoClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <footer className={cx('wrapper')}>
      <div>
        <img
          className={cx('logo')}
          src={Logo}
          alt=""
          onClick={handleLogoClick}
          style={
            isClicked
              ? {
                  transform: 'scale(3) translate(250px, 30px) rotate(360deg)',
                  transition: '1s ease-in-out',
                  cursor: 'pointer',
                }
              : { transition: '1s ease-in-out', cursor: 'pointer' }
          }
        />
        <p>상호: 쓰담쓰담 | 대표자명: 엘리스 2팀</p>
        <p>사업자 등록번호: 123-45-67890 | 통신판매업신고번호: 제1234-서울강남-5678호</p>
      </div>
      <div>
        <p>
          연락처: 010-1234-5678 | 팩스: 0102-0304-0506 |{' '}
          <a href="mailto:caremate@naver.com">이메일: caremate@naver.com</a>
        </p>
        <p>주소: 서울특별시 강남구 쓰담로 123</p>
      </div>
      <div>
        <p>Copyright&#169; 쓰담쓰담</p>
      </div>
    </footer>
  );
}
