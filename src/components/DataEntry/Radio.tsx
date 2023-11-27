import { Form, Radio } from "antd";

interface iRadio {
  label: string;
  data: { label: string; value: string }[];
}

export default function DataRadio({ label, data }: iRadio) {
  return (
    <Form.Item label={label}>
      <Radio.Group>
        {data.map((item: { label: string; value: string }) => (
          <Radio value={item.value}> {item.label} </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
}
