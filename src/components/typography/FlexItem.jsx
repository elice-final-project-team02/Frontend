import React, { useState } from 'react';
import styles from './Typography.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function FlexItem({ backgroundColor, hoverColor, children }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={styles.flexItem}
      style={{
        backgroundColor: hover ? hoverColor : backgroundColor,
        cursor: 'pointer',
        transition: 'background-color 0.5s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </div>
  );
}
