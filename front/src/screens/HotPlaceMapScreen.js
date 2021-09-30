import React, { useEffect } from 'react';
import KakaoMap from '../components/map/KakaoMap';
import SiderBar from '../components/SideBar';
import { Layout } from 'antd';
import styled from 'styled-components';

import KAKAO_LOGIN_SHORT from '../assets/KAKAO_LOGIN_SHORT.png';
import NAVER_LOGIN from '../assets/NAVER_LOGIN.png';

import LoginButton from '../utils/LoginButton';
// import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;

const HotPlaceMapScreen = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <SiderBar></SiderBar>
      <Layout>
        {/* <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0, backgroundColor: 'white' }}
        ></Header> */}
        <Content>
          <LoginButton image={KAKAO_LOGIN_SHORT} right={'10px'} />
          <LoginButton image={NAVER_LOGIN} width={'100px'} right={'110px'} />
          <KakaoMap></KakaoMap>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Hotplace-map</Footer> */}
      </Layout>
    </Layout>
  );
};

export default HotPlaceMapScreen;

// const KakaoButton = styled.div`
//   position: absolute;
//   top: 1%;
//   right: 1%;
//   width: 90px;
//   height: 45px;
//   z-index: 401;
//   border-radius: 12px;
// `;

// const KakaoImage = styled.img`
//   width: 100%;
//   height: 100%;
// `;
