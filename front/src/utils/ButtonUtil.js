import React from 'react';
import styled from 'styled-components';

const ButtonUtil = ({ height = '30px', width = '50px', name, onClick }) => {
  return (
    <Wrapper height={height} width={width} onClick={onClick}>
      <ButtonName>{name}</ButtonName>
    </Wrapper>
  );
};

export default ButtonUtil;

const Wrapper = styled.div`
  display: flex;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
  font-weight: 700;
  background-color: #6699ff;
  border-radius: 8px;
  margin-right: 10px;
  transition: all 0.9s, color 0.3;
  cursor: pointer;
  :hover {
    background-color: #1890ff; //#1467dd #6699ff
  }
`;

const ButtonName = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
`;
