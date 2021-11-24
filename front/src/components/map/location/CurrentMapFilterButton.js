import { Affix } from 'antd';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { placeApi } from '../../../api';
import { coordState, queryState, storeState } from '../../../atom';
import FilterSelect from '../../filter/FilterSelect';

const DISTANCE_FILTER = [
  [0.2, '200m'],
  [0.5, '500m'],
  [1, '1KM']
];

const CurrentMapFilterButton = () => {
  const coord = useRecoilValue(coordState);
  const [query] = useRecoilState(queryState);
  const [, setStoreList] = useRecoilState(storeState);
  const [distance, setDistance] = useState(DISTANCE_FILTER[0]);

  const onClickEvent = async () => {
    console.log(distance[0]);
    const { status, data, message } = await placeApi.getPlaceByLocation(
      query,
      coord.lat,
      coord.lng,
      +distance[0]
    );

    if (status === 200) {
      setStoreList(data);
    } else {
      alert(message);
    }
  };

  const onChangeFilter = (value, object) => {
    console.log(value, object.key);
    setDistance([object.key, value]);
  };

  return (
    <Affix style={affixAttr}>
      <FilterButton onClick={onClickEvent}>현재 지도에서 검색하기</FilterButton>
      <FilterSelect
        currentSelect={distance[1]}
        onChangeMethod={onChangeFilter}
        optionList={DISTANCE_FILTER}
        width={80}
      />
    </Affix>
  );
};
const affixAttr = {
  position: 'absolute',
  top: 10,
  left: 10,
  zIndex: 2
};

export default CurrentMapFilterButton;

const FilterButton = styled.button`
  font-weight: 700;
  color: white;
  background-color: #1890ff;
  height: 35px;
  border-radius: 4px;
  padding: 6px;
  margin-right: 8px;
  cursor: pointer;
`;
