import React, { useEffect } from 'react';
import KakaoMap from '../components/map/KakaoMap';
import SiderBar from '../components/SideBar';
import { Layout } from 'antd';

import { useRecoilState } from 'recoil';
import { bookmarkListState, tokenState, userState } from '../atom';
import { getCookie } from '../utils/CookieUtils';
import { bookmarkApi, userApi } from '../api';
import UserCard from '../components/user/UserCard';
import CurrrentLocationButton from '../components/map/location/CurrentLocationButton';

const { Content } = Layout;
const { REACT_APP_TOKEN_KEY } = process.env;

const HotPlaceMapScreen = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [, setUserInfo] = useRecoilState(userState);
  const [bookmarkList, setBookmarkList] = useRecoilState(bookmarkListState);

  useEffect(() => {
    const authToken = getCookie(REACT_APP_TOKEN_KEY);
    if (authToken !== null && authToken !== undefined) {
      console.log('hello!');
      console.log(authToken);
      setToken(authToken);
    }
  }, []);

  async function getAllBookmark(userToken) {
    try {
      const result = await bookmarkApi.getAllBookmark(userToken);
      const { status, data, message } = result;
      setBookmarkList(data);
      console.log('getAllBookmark getAllBookmark getAllBookmark');
      console.log(data);
      console.log('북마크 불러오기 성공!');
      console.log('getAllBookmark getAllBookmark getAllBookmark');
    } catch (e) {
      console.error('북마크 불러오기 실패!');
    }
  }

  async function getUserInfo(userToken) {
    try {
      const result = await userApi.getUserInfo(userToken);
      const { status, data, message } = result;
      console.log(result);
      const { name, email, profileUrl } = data; //해당 속성이 존재하는지 확인하는 용도 없으면 throw e
      setUserInfo(data);
    } catch (e) {
      console.error('로그인 오류!');
      console.error(e);
      setToken(null);
      setUserInfo(null);
      // removeCookie(REACT_APP_TOKEN_KEY);
    }
  }

  useEffect(() => {
    console.log('use  ~~ effect');
    if (token !== null && token !== undefined) {
      // 사용자 정보 불러오기
      console.log('tokentrigger');
      console.log(token);
      initData(token);
    }

    async function initData(userToken) {
      getUserInfo(userToken);
      getAllBookmark(userToken);
    }
  }, [token]);

  return (
    <Layout
      style={{
        height: '100vh',
      }}
    >
      <SiderBar></SiderBar>
      {/* <button onClick={() => getUserInfo(token)}>로그인 테스트</button> */}
      <Layout>
        <Content>
          <UserCard />
          <CurrrentLocationButton />
          <KakaoMap></KakaoMap>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HotPlaceMapScreen;
