import { Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
interface iDataInput {
  label: string;
}

export default function DataUpload({ label }: iDataInput) {
  return (
    <Form.Item
      label={label}
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
  );
}
