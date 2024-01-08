import { iOption2 } from "_constants/index";
import { Col, Row, Form } from "antd";
import CkeditorData from "components/DataEntry/CkeditorData";
import DataInputNumber from "components/DataEntry/InputNumber";
import MultiSelectWithSearchAPI from "components/DataEntry/MultiSelectWithSearchAPI";
import SelectLanguage from "components/DataEntry/SelectLanguage";
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
  const [requirementForm] = Form.useForm();

  const onBlur = (e: { target: { id: string } }) => {
    const id = e.target.id;
    const formValues = requirementForm.getFieldsValue().requirement;

    const dataUpdate = {
      requirement: {
        ...(id === "requirement_industry_years" &&
        data.requirement.industry_years !== formValues.industry_years
          ? {
              industry_years: formValues.industry_years,
            }
          : {}),

        ...(id === "requirement_management_years" &&
        data.requirement.management_years !== formValues.management_years
          ? {
              management_years: formValues.management_years,
            }
          : {}),
      },
    };

    if (Object.keys(dataUpdate.requirement).length > 0) updateFn(dataUpdate);
  };

  const onValuesChange = (changeItems: {
    requirement: {
      major: string;
      functions_skills: string[];
      soft_skills: string[];
    };
  }) => {
    const data = {
      requirement: {
        ...(changeItems.requirement.major
          ? {
              major: {
                key: changeItems.requirement.major.split("_")[0],
                label: changeItems.requirement.major.split("_")[1],
              },
            }
          : {}),

        ...(changeItems.requirement.functions_skills
          ? {
              functions_skills: changeItems.requirement.functions_skills.map(
                (item: string) => ({
                  key: item.split("_")[0],
                  label: item.split("_")[1],
                })
              ),
            }
          : {}),

        ...(changeItems.requirement.soft_skills
          ? {
              soft_skills: changeItems.requirement.soft_skills.map(
                (item: string) => ({
                  key: item.split("_")[0],
                  label: item.split("_")[1],
                })
              ),
            }
          : {}),
      },
    };

    if (Object.keys(data.requirement).length > 0) updateFn(data);
  };

  return (
    <>
      <Form
        layout="vertical"
        form={requirementForm}
        onBlur={onBlur}
        onValuesChange={onValuesChange}
      >
        <Row gutter={16}>
          <Col span={6}>
            <DataInputNumber
              placeholder="Industry Year of Services"
              label="Industry Year of Services"
              name={["requirement", "industry_years"]}
              defaultValue={data.requirement.industry_years}
            />
          </Col>
          <Col span={6}>
            <DataInputNumber
              label="Year of Management"
              defaultValue={data.requirement.management_years}
              placeholder="Year of Management"
              name={["requirement", "management_years"]}
            />
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
                (item: { key: number; label: string }) =>
                  item.key + "_" + item.label
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
                (item: { key: number; label: string }) =>
                  item.key + "_" + item.label
              )}
              allowClear
              propertyName="functions_skills"
              OptGroup
            />
          </Col>
        </Row>
      </Form>

      <Row gutter={16}>
        <Col span={24}>
          <Form layout="vertical" form={form}>
            <SelectLanguage
              label="Languages"
              defaultValue={data.requirement.languages.map(
                (item: iOption2) => item.key + "_" + item.label
              )}
              allowClear
              updateFn={(value) =>
                updateFn({
                  requirement: {
                    languages: value.map((item: string) => ({
                      key: item.split("_")[0],
                      label: item.split("_")[1],
                    })),
                  },
                })
              }
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
