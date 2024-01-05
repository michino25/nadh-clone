import IndustryAPI from "components/ShareComponents/IndustryAPI";
import { v4 as uuidv4 } from "uuid";
import { Form, Row, Col } from "antd";
import MultiSelectWithSearchAPI from "components/DataEntry/MultiSelectWithSearchAPI";
import CkeditorData from "components/DataEntry/CkeditorData";
import { iIndustry } from "utils/models";
import { iOption2 } from "_constants/index";
import SelectLanguage from "components/DataEntry/SelectLanguage";

interface iData {
  updateFn: (data: any, option?: any) => void;
  loading: boolean;
  data: any;
}

export default function SkillsAndIndustry({ updateFn, loading, data }: iData) {
  const [form] = Form.useForm();

  const onValuesChange = (changeItems: any) => {
    console.log(changeItems);
    const data = {
      ...(changeItems.soft_skills
        ? {
            soft_skills: changeItems.soft_skills?.map((item: string) => ({
              key: item.split("_")[0],
              label: item.split("_")[1],
            })),
          }
        : {}),

      ...(changeItems.functions_skills
        ? {
            functions_skills: changeItems.functions_skills?.map(
              (item: string) => ({
                key: item.split("_")[0],
                label: item.split("_")[1],
              })
            ),
          }
        : {}),
    };

    updateFn(data);
  };

  return (
    <>
      <Form
        layout="vertical"
        className="flex-col w-full"
        form={form}
        onValuesChange={onValuesChange}
      >
        <Row gutter={16}>
          <Col span={12}>
            <MultiSelectWithSearchAPI
              label="Soft skills"
              name={"soft_skills"}
              required={false}
              defaultValue={data.soft_skills.map(
                (item: iOption2) => item.key + "_" + item.label
              )}
              allowClear
              propertyName="soft_skills"
            />
          </Col>
          <Col span={12}>
            <MultiSelectWithSearchAPI
              label="Job functions skills"
              name={"functions_skills"}
              required={false}
              defaultValue={data.functions_skills.map(
                (item: iOption2) => item.key + "_" + item.label
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
          <SelectLanguage
            label="Languages"
            defaultValue={data.languages.map(
              (item: iOption2) => item.key + "_" + item.label
            )}
            allowClear
            updateFn={(value) =>
              updateFn({
                languages: value.map((item: string) => ({
                  key: item.split("_")[0],
                  label: item.split("_")[1],
                })),
              })
            }
          />
        </Col>
      </Row>

      <IndustryAPI
        data={data?.business_line.map((item: iIndustry) => ({
          ...item,
          id: uuidv4(),
        }))}
        updateFn={(value: any) =>
          updateFn({
            business_line: value,
          })
        }
        loading={loading}
      />

      <Row gutter={16}>
        <Col span={24}>
          <CkeditorData
            data={data?.extra.skill_other}
            label="Other"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  skill_other: value,
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
