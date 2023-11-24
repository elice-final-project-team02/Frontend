import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components';
import styles from './PostList.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

const cardsPerPage = 6;

export default function PostList({ posts, searchInput, currentPage, onPageChange }) {
  const [searchedPostsList, setSearchedPostsList] = useState([]);

  useEffect(() => {
    const searchedPosts = posts.filter((card) => card.title.includes(searchInput));
    setSearchedPostsList(searchedPosts);
  }, [searchInput, posts]);

  return (
    <div className={cx('wrapper')}>
      {searchedPostsList.length > 0 ? (
        <div className={cx('card-list-container')}>
          {searchedPostsList.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage).map((data, index) => (
            <Link to={'./123'} key={index}>
              <Card {...data} />
            </Link>
          ))}
        </div>
      ) : (
        <div className={cx('nothing')}>검색결과가 없습니다.</div>
      )}
    </div>
  );
}
