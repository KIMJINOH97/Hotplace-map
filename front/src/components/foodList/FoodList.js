import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { List, Pagination } from 'antd';

import { placeApi } from '../../api';
import { foodListState } from '../../atom';

const FoodList = () => {
  const [foodList, setFoodList] = useRecoilState(foodListState);

  // API 호출 하면 될듯
  const onChangePage = async (page, pageSize) => {
    return console.log('page ', page, 'pageSize: ', pageSize);
  };

  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={foodList}
        renderItem={(item) => (
          <List.Item key={item.name}>
            <div>{item.name}</div>
            <div>{item.naverRating}</div>
            <div>{item.kakaoRating}</div>
            <div>{item.instagramHashtag}</div>
          </List.Item>
        )}
      ></List>
      <Pagination onChange={onChangePage} defaultCurrent={1} total={50} />
    </>
  );
};

export default FoodList;
