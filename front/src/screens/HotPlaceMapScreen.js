import React, { useEffect } from "react";
import KakaoMap from "../components/map/KakaoMap";
import SiderBar from "../components/SideBar";
import { Layout } from "antd";

import { useRecoilState } from "recoil";
import { tokenState, userState } from "../atom";
import { getCookie } from "../utils/CookieUtils";
import { userApi } from "../api";
import UserCard from "../components/user/UserCard";

const { Content } = Layout;
const { REACT_APP_TOKEN_KEY } = process.env;

const HotPlaceMapScreen = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [, setUserInfo] = useRecoilState(userState);

  useEffect(() => {
    const authToken = getCookie(REACT_APP_TOKEN_KEY);
    if (authToken !== null && authToken !== undefined) {
      console.log("hello!");
      console.log(authToken);
      setToken(authToken);
    }
  }, []);

  async function getUserInfo(userToken) {
    try {
      const result = await userApi.getUserInfo(userToken);
      const { status, data, message } = result;
      console.log(result);
      const { name, email, profileUrl } = data; //해당 속성이 존재하는지 확인하는 용도 없으면 throw e
      setUserInfo(data);
    } catch (e) {
      console.error("로그인 오류!");
      console.error(e);
      setToken(null);
      setUserInfo(null);
      // removeCookie(REACT_APP_TOKEN_KEY);
    }
  }

  useEffect(() => {
    console.log("use  ~~ effect");
    if (token !== null && token !== undefined) {
      // 사용자 정보 불러오기
      console.log("tokentrigger");
      console.log(token);
      getUserInfo(token);
    }
  }, [token]);

  return (
    <Layout
      style={{
        height: "1000px",
      }}
    >
      <SiderBar></SiderBar>
      {/* <button onClick={() => getUserInfo(token)}>로그인 테스트</button> */}
      <Layout>
        <Content>
          <UserCard />
          <KakaoMap></KakaoMap>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HotPlaceMapScreen;
