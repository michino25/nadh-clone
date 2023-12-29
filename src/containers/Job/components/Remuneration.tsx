import { Input, InputNumber } from "components/DataEntry";
import { Col, Row, Select, Form } from "antd";
import { YNquestion } from "_constants/index";
import { useState } from "react";
import { otherApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";
import DataRadioNote from "components/DataEntry/RadioNote";
import CkeditorData from "components/DataEntry/CkeditorData";

export default function Remuneration({
  data,
  updateFn,
}: {
  data: any;
  updateFn: (value: any) => void;
}) {
  const [form] = Form.useForm();
  const [currencySelect, setCurrencySelect] = useState<number>();

  const [currencyData, setCurrencyData] = useState<any[]>();
  const [salary, setSalary] = useState(
    data.converted_salary[data.currency.name]
  );

  const { data: dataExchangeCurrencies } = useQuery({
    queryKey: ["exchange_currencies"],
    queryFn: async () =>
      await otherApi.getExchangeCurrencies().then((res) => {
        setCurrencyData(
          res.data.map((item: any) => ({
            value: item.key,
            label: item.label,
          }))
        );

        const result: any[] = [];

        res.data.forEach((fromCurrency: any) => {
          fromCurrency.rate.forEach((toCurrency: any) => {
            result.push({
              from: fromCurrency.key,
              to: toCurrency.key,
              rate: toCurrency.value,
            });
          });
        });

        return result;
      }),
  });

  // console.log(dataExchangeCurrencies);

  const onCurrrencyChange = (value: any) => {
    const rate = dataExchangeCurrencies?.find(
      (item) => item.from === (currencySelect || salary.id) && item.to === value
    ).rate;

    setCurrencySelect(value);
    const newSalary = {
      id: value,
      name:
        currencyData && currencyData?.length > 0
          ? currencyData.find((item) => item.value === value).label
          : "",
      salary: {
        to: (form.getFieldValue("salary_to") * rate).toFixed(0),
        from: (form.getFieldValue("salary_from") * rate).toFixed(0),
      },
      current_salary: (form.getFieldValue("current_salary") * rate).toFixed(0),
    };

    setSalary(newSalary);

    form.setFieldValue("current_salary", newSalary.current_salary);
    form.setFieldValue("salary_to", newSalary.salary.to);
    form.setFieldValue("salary_from", newSalary.salary.from);
  };

  const onFinish = (values: any) => {
    const remunerationObject = {
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

          ...(values.over_thirteen === "1"
            ? { over_thirteen_text: values.over_thirteen_text }
            : {}),
          ...(values.lunch_check === "1"
            ? { lunch_check_text: values.lunch_check_text }
            : {}),
          ...(values.car_parking === "1"
            ? { car_parking_text: values.car_parking_text }
            : {}),
          ...(values.car_allowance === "1"
            ? { car_allowance_text: values.car_allowance_text }
            : {}),
          ...(values.phone === "1" ? { phone_text: values.phone_text } : {}),
          ...(values.laptop === "1" ? { laptop_text: values.laptop_text } : {}),
          ...(values.share_option === "1"
            ? { share_option_text: values.share_option_text }
            : {}),
          ...(values.health_cover === "1"
            ? { health_cover_text: values.health_cover_text }
            : {}),

          pension_scheme: parseInt(values.pension_scheme),
          no_holiday: parseInt(values.no_holiday),
          working_hour: parseInt(values.working_hour),
          overtime_hour: parseInt(values.overtime_hour),

          extra: values.extra,
        },
        review_date: values.review_date,
        currency: currencySelect,
        current_salary: values.current_salary,
        salary: {
          from: values.salary_from,
          to: values.salary_to,
        },
        expectations: null,
        future_prospects: null,
      },
      notice_days: parseInt(values.notice_days),
    };

    updateFn(remunerationObject);
    console.log("Received values of form: ", remunerationObject);
  };

  return (
    <>
      <Form
        layout="vertical"
        className="flex-col w-full"
        form={form}
        onBlur={() => onFinish(form.getFieldsValue())}
      >
        <Row gutter={16} align={"middle"}>
          <Col span={12}>
            <h5 className="font-bold mb-3">Salary range</h5>
          </Col>
          <Col span={12} className="flex justify-end mt-1">
            <Select
              style={{ width: 100 }}
              onChange={onCurrrencyChange}
              options={currencyData}
              defaultValue={salary.id}
              value={currencySelect}
              placeholder=""
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <InputNumber
              label={`From (${salary.name})`}
              placeholder="Salary From"
              name="salary_from"
              defaultValue={salary.salary.from}
            />
          </Col>
          <Col span={12}>
            <InputNumber
              label={`To (${salary.name})`}
              placeholder="Salary To"
              name="salary_to"
              defaultValue={salary.salary.to}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Input
              label="Review date"
              placeholder="Review date"
              name="review_date"
              defaultValue={data?.review_date}
            />
          </Col>
          <Col span={12}>
            <Input
              label="Variable bonus"
              placeholder="Variable bonus"
              name="extra"
              defaultValue={data?.benefit?.extra}
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

        <Row gutter={16}>
          <Col span={12}>
            <InputNumber
              label="Pension scheme"
              placeholder="Pension scheme"
              name="pension_scheme"
              defaultValue={data?.benefit?.pension_scheme.toString()}
              suffix="%"
            />
          </Col>
          <Col span={12}>
            <InputNumber
              label="Annual leaves"
              placeholder="Annual leaves"
              name="no_holiday"
              defaultValue={data?.benefit?.no_holiday.toString()}
              suffix="day(s)"
            />
          </Col>
        </Row>
        <Row gutter={16} align={"bottom"}>
          <Col span={12}>
            <InputNumber
              label="Hours of work/overtime"
              placeholder="Hours of work"
              name="working_hour"
              defaultValue={data?.benefit?.working_hour}
              suffix="hours per day"
            />
          </Col>
          <Col span={12}>
            <InputNumber
              label=""
              placeholder="Hours of overtime"
              name="overtime_hour"
              defaultValue={data?.benefit?.overtime_hour.toString()}
              suffix="hours per week"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <InputNumber
              label="Notice days"
              placeholder="Notice days"
              name="notice_days"
              defaultValue={data?.benefit.notice_days?.toString() || 0}
              suffix="day(s)"
            />
          </Col>
        </Row>
      </Form>

      <Row gutter={16}>
        <Col span={24}>
          <CkeditorData
            data={data?.future_prospect}
            label="Development / training opportunities / future prospects"
            updateFn={(value: string) =>
              updateFn({
                remuneration: {
                  future_prospect: value,
                },
              })
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <CkeditorData
            data={data?.extra}
            label="Anything else"
            updateFn={(value: string) =>
              updateFn({
                remuneration: {
                  extra: value,
                },
              })
            }
          />
        </Col>
      </Row>
    </>
  );
}
