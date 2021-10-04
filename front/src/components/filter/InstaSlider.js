import React, { useState, useRef, useEffect } from 'react';
import { Button, Slider, Switch } from 'antd';
import { useRecoilState } from 'recoil';
import { queryState } from '../../atom';

const InstaSlider = () => {
  const [query, setQuery] = useRecoilState(queryState);
  const [activated, setActivated] = useState(true);
  const [curValue, setCurValue] = useState(10000);

  const handleDisabledChange = (counterActive) => {
    setActivated(counterActive);

    if (counterActive === false) {
      // toggle off 상태
      setQuery({
        ...query,
        minimum_instagram_hashtag: null,
      });
    } else {
      // toggle on 상태
      setQuery({
        ...query,
        minimum_instagram_hashtag: curValue,
      });
    }
  };

  const sliderOnChange = (value) => {
    setCurValue(value);
    setQuery({
      ...query,
      minimum_instagram_hashtag: value,
    });
  };

  return (
    <>
      <div>
        인스타그램 해시태그수:{' '}
        <Switch
          size="small"
          checked={activated}
          onChange={handleDisabledChange}
        />
      </div>
      <Slider
        step={1000}
        defaultValue={curValue}
        min={0}
        max={100000}
        disabled={!activated}
        onChange={sliderOnChange}
      />
    </>
  );
};

export default InstaSlider;
