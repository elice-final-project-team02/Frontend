import React, { useState } from 'react';
import styles from './MessageForm.module.scss';
import { useParams } from 'react-router-dom';
import cs from 'classnames/bind';
import { ProfileImage } from 'assets/images';
import { FaUser, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useGetMateUserInfo, usePostApplicate } from 'hooks';
import { messageBoxState, chatId } from 'recoil/storage';
import { useSetRecoilState } from 'recoil';
const cx = cs.bind(styles);

/* 게시글 상세 페이지 (돌봄메이트 -> 일반유저)
신청하기 버튼 클릭시 뜨는 신청form 모달 창 컴포넌트 */

export default function MessageForm({ setRequestForm }) {
  const { id } = useParams();

  const [displayData, setDisplayData] = useState({});
  const { mutate } = usePostApplicate();

  // 돌봄유저 정보 조회
  const { data: getMateUser } = useGetMateUserInfo({ postId: id });

  React.useEffect(() => {
    if (getMateUser) {
      setDisplayData({
        profileUrl: getMateUser.user.profileUrl,
        name: getMateUser.user.name,
        age: getMateUser.user.age,
        gender: getMateUser.user.gender,
        region: getMateUser.user.region,
        subRegion: getMateUser.user.subRegion,
        phoneNumber: getMateUser.user.phoneNumber,
        introduction: getMateUser.user.introduction,
        careTarget: getMateUser.careTarget,
      });
    }
  }, [getMateUser]);

  // 신청하기(send)
  const useApplicateRequest = () => {
    mutate(
      { postId: id, content: displayData.introduction },
      {
        onSuccess: (res) => {
          if (res.data.chat._id) {
            setRequestForm(false); // 모달창 닫기 state함수
          }
        },
      }
    );
  };

  return (
    <div className={cx('wrapper')}>
      {/* 돌봄메이트 신청하기 form 모달 창 */}
      <div className={cx('request-form-box')}>
        {/* 돌봄메이트 정보 영역 */}
        <div className={cx('request-mate-infos')}>
          <button className={cx('btn-close')} onClick={() => setRequestForm(false)}>
            <IoMdClose size="15" />
          </button>
          {/* 돌봄메이트 프로필 사진 영역 */}
          <div className={cx('mate-imgbox')}>
            <img
              className={cx('profile-photo')}
              src={displayData?.profileUrl || ProfileImage}
              alt="돌봄메이트 프로필이미지"
            />
          </div>

          {/* 이름, 키워드, 지역, 성별/나이*/}
          <div className={cx('mateinfo-leftbox')}>
            <p className={cx('matename')}>{displayData?.name}</p>
            <p className={cx('keyword')}>{displayData?.careTarget}</p>
            <div className={cx('icons-box')}>
              <div className={cx('box1')}>
                <span>
                  <FaUser size="15" color="#999" />
                </span>
                <span className={cx('genderinfo')}>
                  {displayData?.age} {displayData?.gender}
                </span>
                <span>
                  <FaMapMarkerAlt size="15" color="#999" />
                </span>
                <span className={cx('areainfo')}>
                  {displayData?.region} {displayData?.subRegion}
                </span>
              </div>
            </div>{' '}
            {/* icons box End */}
          </div>

          {/* 돌봄메이트가 신청하기 전에 본인 핸드폰번호 정보를 확인할수도 있을것같아 피그마대로 우선 휴대폰번호 영역을 넣었습니다.
           */}
          <div className={cx('phonebox')}>
            <span>
              <FaPhone />
              Phone
            </span>
            <p className={cx('phonenum')}>{displayData?.phoneNumber}</p>
          </div>
        </div>

        {/* 소개 글 영역 */}
        <div className={cx('mate-descript')}>
          <textarea
            name=""
            id=""
            cols="70"
            rows="10"
            maxlength="100"
            placeholder="# 소개글 작성양식 (보유한 자격증 및 소개)
          예시) 안녕하세요 저는 사회복지사 2급 자격증을 보유하고 있는 정도움입니다."
            wrap="hard"
            defaultValue={displayData?.introduction || ''}
            autofocus
            required
          ></textarea>
          <p>100자 이내로 입력해주세요.</p>
        </div>

        <div className={cx('request-buttons')}>
          <button className={cx('btn-cancel')} onClick={() => setRequestForm(false)}>
            취소
          </button>
          <button className={cx('btn-request')} onClick={useApplicateRequest}>
            신청하기
          </button>
        </div>
      </div>
    </div>
  );
}
