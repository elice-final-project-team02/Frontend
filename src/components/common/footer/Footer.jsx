import React from 'react';
import styles from './Footer.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function Footer() {
  return (
    <footer className={cx('wrapper')}>
      <div>
        <p>상호: 쓰담쓰담 | 대표자명: 엘리스 2팀</p>
        <p>사업자 등록번호: 000-00-00000 | 통신판매업신고번호: 제0000-서울마포-0000호</p>
      </div>
      <div>
        <p>연락처: 00-000-0000 | 팩스: 000-0000-0000 | 이메일: good@ooo.com</p>
        <p>주소: 서울특별시 마포구 00로 000</p>
      </div>

      <p>Copyright&#169; 쓰담쓰담</p>
    </footer>
  );
}
