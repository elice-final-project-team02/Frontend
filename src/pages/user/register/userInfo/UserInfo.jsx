import React, { useState } from 'react';
import styles from 'pages/user/register/Register.module.scss';
import cs from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { AuthInput, AuthSelect, Region } from 'components';
import { InputStatus, validateInput } from 'lib';
import { usePostRegister } from 'hooks';
import axios from 'axios';

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

export default function UserInfo() {
  const location = useLocation();
  const { role, email, password } = location.state;

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('20대');
  const [gender, setGender] = useState('남자');
  const [region, setRegion] = useState('');
  const [subRegion, setSubRegion] = useState('');

  // error 존재 여부 (name, phone)
  const [hasError, setHasError] = useState([false, false]);

  const userInfo = {
    role: role,
    email: email,
    password: password,
    name: name,
    phoneNumber: phoneNumber,
    age: age,
    gender: gender,
    region: region,
    subRegion: subRegion,
  };
  console.log(userInfo);

  const { mutate } = usePostRegister(userInfo);

  // 입력 값 변경 시 유효성 검사 수행
  const handleInputChange = (inputValue, inputName, index, setState) => {
    const status = validateInput(inputValue, inputName);
    setState(inputValue);
    const newErrors = [...hasError];
    newErrors[index] = status === InputStatus.ERROR;
    setHasError(newErrors);
  };

  // 모든 필드가 유효하고 값이 존재하는지 확인
  const isValid =
    !hasError.includes(true) &&
    name !== '' &&
    phoneNumber !== '' &&
    age !== '' &&
    gender !== '' &&
    region !== '' &&
    subRegion !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className={cx('wrapper')}>
      <p>서비스 이용에 필요한 정보를 작성해주세요.</p>
      <div className={cx('register-container')}>
        <AuthInput
          text="이름"
          type="string"
          name="name"
          onChange={(val) => handleInputChange(val, 'name', 0, setName)}
          value={name}
          placeholder="본명을 입력해주세요"
          message={hasError[0] ? '이름은 2글자 이상 작성해주세요.' : ''}
        />
        <AuthInput
          text="휴대폰 번호"
          type="string"
          name="phone"
          value={phoneNumber}
          placeholder="-을 제외하고 입력해주세요"
          onChange={(val) => handleInputChange(val, 'phone', 1, setPhoneNumber)}
          message={hasError[1] ? '올바른 형식이 아닙니다.' : ''}
        />
        <AuthSelect
          name="gender"
          text="성별"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={genderOptions}
        />
        <AuthSelect name="age" text="나이" value={age} onChange={(e) => setAge(e.target.value)} options={ageOptions} />
        <div className={cx('region-container')}>
          <label htmlFor="">지역</label>
          <div className={cx('region')}>
            <Region
              region1={region}
              region2={subRegion}
              onRegionChange={(reg1, reg2) => {
                setRegion(reg1);
                setSubRegion(reg2);
              }}
            />
          </div>
        </div>
        <div className={cx('submit-container')}>
          <button
            className={cx('submit-button', { 'care-button': role === 'careUser', 'general-button': role === 'user' })}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
