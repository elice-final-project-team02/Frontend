import React, { useState, useEffect } from 'react';
import styles from './MyWishList.module.scss';
import cs from 'classnames/bind';
import { MyTitle, MySideBar, SearchBar, MyList, Pagination, LoadingModal } from 'components';
import { useGetSavedPostList, usePutCancelBookMarks } from 'hooks';

const cx = cs.bind(styles);

export default function MyWishList() {
  const [edit, setEdit] = useState(false);
  const [checkedId, setCheckedId] = useState([]);

  const role = '돌봄';
  const [searchText, setSearchText] = useState('');
  const [currPage, setCurrPage] = useState(0);
  const { data, isLoading, error } = useGetSavedPostList(currPage + 1);
  const [postList, setPostList] = useState([]);
  const { mutate } = usePutCancelBookMarks();

  useEffect(() => {
    if (data) {
      const mapPostList = data.posts.map((post) => ({
        _id: post._id,
        title: post.title,
      }));
      setPostList(mapPostList);
    }
  }, [data]);

  if (error) return;

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleChangeCheckbox = (id) => {
    const isChecked = checkedId.includes(id);
    let newCheckedId = [];

    if (isChecked) {
      newCheckedId = checkedId.filter((checked) => checked !== id);
    } else {
      newCheckedId = [...checkedId, id];
    }

    setCheckedId(newCheckedId);
  };

  const handleDeleteList = (pageNumber) => {
    if (window.confirm(`선택한 ${checkedId.length}가지의 돌봄 서비스들을 목록에서 삭제하시겠습니까?`)) {
      mutate(checkedId, {
        pageNumber,
        onSuccess: () => {
          setCheckedId([]);
          setEdit(false);
        },
      });
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = postList.map((post) => post._id);
      setCheckedId(idArray);
    } else {
      setCheckedId([]);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('mypage')}>
        <div className={cx('sidebar')}>
          <MySideBar />
        </div>
        <main>
          <MyTitle text="찜한 돌봄서비스" />
          <SearchBar className={cx('my-page-style')} searchInput={searchText} onSearchChange={handleSearchChange} />
          {isLoading ? (
            <LoadingModal message="로딩중..." />
          ) : (
            <>
              {postList.length > 0 &&
                (edit ? (
                  <>
                    <button
                      onClick={() => {
                        setEdit(false);
                        setCheckedId([]);
                      }}
                      className={cx('cancel')}
                    >
                      취소
                    </button>
                    <button onClick={() => handleDeleteList(currPage + 1)} className={cx('delete')}>
                      삭제
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEdit(true)} className={cx('edit')}>
                    편집
                  </button>
                ))}
              <div className={cx('content')}>
                {postList.length === 0 ? (
                  <div>찜한 목록이 없습니다.</div>
                ) : (
                  <MyList
                    postList={postList}
                    searchText={searchText}
                    role={role}
                    edit={edit}
                    checkedId={checkedId}
                    onAllCheck={handleAllCheck}
                    onChangeCheckbox={handleChangeCheckbox}
                  />
                )}
                <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={Math.ceil(data.totalCount / 7)} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
