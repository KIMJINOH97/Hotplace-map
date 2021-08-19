import React from 'react';
import { Layout, Menu } from 'antd';

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import FilterForm from './FilterForm';

const { Sider } = Layout;

const SiderBar = () => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      width="400"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <FilterForm></FilterForm>
    </Sider>
  );
};

export default SiderBar;
