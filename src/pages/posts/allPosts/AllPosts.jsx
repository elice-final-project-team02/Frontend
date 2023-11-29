import React, { useEffect, useState } from 'react';
import styles from './AllPosts.module.scss';
import cs from 'classnames/bind';
import { Pagination, FilterCareTarget, SearchBar, PostList } from 'components';
import { useGetPostList } from 'hooks';
import { useSearchParams } from 'react-router-dom';
const cx = cs.bind(styles);

export default function AllPosts() {
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTarget, setSearchTarget] = useState('');
  const [searchIsLongTerm, setSearchIsLongTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ careTarget: searchParams.get('careTarget'), isLongTerm: searchParams.get('isLongTerm') });
  };
  const { data: postsData, isLoading } = useGetPostList(currentPage + 1, searchTarget, searchIsLongTerm);

  console.log(postsData);
  // let totalPage = 0;

  // if (postsData) {
  //   totalPage = postsData.totalCount;
  // } else {
  //   return <div className={cx('loading')}>로딩중...</div>;
  // }

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  return (
    <div className={cx('wrapper')}>
      <SearchBar className={cx('all-posts-style')} searchInput={searchInput} onSearchChange={handleSearchChange} />
      <div className={cx('recruit-container')}>
        <FilterCareTarget />

        {isLoading || !postsData ? (
          <div className={cx('loading')}>로딩중...</div>
        ) : (
          <PostList postsData={postsData} searchInput={searchInput} target={searchTarget} />
        )}
        {/* <div className={cx('pagination-container')}>
          <Pagination currPage={currentPage} onClickPage={setCurrentPage} pageCount={Math.ceil(totalPage / 6)} />
        </div> */}
      </div>
    </div>
  );
}
