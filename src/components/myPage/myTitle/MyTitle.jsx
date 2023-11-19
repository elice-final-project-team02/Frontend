import React from 'react';
import styles from './MyTitle.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function MyTitle(props) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <img src="https://ifh.cc/g/zyKAbq.png" alt="캐릭터" />
        <span>{props.text}</span>
      </div>
    </div>
  );
}
