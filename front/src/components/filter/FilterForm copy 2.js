import React, { useState, useEffect } from "react";
import { Form, Button, Input, Collapse, Row, Col } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { cityApi, placeApi } from "../../api/index.js";

import {
  dongState,
  guState,
  queryState,
  storeState,
  subCategoryState,
  foodListState,
  totalState,
  tokenState,
  userState,
} from "../../atom";

import FilterSelect from "./FilterSelect";
import KakaoSlider from "./KakaoSlider.js";
import NaverSlider from "./NaverSlider.js";
import InstaSlider from "./InstaSlider.js";

const { Panel } = Collapse;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const FilterForm = () => {
  const [gu, setGu] = useRecoilState(guState);
  const [dong, setDong] = useRecoilState(dongState);
  const [subCategory, setSubCategory] = useRecoilState(subCategoryState);
  const [storeList, setStoreList] = useRecoilState(storeState);
  const [query, setQuery] = useRecoilState(queryState);
  const [, setFoodList] = useRecoilState(foodListState);
  const [, setTotal] = useRecoilState(totalState);
  const [token, setToken] = useRecoilState(tokenState);
  const [userInfo, setUserInfo] = useRecoilState(userState);
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

  const searchPlaces = async () => {
    console.log(query);
    const { status, data, message } = await placeApi.getPlace(query);
    console.log(data);
    if (status === 200) {
      setStoreList(data);
    } else {
      alert(message);
    }
  };

  const searchPagingPlaces = async () => {
    console.log(query);
    const { status, data, message } = await placeApi.getPlaceByPage(
      0,
      5,
      query
    );
    if (status === 200) {
      setTotal(data.totalElements);
      setFoodList(data.content);
    } else {
      alert(message);
    }
  };

  const onClickEvent = async () => {
    searchPlaces();
    searchPagingPlaces();
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

  const check = () => {
    console.log(query);
    console.log(token);
    console.log(userInfo);
  };

  function callback(key) {
    console.log(key);
  }

  return (
    <>
      {isLoad() && (
        <Form {...layout} name="nest-messages">
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                label="구"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <FilterSelect
                  currentSelect={curGu}
                  onChangeMethod={onChangeGu}
                  optionList={gu}
                />
              </Form.Item>
            </Col>

            <Col span={10}>
              <Form.Item
                label="동"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <FilterSelect
                  currentSelect={curDong}
                  onChangeMethod={onChangeDong}
                  optionList={dong}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={20} offset={2}>
              <Form.Item
                label="카테고리"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <FilterSelect
                  currentSelect={curSubCategory}
                  onChangeMethod={onChangeSubCategory}
                  optionList={subCategory}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="검색어"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="검색어를 입력하세요"
              style={{ height: "40px", borderRadius: "0.25rem" }}
              maxLength={20}
              onChange={onInputChange}
            />
          </Form.Item>
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse"
          >
            <Panel
              header="SNS 별 필터링"
              key="1"
              className="site-collapse-custom-panel"
            >
              <KakaoSlider />
              <NaverSlider />
              <InstaSlider />
            </Panel>
          </Collapse>
          <Button type="primary" onClick={onClickEvent}>
            검색
          </Button>
        </Form>
      )}
      {/* <Button onClick={check}>check!!</Button> */}
    </>
  );
};

export default FilterForm;