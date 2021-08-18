import React, { useState, useRef, useEffect } from 'react';
import KakaoMap from './KakaoMap';
import SiderBar from './SideBar';
import { Layout } from 'antd';
// import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;

const HotPlaceMap = () => {
  return (
    <Layout>
      <SiderBar></SiderBar>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        ></Header>
        <Content>
          <KakaoMap></KakaoMap>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Hotplace-map</Footer>
      </Layout>
    </Layout>
  );
};

export default HotPlaceMap;
