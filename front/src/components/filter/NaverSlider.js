import React, { useState, useRef, useEffect } from 'react';
import { Button, Slider, Switch } from 'antd';
import { useRecoilState } from 'recoil';
import { queryState } from '../../atom';

const NaverSlider = () => {
  const [query, setQuery] = useRecoilState(queryState);
  const [activated, setActivated] = useState(true);
  const [curValue, setCurValue] = useState(3);

  useEffect(() => {
    setQuery({
      ...query,
      minimum_naver_rating: curValue,
    });
  }, []);

  const handleDisabledChange = (counterActive) => {
    setActivated(counterActive);

    if (counterActive === false) {
      // toggle off 상태
      setQuery({
        ...query,
        minimum_naver_rating: null,
      });
    } else {
      // toggle on 상태
      setQuery({
        ...query,
        minimum_naver_rating: curValue,
      });
    }
  };

  const sliderOnChange = (value) => {
    setCurValue(value);
    setQuery({
      ...query,
      minimum_naver_rating: value,
    });
  };

  return (
    <>
      <div>
        NAVER 별점:{' '}
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

export default NaverSlider;
