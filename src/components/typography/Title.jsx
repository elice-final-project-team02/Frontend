import React from 'react';
import styles from './Typography.module.scss';

const Title = ({ children }) => {
  return <div className={styles.typographyTitle}>{children}</div>;
};

export default Title;
