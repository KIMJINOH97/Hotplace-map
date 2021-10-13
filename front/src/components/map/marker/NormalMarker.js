import React, { useState, useEffect } from 'react';
import { CustomOverlayMap, MapMarker, useMap } from 'react-kakao-maps-sdk';

import MARKER_NORMAL from '../../../assets/MARKER_NORMAL.png';
import InfoWindowCard from '../infowindow/InfoWindowCard';

const markerNormalSize = { width: 36, height: 36 };

const NormalMarker = ({ store, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const map = useMap();

  const position = {
    lat: parseFloat(store.latitude_y),
    lng: parseFloat(store.longitude_x),
  };
  useEffect(() => {
    console.log('kakaomap Normal marker start!');
    console.log(store, index);
  });

  return (
    <>
      <MapMarker
        position={position}
        image={{
          src: MARKER_NORMAL,
          size: markerNormalSize,
        }}
        clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <>
          <CustomOverlayMap position={position}>
            <div className="wrap">
              <div className="info">
                <InfoWindowCard
                  place={store}
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </div>
          </CustomOverlayMap>
        </>
      )}
    </>
  );
};

export default NormalMarker;
