import React, { useState } from 'react';
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
  // email 인증코드 전송 30초 제한
  const [countdown, setCountdown] = useState(30);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleVerify = () => {
    if (isCode) {
      onVerify();
      setIsDisabled(true);
      setCountdown(30);
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount === 0) {
            clearInterval(timer);
            setIsDisabled(false);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }
  };

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
        {isCode && (
          <button onClick={handleVerify} disabled={isDisabled || !value || message}>
            {isDisabled ? `재전송 (${countdown}s)` : '코드전송'}
          </button>
        )}
        {isConfirm && (
          <button onClick={onVerify} disabled={!value}>
            인증확인
          </button>
        )}
      </div>
      <div className={cx('message-container')}>
        <p>{message}</p>
      </div>
    </div>
  );
}
