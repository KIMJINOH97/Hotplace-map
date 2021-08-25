import React, { useEffect } from 'react';
import KakaoMap from '../components/map/KakaoMap';
import SiderBar from '../components/SideBar';
import { Layout } from 'antd';
// import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;

const HotPlaceMapScreen = () => {
  return (
    <Layout>
      <SiderBar></SiderBar>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0, backgroundColor: 'white' }}
        ></Header>
        <Content>
          <KakaoMap></KakaoMap>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Hotplace-map</Footer>
      </Layout>
    </Layout>
  );
};

export default HotPlaceMapScreen;
