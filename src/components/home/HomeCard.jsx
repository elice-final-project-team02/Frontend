import React from 'react';
import styles from './HomeCard.module.scss';
import cs from 'classnames/bind';

const cx = cs.bind(styles);

export default function HomeCard({ onClick, name, src, className }) {
  return (
    <div className={cx('card')}>
      <div onClick={() => onClick()} className={cx('description', className)}>
        <span>
          {name} <span>&gt;</span>
        </span>
        <img src={src} alt={name} />
      </div>
    </div>
  );
}
