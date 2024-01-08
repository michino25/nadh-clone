import { InputNumber } from "components/DataEntry";
import { Col, Row, Select } from "antd";
import { YNquestion, iOption, iOption2 } from "_constants/index";
import { useState } from "react";
import { otherApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";
import DataRadioNote from "components/DataEntry/RadioNote";
import CkeditorData from "components/DataEntry/CkeditorData";

export default function Remuneration({
  data,
  currency: currencySelect,
  setCurrency: setCurrencySelect,
  form,
  updateFn,
}: {
  data: any;
  currency: number | undefined;
  setCurrency: (value: number) => void;
  form: any;
  updateFn: (value: any, event: { onSuccess: () => void }) => void;
}) {
  const [salary, setSalary] = useState(
    data.converted_salary[data.currency.name]
  );

  const { data: currencyData } = useQuery({
    queryKey: ["exchange_currencies"],
    queryFn: async () => await otherApi.getExchangeCurrencies(),
    select: (res) =>
      res.data.map((item: iOption2) => ({
        value: item.key,
        label: item.label,
      })),
  });

  const { data: dataExchangeCurrencies } = useQuery({
    queryKey: ["exchange_currencies"],
    queryFn: async () => await otherApi.getExchangeCurrencies(),
    select: (res) =>
      res.data.flatMap(
        (fromCurrency: {
          rate: { key: number; value: number }[];
          key: number;
        }) =>
          fromCurrency.rate.map(
            (toCurrency: { key: number; value: number }) => ({
              from: fromCurrency.key,
              to: toCurrency.key,
              rate: toCurrency.value,
            })
          )
      ),
  });

  const onCurrrencyChange = (value: number) => {
    const rate = dataExchangeCurrencies?.find(
      (item: { from: number; to: number; rate: number }) =>
        item.from === (currencySelect || salary.id) && item.to === value
    ).rate;

    setCurrencySelect(value);
    const newSalary = {
      id: value,
      name:
        currencyData && currencyData?.length > 0
          ? currencyData.find((item: iOption) => item.value === value)?.label
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

  return (
    <>
      <Row gutter={16} align={"middle"}>
        <Col span={12}>
          <InputNumber
            label={`Based salary (${salary.name})`}
            placeholder="Based salary"
            name="current_salary"
            defaultValue={salary.current_salary}
          />
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
          <DataRadioNote
            data={YNquestion}
            defaultInput={data?.benefit.over_thirteen}
            defaultRadio={data?.benefit.over_thirteen_text}
            label="Over x month"
            name="over_thirteen"
          />
        </Col>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            defaultInput={data?.benefit.lunch_check}
            defaultRadio={data?.benefit.lunch_check_text}
            label="Lunch check"
            name="lunch_check"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            defaultInput={data?.benefit.car_parking}
            defaultRadio={data?.benefit.car_parking_text}
            label="Parking check"
            name="car_parking"
          />
        </Col>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            defaultInput={data?.benefit.car_allowance}
            defaultRadio={data?.benefit.car_allowance_text}
            label="Car allowance"
            name="car_allowance"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            defaultInput={data?.benefit.phone}
            defaultRadio={data?.benefit.phone_text}
            label="Phone allowance"
            name="phone"
          />
        </Col>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            defaultInput={data?.benefit.laptop}
            defaultRadio={data?.benefit.laptop_text}
            label="Laptop"
            name="laptop"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            defaultInput={data?.benefit.share_option}
            defaultRadio={data?.benefit.share_option_text}
            label="Share options"
            name="share_option"
          />
        </Col>
        <Col span={12}>
          <DataRadioNote
            data={YNquestion}
            defaultInput={data?.benefit.health_cover}
            defaultRadio={data?.benefit.health_cover_text}
            label="Health cover"
            name="health_cover"
          />
        </Col>
      </Row>

      <h5 className="font-medium">Expected salary</h5>

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
          <InputNumber
            label="Pension scheme"
            placeholder="Pension scheme"
            name="pension_scheme"
            defaultValue={data?.benefit?.pension_scheme.toString()}
            addonAfter="%"
          />
        </Col>
        <Col span={12}>
          <InputNumber
            label="Annual leaves"
            placeholder="Annual leaves"
            name="no_holiday"
            defaultValue={data?.benefit?.no_holiday.toString()}
            addonAfter="day(s)"
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
            addonAfter="hours per day"
          />
        </Col>
        <Col span={12}>
          <InputNumber
            label=""
            placeholder="Hours of overtime"
            name="overtime_hour"
            defaultValue={data?.benefit?.overtime_hour.toString()}
            addonAfter="hours per week"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <InputNumber
            label="Notice days"
            placeholder="Notice days"
            name="notice_days"
            defaultValue={data?.notice_days?.toString() || 0}
            addonAfter="day(s)"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <CkeditorData
            data={data?.extra}
            label="Anything else"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  remuneration: {
                    extra: value,
                  },
                },
                { onSuccess }
              )
            }
          />
        </Col>
      </Row>
    </>
  );
}
