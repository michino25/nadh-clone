import { InputNumber } from "components/DataEntry";
import { Col, Row, Select } from "antd";
import { YNquestion } from "_constants/index";
import { useState } from "react";
import { otherApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";
import DataRadioNote from "components/DataEntry/RadioNote";

export default function Remuneration({
  data,
  currency: currencySelect,
  setCurrency: setCurrencySelect,
  form,
}: {
  data: any;
  currency: number | undefined;
  setCurrency: (value: number) => void;
  form: any;
}) {
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

  console.log(dataExchangeCurrencies);

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

  return (
    <>
      <Row gutter={16} align={"middle"}>
        <Col span={12}>
          <InputNumber
            label={`Based salary (${salary.name})`}
            placeholder="Based salary"
            name="current_salary"
            formatter={(value: any) =>
              value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
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
                formatter={(value: any) =>
                  value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                defaultValue={salary.salary.from}
              />
            </Col>
            <Col span={8}>
              <span>({salary.name})</span>
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
                formatter={(value: any) =>
                  value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                defaultValue={salary.salary.to}
              />
            </Col>
            <Col span={8}>
              <span>({salary.name})</span>
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
