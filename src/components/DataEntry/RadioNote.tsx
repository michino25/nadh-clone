import { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Form, Radio } from "antd";
import { iOption } from "_constants/index";
import DataInput from "./Input";

interface iRadio {
  label: string;
  data: iOption[];
  name: string;
  required?: boolean;
  defaultValue?: string | number | undefined;
  disabled?: boolean;
}

export default function DataRadioNote({
  label,
  data,
  name,
  required,
  defaultValue,
  disabled,
}: iRadio) {
  const [value, setValue] = useState(
    (defaultValue as any)[name].toString() || "-1"
  );

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <Form.Item
        label={label}
        name={name}
        initialValue={value}
        rules={[
          {
            required: required,
            message: `Please input your your ${label}!`,
          },
        ]}
        className={value === "1" ? "mb-2" : ""}
      >
        <Radio.Group onChange={onChange} value={value} disabled={disabled}>
          {data.map((item: iOption) => (
            <Radio key={item.value} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      {value === "1" && (
        <div className="lg:w-1/3 sm:w-1/2 w-full">
          <DataInput
            name={name + "_text"}
            placeholder="Note"
            defaultValue={
              (defaultValue as any)[name + "_text"].toString() || ""
            }
          />
        </div>
      )}
    </>
  );
}
