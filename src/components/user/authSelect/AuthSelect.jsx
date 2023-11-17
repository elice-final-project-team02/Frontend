import React from 'react';
import styles from './AuthSelect.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

const genderOptions = [
  { value: '남자', label: '남자' },
  { value: '여자', label: '여자' },
];

const ageOptions = [
  { value: '20대', label: '20대' },
  { value: '30대', label: '30대' },
  { value: '40대', label: '40대' },
  { value: '50대', label: '50대' },
  { value: '60대이상', label: '60대이상' },
];

export default function AuthSelect({ name, text, value, onChange }) {
  let options;
  if (name === 'gender') {
    options = genderOptions;
  } else {
    options = ageOptions;
  }

  return (
    <div className={cx('authWrapper')}>
      <label htmlFor={name}>{text}</label>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
