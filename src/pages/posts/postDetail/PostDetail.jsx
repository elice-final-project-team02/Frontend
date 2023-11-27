import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PostDetail.module.scss';
import cs from 'classnames/bind';
import { FiTrash } from 'react-icons/fi';
import { MdLocationOn, MdWatchLater } from 'react-icons/md';
import { AiFillCalendar } from 'react-icons/ai';
import { IoMdPerson } from 'react-icons/io';
import { PiMoneyFill, PiTrashFill } from 'react-icons/pi';
import { BiSolidPencil } from 'react-icons/bi';
import { Child } from 'assets/images';
import { Link } from 'react-router-dom';
import * as date from 'lib';
import { useGetUser, useDeletePostAndGoHome, useGetRequestGoHome } from 'hooks';
import * as data from 'lib';
import MessageForm from 'components/common/message/MessageForm';
const cx = cs.bind(styles);

export default function PostDetail() {
  const postId = '65644e7f164e5ba71654b75b';
  const [displayData, setDisplayData] = React.useState({});
  const { data: requestData, isLoading: isRequestLoading } = useGetRequestGoHome(postId);
  const { data: userData } = useGetUser();
  const { mutate } = useDeletePostAndGoHome(postId);
  // 신청 form 양식 모달창 state
  const [requestForm, setRequestForm] = useState(false);
  // 돌봄메이트 신청하기 버튼 함수

  const requestButton = () => {
    setRequestForm(!requestForm);
  };

  React.useEffect(() => {
    console.log(requestData);
    if (requestData) {
      setDisplayData({
        title: requestData.post.title,
        content: requestData.post.content,
        region: requestData.post.careInformation.area.region,
        subRegion: requestData.post.careInformation.area.subRegion,
        careTarget: requestData.post.careInformation.careTarget,
        preferredmateAge: requestData.post.careInformation.preferredmateAge,
        preferredmateGender: requestData.post.careInformation.preferredmateGender,
        hourlyRate: requestData.post.reservation.hourlyRate,
        negotiableRate: requestData.post.negotiableRate,
        targetFeatures: requestData.post.careInformation.targetFeatures,
        cautionNotes: requestData.post.careInformation.cautionNotes,
        isLongTerm: requestData.post.reservation.isLongTerm,
        longTerm: requestData.post.reservation.longTerm,
        shortTerm:
          requestData.post.reservation.shortTerm &&
          requestData.post.reservation.shortTerm
            .filter((obj, index) => index !== 0)
            .sort((a, b) => new Date(a.careDate) - new Date(b.careDate)),
        status: requestData.post.reservation.status,
        userRole: userData.role.role,
        userId: userData._id,
        authorName: requestData.authorProfile.name,
        authorId: requestData.post.author,
        authorImageUrl: requestData.authorProfile.profileUrl,
      });
    }
  }, [requestData]);

  function handleDeletePost() {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      mutate();
    }
    return;
  }

  function isSomeWordsInArray(array) {
    return array.some((item) => item.includes('이상'));
  }
  function sortAgeList(array) {
    return array.map((age) => parseInt(age[0])).sort();
  }
  function formmatAgeListToTrimPretty(array) {
    let sortedArray = [];
    if (array.length > 1 && !isSomeWordsInArray(array)) {
      sortedArray = sortAgeList(array);
      return sortedArray.map((item, index, arr) => {
        if (index < arr.length - 1) {
          return `${item}0, `;
        } else if (index === arr.length - 1) return `${item}0대`;
        return item;
      });
    } else if (array.length > 1 && isSomeWordsInArray(array)) {
      sortedArray = sortAgeList(array);
      return sortedArray.map((item, index, arr) => {
        if (index < arr.length - 1) {
          return `${item}0, `;
        } else if (index === arr.length - 1) return `${item}0대 이상`;
        return item;
      });
    }
    return array;
  }
  if (isRequestLoading) return <div>로딩중</div>;

  return (
    <div className={cx('wrapper')}>
      <span className={cx('role-bookmark', displayData.isLongTerm ? 'long-term-background' : 'short-term-background')}>
        {displayData.isLongTerm ? '정기' : '단기'}
      </span>
      <button onClick={() => console.log(requestData)}>조회</button>
      <div
        className={cx(
          'title-wrapper',
          displayData.userRole === 'user' ? 'user-role-background' : 'care-user-role-background'
        )}
      >
        <div className={cx('even-columns')}>
          <div className={cx('writer-image-wrapper')}>
            {displayData.authorImageUrl ? (
              <span className={cx('writer-image')}>
                <img src={displayData.authorImageUrl} alt="작성자 프로필사진" />
              </span>
            ) : (
              <span className={cx('writer-image')}>{<IoMdPerson />}</span>
            )}

            <span>{displayData.authorName}</span>
          </div>
        </div>
        <div className={cx('even-columns')}>
          <div className={cx('post-title-wrapper')}>
            <p className={cx('post-title')}>{displayData.title}</p>
            <div className={cx('post-badge-wrapper')}>
              <span
                className={cx(
                  'post-badge',
                  displayData.userRole === 'user' ? 'user-background-accent' : 'care-user-background-accent'
                )}
              >
                {displayData.status}
              </span>
            </div>
          </div>
        </div>
        <div className={cx('even-columns')}>
          <div className={cx('post-information-wrapper')}>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons')}>
                <MdLocationOn />
              </span>
              <span className={cx('text-information')}>{`${displayData.region} ${displayData.subRegion}`}</span>
            </div>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons')}>
                <AiFillCalendar />
              </span>
              {displayData.isLongTerm ? (
                <span className={cx('text-information')}>
                  {`${date.changeDateToMonthAndDate(
                    displayData.longTerm.startDate
                  )} ~ ${displayData.longTerm.schedule.map((obj) => obj.careDay)}`}
                </span>
              ) : (
                displayData.shortTerm && (
                  <span className={cx('text-information')}>
                    {`${date.changeDateToMonthAndDate(
                      displayData?.shortTerm[0].careDate
                    )} ~ ${date.changeDateToMonthAndDate(
                      displayData?.shortTerm[displayData.shortTerm.length - 1].careDate
                    )} (총 ${displayData.shortTerm.length}일)`}
                  </span>
                )
              )}
            </div>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons', 'watch-icon')}>
                <MdWatchLater />
              </span>
              {displayData.isLongTerm ? (
                <span className={cx('text-information')}>
                  {displayData.longTerm &&
                    `${date.changeDateToAmPmAndHour(
                      displayData.longTerm.schedule[0]?.startTime
                    )} ~ ${date.changeDateToAmPmAndHour(displayData.longTerm.schedule[0]?.endTime)}`}
                </span>
              ) : (
                <span className={cx('text-information')}>
                  {displayData.shortTerm &&
                    `${date.changeDateToAmPmAndHour(
                      displayData.shortTerm[0].startTime
                    )} ~ ${date.changeDateToAmPmAndHour(displayData.shortTerm[0].endTime)}`}
                </span>
              )}
            </div>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons')}>
                <IoMdPerson />
              </span>
              <span className={cx('text-information')}>
                {displayData.preferredmateAge &&
                  formmatAgeListToTrimPretty(displayData.preferredmateAge).map((item, index) => (
                    <span key={index}>{item} </span>
                  ))}
              </span>
              <span className={cx('text-information', 'gender-span')}>{displayData.preferredmateGender}</span>
            </div>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons')}>
                <PiMoneyFill />
              </span>
              <span className={cx('text-information')}>{`${data.addCommas(displayData.hourlyRate)}원 ${
                displayData.negotiableRate ? '(협의가능)' : ''
              }`}</span>
            </div>
          </div>
        </div>
        <div className={cx('even-columns')}>
          {displayData.userRole === 'careUser' ? (
            <div className={cx('button-wrapper')}>
              <button
                onClick={() => {
                  requestButton();
                }}
                className={cx(
                  'post-badge',
                  displayData.userRole === 'user' ? 'user-background-accent' : 'care-user-background-accent'
                )}
              >
                신청하기
              </button>
            </div>
          ) : (
            displayData.userId === displayData.authorId && (
              <div className={cx('button-wrapper', 'post-control-icon')}>
                <span className={cx('post-edit-icons')}>
                  <Link to={`/posts/${postId}/edit`}>
                    <BiSolidPencil />
                  </Link>
                </span>
                <span className={cx('post-edit-icons')} onClick={handleDeletePost}>
                  <PiTrashFill />
                </span>
                <button>
                  <Link to="/posts/new">글 작성(임시)</Link>
                </button>
              </div>
            )
          )}
        </div>
      </div>
      <div className={cx('body-wrapper')}>
        <pre>{displayData.content}</pre>
      </div>
      <div
        className={cx(
          'description-wrapper',
          displayData.userRole === 'user' ? 'user-role-background' : 'care-user-role-background'
        )}
      >
        <div className={cx('even-columns')}>
          <div className={cx('features-wrapper')}>
            <p>
              <span>돌봄 대상 특징</span>
              <span>{displayData.targetFeatures}</span>
            </p>
            <p>
              <span>돌봄 대상 유의사항</span>
              <span>{displayData.cautionNotes}</span>
            </p>
          </div>
        </div>
        <div className={cx('even-columns')}>
          <span className={cx('target-image-wrapper')}>
            <img src={Child} alt="" />
          </span>
        </div>
      </div>

      {/* 신청하기 모달창 */}

      {requestForm === true ? <MessageForm /> : null}
    </div>
  );
}
