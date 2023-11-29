import React from 'react';
import styles from './LoadingModal.module.scss';
import cs from 'classnames/bind';
import { useState } from 'react';
import RotateLoader from 'react-spinners/RotateLoader';

const cx = cs.bind(styles);

export default function LoadingModal({ message }) {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState('#8aa1dd');
  return (
    <div className={cx('wrapper')}>
      <span className="sweet-loading">
        <RotateLoader
          color={color}
          loading={loading}
          margin={10}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </span>
      <span>{message}</span>
    </div>
  );
}
