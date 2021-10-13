import React from 'react';
import styled from 'styled-components';

import { Affix, Avatar, Button, Card, Col, Row, Statistic } from 'antd';
import { useRecoilState } from 'recoil';
import { tokenState, userState } from '../../atom';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import { removeCookie } from '../../utils/CookieUtils';

const { REACT_APP_TOKEN_KEY } = process.env;

const UserInfoCard = ({
  height = '150px',
  width = '300px',
  image,
  top = '10px',
  right = '10px',
  provider,
}) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);

  const logout = () => {
    setUserInfo(null);
    setToken(null);
    removeCookie(REACT_APP_TOKEN_KEY);
  };

  return (
    <>
      <Affix style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
        <Card
          size="small"
          title={`${userInfo.name} 님`}
          extra={
            <a href="/" onClick={logout}>
              로그아웃
            </a>
          }
          style={{
            width: 250,
            display: 'inline-block',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Avatar size={64} src={userInfo.profileUrl} />
            </Col>
            <Col span={12}>
              <Statistic
                title="Bookmark"
                value={12}
                prefix={<StarOutlined />}
              />
            </Col>
          </Row>
        </Card>
      </Affix>
    </>
  );
};
// /* <Wrapper height={height} width={width} top={top} right={right}>
//         <Card style={{ width: 300, display: 'inline-block' }}>
//           {/* <p>Card content</p> */}
//           {/* <p>Card content</p> */}
//           <Button type={'primary'}></Button>
//         </Card>
//       </Wrapper> */

export default UserInfoCard;

const Wrapper = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  z-index: 2;
  border-radius: 12px;
  background-color: white;
`;
