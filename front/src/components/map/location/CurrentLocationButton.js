import React from 'react';
import { Affix } from 'antd';
import { useRecoilState } from 'recoil';
import { coordState, currentCoordState } from '../../../atom';
import styled from 'styled-components';
import GPS from '../../../assets/GPS.png';

const CurrrentLocationButton = () => {
  const [coord, setCoord] = useRecoilState(coordState);
  const [currentCoord, setCurrentCoord] = useRecoilState(currentCoordState);

  const onClickEvent = () => {
    console.log('onClickEvent');
    if (currentCoord) {
      setCurrentCoord(null);
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('위치를 얻을 수 없습니다.');
    }
  };

  const showPosition = (position) => {
    setCoord({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
    setCurrentCoord({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  };

  const check = () => {
    console.log(coord);
  };

  return (
    <Affix style={affixAttr}>
      <GPSButton>
        <GPSImage src={GPS} onClick={onClickEvent} />
      </GPSButton>
    </Affix>
  );
};
const affixAttr = {
  position: 'absolute',
  bottom: 10,
  right: 10,
  zIndex: 2
};

const GPSButton = styled.button`
  width: 33px;
  height: 33px;
  padding: 3px;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
`;

const GPSImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default CurrrentLocationButton;
