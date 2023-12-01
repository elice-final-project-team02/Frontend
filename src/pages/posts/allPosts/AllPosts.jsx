import React, { useEffect, useState } from 'react';
import styles from './AllPosts.module.scss';
import cs from 'classnames/bind';
import { Pagination, FilterCareTarget, SearchBar, Card, LoadingModal } from 'components';
import { useGetPostList } from 'hooks';
import { Link, useSearchParams } from 'react-router-dom';
import { NotFoundCharacter } from 'assets/images';
const cx = cs.bind(styles);

export default function AllPosts() {
  const [searchInput, setSearchInput] = useState('');
  const [currPage, setCurrPage] = useState(0);
  const nowPage = currPage + 1;
  const [searchParams] = useSearchParams();
  const careTarget = searchParams.get('careTarget');
  const isLongTerm = searchParams.get('isLongTerm');
  const { data, isLoading } = useGetPostList({ careTarget, isLongTerm });
  const [postList, setPostList] = useState([]);
  const [filteredPostList, setFilteredPostList] = useState([]);
  const PAGE_LIMIT = 6;
  useEffect(() => {
    setPostList([]);
    if (data) {
      setPostList([...data.posts]);
    }
  }, [data]);

  useEffect(() => {
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

  useEffect(() => {
    setCurrPage(0);
  }, [searchInput, careTarget, isLongTerm]);

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  return (
    <div className={cx('wrapper')}>
      <button
        onClick={() => {
          console.log(data);
        }}
      >
        data
      </button>
      <button
        onClick={() => {
          console.log(postList);
        }}
      >
        postList
      </button>
      <button
        onClick={() => {
          console.log(filteredPostList);
        }}
      >
        filteredPostList
      </button>
      <SearchBar className={cx('all-posts-style')} searchInput={searchInput} onSearchChange={handleSearchChange} />{' '}
      <FilterCareTarget />
      <div className={cx('card-list-container')}>
        {isLoading && <LoadingModal message="게시글 목록을 불러오는 중입니다" />}
        {!isLoading && filteredPostList.length === 0 ? (
          <div className={cx('none')}>
            <span>
              <img src={NotFoundCharacter} alt="" />
            </span>
            검색결과가 없습니다.
          </div>
        ) : (
          filteredPostList.slice(PAGE_LIMIT * (nowPage - 1), PAGE_LIMIT * nowPage).map((data, index) => (
            <Link to={`/posts/${data._id}`} key={index}>
              <Card data={data} />
            </Link>
          ))
        )}
      </div>
      <Pagination
        currPage={currPage}
        onClickPage={setCurrPage}
        pageCount={filteredPostList && Math.ceil(filteredPostList.length / 6)}
      />
    </div>
  );
}
