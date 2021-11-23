import React from 'react';
import { Affix } from 'antd'
import { useRecoilState } from 'recoil'
import { coordState } from '../../../atom'
const CurrrentLocationButton = () => {

    const [coord, setCoord] = useRecoilState(coordState);

    const onClickEvent = () => {
        console.log("onClickEvent");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            alert("위치를 얻을 수 없습니다.");
        }
    }

    const showPosition = (position) => {
        console.log("위도:" + position.coords.latitude
            + " 경도:" + position.coords.longitude);
        // console.log(typeof position.coords.latitude)
        setCoord({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
        // setCoord()
    }

    const check = () => {
        console.log(coord);
    }

    return <Affix style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 2 }}>
        <div>현재 위치 버튼</div>
        <button onClick={onClickEvent}>클릭 버튼!</button>
        <button onClick={check} >recoil 확인</button>
    </Affix>
}

export default CurrrentLocationButton;