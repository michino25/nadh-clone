import { Input, InputNumber } from "components/DataEntry";
import { Col, Row, Select, Form, notification } from "antd";
import { YNquestion } from "_constants/index";
import { useState } from "react";
import { otherApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";
import DataRadioNote from "components/DataEntry/RadioNote";
import CkeditorData from "components/DataEntry/CkeditorData";

interface iExchangeCurrencies {
  from: number;
  to: number;
  rate: number;
}

export default function Remuneration({
  data,
  updateFn,
}: {
  data: any;
  updateFn: (value: any, event?: { onSuccess: () => void }) => void;
}) {
  const [form] = Form.useForm();
  const [currencySelect, setCurrencySelect] = useState<number>();

  const [currencyData, setCurrencyData] =
    useState<{ value: number; label: string }[]>();
  const [salary, setSalary] = useState(
    data.converted_salary[data.currency.name]
  );

  const { data: dataExchangeCurrencies } = useQuery({
    queryKey: ["exchange_currencies"],
    queryFn: async () =>
      await otherApi.getExchangeCurrencies().then((res) => {
        setCurrencyData(
          res.data.map((item: { key: number; label: string }) => ({
            value: item.key,
            label: item.label,
          }))
        );

        const result: iExchangeCurrencies[] = [];

        res.data.forEach(
          (fromCurrency: {
            rate: { key: number; value: number }[];
            key: number;
          }) => {
            fromCurrency.rate.forEach(
              (toCurrency: { key: number; value: number }) => {
                result.push({
                  from: fromCurrency.key,
                  to: toCurrency.key,
                  rate: toCurrency.value,
                });
              }
            );
          }
        );

        return result;
      }),
  });

  const onCurrrencyChange = (value: number) => {
    const rate = dataExchangeCurrencies?.find(
      (item) => item.from === (currencySelect || salary.id) && item.to === value
    )?.rate;

    setCurrencySelect(value);
    const newSalary = {
      id: value,
      name:
        currencyData && currencyData?.length > 0
          ? currencyData.find((item) => item.value === value)?.label
          : "",
      salary: {
        to: (form.getFieldValue("salary_to") * (rate || 1)).toFixed(0),
        from: (form.getFieldValue("salary_from") * (rate || 1)).toFixed(0),
      },
      current_salary: (
        form.getFieldValue("current_salary") * (rate || 1)
      ).toFixed(0),
    };

    setSalary(newSalary);

    form.setFieldValue("current_salary", newSalary.current_salary);
    form.setFieldValue("salary_to", newSalary.salary.to);
    form.setFieldValue("salary_from", newSalary.salary.from);

    const data = {
      remuneration: {
        currency: value,
        salary: {
          from: newSalary.salary.to,
          to: newSalary.salary.from,
        },
      },
    };

    updateFn(data);
  };

  const key = [
    "over_thirteen",
    "lunch_check",
    "car_parking",
    "car_allowance",
    "phone",
    "laptop",
    "share_option",
    "health_cover",
  ];

  const key1 = [
    "pension_scheme",
    "no_holiday",
    "working_hour",
    "overtime_hour",
    "extra",
  ];

  const onBlur = (e: { target: { id: string } }) => {
    const formValues = form.getFieldsValue();
    const id = e.target.id;

    if (formValues.salary_from > formValues.salary_to) {
      notification.error({
        message: "Update Salary Range",
        description: "To must be higher than from",
      });

      return;
    }

    const dataUpdate: any = {
      remuneration: {
        benefit: {
          ...(key.includes(id.replace("_text", "")) &&
          data.benefit[id] !== formValues[id]
            ? {
                [id]: formValues[id],
              }
            : {}),

          ...(key1.includes(id) && data.benefit[id] !== formValues[id]
            ? {
                [id]: formValues[id],
              }
            : {}),
        },
        ...((id === "notice_days" || id === "review_date") &&
        data[id] !== formValues[id]
          ? {
              [id]: formValues[id],
            }
          : {}),

        ...(id === "salary_from" && data.salary.from !== formValues.salary_from
          ? {
              salary: {
                from: formValues.salary_from,
              },
            }
          : {}),

        ...(id === "salary_to" && data.salary.to !== formValues.salary_to
          ? {
              salary: {
                to: formValues.salary_to,
              },
            }
          : {}),
      },
    };

    if (
      Object.keys(dataUpdate.remuneration?.benefit).length > 0 ||
      Object.keys(dataUpdate.remuneration).length > 1
    ) {
      if (Object.keys(dataUpdate.remuneration.benefit).length === 0) {
        delete dataUpdate.remuneration.benefit;
      }

      // console.log("Received values of form: ", dataUpdate);
      updateFn(dataUpdate);
    }
  };

  const onValuesChange = (changeItems: any) => {
    console.log(changeItems);

    const data = {
      remuneration: {
        benefit: {
          ...(key.includes(Object.keys(changeItems)[0]) ? changeItems : {}),
        },
      },
    };

    if (Object.keys(data.remuneration.benefit).length > 0) updateFn(data);
  };

  return (
    <>
      <Form
        layout="vertical"
        className="flex-col w-full"
        form={form}
        onValuesChange={onValuesChange}
        onBlur={onBlur}
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
              label="Over x month"
              name="over_thirteen"
              defaultRadio={data?.benefit.over_thirteen}
              defaultInput={data?.benefit.over_thirteen_text}
            />
          </Col>
          <Col span={12}>
            <DataRadioNote
              data={YNquestion}
              label="Lunch check"
              name="lunch_check"
              defaultRadio={data?.benefit.lunch_check}
              defaultInput={data?.benefit.lunch_check_text}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <DataRadioNote
              data={YNquestion}
              label="Parking check"
              name="car_parking"
              defaultRadio={data?.benefit.car_parking}
              defaultInput={data?.benefit.car_parking_text}
            />
          </Col>
          <Col span={12}>
            <DataRadioNote
              data={YNquestion}
              label="Car allowance"
              name="car_allowance"
              defaultRadio={data?.benefit.car_allowance}
              defaultInput={data?.benefit.car_allowance_text}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <DataRadioNote
              data={YNquestion}
              label="Phone allowance"
              name="phone"
              defaultRadio={data?.benefit.phone}
              defaultInput={data?.benefit.phone_text}
            />
          </Col>
          <Col span={12}>
            <DataRadioNote
              data={YNquestion}
              label="Laptop"
              name="laptop"
              defaultRadio={data?.benefit.laptop}
              defaultInput={data?.benefit.laptop_text}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <DataRadioNote
              data={YNquestion}
              label="Share options"
              name="share_option"
              defaultRadio={data?.benefit.share_option}
              defaultInput={data?.benefit.share_option_text}
            />
          </Col>
          <Col span={12}>
            <DataRadioNote
              data={YNquestion}
              label="Health cover"
              name="health_cover"
              defaultRadio={data?.benefit.health_cover}
              defaultInput={data?.benefit.health_cover_text}
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
              defaultValue={data?.benefit.notice_days?.toString() || 0}
              addonAfter="day(s)"
            />
          </Col>
        </Row>
      </Form>

      <Row gutter={16}>
        <Col span={24}>
          <CkeditorData
            data={data?.future_prospect}
            label="Development / training opportunities / future prospects"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  remuneration: {
                    future_prospect: value,
                  },
                },
                { onSuccess }
              )
            }
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
