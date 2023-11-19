import React, { useState, useRef, useCallback } from 'react';
import styles from './MyPage.module.scss';
import cs from 'classnames/bind';
import ProfileImage from 'assets/images/user.png';
import { MyTitle, MySideBar, Region } from 'components';
const cx = cs.bind(styles);

export default function MyPage() {
  // 임시 데이터 (추후 get 요청)
  const [userInfo, setUserInfo] = useState({
    profile_url: '',
    email: 'test@test.com',
    name: 'user1',
    phone_number: '01011112222',
    age: '20대',
    gender: '여자',
    region: '서울특별시',
    sub_region: '강남구',
    role: '돌봄유저',
    introduction: '안녕하세요! 저는 사회복지사 2급 자격증을 가지고 있습니다.',
  });
  const formattedPhone = userInfo.phone_number.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');

  const [edit, setEdit] = useState(false);
  const [editPwd, setEditPwd] = useState(false);
  const imgRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(userInfo.profile_url || ProfileImage);

  // img 수정
  const handleUploadImage = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
          setUserInfo({ ...userInfo, profile_url: e.target.result });
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    [userInfo]
  );

  const handleUploadImageButtonClick = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleRegionChange = (region1, region2) => {
    setUserInfo({ ...userInfo, region: region1, sub_region: region2 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // put 요청 > 데이터 get 요청
    alert('수정이 완료되었습니다.');
    setEdit(false);
    setEditPwd(false);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('mypage')}>
        <div className={cx('sidebar')}>
          <MySideBar />
        </div>
        <main>
          <form onSubmit={handleSubmit}>
            <MyTitle text="MY PAGE" />
            <div className={cx('content')}>
              <div className={cx('profile')}>
                {edit ? (
                  <>
                    <img src={selectedImage} alt="이미지 미리보기" />
                    <input type="file" accept="image/*" name="profile_url" ref={imgRef} onChange={handleUploadImage} />
                    <button type="button" onClick={handleUploadImageButtonClick} className={cx('editImg')}>
                      변경하기
                    </button>
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
                      <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
                    ) : (
                      <p>{userInfo.name}</p>
                    )}
                  </div>
                  {edit && (
                    <button type="button" className={cx('editPwd')} onClick={() => setEditPwd(true)}>
                      비밀번호 수정
                    </button>
                  )}
                  {editPwd && (
                    <div>
                      <div className={cx('currentPwd')}>
                        <h1>기존 비밀번호</h1>
                        <input type="password" />
                      </div>
                      <div className={cx('newPwd')}>
                        <h1>새 비밀번호</h1>
                        <input type="password" name="password" onChange={handleInputChange} />
                      </div>
                      <div className={cx('confirmNewPwd')}>
                        <h1>새 비밀번호 확인</h1>
                        <input type="password" />
                      </div>
                      <button type="button" onClick={() => setEditPwd(false)} className={cx('cancelPwd')}>
                        비밀번호 수정 취소
                      </button>
                    </div>
                  )}
                </div>
                <div className={cx('right')}>
                  <div className={cx('phone')}>
                    <h1>전화번호</h1>
                    {edit ? (
                      <input
                        type="text"
                        name="phone_number"
                        value={userInfo.phone_number}
                        onChange={handleInputChange}
                      />
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
                        region2={userInfo.sub_region}
                        onRegionChange={handleRegionChange}
                      />
                    ) : (
                      <p>
                        {userInfo.region}/{userInfo.sub_region}
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
                <textarea name="introduction" value={userInfo.introduction} onChange={handleInputChange} />
              ) : (
                <p>{userInfo.introduction}</p>
              )}
            </div>
            {edit ? (
              ''
            ) : (
              <button type="button" className={cx('editBtn')} onClick={() => setEdit(true)}>
                수정하기
              </button>
            )}
            {edit && (
              <div>
                <button type="submit" className={cx('saveBtn')}>
                  수정완료
                </button>
                <button
                  type="button"
                  className={cx('cancelBtn')}
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
        </main>
      </div>
    </div>
  );
}
