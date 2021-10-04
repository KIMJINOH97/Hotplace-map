import React from 'react';
import styled from 'styled-components';

const loginHandler = {
  kakao: () => (window.location.href = `/oauth2/authorization/kakao`),
  naver: () => (window.location.href = `/oauth2/authorization/naver`),
};

const LoginButton = ({
  height = '45px',
  width = '90px',
  image,
  top = '10px',
  right = '10px',
  provider,
}) => {
  return (
    <Wrapper height={height} width={width} top={top} right={right}>
      <ButtonImage src={image} onClick={loginHandler[provider]} />
    </Wrapper>
  );
};

export default LoginButton;

const Wrapper = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  z-index: 401;
  border-radius: 12px;
  background-color: red;
`;

const ButtonImage = styled.img`
  width: 100%;
  height: 100%;
`;
