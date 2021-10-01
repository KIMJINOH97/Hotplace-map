import React from 'react';
import styled from 'styled-components';

const LoginButton = ({
  height = '45px',
  width = '90px',
  image,
  top = '10px',
  right = '10px',
}) => {
  return (
    <Wrapper height={height} width={width} top={top} right={right}>
      <ButtonImage src={image} />
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
