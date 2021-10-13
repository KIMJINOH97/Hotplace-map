import React, { useEffect } from 'react';
import KakaoMap from '../components/map/KakaoMap';
import SiderBar from '../components/SideBar';
import { Layout } from 'antd';

import KAKAO_LOGIN_SHORT from '../assets/KAKAO_LOGIN_SHORT.png';
import NAVER_LOGIN from '../assets/NAVER_LOGIN.png';

import LoginButton from '../utils/LoginButton';
import { useRecoilState } from 'recoil';
import { tokenState } from '../atom';
import { getAllCookie, getCookie } from '../utils/CookieUtils';

const { Content } = Layout;
const { REACT_APP_TOKEN_KEY } = process.env;

const HotPlaceMapScreen = () => {
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    const authToken = getCookie(REACT_APP_TOKEN_KEY);
    console.log(`파싱 결과 : authToken is ${authToken}`);

    if (authToken != null) {
      setToken(authToken);
    }

    //추후 에 없어질 코드
    const allCookies = getAllCookie();
    console.log('show all cookies!!!');
    console.log(allCookies);

    //추후 에 없어질 코드 end/
  }, []);

  useEffect(() => {
    if (token != null) {
      console.log(
        'recoil 변수 token 의 값이 변경되었기 떄문에 나오는 로그입니다'
      );
      console.log(`recoil 변수 token is ${token}`);

      console.log('여기서 사용자의 정보를 받아오는 API 연결');
    }
  }, [token]);

  return (
    <Layout
      style={{
        height: '1000px',
      }}
    >
      <SiderBar></SiderBar>
      <Layout>
        <Content>
          <LoginButton
            image={KAKAO_LOGIN_SHORT}
            right={'10px'}
            provider="kakao"
          />
          <LoginButton
            image={NAVER_LOGIN}
            width={'100px'}
            right={'110px'}
            provider="naver"
          />
          <KakaoMap></KakaoMap>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HotPlaceMapScreen;
