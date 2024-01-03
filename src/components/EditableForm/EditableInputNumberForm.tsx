import { Button, Form, Col, Row } from "antd";
import { useState } from "react";
import numeral from "numeral";
import DataInputNumber from "components/DataEntry/InputNumber";

interface iDataInput {
  label?: string;
  name: string;
  className?: string;
  value: string;
  onSubmit: (value: any, onSuccess: () => void) => void;
  editing: boolean;
  setEditing: (value: boolean) => void;
}

export default function EditableForm({
  label,
  name,
  value,
  onSubmit,
  editing,
  setEditing,
  className,
}: iDataInput) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {!edit ? (
        <button
          className={
            className +
            " text-black p-0 m-0 w-full text-left " +
            (editing && "cursor-not-allowed")
          }
          disabled={editing}
          onClick={() => {
            setEdit(true);
            setEditing(true);
          }}
        >
          {(value && numeral(value).format("0,0")) || "-"}
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
              <DataInputNumber
                label=""
                defaultValue={value}
                placeholder={label || name}
                name={name}
              />
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
