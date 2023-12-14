import { DataRadio, InputNumber } from "components/DataEntry";
import { Col, Row, Button, Form, Select } from "antd";
import { YNquestion } from "_constants/index";
import { useEffect, useState } from "react";
import { otherApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";

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
      current_salary: data.converted_salary[item].current_salary || 0,
      salary_from: data.converted_salary[item].salary.from || 0,
      salary_to: data.converted_salary[item].salary.to || 0,
    }));
  console.log(currencyData);

  const { data: dataExchangeCurrencies } = useQuery({
    queryKey: ["exchange_currencies"],
    queryFn: async () =>
      await otherApi.getExchangeCurrencies().then((res) => res.data),
  });

  // console.log(dataExchangeCurrencies);

  const [form] = Form.useForm();
  const [currency, setCurrency] = useState<number>(data?.currency?.id || 2);
  const [currencyOld, setCurrencyOld] = useState<number>();
  const [currencyChooose, setCurrencyChooose] = useState<any>();

  useEffect(() => {
    const temp = currencyData?.filter(
      (item: any) => item.value === currency
    )[0];
    setCurrencyChooose(temp);

    if (temp) {
      const changeRate =
        currencyChooose &&
        form.getFieldValue("current_salary") !== currencyChooose.current_salary
          ? dataExchangeCurrencies
              ?.filter((item: any) => item.key === currencyOld)[0]
              .rate.filter((item: any) => item.key === currency)[0].value
          : 1;

      // console.log(changeRate);

      form.setFieldsValue({
        current_salary: Math.round(
          form.getFieldValue("current_salary") * changeRate
        ),
        salary_from: Math.round(form.getFieldValue("salary_from") * changeRate),
        salary_to: Math.round(form.getFieldValue("salary_to") * changeRate),
      });
    }
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
        <Row gutter={16} align={"middle"}>
          <Col span={12}>
            <InputNumber
              label={`Based salary (${currencyChooose?.label})`}
              placeholder="Based salary"
              name="current_salary"
              defaultValue={
                currencyData?.filter((item: any) => item.value === currency)[0]
                  ?.current_salary
              }
            />
          </Col>
          <Col span={12} className="flex justify-end mt-1">
            <Select
              style={{ width: 100 }}
              onChange={(value) => {
                console.log(value);
                setCurrencyOld(currency);
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
                  placeholder="Salary From"
                  name="salary_from"
                  defaultValue={
                    currencyData?.filter(
                      (item: any) => item.value === currency
                    )[0]?.salary_from
                  }
                />
              </Col>
              <Col span={8}>
                <span>({currencyChooose?.label})</span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row gutter={16} align={"middle"}>
              <Col span={16}>
                <InputNumber
                  label="To"
                  placeholder="Salary To"
                  name="salary_to"
                  defaultValue={
                    currencyData?.filter(
                      (item: any) => item.value === currency
                    )[0]?.salary_to
                  }
                />
              </Col>
              <Col span={8}>
                <span>({currencyChooose?.label})</span>
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
                  placeholder="Pension scheme"
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
                  placeholder="Annual leaves"
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
                  placeholder="Hours of work"
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
                  placeholder="Hours of overtime"
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
                  placeholder="Notice days"
                  name="notice_days"
                  defaultValue={data?.notice_days?.toString() || 0}
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
