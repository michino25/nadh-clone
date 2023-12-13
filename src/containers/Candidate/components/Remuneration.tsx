import { DataRadio, InputNumber } from "components/DataEntry";
import { Col, Row, Button, Form, Select } from "antd";
import { YNquestion } from "_constants/index";
import { useEffect, useState } from "react";

export default function Remuneration({
  data,
  onSave,
}: {
  data: any;
  onSave: (data: any) => void;
}) {
  const [showSave, setShowSave] = useState(false);
  const currencyData =
    data?.converted_salary &&
    Object.keys(data.converted_salary).map((item) => ({
      value: data.converted_salary[item].id,
      label: data.converted_salary[item].name,
      current_salary: data.converted_salary[item].current_salary,
      salary_from: data.converted_salary[item].salary.from,
      salary_to: data.converted_salary[item].salary.to,
    }));
  console.log();

  const [form] = Form.useForm();
  const [currency, setCurrency] = useState<number>(data?.currency?.id);

  useEffect(() => {
    const currencyChoose = currencyData?.filter(
      (item: any) => item.value === currency
    )[0];
    form.setFieldsValue({
      current_salary: currencyChoose?.current_salary,
      salary_from: currencyChoose?.salary_from,
      salary_to: currencyChoose?.salary_to,
    });
  }, [currency]);

  const onFinish = (values: any) => {
    const transformObject = {
      notice_days: parseInt(values.notice_days),
      remuneration: {
        benefit: {
          over_thirteen: parseInt(values.over_thirteen),
          lunch_check: parseInt(values.lunch_check),
          car_parking: parseInt(values.car_parking),
          car_allowance: parseInt(values.car_allowance),
          phone: parseInt(values.phone),
          laptop: parseInt(values.laptop),
          share_option: parseInt(values.share_option),
          health_cover: parseInt(values.health_cover),
          pension_scheme: parseInt(values.pension_scheme),
          no_holiday: parseInt(values.no_holiday),
          working_hour: parseInt(values.working_hour),
          overtime_hour: parseInt(values.overtime_hour),
          lunch_check_text: "",
          over_thirteen_text: "",
          car_parking_text: "",
          car_allowance_text: "",
          phone_text: "",
          laptop_text: "",
        },
        currency,
        current_salary: values.current_salary,
        salary: {
          from: values.salary_from,
          to: values.salary_to,
        },
        expectations: null,
        future_prospects: null,
        notice_days: parseInt(values.notice_days),
      },
    };

    onSave(transformObject);
    console.log("Received values of form: ", transformObject);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        className="w-full"
        onFinish={onFinish}
        onValuesChange={() => setShowSave(true)}
      >
        <Row gutter={16}>
          <Col span={12}>
            <InputNumber
              label="Based salary (USD)"
              name="current_salary"
              defaultValue={
                currencyData?.filter((item: any) => item.value === currency)[0]
                  ?.current_salary
              }
            />
          </Col>
          <Col span={8}></Col>
          <Col span={4}>
            <Select
              style={{ width: 100 }}
              onChange={(value) => {
                console.log(value);
                setCurrency(value);
              }}
              options={currencyData}
              value={currency}
              placeholder=""
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <DataRadio
              data={YNquestion}
              defaultValue={data?.benefit?.over_thirteen.toString()}
              label="Over x month"
              name="over_thirteen"
            />
          </Col>
          <Col span={12}>
            <DataRadio
              data={YNquestion}
              defaultValue={data?.benefit?.lunch_check.toString()}
              label="Lunch check"
              name="lunch_check"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <DataRadio
              data={YNquestion}
              label="Parking check"
              defaultValue={data?.benefit?.car_parking.toString()}
              name="car_parking"
            />
          </Col>
          <Col span={12}>
            <DataRadio
              data={YNquestion}
              label="Car allowance"
              defaultValue={data?.benefit?.car_allowance.toString()}
              name="car_allowance"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <DataRadio
              data={YNquestion}
              label="Phone allowance"
              defaultValue={data?.benefit?.phone.toString()}
              name="phone"
            />
          </Col>
          <Col span={12}>
            <DataRadio
              data={YNquestion}
              label="Laptop"
              defaultValue={data?.benefit?.laptop.toString()}
              name="laptop"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <DataRadio
              data={YNquestion}
              label="Share options"
              defaultValue={data?.benefit?.share_option.toString()}
              name="share_option"
            />
          </Col>
          <Col span={12}>
            <DataRadio
              data={YNquestion}
              label="Health cover"
              defaultValue={data?.benefit?.health_cover.toString()}
              name="health_cover"
            />
          </Col>
        </Row>

        <h5 className="font-medium">Expected salary</h5>

        <Row gutter={16}>
          <Col span={12}>
            <Row gutter={16} align={"middle"}>
              <Col span={16}>
                <InputNumber
                  label="From"
                  name="salary_from"
                  defaultValue={
                    currencyData?.filter(
                      (item: any) => item.value === currency
                    )[0]?.salary_from
                  }
                />
              </Col>
              <Col span={8}>
                <span>(USD)</span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={16} align={"middle"}>
              <Col span={16}>
                <InputNumber
                  label="To"
                  name="salary_to"
                  defaultValue={
                    currencyData?.filter(
                      (item: any) => item.value === currency
                    )[0]?.salary_to
                  }
                />
              </Col>
              <Col span={8}>
                <span>(USD)</span>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Row gutter={16} align={"middle"}>
              <Col span={16}>
                <InputNumber
                  label="Pension scheme"
                  name="pension_scheme"
                  defaultValue={data?.benefit?.pension_scheme.toString()}
                />
              </Col>
              <Col span={8}>
                <span>%</span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={16} align={"middle"}>
              <Col span={16}>
                <InputNumber
                  label="Annual leaves"
                  name="no_holiday"
                  defaultValue={data?.benefit?.no_holiday.toString()}
                />
              </Col>
              <Col span={8}>
                <span>day(s)</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={16} align={"bottom"}>
          <Col span={12}>
            <Row gutter={16} align={"middle"}>
              <Col span={16}>
                <InputNumber
                  label="Hours of work/overtime"
                  name="working_hour"
                  defaultValue={data?.benefit?.working_hour}
                />
              </Col>
              <Col span={8}>
                <span>hour per day</span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={16} align={"stretch"}>
              <Col span={16}>
                <InputNumber
                  label=""
                  name="overtime_hour"
                  defaultValue={data?.benefit?.overtime_hour.toString()}
                />
              </Col>
              <Col span={8}>
                <span>hours per week</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Row gutter={16} align={"middle"}>
              <Col span={16}>
                <InputNumber
                  label="Notice days"
                  name="notice_days"
                  defaultValue={data?.notice_days?.toString()}
                />
              </Col>
              <Col span={8}>
                <span>day(s)</span>
              </Col>
            </Row>
          </Col>
        </Row>

        {showSave && (
          <Form.Item className="flex justify-end space-x-2">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  );
}
