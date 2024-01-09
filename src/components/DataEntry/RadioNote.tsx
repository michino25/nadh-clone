import { Form, Radio, Input } from "antd";
import { iOption } from "_constants/index";
import { useState } from "react";

interface iRadio {
  label: string;
  data: iOption[];
  name: string;
  required?: boolean;
  defaultRadio: number;
  defaultInput: string;
  disabled?: boolean;
}

export default function DataRadioNote({
  label,
  data,
  name,
  required,
  defaultRadio,
  defaultInput,
  disabled,
}: iRadio) {
  const [isYes, setIsYes] = useState(defaultRadio === 1);
  return (
    <>
      <Form.Item
        label={label}
        name={name}
        initialValue={defaultRadio?.toString()}
        rules={[
          {
            required: required,
            message: `Please input your your ${label}!`,
          },
        ]}
        className={defaultRadio?.toString() === "1" ? "mb-2" : ""}
      >
        <Radio.Group
          options={data}
          disabled={disabled}
          onChange={(e) => setIsYes(e.target.value === "1")}
        />
      </Form.Item>

      {(defaultRadio?.toString() === "1" || isYes) && (
        <div className="lg:w-1/3 sm:w-1/2 w-full">
          <Form.Item
            name={name + "_text"}
            initialValue={defaultInput}
            dependencies={[name]}
            rules={[
              ({ getFieldValue, setFieldValue }) => ({
                validator() {
                  if (getFieldValue([name]) === "-1") {
                    setFieldValue(name + "_text", "");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder="Note" className="" />
          </Form.Item>
        </div>
      )}
    </>
  );
}
