import React, { useEffect, useState } from 'react';
import styles from './AllPosts.module.scss';
import cs from 'classnames/bind';
import { Pagination, FilterCareTarget, SearchBar, Card, LoadingModal } from 'components';
import { useGetPostList } from 'hooks';
import { Link, useSearchParams } from 'react-router-dom';
const cx = cs.bind(styles);

export default function AllPosts() {
  const [searchInput, setSearchInput] = useState('');
  const [currPage, setCurrPage] = useState(0);
  const [searchParams] = useSearchParams();
  const showPage = currPage + 1;
  const careTarget = searchParams.get('careTarget');
  const isLongTerm = searchParams.get('isLongTerm');
  const { data, isLoading } = useGetPostList({ showPage, careTarget, isLongTerm });
  const [postList, setPostList] = useState([]);
  const [filteredPostList, setFilteredPostList] = useState([]);

  React.useEffect(() => {
    setPostList([]);
    if (data) {
      setPostList([...data.posts]);
    }
  }, [data, currPage]);

  React.useEffect(() => {
    if (searchInput.length === 0) {
      setFilteredPostList([...postList]);
      return;
    } else {
      const filteredList = postList.filter((post) =>
        post.title.toLowerCase().replace(' ', '').includes(searchInput.toLowerCase().replace(' ', ''))
      );
      setFilteredPostList(filteredList);
      return;
    }
  }, [searchInput, postList, careTarget, isLongTerm]);

  React.useEffect(() => {
    setCurrPage(0);
  }, [searchInput, careTarget, isLongTerm]);

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  return (
    <div className={cx('wrapper')}>
      <SearchBar className={cx('all-posts-style')} searchInput={searchInput} onSearchChange={handleSearchChange} />{' '}
      <FilterCareTarget />
      <div className={cx('card-list-container')}>
        {isLoading && <LoadingModal message="게시글 목록을 불러오는 중입니다" />}
        {!isLoading && filteredPostList.length === 0 ? (
          <div>검색결과가 없습니다.</div>
        ) : (
          filteredPostList.map((data, index) => (
            <span key={index}>
              <Link to={`/posts/${data._id}`}>
                <Card data={data} />
              </Link>
            </span>
          ))
        )}
      </div>
      <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={data && Math.ceil(data.totalCount / 6)} />
    </div>
  );
}
