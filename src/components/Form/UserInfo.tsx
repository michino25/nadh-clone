import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Modal,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  Upload,
} from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function UserInfo() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  return (
    <>
      <Form
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // layout="horizontal"
        layout="vertical"
        className="w-full"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Avatar"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item className="flex justify-end">
              <Button
                onClick={() => {
                  setOpen(true);
                }}
              >
                Change Password
              </Button>

              <Modal
                open={open}
                title="Change Password"
                okText="Save"
                cancelText="Cancel"
                onCancel={() => {
                  setOpen(false);
                }}
                onOk={() => {
                  form
                    .validateFields()
                    .then((values) => {
                      form.resetFields();
                      onCreate(values);
                    })
                    .catch((info) => {
                      console.log("Validate Failed:", info);
                    });
                }}
              >
                <Form
                  form={form}
                  layout="vertical"
                  name="form_in_modal"
                  initialValues={{ modifier: "public" }}
                >
                  <Form.Item
                    label="Current password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="New password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Confirm new password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Form>
              </Modal>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Full name"
              name="full_name"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input className="" defaultValue={"thanh binh"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Username"
              name="user_name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input className="" defaultValue={"thanhbinh"} disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Birthday">
              <Row gutter={16}>
                <Col span={8}>
                  <Select
                    defaultValue="lucy"
                    allowClear
                    options={[{ value: "lucy", label: "Lucy" }]}
                  />
                </Col>
                <Col span={8}>
                  <Select
                    defaultValue="lucy"
                    allowClear
                    options={[{ value: "lucy", label: "Lucy" }]}
                  />
                </Col>
                <Col span={8}>
                  <Select
                    defaultValue="lucy"
                    allowClear
                    options={[{ value: "lucy", label: "Lucy" }]}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mobile Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input className="" defaultValue={"thanhbinh"} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Gender">
              <Radio.Group>
                <Radio value="apple"> Male </Radio>
                <Radio value="pear"> Female </Radio>
                <Radio value="pear"> Complicated </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Status">
              <Radio.Group>
                <Radio value="apple"> Active </Radio>
                <Radio value="pear"> Inactive </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Select defaultValue="demo">
                <Select.Option value="demo">Manager</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}></Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="full_name"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input className="" defaultValue={"thanhbinh@lubrytics.com"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                className=""
                defaultValue={"ex: 2 Hai Trieu, Bitexco Financial Tower"}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Created on">
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={12}></Col>
        </Row>

        <Form.Item className="flex justify-end space-x-2">
          <Button className="mr-2">Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
