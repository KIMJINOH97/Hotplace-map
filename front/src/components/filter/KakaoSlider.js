import React, { useState, useRef, useEffect } from 'react';
import { Button, Slider, Switch } from 'antd';
import { useRecoilState } from 'recoil';
import { queryState } from '../../atom';

const KakaoSlider = () => {
  const [query, setQuery] = useRecoilState(queryState);
  const [activated, setActivated] = useState(false);
  const [curValue, setCurValue] = useState(3);

  const handleDisabledChange = (counterActive) => {
    setActivated(counterActive);

    if (counterActive === false) {
      // toggle off 상태
      setQuery({
        ...query,
        minimum_kakao_rating: null,
      });
    } else {
      // toggle on 상태
      setQuery({
        ...query,
        minimum_kakao_rating: curValue,
      });
    }
  };

  const sliderOnChange = (value) => {
    setCurValue(value);
    setQuery({
      ...query,
      minimum_kakao_rating: value,
    });
  };

  return (
    <>
      <div>
        KAKAO 별점:
        <Switch
          size="small"
          checked={activated}
          onChange={handleDisabledChange}
        />
      </div>
      <Slider
        step={0.1}
        defaultValue={curValue}
        min={0}
        max={5}
        disabled={!activated}
        onChange={sliderOnChange}
      />
    </>
  );
};

export default KakaoSlider;
