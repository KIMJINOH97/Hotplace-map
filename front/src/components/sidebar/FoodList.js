import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { List, Pagination } from 'antd';

import { placeApi } from '../../api';
import {
  focusedIdState,
  foodListState,
  queryState,
  totalState,
  coordState
} from '../../atom';
import FoodContent from './FoodContent';

const FoodList = () => {
  const [foodList, setFoodList] = useRecoilState(foodListState);
  const query = useRecoilValue(queryState);
  const total = useRecoilValue(totalState);
  const [, setFocusedId] = useRecoilState(focusedIdState);
  const [, setCoord] = useRecoilState(coordState);

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
    <>
      <List
        itemLayout="vertical"
        dataSource={foodList}
        renderItem={(item, i) => (
          <List.Item key={item.name + i}>
            <div>
              <a
                onClick={() => {
                  onClickListItem(item);
                }}
              >
                {item.name}
              </a>
            </div>
            <FoodContent item={item} />
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
