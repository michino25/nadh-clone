import { Form, InputNumber } from "antd";
import numeral from "numeral";

interface iDataInput {
  label: string;
  name: string | string[];
  required?: boolean;
  defaultValue?: string | number;
  placeholder: string;
  disabled?: boolean;
  noformat?: boolean;
  addonAfter?: string;
}

export default function DataInputNumber({
  label,
  name,
  required,
  defaultValue,
  placeholder,
  disabled,
  noformat,
  addonAfter,
}: iDataInput) {
  const handleParser = (value: string | undefined) => {
    const numericValue = numeral(value).value();
    return numericValue !== null ? numericValue : "";
  };

  const handleFormatter = (value: string | number | undefined) => {
    return !noformat && value ? numeral(value).format("0,0") : `${value}`;
  };

  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={defaultValue}
      rules={[
        {
          required: required,
          message: `Please input your ${label}!`,
        },
      ]}
    >
      <InputNumber
        style={{ width: "100%" }}
        min={0}
        formatter={handleFormatter}
        parser={!noformat ? handleParser : undefined}
        placeholder={placeholder}
        disabled={disabled}
        addonAfter={addonAfter}
      />
    </Form.Item>
  );
}
