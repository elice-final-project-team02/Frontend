import React from 'react';
import styles from './Typography.module.scss';

const MainText = ({ children }) => {
  return <div className={styles.typographyMainText}>{children}</div>;
};

export default MainText;
