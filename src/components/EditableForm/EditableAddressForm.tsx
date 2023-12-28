import { convertKeytoValue } from "_constants/index";
import { Button, Col, Form, Row } from "antd";
import Address from "components/DataEntry/Address";
import { useState } from "react";

interface iDataInput {
  name: string;
  value: any;
  onSubmit: (value: any, onSuccess: () => void) => void;
  editing: any;
  setEditing: (value: any) => void;
  onlyCity?: boolean;
}

export default function EditableForm({
  value,
  onSubmit,
  editing,
  setEditing,
  onlyCity,
}: iDataInput) {
  const [edit, setEdit] = useState(false);
  const [data, setdata] = useState();
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
          {(value?.district?.label ? value?.district?.label + " - " : "") +
            (value?.city?.label ? value?.city?.label + " - " : "") +
            (value?.country?.label ? value?.country?.label : "-")}
        </button>
      ) : (
        <Form
          name="global_state"
          onFinish={() => {
            setLoading(true);
            onSubmit(data, () => {
              setLoading(false);
              setEdit(false);
              setEditing(false);
            });
          }}
          className="w-full mr-5"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Address
                onChange={(data) => setdata(data)}
                defaultValue={{
                  address: value?.address,
                  district: convertKeytoValue(value?.district),
                  city: convertKeytoValue(value?.city),
                  country: convertKeytoValue(value?.country),
                }}
                onlyCity={onlyCity}
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
