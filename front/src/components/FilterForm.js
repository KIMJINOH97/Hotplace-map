import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { useRecoilState } from 'recoil';

import {
  dongState,
  guState,
  queryState,
  subCategoryState,
  urlState,
} from '../atom';

import FilterSelect from './filter/FilterSelect';

const FilterForm = () => {
  const [gu, setGu] = useRecoilState(guState);
  const [dong, setDong] = useRecoilState(dongState);
  const [subCategory, setSubCategory] = useRecoilState(subCategoryState);
  const [url] = useRecoilState(urlState);
  const [query, setQuery] = useRecoilState(queryState);

  const [curGu, setCurGu] = useState();
  const [curDong, setCurDong] = useState();
  const [curSubCategory, setCurSubCategory] = useState();

  const guSelectChange = async (value, idx) => {
    console.log(value, idx);
    const resData = await getDongListByGuId(idx.key);
    setDong(resData.data);
  };

  async function getGuList() {
    const res = await axios.get(url + '/api/gu');
    const resData = res.data;
    setGu(resData.data);
    setCurGu(resData.data[0].guName);
  }

  async function getDongListByGuId(guId) {
    const res = await axios.get(url + '/api/dong/' + guId);
    const resData = res.data;
    setDong(resData.data);
    setCurDong(resData.data[0].dongName);
    return resData;
  }

  async function getSubCategory() {
    const res = await axios.get(url + '/api/sub_category');
    const resData = res.data;
    setSubCategory(resData.data);
    setCurSubCategory(resData.data[0].name);
  }

  const onChangeGu = (value, key) => {
    setCurGu(value);
    guSelectChange(value, key);
  };

  const onChangeDong = (value) => {
    setCurDong(value);
  };

  const onChangeSubCategory = (value) => {
    setCurSubCategory(value);
  };

  useEffect(() => {
    getGuList();
    getDongListByGuId(1);
    getSubCategory();
  }, []);

  const onClickEvent = () => {
    console.log(gu);
    console.log(dong);
    console.log(subCategory);

    console.log({
      curGu,
      curDong,
      curSubCategory,
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
      <Button onClick={onClickEvent}>click!</Button>
    </>
  );
};

export default FilterForm;
