import React from 'react';
import { Layout, Tabs } from 'antd';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import { useRecoilState } from 'recoil';
import FilterForm from './filter/FilterForm';
import FoodList from './sidebar/FoodList';
import UserBasket from './sidebar/UserBasket';
import { tabIdxState } from '../atom';
const { Sider } = Layout;

const SiderBar = () => {

  const [tabIdx, setTabIdx] = useRecoilState(tabIdxState);


  const onTabChange = (value) => {
    setTabIdx(parseInt(value));
  }


  return (
    <Sider
      collapsible={false}
      // breakpoint="lg" // breakpoint 값보다 낮아지면 반응형으로 줄어듦
      // collapsedWidth="0" // breakpoint보다 낮아지면 트리거 발동되서 사이드바 없어짐.
      width="400"
      height="95%"
      style={{ padding: '10px', backgroundColor: '#a6cfe2' }}
    >
      <FilterForm></FilterForm>
      <Tabs defaultActiveKey="1"
        size="middle"
        onChange={(index) => { onTabChange(index) }}
      // animated={{ inkBar: true, tabPane: true }}
      >
        <Tabs.TabPane
          tab={
            <div style={{ width: '150px' }}>
              <HomeOutlined /> 음식점
            </div>
          }
          key="1"
        >
          <FoodList />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <div style={{ width: '150px' }}>
              <ShoppingCartOutlined /> 북마크
            </div>
          }
          key="2"
        >
          <UserBasket />
        </Tabs.TabPane>
      </Tabs>
    </Sider>
  );
};

export default SiderBar;
