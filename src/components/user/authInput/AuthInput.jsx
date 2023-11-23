import React from 'react';
import styles from './AuthInput.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function AuthInput({
  text,
  placeholder,
  name,
  type,
  value,
  onChange,
  onVerify,
  message,
  isConfirm,
  isCode,
  disabled,
}) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('auth-wrapper')}>
        <label htmlFor={name}>{text}</label>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cx({ inputWithButton: isConfirm || isCode })}
        />
        {isCode && <button onClick={onVerify}>코드전송</button>}
        {isConfirm && <button onClick={onVerify}>인증확인</button>}
      </div>
      <div className={cx('message-container')}>
        <p>{message}</p>
      </div>
    </div>
  );
}
