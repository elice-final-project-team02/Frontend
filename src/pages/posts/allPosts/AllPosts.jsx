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
  const [searchParams] = useSearchParams();
  const showPage = currPage + 1;
  const careTarget = searchParams.get('careTarget');
  const isLongTerm = searchParams.get('isLongTerm');
  const { data, isLoading } = useGetPostList({ showPage, careTarget, isLongTerm });
  const [postList, setPostList] = useState([]);
  const [filteredPostList, setFilteredPostList] = useState([]);
  const [ingpostList, setIngPostList] = useState([]);

  useEffect(() => {
    setPostList([]);
    if (data) {
      setPostList([...data.posts]);
    }
  }, [data, currPage]);

  useEffect(() => {
    const ingPost = postList.filter((post) => post.reservation.status === '모집중');
    setIngPostList([...ingPost]);
  }, [postList, data]);

  useEffect(() => {
    if (searchInput.length === 0) {
      setFilteredPostList([...ingpostList]);
      return;
    } else {
      const filteredList = ingpostList.filter((post) =>
        post.title.toLowerCase().replace(' ', '').includes(searchInput.toLowerCase().replace(' ', ''))
      );
      setFilteredPostList(filteredList);
      return;
    }
  }, [searchInput, ingpostList, careTarget, isLongTerm]);

  useEffect(() => {
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
          <div className={cx('none')}>
            <span>
              <img src={NotFoundCharacter} alt="" />
            </span>
            검색결과가 없습니다.
          </div>
        ) : (
          filteredPostList.map((data, index) => (
            <Link to={`/posts/${data._id}`} key={index}>
              <Card data={data} />
            </Link>
          ))
        )}
      </div>
      <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={data && Math.ceil(data.totalCount / 6)} />
    </div>
  );
}
