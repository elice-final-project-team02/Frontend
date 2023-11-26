import React, { useState } from 'react';
import styles from './Typography.module.scss';
import cs from 'classnames/bind';

const cx = cs.bind(styles);

export default function FlexItem({ backgroundColor, hoverColor, children }) {
  return (
    <div
      className={styles.flexItem}
      style={{
        '--hover-color': hoverColor,
        '--background-color': backgroundColor,
        cursor: 'pointer',
        transition: 'background-color 0.5s',
      }}
    >
      {children}
    </div>
  );
}
