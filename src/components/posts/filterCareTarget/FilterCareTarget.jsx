import React, {useState} from 'react';
import styles from './FilterCareTarget.module.scss';
import cs from 'classnames/bind';
import { useLocation, useSearchParams } from "react-router-dom"

const cx = cs.bind(styles);
const careTargets = ['아동', '노인', '장애인'];

export default function FilterCareTarget(postsData) {
  const [serchParams, setSearchParams] = useSearchParams();
  const [selectedTarget, setSelectedTarget] = useState('아동');
  const [selectedTerm, setSelectedTerm] = useState(null);

  const handleTargetCheckboxChange = (target) => {
    if (selectedTarget === target) {
      setSelectedTarget(null);
    } else {
      setSelectedTarget(target);
    }
  };

  const handleTermCheckboxChange = (term) => {
    setSelectedTerm((prevTerm) => (prevTerm === term ? null : term));
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('filter-container')}>
        {careTargets.map((target, index) => (
          <label className={cx('filter-target')} key={index}>
            <input type="checkbox" value={target} checked={selectedTarget === target}
              onChange={() => handleTargetCheckboxChange(target)}/>
            <span className={cx('checkmark')}></span>
            {target}
          </label>
        ))}
        <label className={cx('filter-target')} key={3}>
          <input type="checkbox" value="단기" checked={selectedTerm === '단기'}
            onChange={() => handleTermCheckboxChange('단기')}/>
          <span className={cx('term', 'checkmark')}></span>
          단기
        </label>
        <label className={cx('filter-target')} key={4}>
          <input type="checkbox" value="정기" checked={selectedTerm === '정기'}
            onChange={() => handleTermCheckboxChange('정기')}/>
          <span className={cx('term', 'checkmark')}></span>
          정기
        </label>
      </div>
    </div>
  );
};


