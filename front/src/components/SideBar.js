import React from 'react';
import { Layout } from 'antd';
import { useRecoilState } from 'recoil';
import FilterForm from './filter/FilterForm';
import FoodList from './sidebar/FoodList';
import UserBasket from './sidebar/UserBasket';
import { tabIdxState } from '../atom';
import styled from 'styled-components';
const { Sider } = Layout;

const menuList = {
  1: <FoodList />,
  2: <UserBasket />
};

const SiderBar = () => {
  const [tabIdx, setTabIdx] = useRecoilState(tabIdxState);

  return (
    <Sider
      collapsible={false}
      // breakpoint="lg" // breakpoint 값보다 낮아지면 반응형으로 줄어듦
      // collapsedWidth="0" // breakpoint보다 낮아지면 트리거 발동되서 사이드바 없어짐.
      width="400"
      height="95%"
      style={{ padding: '10px', backgroundColor: '#a6cfe2' }}
    >
      <FilterForm />
      <TabList>
        <Tab index={1} tabIdx={tabIdx} onClick={() => setTabIdx(1)}>
          <TabName>음식점</TabName>
        </Tab>
        <Tab index={2} tabIdx={tabIdx} onClick={() => setTabIdx(2)}>
          <TabName>북마크</TabName>
        </Tab>
      </TabList>
      <div>{menuList[tabIdx]}</div>
    </Sider>
  );
};

export default SiderBar;

const TabList = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  border-radius: 8px;
  height: 40px;
  width: 100%;
`;

const Tab = styled.div`
  display: flex;
  width: 100px;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  background-color: ${({ index, tabIdx }) => (tabIdx === index ? '#1890ff' : '#6699ff')};
  border-radius: 8px;
  margin-right: 10px;
  transition: all 0.9s, color 0.3;
  cursor: pointer;
  :hover {
    background-color: #1890ff; //#1467dd #6699ff
  }
`;

const TabName = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
`;
