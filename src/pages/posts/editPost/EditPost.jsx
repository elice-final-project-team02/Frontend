import React from 'react';
import styles from './EditPost.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function EditPost() {
  return (
    <div className={cx('wrapper')}>
      <h1>게시글 수정</h1>
    </div>
  );
}
