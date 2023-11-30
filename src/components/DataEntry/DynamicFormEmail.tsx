import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

interface iDataInput {
  name: string;
  required?: boolean | undefined;
  defaultValue?: string[];
  disabled?: boolean;
}

const App = ({ required, defaultValue = [""], disabled, name }: iDataInput) => (
  <Form.Item
    label="Email"
    className="mb-0"
    name={name}
    rules={[
      {
        required: required,
        message: "Missing this field",
      },
    ]}
  >
    <Form.List name={name} initialValue={defaultValue}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name }) => (
            <div
              key={key}
              className="flex w-full justify-between items-center space-x-4"
            >
              <Form.Item
                name={[name]}
                className="w-full mb-3"
                rules={[
                  {
                    type: "email",
                    message: `The input is not valid email!`,
                  },
                  { required: true, message: "Missing this field" },
                ]}
              >
                <Input
                  placeholder="Email..."
                  className="w-full"
                  disabled={disabled}
                />
              </Form.Item>

              <MinusCircleOutlined
                className="hover:text-red-500 pb-3"
                onClick={() => remove(name)}
              />
            </div>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </Form.Item>
);

export default App;
