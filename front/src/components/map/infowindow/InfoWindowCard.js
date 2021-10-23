import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import NAVER_LOGO from '../../../assets/NAVER_LOGO.png';
import KAKAO_MAP_LOGO from '../../../assets/KAKAO_MAP_LOGO.png';
import INSTAGRAM_LOGO from '../../../assets/INSTAGRAM_LOGO.png';
import DetailInfoModal from './DetailInfoModal';

const value_style = {
  fontSize: '20px'
}

const InfoWindowCard = ({ place, onClick }) => {
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

  return (
    <Card title={name} style={{ height: '100%' }} extra={<Button type="primary" onClick={onClick}>X</Button>}>
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