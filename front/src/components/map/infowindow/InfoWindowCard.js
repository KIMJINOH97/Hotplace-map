import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import NAVER_LOGO from '../../../assets/NAVER_LOGO.png';
import KAKAO_MAP_LOGO from '../../../assets/KAKAO_MAP_LOGO.png';
import INSTAGRAM_LOGO from '../../../assets/INSTAGRAM_LOGO.png';
import DetailInfoModal from './DetailInfoModal';
import { useRecoilState } from 'recoil';
import { bookmarkListState, tokenState, userState } from '../../../atom';
import { bookmarkApi } from '../../../api';

const value_style = {
  fontSize: '20px'
}

const InfoWindowCard = ({ place, onClick }) => {

  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);
  const [bookmark, setBookmark] = useRecoilState(bookmarkListState);

  const {
    id,
    name,
    address,
    phone_number,
    kakao_url,
    naver_url,
    instagram_url,
    homepage_url,
    instagram_hashtag,
    kakao_star,
    naver_star,
    naver_blog_review_count,
    naver_buyer_review_count
  } = place;

  useEffect(() => {
    console.log('infowindow debug');
    console.log(name);
    console.log(address);
    console.log(kakao_url);
    console.log(naver_star);
  }, []);

  const convertHashtag = (val) => {
    if (val > 1_000_000_000) {
      return (val / 1_000_000_000).toFixed(2) + "B";
    }
    if (val > 1_000_000) {
      return (val / 1_000_000).toFixed(2) + "M";
    }
    if (val > 1_000) {
      return (val / 1_000).toFixed(2) + "K";
    }
    return val;
  }

  async function getAllBookmark() {
    try {
      const result = await bookmarkApi.getAllBookmark(token)
      const { status, data, message } = result;
      setBookmark(data);
      console.log(data);
      console.log("북마크 불러오기 성공!");
    } catch (e) {
      console.error("북마크 불러오기 실패!")
    }
  }

  async function createBookmark(userToken, id) {
    try {
      const result = await bookmarkApi.createBookmark(userToken, id);
      const { status, data, message } = result;
      console.log(result);
      console.log(data);
      await getAllBookmark();
      alert("북마크 성공!");
    } catch (e) {
      console.error("북마크 등록 오류!");
      //에러 두가지 가능
      // 1. 로그인 오류
      // 2. 북마크 오류
      alert("북마크 실패!");
    }
  }

  return (
    <Card title={name} style={{ height: '100%' }} extra={
      <>
        <a onClick={() => { createBookmark(token, id); }} >북마크 </a>
        <Button type="primary" onClick={onClick}>X</Button>
      </>
    }>
      <div style={{ width: 350 }}>주소 : {address}</div>
      <p>전화번호 : {phone_number}</p>
      <br />
      <Row gutter={16}>
        {naver_star &&
          <Col span={8}>
            <Statistic valueStyle={value_style} title={<a href={naver_url} rel="noreferrer" target="_blank" ><LOGO_ICON src={NAVER_LOGO} /></a>} value={naver_star} suffix="/ 5.0" />
          </Col>
        }
        {kakao_star &&
          <Col span={8}>
            <Statistic valueStyle={value_style} title={<a href={kakao_url} rel="noreferrer" target="_blank" ><LOGO_ICON src={KAKAO_MAP_LOGO} /></a>} value={kakao_star} suffix="/ 5.0" />
          </Col>}
        {instagram_hashtag &&
          <Col span={8}>
            <Statistic valueStyle={value_style} title={<a href={instagram_url} rel="noreferrer" target="_blank" ><LOGO_ICON src={INSTAGRAM_LOGO} /></a>} prefix={<LikeOutlined />} value={convertHashtag(instagram_hashtag)} />
          </Col>}
      </Row>
      <DetailInfoModal place={place} />
    </Card>
  );
};

export default InfoWindowCard;


const LOGO_ICON = styled.img`
width:40px;
height:40px;
`