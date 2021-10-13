import React, { useState, useEffect } from 'react';
import { CustomOverlayMap, MapMarker, useMap } from 'react-kakao-maps-sdk';

import MARKER_SMALL from '../../../assets/MARKER_SMALL.png';
import InfoWindowCard from '../infowindow/InfoWindowCard';
const markerSmallSize = { width: 12, height: 12 };
/*

address: "서울 마포구 상수동 316-1 랑데자뷰 상수점"
homepage_url: "http://www.instagram.com/rendejavous"
instagram_hashtag: 126396
instagram_url: "https://www.instagram.com/explore/tags/랑데자뷰"
kakao_star: 3.6
kakao_url: "http://place.map.kakao.com/1902772928"
latitude_y: "37.5484427009244"
longitude_x: "126.920872072854"
name: "랑데자뷰 상수점"
naver_star: 4.44
naver_url: "https://map.naver.com/v5/entry/place/1048166619"
 */

const SmallMarker = ({ store, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const map = useMap();

  const position = {
    lat: parseFloat(store.latitude_y),
    lng: parseFloat(store.longitude_x),
  };

  useEffect(() => {
    console.log('kakaomap marker start!!!');
    console.log(store, index);
  }, []);

  return (
    <>
      <MapMarker
        position={position}
        image={{
          src: MARKER_SMALL,
          size: markerSmallSize,
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

export default SmallMarker;
