import React, { useState, useEffect } from 'react';
import { Button, Card } from 'antd';

const InfoWindowCard = ({ place, onClick }) => {
  const {
    name,
    address,
    kakao_url,
    naver_url,
    instagram_url,
    instagram_hashtag,
    kakao_star,
    naver_star,
  } = place;
  useEffect(() => {
    console.log('infowindow debug');
    console.log(name);
    console.log(address);
    console.log(kakao_url);
    console.log(naver_star);
  }, []);

  return (
    <Card title={name} style={{ width: 300 }}>
      {/* <p>{kakao_url}</p>
      <p>{naver_url}</p>
      <p>{instagram_url}</p>
      <p>{instagram_hashtag}</p>
      <p>{kakao_star}</p>
      <p>{naver_star}</p> */}
      <Button type="primary" onClick={onClick}>
        닫기
      </Button>
    </Card>
  );
};

export default InfoWindowCard;