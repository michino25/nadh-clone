import { Button, Form, Input } from "antd";
import { useState } from "react";

interface iDataInput {
  label?: string;
  name: string;
  type?: string | undefined;
  value: string;
  onSubmit: (value: any) => void;
}

export default function EditableForm({
  label,
  name,
  value,
  type,
  onSubmit,
}: iDataInput) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {!edit ? (
        <button
          className="text-black p-0 m-0 w-full text-left"
          onClick={() => setEdit(true)}
        >
          {value || "-"}
        </button>
      ) : (
        <Form
          name="global_state"
          layout="inline"
          onFinish={(values: any) => {
            onSubmit(values);
            setEdit(false);
          }}
        >
          <Form.Item
            name={name}
            initialValue={value}
            rules={[
              {
                type: type as any,
                message: `The input is not valid ${label}!`,
              },
              {
                required: false,
                message: label
                  ? `Please input your ${label}!`
                  : "Missing this field",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button onClick={() => setEdit(false)}>Cancel</Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
