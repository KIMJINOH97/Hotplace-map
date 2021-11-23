import React from 'react';
import { Affix } from 'antd'
import { useRecoilState } from 'recoil'
import { coordState } from '../../../atom'
import styled from 'styled-components';
import GPS from '../../../assets/GPS.png'

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
        setCoord({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }

    const check = () => {
        console.log(coord);
    }

    return <Affix style={affixAttr}>

        <GPSButton>
            <GPSImage src={GPS} onClick={onClickEvent} />
        </GPSButton>
    </Affix>
}
const affixAttr = {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 2
}

const GPSButton = styled.button`
 width:30px;
 height:30px;
 padding:0px;
`

const GPSImage = styled.img`
width:100%;
height:100%;
`

export default CurrrentLocationButton;