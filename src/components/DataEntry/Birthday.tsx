import { Select, Col, Form, Row } from "antd";

interface iDataInput {
  defaultValue: string | undefined;
  label?: string;
}

interface Option {
  value: string;
  label: string;
}

const createDaysArray = (): Option[] => {
  const daysArray: Option[] = [];
  for (let i = 1; i <= 31; i++) {
    const value = i.toString().padStart(2, "0");
    daysArray.push({ value, label: value });
  }
  return daysArray;
};

const createMonthsArray = (): Option[] => {
  const monthsArray: Option[] = [];
  for (let i = 1; i <= 12; i++) {
    const value = i.toString().padStart(2, "0");
    monthsArray.push({ value, label: value });
  }
  return monthsArray;
};

const createYearsArray = (): Option[] => {
  const yearsArray: Option[] = [];
  for (let year = 1970; year <= 2023; year++) {
    yearsArray.push({ value: year.toString(), label: year.toString() });
  }
  return yearsArray;
};

export default function Birthday({ defaultValue, label }: iDataInput) {
  const [year, month, day] = defaultValue
    ? defaultValue.split("-")
    : [null, null, null];

  return (
    <Form.Item label={label ? label : "Birthday"}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name={["birthday", "day"]} initialValue={day}>
            <Select placeholder="Day" allowClear options={createDaysArray()} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={["birthday", "month"]} initialValue={month}>
            <Select
              placeholder="Month"
              allowClear
              options={createMonthsArray()}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={["birthday", "year"]} initialValue={year}>
            <Select
              placeholder="Year"
              allowClear
              options={createYearsArray()}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
}
