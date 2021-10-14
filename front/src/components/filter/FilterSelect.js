import React from "react";
import { Select } from "antd";
import { makeOption } from "../../utils/FilterUtil";

const FilterSelect = ({ currentSelect, onChangeMethod, optionList }) => {
  return (
    <Select
      value={currentSelect}
      style={{ width: 100 }}
      onChange={onChangeMethod}
      dropdownStyle={{ borderRadius: "0.25rem" }}
    >
      {makeOption(optionList)}
    </Select>
  );
};

export default FilterSelect;
