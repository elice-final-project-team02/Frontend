import React, { useState, useEffect } from 'react';
import styles from './FilterCareTarget.module.scss';
import cs from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';

const cx = cs.bind(styles);
const careTargets = ['아동', '노인', '장애인'];

export default function FilterCareTarget({}) {
  const [selectedTarget, setSelectedTarget] = useSearchParams('careTarget');
  const [selectedTerm, setSelectedTerm] = useState(null);

  const currentTarget = selectedTarget.get('careTarget');

  const handleTargetCheckboxChange = (target) => {
    let newTerm = selectedTerm;

    if (currentTarget === target) {
      setSelectedTarget('');
    } else {
      if (selectedTerm !== null) {
        setSelectedTarget(`?careTarget=${target}&isLongTerm=${selectedTerm}`);
      } else {
        setSelectedTarget(`?careTarget=${target}`);
      }
    }

    if (currentTarget === target) {
      if (newTerm !== null) {
        setSelectedTarget(`?careTarget=${target}&isLongTerm=${newTerm}`);
      } else {
        setSelectedTarget(`?careTarget=${target}`);
      }
    }
  };

  const handleTermCheckboxChange = (term) => {
    setSelectedTerm((prevTerm) => (prevTerm === term ? null : term));
    if (currentTarget) {
      setSelectedTarget(`?careTarget=${currentTarget}&isLongTerm=${term}`);
    }
  };

  const handleAllCheckboxChange = () => {
    setSelectedTarget('');
    setSelectedTerm(null);
  };

  useEffect(() => {
    if (currentTarget && selectedTerm === null) {
      setSelectedTarget(`?careTarget=${currentTarget}`);
    } else if (currentTarget === null && selectedTerm === null) {
      window.history.pushState(null, null, '/posts');
    }
  }, [currentTarget, selectedTerm]);

  console.log(currentTarget);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('filter-container')}>
        <label className={cx('filter-target')} key="all">
          <input
            type="checkbox"
            value="All"
            checked={!currentTarget && selectedTerm === null}
            onChange={handleAllCheckboxChange}
          />
          <span className={cx('checkmark')}></span>
          전체 보기
        </label>
        {careTargets.map((target, index) => (
          <label className={cx('filter-target')} key={index + 1}>
            <input
              type="checkbox"
              value={target}
              checked={currentTarget === target}
              onChange={() => handleTargetCheckboxChange(target)}
            />
            <span className={cx('checkmark')}></span>
            {target}
          </label>
        ))}
        <label className={cx('filter-target')} key={4}>
          <input
            type="checkbox"
            value="단기"
            checked={selectedTerm === false}
            onChange={() => {
              handleTermCheckboxChange(false);
            }}
          />
          <span className={cx('term', 'checkmark')}></span>
          단기
        </label>
        <label className={cx('filter-target')} key={5}>
          <input
            type="checkbox"
            value="정기"
            checked={selectedTerm === true}
            onChange={() => {
              handleTermCheckboxChange(true);
            }}
          />
          <span className={cx('term', 'checkmark')}></span>
          정기
        </label>
      </div>
    </div>
  );
}
