import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { foodListState, storeState } from '../../atom';
import { makeInfoWindow } from '../../utils/KakaoMapUtil';

import MARKER_SMALL from '../../assets/MARKER_SMALL.png';
import MARKER_NORMAL from '../../assets/MARKER_NORMAL.png';

const KakaoMapContainer = styled.div`
  width: 100%;
  height: 100vh;
  /* border: 1px solid black; */

  /* margin: 50px auto 0; */
`;
const { kakao } = window;

const KakaoMap = (props) => {
  const map = useRef();
  const mapContainerRef = useRef();
  const [markers, setMarkers] = useState([]);
  const [, setInfoWindows] = useState([]);

  const storeList = useRecoilValue(storeState);
  // const [foodList] = useRecoilState(foodListState);
  const foodList = useRecoilValue(foodListState);

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147),
      level: 3,
    };

    map.current = new kakao.maps.Map(mapContainerRef.current, options);
  }, []);

  const setPlaceMarker = (places, foods) => {
    clearMarkers();

    const markerSmallSize = new kakao.maps.Size(12, 12);
    const markerSmallImage = new kakao.maps.MarkerImage(
      MARKER_SMALL,
      markerSmallSize
    );

    const markerNormalSize = new kakao.maps.Size(36, 36);
    const markerNormalImage = new kakao.maps.MarkerImage(
      MARKER_NORMAL,
      markerNormalSize
    );

    createMarkers(places, markerSmallImage);
    createMarkers(foods, markerNormalImage);

    let sumOfLatitude = 0;
    let sumOfLongitude = 0;

    console.log(`foods :`);
    for (let i = 0; i < foods.length; i++) {
      console.log(`${i} , ${JSON.stringify(foods[i])}`);
    }

    foods.forEach(({ latitude_y, longitude_x }) => {
      sumOfLatitude += parseFloat(latitude_y);
      sumOfLongitude += parseFloat(longitude_x);
      console.log(
        `
        latitude_y : ${latitude_y}
        longitude_x : ${longitude_x}
        `
      );
    });

    const pageLen = foods.length;
    console.log(`
    좌표값 출력
    pageLen : ${pageLen}
    sumOfLatitude : ${sumOfLatitude}
    sumOfLongitude : ${sumOfLongitude}
    sumOfLatitude / pageLen : ${sumOfLatitude / pageLen}
    sumOfLongitude / pageLen : ${sumOfLongitude / pageLen}
    `);
    if (foods.length !== 0) {
      panTo(sumOfLatitude / pageLen, sumOfLongitude / pageLen);
    }
  };

  const panTo = (latitude_y, longitude_x) => {
    const moveLatLon = new kakao.maps.LatLng(
      parseFloat(latitude_y),
      parseFloat(longitude_x)
    );

    map.current.panTo(moveLatLon);
  };

  const makeOverListener = (map, marker, infowindow) => {
    return function () {
      infowindow.open(map, marker);
    };
  };

  const createMarkers = (placeList, markerImage) => {
    const TMP_MARKERS = [];
    const TMP_INFO_WINDOWS = [];
    for (let place of placeList) {
      const { latitude_y, longitude_x } = place;
      const marker = createMarker(latitude_y, longitude_x, markerImage);
      const infoWindow = createInfoWindow(place);

      TMP_MARKERS.push(marker);
      TMP_INFO_WINDOWS.push(infoWindow);

      kakao.maps.event.addListener(
        marker,
        'click',
        makeOverListener(map.current, marker, infoWindow)
      );
    }
    setMarkers(TMP_MARKERS);
    setInfoWindows(TMP_INFO_WINDOWS);
  };

  const createMarker = (latitude_y, longitude_x, markerImage) => {
    return new kakao.maps.Marker({
      map: map.current,
      position: new kakao.maps.LatLng(
        parseFloat(latitude_y),
        parseFloat(longitude_x)
      ),
      image: markerImage,
    });
  };

  const createInfoWindow = (place) => {
    return new kakao.maps.InfoWindow({
      content: makeInfoWindow(place),
      removable: true,
    });
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
      setPlaceMarker(storeList, foodList);
    }
  }, [foodList]);

  return <KakaoMapContainer ref={mapContainerRef}></KakaoMapContainer>;
};

export default KakaoMap;
