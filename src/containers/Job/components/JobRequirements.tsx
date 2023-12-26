import { Col, Row, Form, InputNumber } from "antd";
import CkeditorData from "components/DataEntry/CkeditorData";
import MultiSelectWithSearchAPI from "components/DataEntry/MultiSelectWithSearchAPI";
import SelectWithSearchAPI from "components/DataEntry/SelectWithSearchAPI";
import Industry from "./Industry";

export default function JobRequirements({ data, updateFn, loading }: any) {
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    const data = {
      requirement: {
        industry_years: value.requirement.industry_years,
        management_years: value.requirement.management_years,
        major: value.requirement.major && {
          key: value.requirement.major.split("_")[0],
          label: value.requirement.major.split("_")[1],
        },
        soft_skills: value.requirement.soft_skills.map((item: string) => ({
          key: item.split("_")[0],
          label: item.split("_")[1],
        })),
        functions_skills: value.requirement.functions_skills.map(
          (item: string) => ({
            key: item.split("_")[0],
            label: item.split("_")[1],
          })
        ),
        languages: value.requirement.languages.map((item: string) => ({
          key: item.split("_")[0],
          label: item.split("_")[1],
        })),
      },
    };
    updateFn(data);
  };

  return (
    <>
      <Form
        layout="vertical"
        className="flex-col w-full"
        form={form}
        onBlur={() => onFinish(form.getFieldsValue())}
      >
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              label="Industry Year of Services"
              name={["requirement", "industry_years"]}
              initialValue={data.requirement.industry_years}
            >
              <InputNumber
                className="w-full"
                placeholder="Industry Year of Services"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Year of Management"
              name={["requirement", "management_years"]}
              initialValue={data.requirement.management_years}
            >
              <InputNumber
                className="w-full"
                placeholder="Year of Management"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <SelectWithSearchAPI
              label="Major"
              placeholder="Select or add major"
              name={["requirement", "major"]}
              required={false}
              allowClear
              propertyName="major"
              defaultValue={
                data.requirement.major.key &&
                data.requirement.major.key + "_" + data.requirement.major.label
              }
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <MultiSelectWithSearchAPI
              label="Soft skills"
              name={["requirement", "soft_skills"]}
              required={false}
              defaultValue={data.requirement.soft_skills.map(
                (item: any) => item.key + "_" + item.label
              )}
              allowClear
              propertyName="soft_skills"
            />
          </Col>
          <Col span={12}>
            <MultiSelectWithSearchAPI
              label="Job functions skills"
              name={["requirement", "functions_skills"]}
              required={false}
              defaultValue={data.requirement.functions_skills.map(
                (item: any) => item.key + "_" + item.label
              )}
              allowClear
              propertyName="functions_skills"
              OptGroup
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <MultiSelectWithSearchAPI
              label="Languages"
              name={["requirement", "languages"]}
              required={false}
              defaultValue={data.requirement.languages.map(
                (item: any) => item.key + "_" + item.label
              )}
              allowClear
              propertyName="language"
            />
          </Col>
        </Row>
      </Form>

      <Row gutter={16}>
        <Col span={24}>
          <h5 className="pb-4">Expected Candidate's Industries</h5>
          <Industry
            data={data.requirement?.industry}
            updateFn={(value: any) =>
              updateFn({
                requirement: {
                  industry: value,
                },
              })
            }
            loading={loading}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <CkeditorData
            data={data?.requirement.other}
            label="Other"
            updateFn={(value: string) =>
              updateFn({
                requirement: {
                  other: value,
                },
              })
            }
          />
        </Col>
      </Row>
    </>
  );
}
