import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Select, Button, Form, Input } from "antd";

interface iDataInput {
  label?: string;
  name: string;
  type?: string | undefined;
  placeholder?: string;
  required?: boolean | undefined;
  defaultValue?: string[];
  disabled?: boolean;
}

const App = ({ required, defaultValue = [""], disabled, name }: iDataInput) => {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue={"84"}>
        <Select.Option value="81">+81</Select.Option>
        <Select.Option value="82">+82</Select.Option>
        <Select.Option value="83">+83</Select.Option>
        <Select.Option value="84">+84</Select.Option>
        <Select.Option value="85">+85</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form.Item
      label="Phone Number"
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
                      pattern: new RegExp(/[2-9]{1}\d{2}/),
                      message: `The input is not valid phone!`,
                    },
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Phone..."
                    className="w-full"
                    disabled={disabled}
                    addonBefore={prefixSelector}
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
};

export default App;
