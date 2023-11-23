import React from 'react';
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
const cx = cs.bind(styles);

export default function PostDetail() {
  const [userRole, setUserRole] = React.useState('user');
  const postStatus = '모집중';
  const countOfCandidates = 3;
  const isLongTerm = true;
  const userName = '쓰담이';
  const mockData = {
    title: '등하원 시터 구합니다.',
    content: `등하원 시터 구합니다. 여아 7세 한명이랑 남아 3살입니다.\n\n안녕하세요 저는 디자이너입니다~\n지우실거면 지워주세용용\n\n귀염뽀짝한 글이네요 지우지말아주세요~`,
    region: '부산',
    subRegion: '서면',
    careTarget: '아동',
    longTerm: {
      startDate: new Date(),
      schedule: [
        {
          careDay: '월',
          startTime: new Date(),
          endTime: new Date(),
        },
        {
          careDay: '수',
          startTime: new Date(),
          endTime: new Date(),
        },
        {
          careDay: '금',
          startTime: new Date(),
          endTime: new Date(),
        },
      ],
    },

    preferredMateAge: ['20대', '30대'],
    preferredMateGender: '여성',
    hourlyRate: 15000,
    negotiableRate: true,
    targetFeatures: '7살 여아, 활발함',
    cautionNotes: '조류공포증있음',
    careTerm: 'short',
  };
  // function changeTargetTypeStringToComponentOfImage(type) {
  //   switch (type) {
  //     case '아동':
  //       return ();
  //     case '노인':
  //       return 'Senior1';
  //     case '장애인':
  //       return 'Disabled';
  //     default:
  //       return;
  //   }
  // }

  function handleUserRole() {
    if (userRole === 'user') setUserRole('care-user');
    else setUserRole('user');
    return;
  }
  return (
    <div className={cx('wrapper')}>
      <p style={{ fontSize: '30px' }}>현재 {userRole === 'user' ? '일반유저 페이지' : '돌봄유저 페이지'}</p>
      <button onClick={handleUserRole}>
        {userRole === 'user' ? '돌봄유저 보기(임시용)' : '일반유저 보기(임시용)'}
      </button>
      <div className={cx('title-wrapper', userRole === 'user' ? 'user-role-background' : 'care-user-role-background')}>
        <div className={cx('even-columns')}>
          <div className={cx('writer-image-wrapper')}>
            <span className={cx('writer-image')}>{<IoMdPerson />}</span>
            <span>{userName}</span>
          </div>
        </div>
        <div className={cx('even-columns')}>
          <div className={cx('post-title-wrapper')}>
            <p className={cx('post-title')}>{mockData.title}</p>
            <div className={cx('post-badge-wrapper')}>
              <span
                className={cx(
                  'post-badge',
                  userRole === 'user' ? 'user-background-accent' : 'care-user-background-accent'
                )}
              >
                {postStatus}
              </span>
              <span>지원자 수 {countOfCandidates}/5</span>
            </div>
          </div>
        </div>
        <div className={cx('even-columns')}>
          <div className={cx('post-information-wrapper')}>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons')}>
                <MdLocationOn />
              </span>
              <span className={cx('text-information')}>{`${mockData.region} ${mockData.subRegion}`}</span>
            </div>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons')}>
                <AiFillCalendar />
              </span>
              <span className={cx('text-information')}>{`${
                mockData.longTerm.startDate.getMonth() + 1
              }/20~    ${mockData.longTerm.schedule.map((obj) => obj.careDay)}`}</span>
            </div>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons', 'watch-icon')}>
                <MdWatchLater />
              </span>
              <span
                className={cx('text-information')}
              >{`${mockData.longTerm.schedule[0].startTime} ~ ${mockData.longTerm.schedule[0].endTime}`}</span>
            </div>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons')}>
                <IoMdPerson />
              </span>
              <span className={cx('text-information')}>
                {mockData.preferredMateAge.map((item) => (
                  <span>{item} </span>
                ))}
              </span>
              <span className={cx('text-information')}>{mockData.preferredMateGender}</span>
            </div>
            <div className={cx('icon-text-wrapper')}>
              <span className={cx('information-icons')}>
                <PiMoneyFill />
              </span>
              <span className={cx('text-information')}>{`${mockData.hourlyRate}원 ${
                mockData.negotiableRate ? '(협의가능)' : null
              }`}</span>
            </div>
          </div>
        </div>
        <div className={cx('even-columns')}>
          {userRole === 'care-user' ? (
            <div className={cx('button-wrapper')}>
              <button
                className={cx(
                  'post-badge',
                  userRole === 'user' ? 'user-background-accent' : 'care-user-background-accent'
                )}
              >
                신청하기
              </button>
            </div>
          ) : (
            <div className={cx('button-wrapper', 'post-control-icon')}>
              <span>
                <BiSolidPencil />
              </span>
              <span>
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
        <pre>{mockData.content}</pre>
      </div>
      <div
        className={cx(
          'description-wrapper',
          userRole === 'user' ? 'user-role-background' : 'care-user-role-background'
        )}
      >
        <div className={cx('even-columns')}>
          <div className={cx('features-wrapper')}>
            <p>
              <span>돌봄 대상 특징</span>
              <span>{mockData.targetFeatures}</span>
            </p>
            <p>
              <span>돌봄 대상 유의사항</span>
              <span>{mockData.cautionNotes}</span>
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
