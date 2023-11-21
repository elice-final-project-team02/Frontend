import React from 'react';
import styles from './MyTitle.module.scss';
import { Senior2 } from 'assets/images';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function MyTitle({ text }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <div className={cx('img-container')}>
          <img src={Senior2} alt="캐릭터" />
        </div>
        <span>{text}</span>
      </div>
    </div>
  );
}
