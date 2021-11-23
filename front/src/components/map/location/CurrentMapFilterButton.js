import { Affix } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil'
import { placeApi } from '../../../api';
import { coordState, queryState, storeState } from '../../../atom'


const CurrentMapFilterButton = () => {

    const [coord, setCoord] = useRecoilState(coordState);
    const [query] = useRecoilState(queryState);
    const [, setStoreList] = useRecoilState(storeState)

    const onClickEvent = async () => {
        const distance = 1;
        const { status, data, message } = await placeApi.getPlaceByLocation(query, coord.lat, coord.lng, distance);

        if (status === 200) {
            setStoreList(data);
        } else {
            alert(message);
        }
    }

    return <Affix style={affixAttr} >
        <button onClick={onClickEvent}>현재 지도에서 검색하기</button>
    </Affix>
}
const affixAttr = {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2
}

export default CurrentMapFilterButton;