import React from 'react';
import styles from './MySideBar.module.scss';
import cs from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { roleState } from 'recoil/roleStateAtom';
const cx = cs.bind(styles);

export default function MySideBar() {
  const role = useRecoilValue(roleState);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('sidebar')}>
        <ul className={cx('section')}>
          <li className={cx('user')}>
            회원정보
            <ul>
              <li>
                <Link to="/mypage">회원정보 조회/수정</Link>
              </li>
              <li>
                <Link to="/mypage/withdraw">회원 탈퇴</Link>
              </li>
            </ul>
          </li>
          <li className={cx('post')}>
            게시글 리스트
            <ul>
              {role === 'user' ? (
                <li>
                  <Link to="/mypage/posts">MY 등록게시물</Link>
                </li>
              ) : (
                <li>
                  <Link to="/mypage/wishlist">찜한 돌봄 서비스</Link>
                </li>
              )}
              <li>
                <Link to="/mypage/matching">매칭 완료된 리스트</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
