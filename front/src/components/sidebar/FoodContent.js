import React from 'react';
import { Col, Row, Statistic, Tag } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';

const FoodContent = ({ item }) => {
  const { instagram_hashtag, naver_star, kakao_star } = item;

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Statistic
          // title="instagram"
          title={<Tag color="purple">Instagram</Tag>}
          value={instagram_hashtag}
          prefix={<LikeOutlined />}
          valueStyle={{ 'font-size': '15px' }}
        />
      </Col>
      <Col span={8}>
        <Statistic
          title={<Tag color="green">Naver</Tag>}
          value={naver_star ? naver_star + ' / 5.0' : '정보 없음'}
          prefix={<StarOutlined />}
          valueStyle={{ 'font-size': '15px' }}
        />
      </Col>
      <Col span={8}>
        <Statistic
          title={<Tag color="gold">Kakao</Tag>}
          value={kakao_star ? kakao_star + ' / 5.0' : '정보 없음'}
          prefix={<StarOutlined />}
          valueStyle={{ 'font-size': '15px' }}
        />
      </Col>
    </Row>
  );
};

export default FoodContent;
