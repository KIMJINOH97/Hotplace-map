import React, { useState, useRef, useEffect } from 'react';
import { Button, Slider, Switch } from 'antd';
import { useRecoilState } from 'recoil';
import { queryState } from '../../atom';

const NaverSlider = () => {
  const [query, setQuery] = useRecoilState(queryState);
  const [disabled, setDisabled] = useState(false);

  const handleDisabledChange = (isDisabled) => {
    setDisabled(isDisabled);
    console.log(disabled);
    setQuery({
      ...query,
      naver_filter: !isDisabled,
    });
  };

  const sliderOnChange = (value) => {
    console.log(value);
    setQuery({ ...query, minimum_naver_rating: value });
  };

  return (
    <>
      <Slider
        step={0.1}
        defaultValue={3}
        min={0}
        max={5}
        disabled={disabled}
        onChange={sliderOnChange}
      />
      Disabled:{' '}
      <Switch size="small" checked={disabled} onChange={handleDisabledChange} />
    </>
  );
};

export default NaverSlider;