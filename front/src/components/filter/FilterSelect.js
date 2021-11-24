import React from 'react';
import { Select } from 'antd';
import { makeOption } from '../../utils/FilterUtil';

const FilterSelect = ({ currentSelect, onChangeMethod, optionList, width = 100 }) => {
  return (
    <Select
      value={currentSelect}
      style={{ width: width }}
      onChange={onChangeMethod}
      dropdownStyle={{ borderRadius: '0.25rem' }}
    >
      {makeOption(optionList)}
    </Select>
  );
};

export default FilterSelect;
