import { Select, Col, Form, Row } from "antd";
import type { iOption } from "_constants/index";

interface iDataInput {
  defaultValue: string | undefined;
  label?: string;
}

const createDaysArray = (): iOption[] => {
  const daysArray: iOption[] = [];
  for (let i = 1; i <= 31; i++) {
    const value = i.toString().padStart(2, "0");
    daysArray.push({ value, label: value });
  }
  return daysArray;
};

const createMonthsArray = (): iOption[] => {
  const monthsArray: iOption[] = [];
  for (let i = 1; i <= 12; i++) {
    const value = i.toString().padStart(2, "0");
    monthsArray.push({ value, label: value });
  }
  return monthsArray;
};

const createYearsArray = (): iOption[] => {
  const yearsArray: iOption[] = [];
  for (let year = 1970; year <= 2023; year++) {
    yearsArray.push({ value: year.toString(), label: year.toString() });
  }
  return yearsArray;
};

export default function Birthday({ defaultValue, label }: iDataInput) {
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
            name={["birthday", "day"]}
            initialValue={day}
            dependencies={[
              ["birthday", "month"],
              ["birthday", "year"],
            ]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value ||
                    getFieldValue(["birthday", "month"]) ||
                    getFieldValue(["birthday", "year"])
                  ) {
                    if (!value)
                      return Promise.reject(new Error("Phải nhập đủ các mục!"));
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
              options={createDaysArray()}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={["birthday", "month"]}
            initialValue={month}
            dependencies={[
              ["birthday", "day"],
              ["birthday", "year"],
            ]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value ||
                    getFieldValue(["birthday", "day"]) ||
                    getFieldValue(["birthday", "year"])
                  ) {
                    if (!value)
                      return Promise.reject(new Error("Phải nhập đủ các mục!"));
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
              options={createMonthsArray()}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={["birthday", "year"]}
            initialValue={year}
            dependencies={[
              ["birthday", "day"],
              ["birthday", "month"],
            ]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    value ||
                    getFieldValue(["birthday", "day"]) ||
                    getFieldValue(["birthday", "month"])
                  ) {
                    if (!value)
                      return Promise.reject(new Error("Phải nhập đủ các mục!"));
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
              options={createYearsArray()}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
}
