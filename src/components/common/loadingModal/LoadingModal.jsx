import React from 'react';
import styles from './LoadingModal.module.scss';
import cs from 'classnames/bind';
import { useState } from 'react';
import RotateLoader from 'react-spinners/RotateLoader';

const cx = cs.bind(styles);

export default function LoadingModal({ message, isLoading }) {
  let [loading, setLoading] = useState(true);
  let [color] = useState('#8aa1dd');
  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      {loading && (
        <div className={cx('wrapper')}>
          <span className="sweet-loading">
            <RotateLoader
              color={color}
              loading={loading}
              margin={10}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </span>
          <span>{message}</span>
        </div>
      )}
    </>
  );
}
