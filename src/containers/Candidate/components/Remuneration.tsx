import { InputNumber } from "components/DataEntry";
import { Col, Row, Form, Select } from "antd";
import { YNquestion } from "_constants/index";
import { useEffect, useState } from "react";
import { otherApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";
import DataRadioNote from "components/DataEntry/RadioNote";

export default function Remuneration({
  data,
  currency,
  setCurrency,
}: {
  data: any;
  currency: number;
  setCurrency: (value: number) => void;
}) {
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

  return (
    <>
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
          <DataRadioNote
            data={YNquestion}
            defaultValue={data?.benefit}
            label="Over x month"
            name="over_thirteen"
          />
        </Col>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            defaultValue={data?.benefit}
            label="Lunch check"
            name="lunch_check"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            label="Parking check"
            defaultValue={data?.benefit}
            name="car_parking"
          />
        </Col>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            label="Car allowance"
            defaultValue={data?.benefit}
            name="car_allowance"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            label="Phone allowance"
            defaultValue={data?.benefit}
            name="phone"
          />
        </Col>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            label="Laptop"
            defaultValue={data?.benefit}
            name="laptop"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            label="Share options"
            defaultValue={data?.benefit}
            name="share_option"
          />
        </Col>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            label="Health cover"
            defaultValue={data?.benefit}
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
    </>
  );
}
