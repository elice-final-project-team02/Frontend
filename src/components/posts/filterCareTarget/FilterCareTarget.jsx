import React from 'react';
import styles from './FilterCareTarget.module.scss';
import cs from 'classnames/bind';

const cx = cs.bind(styles);
const careTargets = ['아동', '노인', '장애인'];

const FilterCareTarget = () => {
  // const recruitingPost = [];
  return (
    <div className={cx('wrapper')}>
      <div className={cx('filter-container')}>
        {careTargets.map((target, index) => (
          <label className={cx('filter-target')} key={index}>
            <input type="checkbox" value={target} />
            {target}
          </label>
        ))}
        <label className={cx('filter-target')}>
          <input type="checkbox" value="단기" />
          단기
        </label>
        <label className={cx('filter-target')}>
          <input type="checkbox" value="정기" />
          정기
        </label>
      </div>
    </div>
  );
};

export default FilterCareTarget;
