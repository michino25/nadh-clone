import { Select, Form, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { otherApi } from "apis/index";
import { iCountry, iPhone } from "utils/models";

export default function Phone({
  disabled,
  required,
  label,
  name,
  defaultValue,
}: {
  disabled?: boolean;
  required?: boolean;
  label?: string;
  name: string;
  defaultValue?: { phone_code: iCountry; number: string };
}) {
  console.log(defaultValue);

  const { data: countries } = useQuery({
    queryKey: ["all_countries"],
    queryFn: async () => await otherApi.getCountries(),
    select: (res) =>
      res.data.data
        .map((item: iCountry) => ({
          ...item.extra,
        }))
        .sort((a: iPhone, b: iPhone) => {
          if (a.dial_code < b.dial_code) {
            return -1;
          }
          if (a.dial_code > b.dial_code) {
            return 1;
          }
          return 0;
        }),
  });

  const prefixSelector = (
    <Form.Item
      name={[name, "phone_code", "extra", "dial_code"]}
      initialValue={defaultValue?.phone_code.extra.dial_code || "+84"}
      noStyle
    >
      <Select style={{ width: 110 }}>
        {countries &&
          countries.length > 0 &&
          countries.map((item: iPhone) => (
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
      label={label}
      name={[name, "number"]}
      initialValue={defaultValue?.number}
      className="w-full mb-3"
      rules={[
        {
          pattern: new RegExp(/[2-9]{1}\d{2}/),
          message: `The input is not valid phone!`,
        },
        {
          required: required,
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
