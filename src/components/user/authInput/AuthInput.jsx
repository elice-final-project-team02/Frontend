import React from 'react';
import styles from './AuthInput.module.scss';
import cs from 'classnames/bind';
import { InputStatus } from 'lib';
const cx = cs.bind(styles);

export default function AuthInput({
  text,
  status = InputStatus.NORMAL,
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
      <div className={cx('auth-wrapper')} status={status}>
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
        {isCode && <button>코드전송</button>}
        {isConfirm && <button onClick={onVerify}>인증확인</button>}
      </div>
      <div className={cx('message-container')}>
        <p>{message}</p>
      </div>
    </div>
  );
}
