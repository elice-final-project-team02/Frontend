import React, { useState, useEffect } from 'react';
import styles from './AllPosts.module.scss';
import cs from 'classnames/bind';
import { Pagination, FilterCareTarget, SearchBar, PostList } from 'components';
import axios from 'axios';
import { useGetRequest } from 'hooks';

const cx = cs.bind(styles);

const generateSampleData = (count, titlePrefix, careTarget) => {
  return Array.from({ length: count }, (_, index) => ({
    post_id: index + 1,
    region: '경기',
    subRegion: '파주',
    careTarget: `${careTarget}`,
    isLongTerm: false, //단기
    preferredMateAge: ['20대', '30대'],
    preferredMateGender: '여성',
    author: 'John Doe',
    timestamp: '11/10',
    title: `${titlePrefix} ${index + 1}`,
    care_days: '월 수 금',
    start_time: '09:00 AM',
    end_time: '05:00 PM',
    hourlyRate: 12000,
    negotiableRate: true,
    status: '모집 중',
    startDate: '11/14',
    endDate: '2023-01-20',
  }));
};

const generateSampleData2 = (count, titlePrefix, careTarget) => {
  return Array.from({ length: count }, (_, index) => ({
    post_id: index + 1,
    region: '부산',
    subRegion: '서면',
    careTarget: `${careTarget}`,
    isLongTerm: true, //정기
    preferredMateAge: ['20대', '30대', '40대', '50대'],
    preferredMateGender: '성별무관',
    author: 'John Doe',
    timestamp: '11/10',
    title: `${titlePrefix} ${index + 1}`,
    care_days: '월 화 수 목 금',
    start_time: '09:00 AM',
    end_time: '05:00 PM',
    hourlyRate: 16000,
    negotiableRate: false,
    status: '모집 중',
    startDate: '12/02',
    endDate: '2023-01-20',
  }));
};

const sampleData1 = generateSampleData(3, '5세 남아 등하원 시터 구해요', '아동', '정기');
const sampleData2 = generateSampleData2(4, '휠체어 장애인 돌봄 서비스 요청합니다.', '장애인', '단기');
const sampleData3 = generateSampleData(2, '80세 노인 오전 케어 구합니다.', '노인', '단기');

const sampleData = [...sampleData1, ...sampleData2, ...sampleData3];

export default function AllPosts() {
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  // const [posts, setPosts] = useState([]);

  // const { mutate } = useGetRequest('655819a3e1f7d427ef5c1474');
  // useEffect(() => {
  //   axios.get('https://api/posts')
  //     .then(response => {
  //       setPosts(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching posts:', error);
  //     });
  // }, []);

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  return (
    <div className={cx('wrapper')}>
      <SearchBar value={searchInput} onChange={handleSearchChange} />
      <div className={cx('recruit-container')}>
        <FilterCareTarget />
        <PostList
          posts={sampleData}
          searchInput={searchInput}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <div className={cx('pagination-container')}>
          <Pagination currPage={currentPage} onClickPage={setCurrentPage} pageCount={10} />
        </div>
      </div>
    </div>
  );
}
