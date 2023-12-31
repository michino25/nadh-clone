import { iOption, iOption2 } from "_constants/index";
import { Button, Col, Row, Form } from "antd";
import { MultiSelect } from "components/DataEntry";
import { useState } from "react";
import { formatName } from "utils/format";

interface iDataInput {
  name: string;
  placeholder: string;
  value: any;
  data: iOption[];
  onSubmit: (value: any, onSuccess: () => void) => void;
  editing: boolean;
  setEditing: (value: boolean) => void;
  prevent?: boolean;
}

export default function EditableForm({
  name,
  placeholder,
  value,
  data,
  onSubmit,
  editing,
  setEditing,
  prevent = false,
}: iDataInput) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(data);
  // console.log(value);

  const closeEdit = () => {
    setEdit(false);
    if (!prevent) setEditing(false);
  };

  return (
    <>
      {!edit ? (
        <button
          onClick={() => {
            setEdit(true);
            setEditing(true);
          }}
          className={
            "text-black p-0 m-0 w-full text-left " +
            (editing && "cursor-not-allowed")
          }
          disabled={editing && !prevent}
        >
          {value && value.length > 0
            ? value.map((item: iOption2) => formatName(item.label)).join(", ")
            : "-"}
        </button>
      ) : (
        <Form
          name="global_state"
          onFinish={(values: any) => {
            setLoading(true);
            onSubmit(values, () => {
              setLoading(false);
              closeEdit();
            });
          }}
          className="w-full mr-5"
        >
          <Row gutter={16}>
            <Col span={24}>
              <MultiSelect
                placeholder={placeholder}
                label=""
                name={name}
                defaultValue={value.map((item: iOption) => item.value)}
                options={data}
                required={false}
              />
            </Col>
          </Row>

          <Row gutter={16} justify={"end"} className="gap-3 pr-2">
            <Form.Item>
              <Button
                onClick={() => {
                  closeEdit();
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
