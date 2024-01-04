import { Col, Row, Form } from "antd";
import CkeditorData from "components/DataEntry/CkeditorData";
import DataInputNumber from "components/DataEntry/InputNumber";
import MultiSelectWithSearchAPI from "components/DataEntry/MultiSelectWithSearchAPI";
import SelectWithSearchAPI from "components/DataEntry/SelectWithSearchAPI";
import IndustryAPI from "components/ShareComponents/IndustryAPI";
import { iIndustry } from "utils/models";
import { v4 as uuidv4 } from "uuid";

export default function JobRequirements({
  data,
  updateFn,
  loading,
}: {
  data: any;
  updateFn: (data: any, event?: { onSuccess: () => void }) => void;
  loading: boolean;
}) {
  const [form] = Form.useForm();

  return (
    <>
      <Row gutter={16}>
        <Col span={6}>
          <Form
            layout="vertical"
            form={form}
            onBlur={() =>
              updateFn({
                requirement: {
                  industry_years:
                    form.getFieldsValue().requirement.industry_years,
                },
              })
            }
          >
            <DataInputNumber
              placeholder="Industry Year of Services"
              label="Industry Year of Services"
              name={["requirement", "industry_years"]}
              defaultValue={data.requirement.industry_years}
            />
          </Form>
        </Col>
        <Col span={6}>
          <Form
            layout="vertical"
            form={form}
            onBlur={() =>
              updateFn({
                requirement: {
                  management_years:
                    form.getFieldsValue().requirement.management_years,
                },
              })
            }
          >
            <DataInputNumber
              label="Year of Management"
              defaultValue={data.requirement.management_years}
              placeholder="Year of Management"
              name={["requirement", "management_years"]}
            />
          </Form>
        </Col>
        <Col span={12}>
          <Form
            layout="vertical"
            form={form}
            onBlur={() =>
              updateFn({
                requirement: {
                  major: form.getFieldsValue().requirement.major && {
                    key: form.getFieldsValue().requirement.major.split("_")[0],
                    label: form
                      .getFieldsValue()
                      .requirement.major.split("_")[1],
                  },
                },
              })
            }
          >
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
          </Form>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form
            layout="vertical"
            form={form}
            onBlur={() =>
              updateFn({
                requirement: {
                  soft_skills: form
                    .getFieldsValue()
                    .requirement.soft_skills.map((item: string) => ({
                      key: item.split("_")[0],
                      label: item.split("_")[1],
                    })),
                },
              })
            }
          >
            <MultiSelectWithSearchAPI
              label="Soft skills"
              name={["requirement", "soft_skills"]}
              required={false}
              defaultValue={data.requirement.soft_skills.map(
                (item: { key: number; label: string }) =>
                  item.key + "_" + item.label
              )}
              allowClear
              propertyName="soft_skills"
            />
          </Form>
        </Col>
        <Col span={12}>
          <Form
            layout="vertical"
            form={form}
            onBlur={() =>
              updateFn({
                requirement: {
                  functions_skills: form
                    .getFieldsValue()
                    .requirement.functions_skills.map((item: string) => ({
                      key: item.split("_")[0],
                      label: item.split("_")[1],
                    })),
                },
              })
            }
          >
            <MultiSelectWithSearchAPI
              label="Job functions skills"
              name={["requirement", "functions_skills"]}
              required={false}
              defaultValue={data.requirement.functions_skills.map(
                (item: { key: number; label: string }) =>
                  item.key + "_" + item.label
              )}
              allowClear
              propertyName="functions_skills"
              OptGroup
            />
          </Form>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form
            layout="vertical"
            form={form}
            onBlur={() =>
              updateFn({
                requirement: {
                  languages: form
                    .getFieldsValue()
                    .requirement.languages.map((item: string) => ({
                      key: item.split("_")[0],
                      label: item.split("_")[1],
                    })),
                },
              })
            }
          >
            <MultiSelectWithSearchAPI
              label="Languages"
              name={["requirement", "languages"]}
              required={false}
              defaultValue={data.requirement.languages.map(
                (item: { key: number; label: string }) =>
                  item.key + "_" + item.label
              )}
              allowClear
              propertyName="language"
            />
          </Form>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <h5 className="pb-4">Expected Candidate's Industries</h5>
          <IndustryAPI
            data={data.requirement?.industry.map((item: iIndustry) => ({
              ...item,
              id: uuidv4(),
            }))}
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
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  requirement: {
                    other: value,
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
