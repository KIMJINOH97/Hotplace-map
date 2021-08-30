import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { storeState } from '../../atom';
import { makeInfoWindow } from '../../utils/KakaoMapUtil';

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
  const [markers, setMarkers] = useState([]);
  const [infoWindows, setInfoWindows] = useState([]);

  const [storeList, setStoreList] = useRecoilState(storeState);
  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147),
      level: 3,
    };

    map.current = new kakao.maps.Map(mapContainerRef.current, options);
  }, []);

  const makeOverListener = (map, marker, infowindow) => {
    return function () {
      infowindow.open(map, marker);
    };
  };

  const setPlaceMarker = (places) => {
    clearMarkers();
    let avg_latitude_y = 0;
    let avg_longitude_x = 0;

    const TMP_MARKERS = [];
    const TMP_INFO_WINDOWS = [];
    for (let place of places) {
      const { address, dong, gu, name, latitude_y, longitude_x } = place;

      TMP_MARKERS.push(
        new kakao.maps.Marker({
          map: map.current,
          position: new kakao.maps.LatLng(
            parseFloat(latitude_y),
            parseFloat(longitude_x)
          ),
        })
      );

      avg_latitude_y += parseFloat(latitude_y);
      avg_longitude_x += parseFloat(longitude_x);

      TMP_INFO_WINDOWS.push(
        new kakao.maps.InfoWindow({
          content: makeInfoWindow(place),
          removable: true,
        })
      );
    }
    for (let i = 0; i < TMP_MARKERS.length; i++) {
      kakao.maps.event.addListener(
        TMP_MARKERS[i],
        'click',
        makeOverListener(map.current, TMP_MARKERS[i], TMP_INFO_WINDOWS[i])
      );
      // kakao.maps.event.addListener(MARKERS[i],'mouseout',makeOutListener(INFO_WINDOWS[i]));
    }
    if (places.length !== 0) {
      avg_latitude_y = avg_latitude_y / places.length;
      avg_longitude_x = avg_longitude_x / places.length;
      panTo(avg_latitude_y, avg_longitude_x);
    }

    setMarkers(TMP_MARKERS);
    setInfoWindows(TMP_INFO_WINDOWS);
  };

  const panTo = (latitude_y, longitude_x) => {
    const moveLatLon = new kakao.maps.LatLng(
      parseFloat(latitude_y),
      parseFloat(longitude_x)
    );

    map.current.panTo(moveLatLon);
  };

  const clearMarkers = () => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
    setInfoWindows([]);
  };

  useEffect(() => {
    if (storeList.length > 0) {
      setPlaceMarker(storeList);
    }
  }, [storeList]);

  return <KakaoMapContainer ref={mapContainerRef}></KakaoMapContainer>;
};

export default KakaoMap;
