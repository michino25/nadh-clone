import { Select, Col, Form, Row } from "antd";

interface iDataInput {
  day: string;
  month: string;
  year: string;
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

// Function to create an array of months
const createMonthsArray = (): Option[] => {
  const monthsArray: Option[] = [];
  for (let i = 1; i <= 12; i++) {
    const value = i.toString().padStart(2, "0");
    monthsArray.push({ value, label: value });
  }
  return monthsArray;
};

// Function to create an array of years from 1970 to 2023
const createYearsArray = (): Option[] => {
  const yearsArray: Option[] = [];
  for (let year = 1970; year <= 2023; year++) {
    yearsArray.push({ value: year.toString(), label: year.toString() });
  }
  return yearsArray;
};

export default function Birthday({ day, month, year, label }: iDataInput) {
  return (
    <Form.Item label={label ? label : "Birthday"}>
      <Row gutter={16}>
        <Col span={8}>
          <Select defaultValue={day} allowClear options={createDaysArray()} />
        </Col>
        <Col span={8}>
          <Select
            defaultValue={month}
            allowClear
            options={createMonthsArray()}
          />
        </Col>
        <Col span={8}>
          <Select defaultValue={year} allowClear options={createYearsArray()} />
        </Col>
      </Row>
    </Form.Item>
  );
}
