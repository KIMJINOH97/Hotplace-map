import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { List, Pagination } from 'antd';

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
            <div>네이버 별점: {item.naver_star}</div>
            <div>카카오 별점: {item.kakao_star}</div>
            <div>인스타그램 해시태그: {item.instagram_hashtag}</div>
          </List.Item>
        )}
      ></List>
      <Pagination
        onChange={onChangePage}
        defaultCurrent={1}
        defaultPageSize={5}
        total={total}
        showSizeChanger={false}
      />
    </>
  );
};

export default FoodList;
