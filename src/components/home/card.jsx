import React from 'react';
import styles from './Card.module.scss';
import cs from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cx = cs.bind(styles);

export default function Card({ onClick, name, src, className }) {
  const navigate = useNavigate();

  return (
    <div className={cx('card')}>
      <div onClick={() => onClick()} className={cx('description', className)}>
        <span>{name}</span>
        <img src={src} alt={name} />
      </div>
    </div>
  );
}
