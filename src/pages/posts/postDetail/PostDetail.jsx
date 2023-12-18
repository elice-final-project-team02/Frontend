import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './PostDetail.module.scss';
import cs from 'classnames/bind';
import { MdLocationOn, MdWatchLater } from 'react-icons/md';
import { AiFillCalendar } from 'react-icons/ai';
import { IoMdPerson } from 'react-icons/io';
import { PiMoneyFill, PiTrashFill } from 'react-icons/pi';
import { BiSolidPencil } from 'react-icons/bi';
import { Child, Senior1, Challenged } from 'assets/images';
import { Link } from 'react-router-dom';
import * as date from 'lib';
import * as data from 'lib';
import { useGetUser, useDeletePostAndGoHome, useGetRequestGoHome } from 'hooks';
import MessageForm from 'components/common/message/MessageForm.jsx';
import { LoadingModal } from 'components';
const cx = cs.bind(styles);

export default function PostDetail({ setMessageBoxState, setChatId }) {
  const { id } = useParams();
  const postId = id;
  const [aplicateFormData, setAplicateFormData] = React.useState({});
  const { data: requestData, isLoading: isRequestLoading } = useGetRequestGoHome(postId);
  const { data: userData, isLoading: isUserLoading } = useGetUser();
  const { mutate } = useDeletePostAndGoHome(postId);

  // 신청 form 양식 모달창 state
  const [requestForm, setRequestForm] = useState(false);

  React.useEffect(() => {
    if (requestData && userData) {
      setAplicateFormData({
        title: requestData.post.title,
        content: requestData.post.content,
        region: requestData.post.careInformation.area.region,
        subRegion: requestData.post.careInformation.area.subRegion,
        careTarget: requestData.post.careInformation.careTarget,
        preferredmateAge: requestData.post.careInformation.preferredmateAge,
        preferredmateGender: requestData.post.careInformation.preferredmateGender,
        hourlyRate: requestData.post.reservation.hourlyRate,
        negotiableRate: requestData.post.reservation.negotiableRate,
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
  }, [requestData, userData]);

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
  function sortCareDays(day) {
    const dayToNumber = day.map((obj) => date.changeKoreaDayOfWeekToNumber(obj.careDay));
    const sortedDays = dayToNumber.sort((a, b) => a - b);
    const numberToDay = sortedDays.map((obj) => date.changeNumberToKoreaDayOfWeek(obj));
    return numberToDay.join(' ');
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
  if (isRequestLoading && isUserLoading) return <LoadingModal message="게시글을 불러오는 중입니다" />;

  return (
    <div className={cx('wrapper')}>
      <span className={cx('role-bookmark', aplicateFormData.isLongTerm ? 'long-term-background' : 'short-term-background')}>
        {aplicateFormData.isLongTerm ? '정기' : '단기'}
      </span>
      <div className={cx('inside-wrapper')}>
        <div
          className={cx(
            'title-wrapper',
            aplicateFormData.userRole === 'user' ? 'user-role-background' : 'care-user-role-background'
          )}
        >
          <div className={cx('even-columns')}>
            <div className={cx('writer-image-wrapper')}>
              {aplicateFormData.authorImageUrl ? (
                <span className={cx('writer-image')}>
                  <img src={aplicateFormData.authorImageUrl} alt="작성자 프로필사진" />
                </span>
              ) : (
                <span className={cx('writer-image')}>{<IoMdPerson />}</span>
              )}
              <span>{aplicateFormData.authorName}</span>
            </div>
          </div>
          <div className={cx('even-columns')}>
            <div className={cx('post-title-wrapper')}>
              <p className={cx('post-title')}>{aplicateFormData.title}</p>
              <div className={cx('post-badge-wrapper')}>
                <span
                  className={cx(
                    'post-badge',
                    aplicateFormData.userRole === 'user' ? 'user-background-accent' : 'care-user-background-accent'
                  )}
                >
                  {aplicateFormData.status}
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
                <span className={cx('text-information')}>{`${aplicateFormData.region} ${aplicateFormData.subRegion}`}</span>
              </div>
              <div className={cx('icon-text-wrapper')}>
                <span className={cx('information-icons')}>
                  <AiFillCalendar />
                </span>
                {aplicateFormData.isLongTerm ? (
                  <span className={cx('text-information')}>
                    {`${date.changeDateToMonthAndDate(aplicateFormData.longTerm.startDate)}~ `}(
                    {sortCareDays(aplicateFormData.longTerm.schedule)})
                  </span>
                ) : (
                  aplicateFormData &&
                  aplicateFormData.shortTerm && (
                    <span className={cx('text-information')}>
                      {`${date.changeDateToMonthAndDate(
                        aplicateFormData?.shortTerm[0].careDate
                      )} ~ ${date.changeDateToMonthAndDate(
                        aplicateFormData?.shortTerm[aplicateFormData.shortTerm.length - 1].careDate
                      )} (총 ${aplicateFormData.shortTerm.length}일)`}
                    </span>
                  )
                )}
              </div>
              <div className={cx('icon-text-wrapper')}>
                <span className={cx('information-icons', 'watch-icon')}>
                  <MdWatchLater />
                </span>
                {aplicateFormData.isLongTerm ? (
                  <span className={cx('text-information')}>
                    {aplicateFormData.longTerm &&
                      `${date.changeDateToAmPmAndHour(
                        aplicateFormData.longTerm.schedule[0]?.startTime
                      )} ~ ${date.changeDateToAmPmAndHour(aplicateFormData.longTerm.schedule[0]?.endTime)}`}
                  </span>
                ) : (
                  <span className={cx('text-information')}>
                    {aplicateFormData.shortTerm &&
                      `${date.changeDateToAmPmAndHour(
                        aplicateFormData.shortTerm[0].startTime
                      )} ~ ${date.changeDateToAmPmAndHour(aplicateFormData.shortTerm[0].endTime)}`}
                  </span>
                )}
              </div>
              <div className={cx('icon-text-wrapper')}>
                <span className={cx('information-icons')}>
                  <IoMdPerson />
                </span>
                <span className={cx('text-information')}>
                  {aplicateFormData.preferredmateAge &&
                    formmatAgeListToTrimPretty(aplicateFormData.preferredmateAge).map((item, index) => (
                      <span key={index}>{item} </span>
                    ))}
                </span>
                <span className={cx('text-information', 'gender-span')}>{aplicateFormData.preferredmateGender}</span>
              </div>
              <div className={cx('icon-text-wrapper')}>
                <span className={cx('information-icons')}>
                  <PiMoneyFill />
                </span>
                <span className={cx('text-information')}>{`${data.addCommas(aplicateFormData.hourlyRate)}원 ${
                  aplicateFormData.negotiableRate ? '(협의가능)' : ''
                }`}</span>
              </div>
            </div>
          </div>
          <div className={cx('even-columns')}>
            {aplicateFormData.userRole === 'careUser' ? (
              <div className={cx('button-wrapper')}>
                {/* 게시글 상세 - 신청하기 버튼 */}
                <button
                  onClick={() => {
                    setRequestForm(!requestForm);
                  }}
                  className={cx(
                    'post-button',
                    'post-badge',
                    aplicateFormData.userRole === 'user' ? 'user-background-accent' : 'care-user-background-accent'
                  )}
                >
                  신청하기
                </button>
              </div>
            ) : (
              aplicateFormData.userId === aplicateFormData.authorId && (
                <div className={cx('button-wrapper', 'post-control-icon')}>
                  <span className={cx('post-edit-icons')}>
                    <Link to={`/posts/${postId}/edit`}>
                      <BiSolidPencil />
                    </Link>
                  </span>
                  <span className={cx('post-edit-icons')} onClick={handleDeletePost}>
                    <PiTrashFill />
                  </span>
                </div>
              )
            )}
          </div>
        </div>
        <div className={cx('body-wrapper')}>
          <p>{aplicateFormData.content}</p>
        </div>
        <div
          className={cx(
            'description-wrapper',
            aplicateFormData.userRole === 'user' ? 'user-role-background' : 'care-user-role-background'
          )}
        >
          <div className={cx('even-columns')}>
            <div className={cx('features-wrapper')}>
              <div className={cx('features')}>
                <span>돌봄 대상 특징</span>
                <p>{aplicateFormData.targetFeatures}</p>
              </div>
              <div className={cx('features')}>
                <span>돌봄 대상 유의사항</span>
                <p>{aplicateFormData.cautionNotes}</p>
              </div>
            </div>
          </div>
          <div className={cx('even-columns')}>
            <span className={cx('target-image-wrapper')}>
              <img
                src={
                  aplicateFormData.careTarget === '아동' ? Child : aplicateFormData.careTarget === '노인' ? Senior1 : Challenged
                }
                alt="targetImage"
                className={cx('target-image')}
              />
            </span>
          </div>
        </div>
      </div>

      {/* 신청하기 모달창 띄움 */}
      {requestForm === true ? (
        <MessageForm setMessageBoxState={setMessageBoxState} setChatId={setChatId} setRequestForm={setRequestForm} />
      ) : null}
    </div>
  );
}
