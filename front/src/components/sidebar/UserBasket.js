import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Col, List, Pagination, Row, Statistic, Tag } from 'antd';
import { bookmarkListState, coordState, focusedIdState, tokenState, userState } from '../../atom';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import { bookmarkApi } from '../../api';
import DetailInfoModal from '../map/infowindow/DetailInfoModal';

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
  }

  async function getAllBookmark(userToken) {
    try {
      console.log("getAllBookmark")
      const result = await bookmarkApi.getAllBookmark(userToken)
      const { status, data, message } = result;
      setBookmarkList(data);
      console.log("getAllBookmark getAllBookmark getAllBookmark")
      console.log(data);
      console.log("북마크 불러오기 성공!");
      console.log("getAllBookmark getAllBookmark getAllBookmark")
    } catch (e) {
      console.error("북마크 불러오기 실패!")
    }
  }

  async function deleteBookmark(userToken, place_id) {

    console.log("deleteBookmark")
    console.log(userToken, place_id)
    const result = await bookmarkApi.deleteBookmark(userToken, place_id);
    const { status, data, message } = result;

    if (status === 200) {
      console.log("북마크 제거성공 콘솔")
      alert("북마크를 제거하였습니다!")
    } else {
      throw new Error("북마크 제거 실패!!");
    }
  }


  const deleteBookmarkHandler = async (place_id) => {
    try {
      console.log("deleteBookmarkHandler")
      await deleteBookmark(token, place_id);
      await getAllBookmark(token);
    }
    catch (e) {
      console.error(e);
      alert("북마크 제거 실패!");
    }
  }

  const onClickListItem = (store) => {
    setFocusedId({
      normal: null,
      small: store.id
    });
    setCoord({
      lat: parseFloat(store.latitude_y),
      lng: parseFloat(store.longitude_x)
    })
  }

  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={bookmarkList}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 4,
        }}
        renderItem={(item, i) => (
          <List.Item key={item.name + i} >
            <div><a onClick={() => { onClickListItem(item) }}>{item.name} </a> </div>
            <DetailInfoModal place={item} />
            <button onClick={() => { deleteBookmarkHandler(item.id) }} >북마크 제거</button>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  // title="instagram"
                  title={<Tag color="purple">Instagram</Tag>}
                  value={item.instagram_hashtag}
                  prefix={<LikeOutlined />}
                  valueStyle={{ 'font-size': '15px' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title={<Tag color="green">Naver</Tag>}
                  value={item.naver_star}
                  prefix={<StarOutlined />}
                  suffix="/ 5.0"
                  valueStyle={{ 'font-size': '15px' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title={<Tag color="gold">Kakao</Tag>}
                  value={item.kakao_star}
                  prefix={<StarOutlined />}
                  suffix="/ 5.0"
                  valueStyle={{ 'font-size': '15px' }}
                />
              </Col>
            </Row>
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default UserBasket;
