import React, { useState } from 'react';
import styles from 'pages/user/register/Register.module.scss';
import cs from 'classnames/bind';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthInput, AuthSelect, Region } from 'components';
import { InputStatus, validateInput } from 'lib';
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
  const nav = useNavigate();
  const location = useLocation();
  const { role, email, password } = location.state;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('20대');
  const [gender, setGender] = useState('남자');
  const [region, setRegion] = useState('');
  const [subRegion, setSubRegion] = useState('');

  //오류 메시지
  const [nameStatus, setNameStatus] = useState(InputStatus.NORMAL);
  const [phoneStatus, setPhoneStatus] = useState(InputStatus.NORMAL);

  // 입력 값 변경 시 유효성 검사 수행
  const handleInputChange = (inputValue, inputName, setStatus, setState) => {
    const status = validateInput(inputValue, inputName);
    setStatus(status);
    setState(inputValue);
  };

  // 모든 필드가 유효하고 값이 존재하는지 확인
  const isValid =
    nameStatus !== InputStatus.ERROR &&
    phoneStatus !== InputStatus.ERROR &&
    name !== '' &&
    phone !== '' &&
    age !== '' &&
    gender !== '' &&
    region !== '' &&
    subRegion !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('회원가입이 완료되었습니다!');
    nav('/login');
  };

  return (
    <div className={cx('wrapper')}>
      <p>서비스 이용에 필요한 정보를 작성해주세요.</p>
      <div className={cx('registerContainer')}>
        <AuthInput
          text="이름"
          status={nameStatus}
          type="string"
          name="name"
          onChange={(val) => handleInputChange(val, 'name', setNameStatus, setName)}
          value={name}
          placeholder="본명을 입력해주세요"
          message={nameStatus === InputStatus.ERROR ? '이름은 2글자 이상 작성해주세요.' : ''}
        />
        <AuthInput
          text="휴대폰 번호"
          status={phoneStatus}
          type="string"
          name="phone"
          value={phone}
          placeholder="-을 제외하고 입력해주세요"
          onChange={(val) => handleInputChange(val, 'phone', setPhoneStatus, setPhone)}
          message={phoneStatus === InputStatus.ERROR ? '올바른 형식이 아닙니다.' : ''}
        />
        <AuthSelect
          name="gender"
          text="성별"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={genderOptions}
        />
        <AuthSelect name="age" text="나이" value={age} onChange={(e) => setAge(e.target.value)} options={ageOptions} />
        <div className={cx('regionContainer')}>
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
        <div className={cx('submitBtnContainer')}>
          <button className={cx('submitBtn')} onClick={handleSubmit} disabled={!isValid}>
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
