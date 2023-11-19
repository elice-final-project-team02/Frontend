import React, { useState } from 'react';
import styles from './FilterCareTarget.module.scss';
import cs from 'classnames/bind';

const cx = cs.bind(styles);
const careTargets = ['아동', '노인', '장애인'];

const FilterCareTarget = () => {
  // const recruitingPost = [];
  return (
    <div className={cx('filterContainer')}>
      {careTargets.map((target) => (
        <label className={cx('filterTarget')}>
          <input type="checkbox" value={target} />
          {target}
        </label>
      ))}
    </div>
  );
};

export default FilterCareTarget;
