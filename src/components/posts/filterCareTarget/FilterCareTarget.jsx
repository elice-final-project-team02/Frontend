import React, { useState, useEffect } from 'react';
import styles from './FilterCareTarget.module.scss';
import cs from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';

const cx = cs.bind(styles);
const careTargets = ['아동', '노인', '장애인'];

export default function FilterCareTarget({}) {
  const [selectedTarget, setSelectedTarget] = useSearchParams('careTarget');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [isLongTerm, setIsLongTerm] = useState('');
  const currentTarget = selectedTarget.get('careTarget');

  const handleChange = (e) => {};

  return (
    <div className={cx('wrapper')}>
      <div className={cx('filter-container')}>
        <label className={cx('filter-target')} htmlFor="all-select" key="all">
          <input id="all-select" type="radio" value="All" name="target" />
          <span className={cx('checkmark')}></span>
          전체 보기
        </label>
        {careTargets.map((target, index) => (
          <label htmlFor={`select${index}`} className={cx('filter-target')} key={index}>
            <input type="radio" id={`select${index}`} name="target" />
            <span className={cx('checkmark')}></span>
            {target}
          </label>
        ))}
        <label className={cx('filter-target')}>
          <input type="checkbox" value="단기" />
          <span
            className={cx('term', 'checkmark')}
            onChange={handleChange}
            checked={isLongTerm !== 'true' && isLongTerm !== 'all'}
          ></span>
          단기
        </label>
        <label className={cx('filter-target')}>
          <input type="checkbox" value="정기" />
          <span
            className={cx('term', 'checkmark')}
            onChange={handleChange}
            checked={isLongTerm !== 'false' && isLongTerm !== 'all'}
          ></span>
          정기
        </label>
      </div>
    </div>
  );
}
