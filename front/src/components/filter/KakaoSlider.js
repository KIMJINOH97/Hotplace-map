import React, { useState } from "react";
import { Slider, Switch } from "antd";
import { useRecoilState } from "recoil";
import { queryState } from "../../atom";

import styled from "styled-components";

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
    <Wrapper>
      <SwitchBox>
        <SwitchLabel>Kakao 별점 </SwitchLabel>
        <Switch
          size="small"
          checked={activated}
          onChange={handleDisabledChange}
        />
      </SwitchBox>
      <Slider
        style={{ margin: 0 }}
        step={0.1}
        defaultValue={curValue}
        min={0}
        max={5}
        disabled={!activated}
        onChange={sliderOnChange}
      />
    </Wrapper>
  );
};

export default KakaoSlider;

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
