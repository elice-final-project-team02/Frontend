import React, { useEffect } from 'react';
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
import { Button } from 'components';
import * as date from 'lib';
import axios from 'axios';
import { useGetRequest } from '../../../hooks/post/getRequest';
import { useGetUser } from '../../../hooks/getUser';
const cx = cs.bind(styles);

export default function PostDetail() {
  const [displayData, setDisplayData] = React.useState({});
  const { data: requestData, isLoading: isRequestLoading } = useGetRequest('65600c3a09c52d1b49d688ba');
  const { data: userData, isLoading: isUserLoading } = useGetUser();

  React.useEffect(() => {
    if (requestData && userData) {
      setDisplayData({
        title: requestData.title,
        content: requestData.content,
        region: requestData.careInformation.area.region,
        subRegion: requestData.careInformation.area.subRegion,
        careTarget: requestData.careInformation.careTarget,
        preferredMateAge: requestData.careInformation.preferredMateAge,
        preferredMateGender: requestData.careInformation.preferredMateGender,
        hourlyRate: requestData.reservation.hourlyRate,
        negotiableRate: requestData.negotiableRate,
        targetFeatures: requestData.careInformation.targetFeatures,
        cautionNotes: requestData.careInformation.cautionNotes,
        isLongTerm: requestData.reservation.isLongTerm,
        longTerm: requestData.reservation.longTerm,
        shortTerm: requestData.reservation.shortTerm,
        status: requestData.reservation.status,
        userRole: userData.role.role,
        userName: userData.name,
      });
    }
  }, [requestData, userData]);

  if (isRequestLoading) return <div>로딩중</div>;

  return (
    <div className={cx('wrapper')}>
      <div
        className={cx(
          'title-wrapper',
          displayData.userRole === 'user' ? 'user-role-background' : 'care-user-role-background'
        )}
      >
        <div className={cx('even-columns')}>
          <div className={cx('writer-image-wrapper')}>
            <span className={cx('writer-image')}>{<IoMdPerson />}</span>
            <span>{displayData.userName}</span>
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
              <span>지원자 수 {displayData.applicantsCount ?? 0}/5</span>
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
                <span className={cx('text-information')}>{`${
                  displayData.longTerm.startDate?.getMonth() + 1
                }/20~    ${displayData.longTerm.schedule.map((obj) => obj.careDay)}`}</span>
              ) : (
                <span className={cx('text-information')}>
                  {/* {`${date.changeDateToMonthAndDate(
                    displayData?.shortTerm[0].careDate
                  )} ~ ${date.changeDateToMonthAndDate(
                    displayData?.shortTerm[displayData.shortTerm.length - 1].careDate
                  )} (총 ${displayData.shortTerm.length}일)`} */}
                </span>
              )}
            </div>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons', 'watch-icon')}>
                <MdWatchLater />
              </span>
              {displayData.isLongTerm ? (
                <span
                  className={cx('text-information')}
                >{`${displayData.longTerm.schedule[0].startTime} ~ ${displayData.longTerm.schedule[0].endTime}`}</span>
              ) : (
                <span>{`${date.changeDateToMonthAndDate(displayData?.shortTerm?.careDate)}`}</span>
              )}
            </div>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons')}>
                <IoMdPerson />
              </span>
              <span className={cx('text-information')}>
                {displayData.preferredMateAge?.map((item, index) => (
                  <span key={index}>{item} </span>
                ))}
              </span>
              <span className={cx('text-information')}>{displayData.preferredMateGender}</span>
            </div>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons')}>
                <PiMoneyFill />
              </span>
              <span className={cx('text-information')}>{`${displayData.hourlyRate}원 ${
                displayData.negotiableRate ? '(협의가능)' : ''
              }`}</span>
            </div>
          </div>
        </div>
        <div className={cx('even-columns')}>
          {displayData.userRole === 'careUser' ? (
            <div className={cx('button-wrapper')}>
              <button
                className={cx(
                  'post-badge',
                  displayData.userRole === 'user' ? 'user-background-accent' : 'care-user-background-accent'
                )}
              >
                신청하기
              </button>
            </div>
          ) : (
            <div className={cx('button-wrapper', 'post-control-icon')}>
              <span className={cx('post-edit-icons')}>
                <BiSolidPencil />
              </span>
              <span className={cx('post-edit-icons')}>
                <PiTrashFill />
              </span>
              <button>
                <Link to="/posts/new">글 작성(임시)</Link>
              </button>
            </div>
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
    </div>
  );
}
