import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { MapMarker } from 'react-kakao-maps-sdk';
import { focusedIdState } from '../../../atom';
import MARKER_NORMAL from '../../../assets/MARKER_NORMAL.png';
import CustomInfoWindow from '../infowindow/CustomInfoWindow';

const markerNormalSize = { width: 36, height: 36 };

const NormalMarker = ({ store, index }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [focusedId, setFocusedId] = useRecoilState(focusedIdState);

  const position = {
    lat: parseFloat(store.latitude_y),
    lng: parseFloat(store.longitude_x),
  };

  useEffect(() => {
    console.log('kakaomap Normal marker start!');
    console.log(store, index);
  });

  const { id } = store;

  return (
    <>
      <MapMarker
        position={position}
        image={{
          src: MARKER_NORMAL,
          size: markerNormalSize,
        }}
        clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        onClick={() => {
          setFocusedId({ ...focusedId, normal: id, small: null });
        }}
      />
      {focusedId.normal === id && (
        <CustomInfoWindow
          position={position}
          store={store}
          onClick={() =>
            setFocusedId({ ...focusedId, normal: null, small: null })
          }
        />
      )}
    </>
  );
};

export default NormalMarker;
