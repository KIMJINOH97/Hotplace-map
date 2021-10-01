import React from 'react';
import { Layout, Tabs } from 'antd';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import FilterForm from './filter/FilterForm';
import FoodList from './sidebar/FoodList';
import UserBasket from './sidebar/UserBasket';

const { Sider } = Layout;

const SiderBar = () => {
  return (
    <Sider
      breakpoint="lg" // breakpoint 값보다 낮아지면 반응형으로 줄어듦
      // collapsedWidth="0" // breakpoint보다 낮아지면 트리거 발동되서 사이드바 없어짐.
      width="400"
      style={{ padding: '10px', backgroundColor: 'yellow' }}
    >
      <FilterForm></FilterForm>
      <Tabs defaultActiveKey="2" size="large">
        <Tabs.TabPane
          tab={
            <div style={{ width: '120px' }}>
              <HomeOutlined /> 음식점
            </div>
          }
          key="1"
        >
          <FoodList />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <div style={{ width: '120px' }}>
              <ShoppingCartOutlined /> 장바구니
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
