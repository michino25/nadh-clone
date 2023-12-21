import { Select, Form } from "antd";

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

interface iDataInput {
  label: string;
  name: string;
  required?: boolean;
  allowClear?: boolean;
  defaultValue?: string | number;
  placeholder: string;
  data: { label: string; value: string }[];
  disable?: boolean;
}

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function SelectWithSearchAPI({
  label,
  name,
  required,
  allowClear = true,
  defaultValue,
  placeholder,
  data,
  disable,
}: iDataInput) {
  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={defaultValue}
      rules={[
        {
          required: required,
          message: `Please input ${placeholder || label}!`,
        },
      ]}
    >
      <Select
        filterOption={filterOption}
        allowClear={allowClear}
        disabled={disable}
        options={data}
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        showSearch
        placeholder={placeholder}
      />
    </Form.Item>
  );
}
