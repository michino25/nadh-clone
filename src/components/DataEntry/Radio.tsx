import { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Form, Radio } from "antd";

interface iData {
  label: string;
  value: string | number;
}

interface iRadio {
  label: string;
  data: iData[];
  name: string;
  required?: boolean;
  defaultValue?: string | number | undefined;
  disabled?: boolean;
}

export default function DataRadio({
  label,
  data,
  name,
  required,
  defaultValue,
  disabled,
}: iRadio) {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={defaultValue}
      rules={[
        {
          required: required,
          message: `Please input your your ${label}!`,
        },
      ]}
    >
      <Radio.Group onChange={onChange} value={value} disabled={disabled}>
        {data.map((item: iData) => (
          <Radio key={item.value} value={item.value}>
            {" "}
            {item.label}{" "}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
}
