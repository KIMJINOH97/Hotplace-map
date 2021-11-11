import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { List, Pagination } from 'antd';
import {
  bookmarkListState,
  coordState,
  focusedIdState,
  tokenState,
  userState
} from '../../atom';
import { bookmarkApi } from '../../api';
import DetailInfoModal from '../map/infowindow/DetailInfoModal';
import FoodContent from './FoodContent';
import styled from 'styled-components';
import ButtonUtil from '../../utils/ButtonUtil';

const UserBasket = () => {
  const token = useRecoilValue(tokenState);
  // const
  const userInfo = useRecoilValue(userState);
  const [bookmarkList, setBookmarkList] = useRecoilState(bookmarkListState);
  const [focusedId, setFocusedId] = useRecoilState(focusedIdState);
  const [coord, setCoord] = useRecoilState(coordState);

  const check = () => {
    console.log(token);
    console.log(bookmarkList);
    console.log(userInfo);
  };

  async function getAllBookmark(userToken) {
    try {
      console.log('getAllBookmark');
      const result = await bookmarkApi.getAllBookmark(userToken);
      const { status, data, message } = result;
      setBookmarkList(data);
      console.log('getAllBookmark getAllBookmark getAllBookmark');
      console.log(data);
      console.log('북마크 불러오기 성공!');
      console.log('getAllBookmark getAllBookmark getAllBookmark');
    } catch (e) {
      console.error('북마크 불러오기 실패!');
    }
  }

  async function deleteBookmark(userToken, place_id) {
    console.log('deleteBookmark');
    console.log(userToken, place_id);
    const result = await bookmarkApi.deleteBookmark(userToken, place_id);
    const { status, data, message } = result;

    if (status === 200) {
      console.log('북마크 제거성공 콘솔');
      alert('북마크를 제거하였습니다!');
    } else {
      throw new Error('북마크 제거 실패!!');
    }
  }

  const deleteBookmarkHandler = async (place_id) => {
    try {
      console.log('deleteBookmarkHandler');
      await deleteBookmark(token, place_id);
      await getAllBookmark(token);
    } catch (e) {
      console.error(e);
      alert('북마크 제거 실패!');
    }
  };

  const onClickListItem = (store) => {
    setFocusedId({
      normal: null,
      small: store.id
    });
    setCoord({
      lat: parseFloat(store.latitude_y),
      lng: parseFloat(store.longitude_x)
    });
  };

  return (
    <List
      itemLayout="vertical"
      dataSource={bookmarkList}
      style={{ height: '100%' }}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
        size: 'small'
      }}
      renderItem={(item, i) => (
        <List.Item key={item.name + i}>
          <Wrapper>
            <a
              onClick={() => {
                onClickListItem(item);
              }}
            >
              {item.name}
            </a>
            <ButtonBox>
              <DetailInfoModal place={item} />
              <ButtonUtil
                onClick={() => {
                  deleteBookmarkHandler(item.id);
                }}
                name={'삭제'}
              />
            </ButtonBox>
          </Wrapper>
          <FoodContent item={item} />
        </List.Item>
      )}
    />
  );
};

export default UserBasket;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  color: #1890ff;
  margin-bottom: 10px;
`;

const ButtonBox = styled.div`
  display: flex;
`;
