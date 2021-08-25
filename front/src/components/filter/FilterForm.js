import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { useRecoilState } from 'recoil';
import { cityApi, placeApi } from '../../api/index.js';

import {
  dongState,
  guState,
  queryState,
  storeState,
  subCategoryState,
} from '../../atom';

import FilterSelect from './FilterSelect';
import KakaoSlider from './KakaoSlider.js';
import NaverSlider from './NaverSlider.js';

const FilterForm = () => {
  const [gu, setGu] = useRecoilState(guState);
  const [dong, setDong] = useRecoilState(dongState);
  const [subCategory, setSubCategory] = useRecoilState(subCategoryState);
  const [storeList, setStoreList] = useRecoilState(storeState);
  const [query, setQuery] = useRecoilState(queryState);

  const [curGu, setCurGu] = useState();
  const [curDong, setCurDong] = useState();
  const [curSubCategory, setCurSubCategory] = useState();

  const guSelectChange = async (value, idx) => {
    console.log(value, idx);
    const data = await getDongListByGuId(idx.key);
    setDong(data);
  };

  async function getGuList() {
    const result = await cityApi.getGuList();
    const { status, data, message } = result;
    if (status === 200) {
      setGu(data);
      setCurGu(data[0].guName);
    } else {
      alert(message);
    }
  }

  async function getDongListByGuId(guId) {
    const result = await cityApi.getDongListByGuId(guId);
    const { status, data, message } = result;
    if (status === 200) {
      setDong(data);
      setCurDong(data[0].dongName);
    } else {
      alert(message);
    }
    return data;
  }

  async function getSubCategory() {
    const result = await cityApi.getSubCategory();
    const { status, data, message } = result;
    if (status === 200) {
      setSubCategory(data);
      setCurSubCategory(data[0].name);
    } else {
      alert(message);
    }
  }

  const onChangeGu = (value, key) => {
    console.log(value, key);
    setQuery({ ...query, gu: parseInt(key.key) });
    setCurGu(value);
    guSelectChange(value, key);
  };

  const onChangeDong = (value, key) => {
    console.log(value, key);
    setQuery({ ...query, dong: parseInt(key.key) });
    setCurDong(value);
  };

  const onChangeSubCategory = (value, key) => {
    console.log(value, key);
    setQuery({ ...query, sub_category: parseInt(key.key) });
    setCurSubCategory(value);
  };

  useEffect(() => {
    getGuList();
    getDongListByGuId(1);
    getSubCategory();
  }, []);

  const onClickEvent = async () => {
    console.log(query);
    const result = await placeApi.getPlace(query);
    const { status, data, message } = result;
    console.log(data);
    if (status === 200) {
      setStoreList(data);
    } else {
      alert(message);
    }
  };

  const onInputChange = (event) => {
    setQuery({
      ...query,
      place_name: event.target.value,
    });
  };

  const isLoad = () => {
    return gu.length && dong.length && subCategory.length;
  };

  return (
    <>
      {isLoad() && (
        <>
          <FilterSelect
            currentSelect={curGu}
            onChangeMethod={onChangeGu}
            optionList={gu}
          />
          <FilterSelect
            currentSelect={curDong}
            onChangeMethod={onChangeDong}
            optionList={dong}
          />
          <FilterSelect
            currentSelect={curSubCategory}
            onChangeMethod={onChangeSubCategory}
            optionList={subCategory}
          />
        </>
      )}
      <Input
        placeholder="검색어를 입력하세요"
        maxLength={20}
        onChange={onInputChange}
      ></Input>
      <KakaoSlider></KakaoSlider>
      <NaverSlider></NaverSlider>
      <Button onClick={onClickEvent}>검색</Button>
    </>
  );
};

export default FilterForm;
