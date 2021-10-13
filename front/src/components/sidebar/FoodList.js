import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Col, List, Pagination, Row, Statistic, Tag } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';

import { placeApi } from '../../api';
import { foodListState, queryState, totalState } from '../../atom';

const FoodList = () => {
  const [foodList, setFoodList] = useRecoilState(foodListState);
  const query = useRecoilValue(queryState);
  const total = useRecoilValue(totalState);

  const searchPagingPlaces = async (page, pageSize) => {
    const { status, data, message } = await placeApi.getPlaceByPage(
      page,
      pageSize,
      query
    );
    if (status === 200) {
      setFoodList(data.content);
    } else {
      alert(message);
    }
    console.log(data.content, query);
  };

  useEffect(() => {
    searchPagingPlaces(0, 5);
  }, []);

  // API 호출 하면 될듯
  const onChangePage = (page, pageSize) => {
    searchPagingPlaces(page - 1, pageSize, query);
    return;
  };

  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={foodList}
        renderItem={(item, i) => (
          <List.Item key={item.name + i}>
            <div>가게 이름: {item.name}</div>

            {/* <div>네이버 별점: {item.naver_star}</div>
          <div>카카오 별점: {item.kakao_star}</div>
          <div>인스타그램 해시태그: {item.instagram_hashtag}</div> */}
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
      <Pagination
        onChange={onChangePage}
        defaultCurrent={1}
        defaultPageSize={5}
        total={total}
        size={'small'}
        showSizeChanger={false}
      />
    </>
  );
};

export default FoodList;
