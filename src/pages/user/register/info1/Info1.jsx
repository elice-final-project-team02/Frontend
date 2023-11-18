import React, { useState } from 'react';
import styles from '../Register.module.scss';
import cs from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthInput } from '../../../../components';
import { InputStatus, validateInput } from '../../../../lib';
const cx = cs.bind(styles);

export default function Info1() {
  const nav = useNavigate();
  const location = useLocation();
  const role = location.state.role;

  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  //오류 메시지
  const [emailStatus, setEmailStatus] = useState(InputStatus.NORMAL);
  const [emailCodeStatus, setEmailCodeStatus] = useState(InputStatus.NORMAL);
  const [passwordStatus, setPasswordStatus] = useState(InputStatus.NORMAL);
  const [passwordConfirmStatus, setPasswordConfirmStatus] = useState(InputStatus.NORMAL);

  const [isEmailVerified, setEmailVerified] = useState(false);

  const handleEmailVerification = () => {
    // 이메일 인증 로직 수행
    // 이메일 인증이 성공하면 setEmailVerified(true) 호출
    setEmailVerified(true);
  };

  const handleInputChange = (inputValue, inputName, setStatus, setState, password = null) => {
    // 유효성 검사 수행
    const status = validateInput(inputValue, inputName, password);
    setStatus(status);
    setState(inputValue);
  };

  // 모든 필드가 유효하고 값이 존재하는지 확인
  const isValid =
    emailStatus !== InputStatus.ERROR &&
    emailCodeStatus !== InputStatus.ERROR &&
    passwordStatus !== InputStatus.ERROR &&
    passwordConfirmStatus !== InputStatus.ERROR &&
    email !== '' &&
    emailCode !== '' &&
    password !== '' &&
    passwordConfirm !== '';

  return (
    <div className={cx('wrapper')}>
      <p>회원가입을 위해 아래 폼을 작성해주세요.</p>
      <div className={cx('registerContainer')}>
        <AuthInput
          text="이메일"
          status={emailStatus}
          type="email"
          name="email"
          value={email}
          placeholder="이메일을 입력해주세요"
          onChange={(val) => handleInputChange(val, 'email', setEmailStatus, setEmail)}
          message={emailStatus === InputStatus.ERROR ? '이메일의 형식이 올바르지 않습니다.' : ''}
          isCode
        />
        <AuthInput
          text="이메일 인증코드"
          status={emailCodeStatus}
          type="string"
          name="emailCode"
          value={emailCode}
          placeholder="인증코드를 입력해주세요"
          onChange={(val) => handleInputChange(val, 'emailCode', setEmailCodeStatus, setEmailCode)}
          onVerify={handleEmailVerification}
          isConfirm
        />
        <AuthInput
          text="비밀번호"
          status={passwordStatus}
          type="password"
          name="password"
          value={password}
          placeholder="숫자, 영문자, 특수문자 조합으로 8자 이상 입력해주세요"
          onChange={(val) => handleInputChange(val, 'password', setPasswordStatus, setPassword)}
          message={
            passwordStatus === InputStatus.ERROR
              ? '비밀번호는 숫자, 영문자, 특수문자 조합으로 8자 이상이어야 합니다.'
              : ''
          }
          disabled={!isEmailVerified}
        />
        <AuthInput
          text="비밀번호 확인"
          status={passwordConfirmStatus}
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          placeholder="비밀번호를 다시 한번 입력해주세요"
          onChange={(val) =>
            handleInputChange(val, 'passwordConfirm', setPasswordConfirmStatus, setPasswordConfirm, password)
          }
          message={passwordConfirmStatus === InputStatus.ERROR ? '비밀번호가 일치하지 않습니다.' : ''}
          disabled={!isEmailVerified}
        />
        <div className={cx('buttonContainer')}>
          <button onClick={() => nav('/register')}>이전</button>
          <button
            className={cx('nextBtn')}
            onClick={() => {
              nav('/register/info2', { state: { role: role, email: email, password: password } });
            }}
            disabled={!isValid}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
