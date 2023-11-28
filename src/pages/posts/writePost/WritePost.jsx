import React from 'react';
import styles from './WritePost.module.scss';
import cs from 'classnames/bind';
import { DatesPicker, SeparateDatesPicker, ShowSelectedDateList, NewTimesPicker, Toggle } from 'components';
import { regions } from 'lib';
import InfantImage from 'assets/images/infant.png';
import SeniorOneImage from 'assets/images/senior1.png';
import Challenged from 'assets/images/challenged.png';
import { useNavigate } from 'react-router';
import { usePostRequest } from 'hooks';
import { useSearchParams } from 'react-router-dom';
const cx = cs.bind(styles);

export default function WritePost({ params, beforeData }) {
  const [searchParams, setSearchParams] = useSearchParams('');
  const predeterminedCareTarget = searchParams.get('careTarget');
  const [mainTime, setMainTime] = React.useState({
    mainStartTime: new Date(2020, 0, 0, 8),
    mainEndTime: new Date(2020, 0, 0, 20),
  });
  const [isEmptyValueInputNames, setIsEmptyValueInputNames] = React.useState([]);
  const [postContent, setPostContent] = React.useState({
    title: beforeData ? beforeData.post.title : '',
    content: beforeData ? beforeData.post.content : '',
    region: beforeData ? beforeData.post.careInformation.area.region : '',
    subRegion: beforeData ? beforeData.post.careInformation.area.subRegion : '',
    careTarget: beforeData ? beforeData.post.careInformation.careTarget : predeterminedCareTarget,
    longTerm:
      // beforeData && beforeData.post.reservation.isLongTerm
      //   ? {
      //       ...beforeData.post.reservation.longTerm,
      //       startDate: new Date(beforeData.post.reservation.longTerm.startDate.slice(0, 10)),
      //     }:
      {
        startDate: new Date(),
        schedule: [
          {
            careDay: '',
            startTime: mainTime.mainStartTime,
            endTime: mainTime.mainEndTime,
          },
        ],
      },
    shortTerm:
      beforeData && !beforeData.post.reservation.isLongTerm
        ? [...beforeData.post.reservation.shortTerm]
        : [
            {
              careDate: new Date(99, 1),
              startTime: mainTime.mainStartTime,
              endTime: mainTime.mainEndTime,
            },
          ],
    preferredMateAge: beforeData ? beforeData.post.careInformation.preferredmateAge : [],
    preferredMateGender: beforeData ? beforeData.post.careInformation.preferredmateGender : '',
    hourlyRate: beforeData ? beforeData.post.reservation.hourlyRate : 9620,
    negotiableRate: beforeData ? Boolean(beforeData.post.negotiableRate) : false,
    targetFeatures: beforeData ? beforeData.post.careInformation.targetFeatures : '',
    cautionNotes: beforeData ? beforeData.post.careInformation.cautionNotes : '',
    careTerm: beforeData ? (beforeData.post.reservation.isLongTerm ? 'long' : 'short') : 'short',
  });

  function formatterFinalHourlyRateToNumber() {
    if (typeof postContent.hourlyRate === 'string') {
      return postContent.hourlyRate.replace(',', '');
    } else {
      return postContent.hourlyRate;
    }
  }

  function formatDataToSendToApi() {
    return {
      title: postContent.title,
      content: postContent.content,
      region: postContent.region,
      subRegion: postContent.subRegion,
      careTarget: postContent.careTarget,
      isLongTerm: postContent.careTerm === 'short' ? false : true,
      longTerm: { ...postContent.longTerm },
      shortTerm: [...postContent.shortTerm],
      hourlyRate: parseInt(formatterFinalHourlyRateToNumber()),
      negotiableRate: postContent.negotiableRate,
      preferredmateAge: postContent.preferredMateAge,
      preferredmateGender: postContent.preferredMateGender,
      targetFeatures: postContent.targetFeatures,
      cautionNotes: postContent.cautionNotes,
    };
  }
  const body = formatDataToSendToApi(postContent);

  const { mutate, isLoading } = usePostRequest(body);

  async function handleSubmit(e) {
    e.preventDefault();
    checkEmptyValue();
    checkEmptyValueOfDate();
    if (isEmptyValueInputNames.length > 0) {
      alert('작성을 모두 완료해주시기 바랍니다');
      return;
    }

    mutate();
  }

  function handleChange(e) {
    if (e.target.name === 'hourlyRate') formatHourlyRate(e, e.target.value);
    if (e.target.name === 'title' && e.target.value.length > 35) {
      alert('제목은 35자 이하로 작성바랍니다');
      return;
    }
    setPostContent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    checkEmptyValue();
  }

  const navigation = useNavigate();

  function handleCancel() {
    if (window.confirm('페이지의 내용이 삭제됩니다. 계속 진행하시겠습니까?')) {
      navigation('/');
      return;
    }
    return;
  }

  function checkEmptyValue() {
    setIsEmptyValueInputNames([]);
    for (let key in postContent) {
      if (!postContent[key] && key !== 'longTerm' && key !== 'negotiableRate') {
        setIsEmptyValueInputNames((prev) => [...prev, key]);
      }
    }
    return;
  }

  function checkEmptyValueOfDate() {
    if (postContent.careTerm === 'long' && !postContent.longTerm.schedule.length) {
      alert('돌봄 요일을 선택해주세요');
      return;
    } else if (postContent.careTerm === 'short' && postContent.shortTerm.length < 2) {
      alert('돌봄 날짜를 선택해주세요');
      return;
    }
    return;
  }

  function formatHourlyRate(e, StringOfMoney) {
    const regex = new RegExp(/^(\d{1,3},)*(\d{3},)*\d{1,3}$/);
    if (regex.test(StringOfMoney))
      setPostContent((prev) => ({ ...prev, hourlyRate: Number(removeCommaInString(StringOfMoney)) }));
    else if (!null && e.target.value.length > 0) {
      alert('시급을 숫자로 입력해주세요');
      e.target.value = '';
      return;
    }
    return;
  }

  /** 단기, 정기 시작,종료 시간 일괄수정 */
  React.useEffect(() => {
    setPostContent({
      ...postContent,
      shortTerm: postContent.shortTerm.map((obj) => ({
        ...obj,
        startTime: mainTime.mainStartTime,
        endTime: mainTime.mainEndTime,
      })),
      longTerm: {
        ...postContent.longTerm,
        schedule: postContent.longTerm.schedule.map((obj) => ({
          ...obj,
          startTime: mainTime.mainStartTime,
          endTime: mainTime.mainEndTime,
        })),
      },
    });
  }, [mainTime]);

  /** 체크박스 기능함수 */
  function makeCheckHandler(checkedList, setCheckedList, isChecked, setIsChecked) {
    function checkedItemHandler(value, isChecked) {
      if (isChecked) {
        setCheckedList((prev) => [...prev, value]);
        return;
      }
      if (!isChecked && checkedList.includes(value)) {
        setCheckedList(checkedList.filter((item) => item !== value));
        return;
      }
      return;
    }
    function checkHandler(e, value) {
      setIsChecked(!isChecked);
      checkedItemHandler(value, e.target.checked);
    }
    return checkHandler;
  }
  const ageList = ['20대', '30대', '40대', '50대', '60대 이상'];
  const [checkedAgeList, setCheckedAgeList] = React.useState(
    beforeData ? beforeData.post.careInformation.preferredmateAge : []
  );
  const [isAgeChecked, setIsAgeChecked] = React.useState(false);
  const checkAgeHandler = makeCheckHandler(checkedAgeList, setCheckedAgeList, isAgeChecked, setIsAgeChecked);

  function handleAgeFree(e) {
    if (e.target.checked) {
      setCheckedAgeList([e.target.value]);
      return;
    } else {
      setCheckedAgeList([]);
      return;
    }
  }

  /** 선호연령 체크박스 실시간 반영 */
  React.useEffect(() => {
    /** 나이 무관 체크된 상태에서 다른 연령 체크하면 나이무관 해제  */
    if (checkedAgeList.includes('나이 무관') && checkedAgeList.length > 1) {
      const temp = [...checkedAgeList];
      const indexOfAgeFree = temp.indexOf('나이 무관');
      temp.splice(indexOfAgeFree, 1);
      setCheckedAgeList(temp);
      return;
    }
    return setPostContent({ ...postContent, preferredMateAge: checkedAgeList });
  }, [checkedAgeList]);

  const careDaysList = ['월', '화', '수', '목', '금', '토', '일'];
  const [checkedDaysList, setCheckedDaysList] = React.useState([]);
  const [isDayChecked, setIsDayChecked] = React.useState(false);
  const checkDayHandler = makeCheckHandler(checkedDaysList, setCheckedDaysList, isDayChecked, setIsDayChecked);

  /** 정기일정 요일 체크박스 실시간 반영 */
  React.useEffect(() => {
    return setPostContent({
      ...postContent,
      longTerm: {
        ...postContent.longTerm,
        schedule: checkedDaysList.map((item, index) => ({
          ...postContent.longTerm.schedule[index],
          careDay: item,
          startTime: mainTime.mainStartTime,
          endTime: mainTime.mainEndTime,
        })),
      },
    });
  }, [checkedDaysList]);

  /** 단기, 정기일정 토글시마다 관련 데이터 초기화 */
  React.useEffect(() => {
    setCheckedDaysList([]);
    setPostContent({
      ...postContent,
      longTerm: {
        startDate: new Date(),
        schedule: [
          {
            careDay: '',
            startTime: mainTime.mainStartTime,
            endTime: mainTime.mainEndTime,
          },
        ],
      },
      shortTerm: [
        {
          careDate: new Date(99, 1),
          startTime: mainTime.mainStartTime,
          endTime: mainTime.mainEndTime,
        },
      ],
    });
    setMainTime({ mainStartTime: new Date(2020, 0, 0, 8), mainEndTime: new Date(2020, 0, 0, 20) });
  }, [postContent.careTerm]);

  /** 시급 입력창 3글자마다 쉼표 */
  function formatNumber(e) {
    const inputValue = removeCommaInString(e.target.value);
    const formattedValue = addCommas(inputValue);
    e.target.value = formattedValue;
  }

  function removeCommaInString(string) {
    if (typeof string === 'string') {
      return string.replace(/,/g, '');
    }
    return;
  }

  function addCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <div className={cx('wrapper')}>
      <button
        onClick={() => {
          console.log(postContent);
        }}
      >
        postContent
      </button>
      <button
        onClick={() => {
          console.log(beforeData);
        }}
      >
        beforeData
      </button>
      <button
        onClick={() => {
          console.log(checkedDaysList);
        }}
      >
        checkedDaysList
      </button>
      <form onSubmit={handleSubmit}>
        <div className={cx('title-wrapper')}>
          <label className={cx('title-level')}>제목</label>
          <input
            type="text"
            onChange={handleChange}
            value={postContent.title}
            name="title"
            required
            onBlur={checkEmptyValue}
            placeholder="ex) 5세 남아 등하원 도우미 구합니다."
            maxLength={35}
          />
        </div>
        <div className={cx('content')}>
          <textarea
            value={postContent.content}
            onChange={handleChange}
            placeholder="ex) 유치원 등하원 시 케어해주시면 됩니다."
            name="content"
            required
            onBlur={checkEmptyValue}
            maxLength={200}
            rows="6"
          ></textarea>
        </div>
        <div className={cx('region-wrapper')}>
          <span className={cx('title-level')} v>
            지역
          </span>
          <select value={postContent.region} required name="region" onChange={handleChange}>
            <option value="">시</option>
            {regions[0].map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>
          <select value={postContent.subRegion} required name="subRegion" onChange={handleChange}>
            <option value="">구</option>
            {postContent.region &&
              regions[regions[0].indexOf(postContent.region) + 1]?.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
          </select>
        </div>
        <div className={cx('care-target-wrapper')}>
          <span className={cx('title-level')}>돌봄 대상</span>
          <div className={cx('targets-wrapper')}>
            <div className={cx('target-wrapper')}>
              <input
                type="radio"
                onChange={handleChange}
                name="careTarget"
                value="아동"
                checked={postContent.careTarget === '아동'}
                id="target-infant"
              />
              <label htmlFor="target-infant">
                <span className={cx('target-image-wrapper')}>
                  <img src={InfantImage} alt="아동" />
                </span>
              </label>
              <span>아동</span>
            </div>
            <div className={cx('target-wrapper')}>
              <input
                type="radio"
                onChange={handleChange}
                checked={postContent.careTarget === '노인'}
                name="careTarget"
                value="노인"
                id="target-senior"
              />
              <label htmlFor="target-senior">
                <span className={cx('target-image-wrapper')}>
                  <img src={SeniorOneImage} alt="노인" />
                </span>
              </label>
              <span>노인</span>
            </div>
            <div className={cx('target-wrapper')}>
              <input
                type="radio"
                onChange={handleChange}
                checked={postContent.careTarget === '장애인'}
                name="careTarget"
                value="장애인"
                id="target-disabled"
              />
              <label htmlFor="target-disabled">
                <span className={cx('target-image-wrapper')}>
                  <img src={Challenged} alt="장애인" />
                </span>
              </label>
              <span>장애인</span>
            </div>
          </div>
        </div>
        <div className={cx('care-term-wrapper')}>
          <span className={cx('title-level', 'term-wrapper')}>
            돌봄 기간
            <span className={cx('hover-space', postContent.careTerm === 'long' ? 'hide' : null)}></span>
            <span className={cx('short-term-tooltip')}>한달 내 선택가능</span>
          </span>
          <Toggle
            initValue={postContent.careTerm}
            onChange={(e) => {
              if (e.target.checked) {
                setPostContent({ ...postContent, careTerm: 'long' });
              } else {
                setPostContent({ ...postContent, careTerm: 'short' });
              }
            }}
          ></Toggle>
        </div>
        {postContent.careTerm === 'long' && (
          <div className={cx('care-days-wrapper')}>
            <span className={cx('title-level')}>돌봄 시작일</span>
            <span className={cx('calendar-wrapper')}>
              <DatesPicker postContent={postContent} setPostContent={setPostContent} />
            </span>
            <div className={cx('days-title-wrapper')}>
              <span className={cx('title-level')}>돌봄 요일</span>
              <div className={cx('days-wrapper')}>
                {careDaysList.map((day, index) => (
                  <span key={index}>
                    <input
                      type="checkbox"
                      name="careDays"
                      checked={checkedDaysList.includes(day)}
                      onChange={(e) => {
                        checkDayHandler(e, day);
                      }}
                      id={`day${index}`}
                    />
                    <label htmlFor={`day${index}`}>{day}</label>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className={cx('care-dates-wrapper')}>
          {postContent.careTerm === 'short' && (
            <SeparateDatesPicker postContent={postContent} setPostContent={setPostContent} mainTime={mainTime} />
          )}

          <div className={cx('main-time-wrapper')}>
            <label className={cx('title-level')}>시작 시간</label>
            <div className={cx('time-wrapper')}>
              <NewTimesPicker
                time={mainTime.mainStartTime}
                setTime={(date) => {
                  setMainTime({ ...mainTime, mainStartTime: new Date(date) });
                }}
              />
            </div>
            <label className={cx('title-level')}>종료 시간</label>
            <div className={cx('time-wrapper')}>
              <NewTimesPicker
                time={mainTime.mainEndTime}
                setTime={(date) => {
                  setMainTime({ ...mainTime, mainEndTime: new Date(date) });
                }}
                minzTime={mainTime.mainStartTime}
              />
            </div>
          </div>
          <div className={cx('selected-time-wrapper')}>
            {postContent.careTerm === 'short' ? (
              <ShowSelectedDateList
                type="short"
                mainTime={mainTime}
                array={postContent.shortTerm.map((obj) => obj.careDate)}
                setPostContent={setPostContent}
                postContent={postContent}
              />
            ) : (
              !!checkedDaysList.length && (
                <ShowSelectedDateList
                  type="long"
                  mainTime={mainTime}
                  array={postContent.longTerm.schedule.map((item) => item.careDay)}
                  postContent={postContent}
                  setPostContent={setPostContent}
                />
              )
            )}
          </div>
        </div>
        <div className={cx('preferred-mate-wrapper')}>
          <p className={cx('title-level')}>선호 돌봄유저</p>
          <div className={cx('preferred-mate-gender-wrapper')}>
            <input
              type="radio"
              onChange={handleChange}
              name="preferredMateGender"
              id="mateWoman"
              value="여성"
              checked={postContent.preferredMateGender === '여성'}
            />
            <label htmlFor="mateWoman">여성</label>
            <input
              type="radio"
              onChange={handleChange}
              name="preferredMateGender"
              id="mateMan"
              value="남성"
              checked={postContent.preferredMateGender === '남성'}
            />
            <label htmlFor="mateMan">남성</label>
            <input
              type="radio"
              onChange={handleChange}
              name="preferredMateGender"
              id="mateGenderFree"
              value="성별 무관"
              checked={postContent.preferredMateGender === '성별 무관'}
            />
            <label htmlFor="mateGenderFree">성별 무관</label>
          </div>

          <div className={cx('preferred-mate-age-wrapper')}>
            {ageList.map((age, index) => (
              <span key={index}>
                <input
                  id={age}
                  type="checkbox"
                  checked={checkedAgeList.includes(age)}
                  onChange={(e) => {
                    checkAgeHandler(e, age);
                    return setPostContent({ ...postContent, preferredMateAge: checkedAgeList });
                  }}
                />
                <label htmlFor={age}>{age}</label>
              </span>
            ))}
            <span>
              <input
                type="checkbox"
                id="mateAgeFree"
                value="나이 무관"
                checked={checkedAgeList.includes('나이 무관')}
                onChange={handleAgeFree}
              />
              <label htmlFor="mateAgeFree">나이 무관</label>
            </span>
          </div>
        </div>
        <div className={cx('hourly-rate-wrapper')}>
          <label className={cx('title-level')} htmlFor="">
            시급
          </label>
          <input
            type="text"
            name="hourlyRate"
            required
            onInput={formatNumber}
            onChange={handleChange}
            placeholder="숫자만 입력"
            onBlur={checkEmptyValue}
          />
          <input
            type="checkbox"
            name="negotiableRate"
            id="negotiableRate"
            value={postContent.negotiableRate}
            onChange={() => {
              setPostContent({ ...postContent, negotiableRate: !postContent.negotiableRate });
            }}
          />
          <label htmlFor="negotiableRate">시급 협의 가능</label>
        </div>
        <div className={cx('caution-note-wrapper')}>
          <span className={cx('title-level')}>돌봄 대상 특징</span>
          <textarea
            name="targetFeatures"
            required
            onChange={handleChange}
            value={postContent.targetFeatures}
            placeholder="ex) 나이, 성격, 좋아하는 것, 싫어하는 것 등"
            onBlur={checkEmptyValue}
            maxLength={200}
          ></textarea>
          <span className={cx('title-level')}>돌봄 대상 유의사항</span>
          <textarea
            name="cautionNotes"
            required
            onChange={handleChange}
            value={postContent.cautionNotes}
            onBlur={checkEmptyValue}
            placeholder="ex) 나이, 성격, 좋아하는 것, 싫어하는 것 등"
            maxLength={200}
          ></textarea>
        </div>
        <div className={cx('button-wrapper')}>
          <button type="button" className={cx('cancel')} onClick={handleCancel}>
            취소
          </button>
          <button type="submit" className={cx('primary')}>
            작성하기
          </button>
        </div>
      </form>
      {isLoading && <span style={{ marginRight: 'auto' }}>게시글 업로드중(임시)</span>}
    </div>
  );
}
