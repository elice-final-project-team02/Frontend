import React, { useState, useRef, useEffect } from 'react';
import styles from './MyPage.module.scss';
import cs from 'classnames/bind';
import { ProfileImage } from 'assets/images';
import { MyTitle, MySideBar, Region } from 'components';
import { InputStatus, validateInput } from 'lib';
import { useGetUser } from '../../../hooks/getUser';
import { usePutUser } from '../../../hooks/putUser';
const cx = cs.bind(styles);

export default function MyPage() {
  const { data, isLoading } = useGetUser(); // 추후 로딩처리

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (data) {
      const displayedRole = data.role.careUser === 'user' ? '일반유저' : '돌봄유저';
      setUserInfo({
        profile_url: '',
        email: data.email,
        currentPassword: '',
        password: '',
        passwordConfirm: '',
        name: data.name,
        phoneNumber: data.phoneNumber,
        age: data.age,
        gender: data.gender,
        region: data.area.region,
        subRegion: data.area.subRegion,
        role: displayedRole,
        introduction: data.introduction || '',
      });
    }
  }, [data]);

  const updatedUserInfo = {
    profile_url: userInfo.profile_url,
    name: userInfo.name,
    phoneNumber: userInfo.phoneNumber,
    age: userInfo.age,
    gender: userInfo.gender,
    region: userInfo.region,
    subRegion: userInfo.subRegion,
    introduction: userInfo.introduction,
  };

  if (userInfo.currentPassword) {
    updatedUserInfo.password = userInfo.currentPassword;
  }
  if (userInfo.password) {
    updatedUserInfo.newPassword = userInfo.password;
  }

  const { mutate } = usePutUser();

  const formattedPhone = userInfo.phoneNumber && userInfo.phoneNumber.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');

  const [inputErrors, setInputErrors] = useState({
    profile_url: false,
    name: false,
    phoneNumber: false,
    password: false,
    passwordConfirm: false,
  });

  const [edit, setEdit] = useState(false);
  const [editPwd, setEditPwd] = useState(false);
  const imgRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(userInfo.profile_url || ProfileImage);
  const MaxImageSize = 5 * 1024 * 1024; // 최대 용량 5MB

  // img 수정
  const handleUploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      // 용량 체크
      if (e.target.files[0].size > MaxImageSize) {
        setInputErrors({ ...inputErrors, profile_url: true });
        return; // 용량 초과 시 처리 중단
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setUserInfo({ ...userInfo, profile_url: e.target.result });
        setInputErrors({ ...inputErrors, profile_url: false });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUploadImageButtonClick = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const handleInputChange = (e, password = null) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });

    // 유효성 검사 수행
    const status = validateInput(value, name, password);
    const newInputErrors = { ...inputErrors };
    newInputErrors[name] = status === InputStatus.ERROR;
    setInputErrors(newInputErrors);
  };

  const handleRegionChange = (region1, region2) => {
    setUserInfo({ ...userInfo, region: region1, subRegion: region2 });
  };

  // 모든 필드가 유효하고 값이 존재하는지 확인
  const isValid =
    !Object.values(inputErrors).includes(true) &&
    userInfo.name !== '' &&
    userInfo.phoneNumber !== '' &&
    userInfo.region !== '' &&
    userInfo.subRegion !== '' &&
    (!editPwd || (userInfo.currentPassword !== '' && userInfo.password !== '' && userInfo.passwordConfirm !== ''));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // 각 필드 값을 FormData에 추가
    Object.keys(updatedUserInfo).forEach((key) => {
      formData.append(key, updatedUserInfo[key]);
    });

    mutate(formData, {
      onSuccess: () => {
        setEdit(false);
        setEditPwd(false);
      },
    });
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('mypage')}>
        <div className={cx('sidebar')}>
          <MySideBar />
        </div>
        <main>
          {isLoading ? (
            <div className={cx('loading')}>로딩중...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <MyTitle text="MY PAGE" />
              <div className={cx('content')}>
                <div className={cx('profile')}>
                  {edit ? (
                    <>
                      <img src={selectedImage} alt="이미지 미리보기" />
                      <input
                        type="file"
                        accept="image/*"
                        name="profile_url"
                        ref={imgRef}
                        onChange={handleUploadImage}
                      />
                      <button type="button" onClick={handleUploadImageButtonClick} className={cx('edit-image')}>
                        변경하기
                      </button>
                      {inputErrors.profile_url && (
                        <p className={cx('error-text')}>
                          이미지 용량은 최대
                          <br /> 5MB 입니다.
                        </p>
                      )}
                    </>
                  ) : (
                    <img src={ProfileImage} alt="프로필사진" />
                  )}
                </div>
                <div className={cx('info')}>
                  <div className={cx('left')}>
                    <div className={cx('email')}>
                      <h1>이메일</h1>
                      <p>{userInfo.email}</p>
                    </div>
                    <div className={cx('name')}>
                      <h1>이름</h1>
                      {edit ? (
                        <>
                          <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
                          {inputErrors.name && <p className={cx('error-text')}>이름은 2글자 이상 작성해주세요.</p>}
                        </>
                      ) : (
                        <p>{userInfo.name}</p>
                      )}
                    </div>
                    {edit && (
                      <button type="button" className={cx('edit-password')} onClick={() => setEditPwd(true)}>
                        비밀번호 수정
                      </button>
                    )}
                    {editPwd && (
                      <div>
                        <div className={cx('current-password')}>
                          <h1>기존 비밀번호</h1>
                          <input type="password" name="currentPassword" onChange={handleInputChange} />
                        </div>
                        <div className={cx('new-password')}>
                          <h1>새 비밀번호</h1>
                          <input type="password" name="password" onChange={handleInputChange} />
                          {inputErrors.password && (
                            <p className={cx('error-text')}>
                              비밀번호는 숫자, 영문자, 특수문자 조합으로 8자 이상이어야 합니다.
                            </p>
                          )}
                        </div>
                        <div className={cx('confirm-new-password')}>
                          <h1>새 비밀번호 확인</h1>
                          <input
                            type="password"
                            name="passwordConfirm"
                            onChange={(e) => handleInputChange(e, userInfo.password)}
                          />
                          {inputErrors.passwordConfirm && (
                            <p className={cx('error-text')}>비밀번호가 일치하지 않습니다.</p>
                          )}
                        </div>
                        <button type="button" onClick={() => setEditPwd(false)} className={cx('cancel-password')}>
                          비밀번호 수정 취소
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={cx('right')}>
                    <div className={cx('phone-number')}>
                      <h1>전화번호</h1>
                      {edit ? (
                        <>
                          <input
                            type="text"
                            name="phone"
                            value={userInfo.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="-을 제외하고 입력해주세요."
                          />
                          {inputErrors.phoneNumber && <p className={cx('error-text')}>올바른 형식이 아닙니다.</p>}
                        </>
                      ) : (
                        <p>{formattedPhone}</p>
                      )}
                    </div>
                    <div className={cx('age')}>
                      <h1>나이</h1>
                      {edit ? (
                        <select name="age" value={userInfo.age} onChange={handleInputChange}>
                          <option value="20대">20대</option>
                          <option value="30대">30대</option>
                          <option value="40대">40대</option>
                          <option value="50대">50대</option>
                          <option value="60대 이상">60대 이상</option>
                        </select>
                      ) : (
                        <p>{userInfo.age}</p>
                      )}
                    </div>
                    <div className={cx('gender')}>
                      <h1>성별</h1>
                      {edit ? (
                        <select name="gender" value={userInfo.gender} onChange={handleInputChange}>
                          <option value="남자">남자</option>
                          <option value="여자">여자</option>
                        </select>
                      ) : (
                        <p>{userInfo.gender}</p>
                      )}
                    </div>
                    <div className={cx('region')}>
                      <h1>지역</h1>
                      {edit ? (
                        <Region
                          region1={userInfo.region}
                          region2={userInfo.subRegion}
                          onRegionChange={handleRegionChange}
                        />
                      ) : (
                        <p>
                          {userInfo.region}/{userInfo.subRegion}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx('introduce')}>
                <h1>INTRODUCE</h1>
                <span>{userInfo.role}</span>
                {edit ? (
                  <textarea
                    name="introduction"
                    value={userInfo.introduction}
                    onChange={handleInputChange}
                    placeholder="안녕하세요. 저는 사회복지사 자격증 2급을 가지고 있습니다."
                  />
                ) : (
                  <p>{userInfo.introduction}</p>
                )}
              </div>
              {edit ? (
                ''
              ) : (
                <button type="button" className={cx('edit-button')} onClick={() => setEdit(true)}>
                  수정하기
                </button>
              )}
              {edit && (
                <div>
                  <button type="submit" disabled={!isValid} className={cx('save-button')}>
                    수정완료
                  </button>
                  <button
                    type="button"
                    className={cx('cancel-button')}
                    onClick={() => {
                      setEdit(false);
                      setEditPwd(false);
                      setSelectedImage(userInfo.profile_url || ProfileImage);
                    }}
                  >
                    취소
                  </button>
                </div>
              )}
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
