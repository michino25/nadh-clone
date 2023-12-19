import { Select, Form, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { otherApi } from "apis/index";

export default function Phone({
  disabled,
  name,
  defaultValue,
}: {
  disabled?: boolean;
  name: string;
  defaultValue?: any;
}) {
  const { data: countries } = useQuery({
    queryKey: ["countries", "phone"],
    queryFn: async () =>
      await otherApi.getCountries().then((res) =>
        res.data.data.map((item: any) => ({
          ...item.extra,
        }))
      ),
  });

  const prefixSelector = (
    <Form.Item
      name={[name, "phone_code", "extra", "dial_code"]}
      initialValue={defaultValue?.phone_code.extra.dial_code}
      noStyle
    >
      <Select style={{ width: 110 }} defaultValue={"+84"}>
        {countries &&
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
      name={[name, "number"]}
      initialValue={defaultValue?.number}
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
  );
}
