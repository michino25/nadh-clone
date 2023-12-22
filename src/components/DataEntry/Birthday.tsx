import { Select, Col, Form, Row } from "antd";
import { days, months, type iOption, years } from "_constants/index";

interface iDataInput {
  defaultValue?: string | undefined;
  label?: string;
  name?: string;
}

export default function Birthday({
  defaultValue,
  label,
  name = "birthday",
}: iDataInput) {
  const [year, month, day] = defaultValue
    ? defaultValue.split("-")
    : [null, null, null];

  const filterOption = (input: string, option?: iOption) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Form.Item className="mb-0" label={label ? label : "Birthday"}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name={[name, "day"]}
            initialValue={day}
            dependencies={[
              [name, "month"],
              [name, "year"],
            ]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value ||
                    getFieldValue([name, "month"]) ||
                    getFieldValue([name, "year"])
                  ) {
                    if (!value)
                      return Promise.reject(new Error("Please select date!"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              placeholder="Day"
              showSearch
              filterOption={filterOption}
              allowClear
              options={days}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={[name, "month"]}
            initialValue={month}
            dependencies={[
              [name, "day"],
              [name, "year"],
            ]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value ||
                    getFieldValue([name, "day"]) ||
                    getFieldValue([name, "year"])
                  ) {
                    if (!value)
                      return Promise.reject(new Error("Please select month!"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              placeholder="Month"
              showSearch
              filterOption={filterOption}
              allowClear
              options={months}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={[name, "year"]}
            initialValue={year}
            dependencies={[
              [name, "day"],
              [name, "month"],
            ]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value ||
                    getFieldValue([name, "day"]) ||
                    getFieldValue([name, "month"])
                  ) {
                    if (!value)
                      return Promise.reject(new Error("Please select year!"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Select
              placeholder="Year"
              showSearch
              filterOption={filterOption}
              allowClear
              options={years}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
}
