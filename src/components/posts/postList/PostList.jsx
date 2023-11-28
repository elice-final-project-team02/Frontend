import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'components';
import styles from './PostList.module.scss';
import cs from 'classnames/bind';
const cx = cs.bind(styles);

export default function PostList({ postsData, searchInput, currentPage, onPageChange }) {
  const postsList = postsData.posts;
  const [searchedPostsList, setSearchedPostsList] = useState([]);

  useEffect(() => {
    if (!searchInput) {
      setSearchedPostsList(postsList);
    } else {
      const searchedPosts = postsList.filter((card) => card.title && card.title.includes(searchInput));
      setSearchedPostsList(searchedPosts);
    }
  }, [searchInput, postsList]);


  // const filteredPosts = searchInput
  //     ? postsList.filter((card) => card.title && card.title.includes(searchInput))
  //     : postsList;

  //   const startIndex = currentPage * 6;
  //   const endIndex = startIndex + 6;
  //   const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  //   setSearchedPostsList(paginatedPosts);
  // }, [searchInput, postsList, currentPage]);

  return (
    <div className={cx('wrapper')}>
      {searchedPostsList.length > 0 ? (
        <div className={cx('card-list-container')}>
          {/* {searchedPostsList.map((data, index) => ( */}
            {searchedPostsList.slice(currentPage * 6, (currentPage + 1) * 6).map((data, index) => (
            <Link to={`./${data._id}`} key={index}>
              {console.log(`data ${index}:`, data)}
              <Card data={data} />
            </Link>
          ))}
        </div>
      ) : (
        <div className={cx('none')}>검색결과가 없습니다.</div>
      )}
    </div>
  );
}
