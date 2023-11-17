import React from 'react';
import styles from './Typography.module.scss';

const Text = ({ children }) => {
  return <div className={styles.typographyText}>{children}</div>;
};

export default Text;
