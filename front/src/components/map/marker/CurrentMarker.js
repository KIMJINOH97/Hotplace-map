import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { MapMarker } from 'react-kakao-maps-sdk';
import { currentCoordState } from '../../../atom';
import CURRENT_LOCATION from '../../../assets/CURRENT_LOCATION.png';

const markerNormalSize = { width: 18, height: 18 };

const CurrentMarker = () => {
  const currentCoord = useRecoilValue(currentCoordState);

  useEffect(() => {
    console.log('currentMarker!');
  });

  return (
    <>
      {currentCoord && (
        <MapMarker
          position={currentCoord}
          image={{
            src: CURRENT_LOCATION,
            size: markerNormalSize
          }}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        />
      )}
    </>
  );
};

export default CurrentMarker;
