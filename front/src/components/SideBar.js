import React from 'react';
import { Layout } from 'antd';

import FilterForm from './filter/FilterForm';
import FoodList from './foodList/FoodList';

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
      <FoodList></FoodList>
    </Sider>
  );
};

export default SiderBar;
