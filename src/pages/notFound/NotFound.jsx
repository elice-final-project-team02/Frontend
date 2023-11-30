import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';
import cs from 'classnames/bind';
import { NotFoundCharacter } from 'assets/images';

const cx = cs.bind(styles);

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('errorContainer')}>
        <span>
          <img src={NotFoundCharacter} alt="에러이미지" />
        </span>
        <h2>404 ERROR</h2>
        <p>죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.</p>
        <p>페이지의 주소가 잘못 입력되었거나,</p>
        <p>주소가 변경되었거나 삭제되어 요청하신 페이지를 찾을 수 없습니다.</p>
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
