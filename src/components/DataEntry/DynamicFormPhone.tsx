import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Select, Button, Form, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { otherApi } from "apis/index";

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
  const { data: countries, isPending } = useQuery({
    queryKey: ["countries", "phone"],
    queryFn: async () =>
      await otherApi.getCountries().then((res) =>
        res.data.data.map((item: any) => ({
          ...item.extra,
        }))
      ),
  });

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 120 }} defaultValue={"+84"}>
        {!isPending &&
          countries.length > 0 &&
          countries.map((item: any) => (
            <Select.Option key={item.code} value={item.dial_code}>
              <div className="flex items-center">
                <img
                  className="h-4 w-4 mr-2"
                  src={
                    "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/" +
                    item.code.toLowerCase() +
                    ".svg"
                  }
                />
                {item.dial_code}
              </div>
            </Select.Option>
          ))}
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
