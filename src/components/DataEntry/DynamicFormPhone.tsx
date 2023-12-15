import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import Phone from "./Phone";

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
  console.log(defaultValue);

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
                <Phone disabled={disabled} name={name} />

                {fields.length > 1 && (
                  <MinusCircleOutlined
                    className="hover:text-red-500 pb-3"
                    onClick={() => remove(name)}
                  />
                )}
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
