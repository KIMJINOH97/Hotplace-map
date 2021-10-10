import React, { useState, useEffect } from 'react';
import { MapMarker, useMap } from 'react-kakao-maps-sdk';

import MARKER_NORMAL from '../../../assets/MARKER_NORMAL.png';
import InfoWindowCard from '../infowindow/InfoWindowCard';

const markerNormalSize = { width: 36, height: 36 };

const NormalMarker = ({ store, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const map = useMap();

  useEffect(() => {
    console.log('kakaomap Normal marker start!');
    console.log(store, index);
  });

  return (
    <MapMarker
      position={{
        lat: parseFloat(store.latitude_y),
        lng: parseFloat(store.longitude_x),
      }}
      image={{
        src: MARKER_NORMAL,
        size: markerNormalSize,
      }}
      clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      onClick={() => setIsOpen(true)}
    >
      {isOpen && (
        <>
          {/* <div>{store.name}</div>
            <button>!!!</button> */}
          {/* <div style={{ minWidth: '150px' }}>
            <img
              alt="close"
              width="14"
              height="13"
              src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
              style={{
                position: 'absolute',
                right: '5px',
                top: '5px',
                cursor: 'pointer',
              }}
              onClick={() => setIsOpen(false)}
            /> */}
          <InfoWindowCard place={store} />
          {/* </div> */}
        </>
      )}
    </MapMarker>
  );
};

export default NormalMarker;
