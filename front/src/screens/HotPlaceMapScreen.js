import React, { useEffect } from 'react';
import KakaoMap from '../components/map/KakaoMap';
import SiderBar from '../components/SideBar';
import { Layout } from 'antd';

import KAKAO_LOGIN_SHORT from '../assets/KAKAO_LOGIN_SHORT.png';
import NAVER_LOGIN from '../assets/NAVER_LOGIN.png';

import LoginButton from '../utils/LoginButton';

const { Content } = Layout;

const HotPlaceMapScreen = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <SiderBar></SiderBar>
      <Layout>
        <Content>
          <LoginButton image={KAKAO_LOGIN_SHORT} right={'10px'} />
          <LoginButton image={NAVER_LOGIN} width={'100px'} right={'110px'} />
          <KakaoMap></KakaoMap>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HotPlaceMapScreen;
