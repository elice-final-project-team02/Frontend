import React, { useState } from 'react';
import styles from './MyWishList.module.scss';
import cs from 'classnames/bind';
import { MyTitle, MySideBar, MySearch, MyList, Pagination } from 'components';
const cx = cs.bind(styles);

export default function MyWishList() {
  const list = [
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

  localStorage.setItem('wish', JSON.stringify(list)); //임시로 넣은 배열

  const [postData, setPostData] = useState(JSON.parse(localStorage.getItem('wish')) || []); // localStorage에 저장된 리스트
  const [checkedId, setCheckedId] = useState([]);

  const role = '돌봄';
  const [edit, setEdit] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currPage, setCurrPage] = useState(0);
  // const [totalPostCount, setTotalPostCount] = useState(0); // 총 리스트 개수

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleDeleteList = () => {
    if (window.confirm(`선택한 ${checkedId.length}가지의 돌봄 서비스들을 목록에서 삭제하시겠습니까?`)) {
      const updatedList = postData.filter((post) => !checkedId.includes(post._id));
      localStorage.setItem('wish', JSON.stringify(updatedList));
      setPostData(updatedList);

      alert('삭제가 완료되었습니다.');
      setCheckedId([]);
      setEdit(false);
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
          <MySearch onSearchChange={handleSearchChange} />
          {edit ? (
            <>
              <button onClick={() => setEdit(false)} className={cx('cancel')}>
                취소
              </button>
              <button onClick={handleDeleteList} className={cx('complete')}>
                삭제
              </button>
            </>
          ) : (
            <button onClick={() => setEdit(true)} className={cx('edit')}>
              편집
            </button>
          )}
          <div className={cx('content')}>
            {postData[0].length === 0 ? (
              <div>찜한 목록이 없습니다.</div>
            ) : (
              <MyList
                postList={postData}
                searchText={searchText}
                role={role}
                edit={edit}
                checkedId={checkedId}
                setCheckedId={setCheckedId}
              />
            )}
            <Pagination currPage={currPage} onClickPage={setCurrPage} pageCount={10} />
          </div>
        </main>
      </div>
    </div>
  );
}
