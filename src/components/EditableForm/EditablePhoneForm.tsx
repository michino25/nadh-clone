import { Button, Col, Row, Form } from "antd";
import Phone from "components/DataEntry/Phone";
import { useState } from "react";

interface iDataInput {
  name: string;
  value: any;
  onSubmit: (value: any, onSuccess: () => void) => void;
  editing: boolean;
  setEditing: (value: boolean) => void;
}

export default function EditableForm({
  name,
  value,
  onSubmit,
  editing,
  setEditing,
}: iDataInput) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {!edit ? (
        <button
          className={
            "text-black p-0 m-0 w-full text-left " +
            (editing && "cursor-not-allowed")
          }
          disabled={editing}
          onClick={() => {
            setEdit(true);
            setEditing(true);
          }}
        >
          {value.phone_code.extra.dial_code + " " + value.number || "-"}
        </button>
      ) : (
        <Form
          name="global_state"
          onFinish={(values: any) => {
            setLoading(true);
            onSubmit(values, () => {
              setLoading(false);
              setEdit(false);
              setEditing(false);
            });
          }}
          className="w-full mr-5"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Phone name={name} defaultValue={value} />
            </Col>
          </Row>

          <Row gutter={16} justify={"end"} className="gap-3 pr-2">
            <Form.Item>
              <Button
                onClick={() => {
                  setEdit(false);
                  setEditing(false);
                }}
                disabled={loading}
              >
                Cancel
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save
              </Button>
            </Form.Item>
          </Row>
        </Form>
      )}
    </>
  );
}
