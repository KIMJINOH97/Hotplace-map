import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const KakaoMapContainer = styled.div`
  width: 100%;
  height: 880px;
  /* border: 1px solid black; */

  /* margin: 50px auto 0; */
`;
const { kakao } = window;

const KakaoMap = (props) => {
  const map = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    map.current = new kakao.maps.Map(mapContainerRef.current, options);
  }, []);

  return <KakaoMapContainer ref={mapContainerRef}></KakaoMapContainer>;
};

export default KakaoMap;
