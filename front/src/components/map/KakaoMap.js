import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { foodListState, storeState } from '../../atom';
import { Map, MapInfoWindow, MapMarker } from 'react-kakao-maps-sdk';
import { makeInfoWindow } from '../../utils/KakaoMapUtil';

// import MARKER_SMALL from '../../assets/MARKER_SMALL.png';
import MARKER_NORMAL from '../../assets/MARKER_NORMAL.png';
import SmallMarker from './marker/SmallMarker';
import NormalMarker from './marker/NormalMarker';
const KakaoMapContainer = styled.div`
  width: 100%;
  height: 100vh;
  /* border: 1px solid black; */

  /* margin: 50px auto 0; */
`;
// const { kakao } = window;
const carparkOrigin = { x: 10, y: 72 };
const markerImageSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';

const imageSize = { width: 22, height: 26 };
const spriteSize = { width: 36, height: 98 };
const markerSmallSize = { width: 12, height: 12 };
const markerNormalSize = { width: 36, height: 36 };
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

const KakaoMap = (props) => {
  const map = useRef();
  // const mapContainerRef = useRef();
  const [markers, setMarkers] = useState([]);
  const [, setInfoWindows] = useState([]);

  const [state, setState] = useState({
    // 지도의 초기 위치
    center: { lat: 37.5666805, lng: 126.9784147 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

  const storeList = useRecoilValue(storeState);
  // const [foodList] = useRecoilState(foodListState);
  const foodList = useRecoilValue(foodListState);

  useEffect(() => {
    if (foodList.length > 0) {
      let sumOfLatitude = 0;
      let sumOfLongitude = 0;

      console.log(`foods :`);
      for (let i = 0; i < foodList.length; i++) {
        console.log(`${i} , ${JSON.stringify(foodList[i])}`);
      }

      foodList.forEach(({ latitude_y, longitude_x }) => {
        sumOfLatitude += parseFloat(latitude_y);
        sumOfLongitude += parseFloat(longitude_x);
        console.log(
          `
          latitude_y : ${latitude_y}
          longitude_x : ${longitude_x}
          `
        );
      });

      const pageLen = foodList.length;
      console.log('useEffect 트리거!');
      console.log(`sumOfLatitude / pageLen  ${sumOfLatitude / pageLen}`);
      console.log(`sumOfLongitude / pageLen ${sumOfLongitude / pageLen}`);
      setState({
        center: { lat: sumOfLatitude / pageLen, lng: sumOfLongitude / pageLen },
        // 지도 위치 변경시 panto를 이용할지에 대해서 정의
        isPanto: true,
      });
    }
  }, [foodList]);

  return (
    <Map
      center={state.center}
      isPanto={state.isPanto}
      style={{
        // 지도의 크기
        width: '100%',
        height: '1000px',
      }}
      level={3} // 지도의 확대 레벨>
    >
      {storeList.map((store, index) => {
        return (
          <SmallMarker store={store} index={index} key={store.name + index} />
        );
      })}
      {foodList.map((store, index) => {
        return (
          <NormalMarker
            store={store}
            index={index}
            key={store.name + index + 'food'}
          ></NormalMarker>
        );
      })}
    </Map>
  );
};

export default KakaoMap;
