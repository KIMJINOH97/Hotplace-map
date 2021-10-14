import React, { useState } from "react";
import { Slider, Switch } from "antd";
import { useRecoilState } from "recoil";
import { queryState } from "../../atom";

import styled from "styled-components";

const InstaSlider = () => {
  const [query, setQuery] = useRecoilState(queryState);
  const [activated, setActivated] = useState(false);
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
    <Wrapper>
      <SwitchBox>
        <SwitchLabel>인스타그램 해시태그</SwitchLabel>
        <Switch
          size="small"
          checked={activated}
          onChange={handleDisabledChange}
        />
      </SwitchBox>
      <Slider
        style={{ margin: 0 }}
        step={1000}
        defaultValue={curValue}
        min={0}
        max={100000}
        disabled={!activated}
        onChange={sliderOnChange}
      />
    </Wrapper>
  );
};

export default InstaSlider;

const Wrapper = styled.div`
  height: 50px;
`;

const SwitchLabel = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  margin-right: 8px;
`;

const SwitchBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
