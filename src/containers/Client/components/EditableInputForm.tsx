import { Button, Form, Input, Col, Row } from "antd";
import { useState } from "react";

interface iDataInput {
  label?: string;
  name: string;
  className?: string;
  type?: string | undefined;
  value: string;
  onSubmit: (value: any) => void;
  editing: any;
  setEditing: (value: any) => void;
}

export default function EditableForm({
  label,
  name,
  value,
  type,
  onSubmit,
  editing,
  setEditing,
  className,
}: iDataInput) {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {!edit ? (
        <button
          className={className + " text-black p-0 m-0 w-full text-left"}
          onClick={() => {
            if (!editing) {
              setEdit(true);
              setEditing(true);
            }
          }}
        >
          {value || "-"}
        </button>
      ) : (
        <Form
          name="global_state"
          onFinish={(values: any) => {
            onSubmit(values);
            setEdit(false);
            setEditing(false);
          }}
          className="w-full mr-5"
        >
          <Row gutter={16}>
            <Col span={24}>
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
                <Input placeholder={label} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} justify={"end"} className="gap-3 pr-2">
            <Form.Item>
              <Button
                onClick={() => {
                  setEdit(false);
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Row>
        </Form>
      )}
    </>
  );
}
