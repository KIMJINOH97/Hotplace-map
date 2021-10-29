import React from 'react';
import InfoWindowCard from './InfoWindowCard';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const CustomInfoWindow = ({ position, store, onClick }) => {
  return (
    <CustomOverlayMap position={position}>
      <InfoWindowLayout>
        <div className="info">
          <InfoWindowCard place={store} onClick={onClick} />
        </div>
      </InfoWindowLayout>
    </CustomOverlayMap>
  );
};

export default CustomInfoWindow;

const InfoWindowLayout = styled.div`
  position: absolute;
  /* left: 0; */
  bottom: 25px;
  width: 400px;
  height: 270px;
  margin-left: -198px;
  text-align: left;
  overflow: auto;
  font-size: 12px;
  line-height: 1.5;
`;
