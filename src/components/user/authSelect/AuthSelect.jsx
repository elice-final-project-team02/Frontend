import React from 'react';
import styles from './AuthSelect.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function AuthSelect({ name, text, value, onChange, options }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('auth-wrapper')}>
        <label htmlFor={name}>{text}</label>
        <select name={name} value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
