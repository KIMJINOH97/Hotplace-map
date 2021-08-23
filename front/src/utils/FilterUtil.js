import { Select } from 'antd';
const { Option } = Select;

export const makeOption = (options) => {
  const [a, b] = Object.keys(options[0]);
  return options.map((val) => (
    <Option key={val[a]} value={val[b]}>
      {val[b]}
    </Option>
  ));
};
