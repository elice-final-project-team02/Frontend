import React, { useState } from 'react';
import styles from './AllPosts.module.scss';
import cs from 'classnames/bind';
import { Pagination, FilterCareTarget, SearchBar, PostList } from '../../../components';

const cx = cs.bind(styles);

const generateSampleData = (count, titlePrefix) => {
  return Array.from({ length: count }, (_, index) => ({
    post_id: index + 1,
    region: '부산시 어쩌구',
    care_target: 'child',
    target_features: 'Example Target Features',
    preferredmate_age: '20대, 30대',
    preferredmate_gender: '남성',
    author: 'John Doe',
    timestamp: '11/10',
    title: `${titlePrefix} ${index + 1}`,
    care_term: '정기',
    care_days: '월 수 금',
    start_time: '09:00 AM',
    end_time: '05:00 PM',
    hourly_rate: '15,000',
    negotiable_rate: true,
    status: '모집 중',
    startDate: '2023-01-10',
    endDate: '2023-01-20',
  }));
};

const sampleData1 = generateSampleData(6, '5세 남아 등하원 시터 구해요');
const sampleData2 = generateSampleData(5, '휠체어 장애인 돌봄 서비스 요청합니다. ');
const sampleData3 = generateSampleData(5, '등하원 시터');

const sampleData = [...sampleData1, ...sampleData2, ...sampleData3];

export default function AllPosts() {
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  // const slicedCards = sampleData.slice((currPage - 1) * cardsPerPage, currPage * cardsPerPage);

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  return (
    <div className={cx('wrapper')}>
      <SearchBar value={searchInput} onChange={handleSearchChange} />
      <div className={cx('recruit-container')}>
        <FilterCareTarget />
        <PostList
          cardList={sampleData}
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
