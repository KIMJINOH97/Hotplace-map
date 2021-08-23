import React, { useState, useRef, useEffect } from 'react';
import { Select } from 'antd';
import { makeOption } from '../../utils/FilterUtil';

const FilterSelect = ({ currentSelect, onChangeMethod, optionList }) => {
  return (
    <Select
      value={currentSelect}
      style={{ width: 120 }}
      onChange={onChangeMethod}
    >
      {makeOption(optionList)}
    </Select>
  );
};

export default FilterSelect;
