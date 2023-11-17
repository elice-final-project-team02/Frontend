import React from 'react';
import styles from './Typography.module.scss';

const MainTitle = ({ children }) => {
  return <div className={styles.typographyMainTitle}>{children}</div>;
};

export default MainTitle;
