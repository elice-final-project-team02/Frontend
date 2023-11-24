import React, { useState } from 'react';
import styles from 'pages/user/register/Register.module.scss';
import cs from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthInput } from 'components';
import { InputStatus, validateInput } from 'lib';
import { usePostSendMail, usePostVerifyCode } from 'hooks';
const cx = cs.bind(styles);

export default function AuthInfo() {
  const nav = useNavigate();
  const location = useLocation();
  const { role } = location.state;

  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // error 존재 여부 (email, emailCode, password, passwordConfirm)
  const [hasError, setHasError] = useState([false, false, false, false]);

  const [isEmailVerified, setEmailVerified] = useState(false);

  const { mutate: sendMailMutate } = usePostSendMail(email);
  const { mutate: verifyCodeMutate } = usePostVerifyCode(email, emailCode);

  const handleSendMail = () => {
    sendMailMutate();
  };

  const handleEmailVerification = () => {
    verifyCodeMutate();
    setEmailVerified(true); // 이메일 인증이 성공
  };

  const handleInputChange = (inputValue, inputName, index, setState, password = null) => {
    // 유효성 검사 수행
    const status = validateInput(inputValue, inputName, password);
    setState(inputValue);
    const newErrors = [...hasError];
    newErrors[index] = status === InputStatus.ERROR;
    setHasError(newErrors);
  };

  // 모든 필드가 유효하고 값이 존재하는지 확인
  const isValid =
    !hasError.includes(true) && email !== '' && emailCode !== '' && password !== '' && passwordConfirm !== '';

  return (
    <div className={cx('wrapper')}>
      <p>회원가입을 위해 아래 폼을 작성해주세요.</p>
      <div className={cx('register-container')}>
        <AuthInput
          text="이메일"
          type="email"
          name="email"
          value={email}
          placeholder="이메일을 입력해주세요"
          onChange={(val) => handleInputChange(val, 'email', 0, setEmail)}
          onVerify={handleSendMail}
          message={hasError[0] ? '이메일의 형식이 올바르지 않습니다.' : ''}
          isCode
        />
        <AuthInput
          text="이메일 인증코드"
          type="string"
          name="emailCode"
          value={emailCode}
          placeholder="인증코드를 입력해주세요"
          onChange={(val) => handleInputChange(val, 'emailCode', 1, setEmailCode)}
          onVerify={handleEmailVerification}
          isConfirm
        />
        <AuthInput
          text="비밀번호"
          type="password"
          name="password"
          value={password}
          placeholder="숫자, 영문자, 특수문자 조합으로 8자 이상 입력해주세요"
          onChange={(val) => handleInputChange(val, 'password', 2, setPassword)}
          message={hasError[2] ? '비밀번호는 숫자, 영문자, 특수문자 조합으로 8자 이상이어야 합니다.' : ''}
          disabled={!isEmailVerified}
        />
        <AuthInput
          text="비밀번호 확인"
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          placeholder="비밀번호를 다시 한번 입력해주세요"
          onChange={(val) => handleInputChange(val, 'passwordConfirm', 3, setPasswordConfirm, password)}
          message={hasError[3] ? '비밀번호가 일치하지 않습니다.' : ''}
          disabled={!isEmailVerified}
        />
        <div className={cx('button-container')}>
          <button onClick={() => nav('/register')}>이전</button>
          <button
            className={cx({ 'care-button': role === 'careUser', 'general-button': role === 'user' })}
            onClick={() => {
              nav('/register/userInfo', { state: { role: role, email: email, password: password } });
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
