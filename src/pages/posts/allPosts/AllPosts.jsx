import React, { useEffect, useState } from 'react';
import styles from './AllPosts.module.scss';
import cs from 'classnames/bind';
import { Pagination, FilterCareTarget, SearchBar, Card, LoadingModal } from 'components';
import { formatterUrl, useGetPostList } from 'hooks';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { NotFoundCharacter } from 'assets/images';
const cx = cs.bind(styles);

export default function AllPosts() {
  const [searchInput, setSearchInput] = useState('');
  const [currPage, setCurrPage] = useState(0);
  const nowPage = currPage + 1;
  const [searchParams] = useSearchParams();
  const careTarget = searchParams.get('careTarget');
  const isLongTerm = searchParams.get('isLongTerm');
  const [controlTarget, setControlTarget] = useState(careTarget);
  const [controlTerm, setControlTerm] = useState(isLongTerm);
  const { data, isLoading } = useGetPostList({ controlTarget, controlTerm });
  const [postList, setPostList] = useState([]);
  const PAGE_LIMIT = 6;
  const navigate = useNavigate();
  useEffect(() => {
    if (careTarget) {
      setControlTarget(careTarget);
      return;
    } else if (!careTarget) {
      setControlTarget('전체');
    }
  }, [careTarget]);
  useEffect(() => {
    if (isLongTerm) {
      setControlTerm(isLongTerm);
      return;
    } else if (!isLongTerm) {
      setControlTerm('all');
    }
  }, [isLongTerm]);

  useEffect(() => {
    setCurrPage(0);
    setPostList([]);
    if (data) {
      setPostList([...data?.posts]);
      navigate(`/posts${formatterUrl(controlTarget, controlTerm)}`);
    }
  }, [data]);

  useEffect(() => {
    if (data && searchInput.length === 0) {
      setPostList([...data?.posts]);
      return;
    } else if (data && searchInput.length > 0) {
      const filteredList = data.posts.filter((post) =>
        post.title.toLowerCase().replace(' ', '').includes(searchInput.toLowerCase().replace(' ', ''))
      );
      setPostList(filteredList);
      return;
    }
  }, [searchInput]);

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  return (
    <div className={cx('wrapper')}>
      <SearchBar className={cx('all-posts-style')} searchInput={searchInput} onSearchChange={handleSearchChange} />{' '}
      <FilterCareTarget
        onChangeTarget={setControlTarget}
        onChangeTerm={setControlTerm}
        controlTarget={controlTarget}
        controlTerm={controlTerm}
      />
      <div className={cx('card-list-container')}>
        {isLoading && <LoadingModal message="게시글 목록을 불러오는 중입니다" isLoading={isLoading} />}
        {!isLoading && postList.length === 0 ? (
          <div className={cx('none')}>
            <span>
              <img src={NotFoundCharacter} alt="" />
            </span>
            검색결과가 없습니다.
          </div>
        ) : (
          postList.slice(PAGE_LIMIT * (nowPage - 1), PAGE_LIMIT * nowPage).map((data, index) => (
            <Link to={`/posts/${data._id}`} key={index}>
              <Card data={data} />
            </Link>
          ))
        )}
      </div>
      <Pagination
        currPage={currPage}
        onClickPage={setCurrPage}
        pageCount={postList && Math.ceil(postList.length / 6)}
      />
    </div>
  );
}
