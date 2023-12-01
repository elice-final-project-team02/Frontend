import React, { useState, useEffect } from 'react';
import styles from './FilterCareTarget.module.scss';
import cs from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';

const cx = cs.bind(styles);
const careTargets = ['전체', '아동', '노인', '장애인'];

export default function FilterCareTarget({ onChangeTarget, onChangeTerm, controlTarget, controlTerm }) {
  const handleChangeTarget = (e) => {
    if (e.target.value === '전체' && controlTerm !== 'all') {
      onChangeTarget('전체');
      return;
    }
    onChangeTarget(e.target.value);
  };
  const handleChangeTerm = (e) => {
    if (e.target.name === 'shortTerm' && e.target.checked) {
      onChangeTerm('false');
      return;
    }
    if (e.target.name === 'shortTerm' && !e.target.checked) {
      onChangeTerm('all');
      return;
    }
    if (e.target.name === 'longTerm' && e.target.checked) {
      onChangeTerm('true');
      return;
    }
    if (e.target.name === 'longTerm' && !e.target.checked) {
      onChangeTerm('all');
      return;
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('filter-container')}>
        {careTargets.map((target, index) => (
          <label htmlFor={`select${index}`} className={cx('filter-target')} key={index}>
            <input
              type="radio"
              id={`select${index}`}
              checked={controlTarget === target}
              onChange={handleChangeTarget}
              name="care-target"
              value={target}
            />
            <span className={cx('checkmark')}></span>
            {target}
          </label>
        ))}
        <label className={cx('filter-target')}>
          <input
            type="checkbox"
            name="shortTerm"
            value="false"
            onChange={handleChangeTerm}
            checked={controlTerm !== 'true' && controlTerm !== 'all'}
          />
          <span className={cx('term', 'checkmark')}></span>
          단기
        </label>
        <label className={cx('filter-target')}>
          <input
            type="checkbox"
            name="longTerm"
            onChange={handleChangeTerm}
            checked={controlTerm !== 'false' && controlTerm !== 'all'}
            value="true"
          />
          <span className={cx('term', 'checkmark')}></span>
          정기
        </label>
      </div>
    </div>
  );
}
