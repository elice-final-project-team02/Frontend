import React, { useState } from 'react';
import styles from './MyWishList.module.scss';
import cs from 'classnames/bind';
import { MyTitle, MySideBar, MySearch, MyList, Pagination } from 'components';
const cx = cs.bind(styles);

const postList = [
  {
    _id: '1234',
    title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
  },
  {
    _id: '12345',
    title: '등하원 시터 구합니다.',
  },
  {
    _id: '12346',
    title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
  },
  {
    _id: '12347',
    title: '등하원 시터 구합니다.',
  },
  {
    _id: '12348',
    title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
  },
  {
    _id: '12349',
    title: '등하원 시터 구합니다.',
  },
  {
    _id: '123410',
    title: '8시부터 10시까지 돌봄 서비스 요청합니다.',
  },
];

export default function MyWishList() {
  const [edit, setEdit] = useState(false);
  const [checkedId, setCheckedId] = useState([]);

  const role = '돌봄';
  const [searchText, setSearchText] = useState('');
  const [currPage, setCurrPage] = useState(0);
  // const [postData, setPostData] = useState([]);  // 추후에 get 요청으로 받아올 리스트
  // const [totalPostCount, setTotalPostCount] = useState(0); // 총 리스트 개수

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

  const handleDeleteList = () => {
    if (window.confirm(`선택한 ${checkedId.length}가지의 돌봄 서비스들을 목록에서 삭제하시겠습니까?`)) {
      const updatedList = postList.filter((post) => !checkedId.includes(post._id));

      alert('삭제가 완료되었습니다.');
      setCheckedId([]);
      setEdit(false);
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
          <MySearch value={searchText} onChange={handleSearchChange} />
          {edit ? (
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
              <button onClick={handleDeleteList} className={cx('delete')}>
                삭제
              </button>
            </>
          ) : (
            <button onClick={() => setEdit(true)} className={cx('edit')}>
              편집
            </button>
          )}
          <div className={cx('content')}>
            {postList[0].length === 0 ? (
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
            <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={10} />
          </div>
        </main>
      </div>
    </div>
  );
}
