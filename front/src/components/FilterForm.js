import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Buttonct, Select, Button } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dongState, guState, subCategoryState, urlState } from '../atom';
import axios from 'axios';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const FilterForm = () => {
  const [gu, setGu] = useRecoilState(guState);
  const [dong, setDong] = useRecoilState(dongState);
  const [subCategory, setSubCategory] = useRecoilState(subCategoryState);
  const [url] = useRecoilState(urlState);

  const guSelectChange = async (value, idx) => {
    const res = await axios.get(url + '/api/dong/' + idx.key);
    const resData = res.data;
    setDong(resData.data);
  };

  useEffect(() => {
    async function getGuList() {
      const res = await axios.get(url + '/api/gu');
      const resData = res.data;
      setGu(resData.data);
    }

    async function getDongListByGuId(guId) {
      const res = await axios.get(url + '/api/dong/' + guId);
      const resData = res.data;
      setDong(resData.data);
    }

    async function getSubCategory() {
      const res = await axios.get(url + '/api/sub_category');
      const resData = res.data;
      setSubCategory(resData.data);
    }

    getGuList();
    getDongListByGuId(1);
    getSubCategory();
  }, []);

  const onClickEvent = () => {
    console.log('button click!');
    console.log(gu);
    console.log(dong);
    console.log(subCategory);
  };

  return (
    <>
      <Select style={{ width: 120 }} onChange={guSelectChange}>
        {gu.map((val) => (
          <Option key={val.guId} value={val.guName}>
            {val.guName}
          </Option>
        ))}
      </Select>
      <Select style={{ width: 120 }}>
        {dong.map((val) => (
          <Option key={val.dongId} value={val.dongName}>
            {val.dongName}
          </Option>
        ))}
      </Select>
      <Select style={{ width: 120 }}>
        {subCategory.map((val) => (
          <Option key={val.id} value={val.name}>
            {val.name}
          </Option>
        ))}
      </Select>
      <Button onClick={onClickEvent}>click!</Button>
    </>
  );
};

export default FilterForm;
