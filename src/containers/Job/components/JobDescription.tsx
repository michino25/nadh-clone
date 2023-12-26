import { Col, Row } from "antd";
import CkeditorData from "components/DataEntry/CkeditorData";
import DisplayTag from "./DisplayTag";

export default function JobDescription({ data, updateFn }: any) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <CkeditorData
            data={data?.responsibility}
            label="RESPONSIBILITIES / DAILY DUTIES"
            updateFn={(value: string) =>
              updateFn({
                responsibility: value,
              })
            }
          />
        </Col>
        <Col span={12}>
          <CkeditorData
            data={data?.expectation}
            label="ROLE EXPECTATIONS"
            updateFn={(value: string) =>
              updateFn({
                expectation: value,
              })
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CkeditorData
            data={data?.kpi}
            label="MEASURES of SUCCESS? KPIs"
            updateFn={(value: string) =>
              updateFn({
                kpi: value,
              })
            }
          />
        </Col>
        <Col span={12}>
          <CkeditorData
            data={data?.selling_point}
            label="SELLING POINT of THE ROLE"
            updateFn={(value: string) =>
              updateFn({
                selling_point: value,
              })
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CkeditorData
            data={data?.department_structure}
            label="DEPARTMENT STRUCTURE"
            updateFn={(value: string) =>
              updateFn({
                department_structure: value,
              })
            }
            sublabel="(Manager - Subordinates - Team - Organisation chart? - Where do they fit in the entire company)"
          />
        </Col>
        <Col span={12}>
          <CkeditorData
            data={data?.competency}
            label="COMPETENCIES / BEHAVIOURS"
            updateFn={(value: string) =>
              updateFn({
                competency: value,
              })
            }
            sublabel="(The client is looking for vs candidate's competencies)"
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CkeditorData
            data={data?.development_opportunity}
            label="DEVELOPMENT OPPORTUNITIES"
            updateFn={(value: string) =>
              updateFn({
                development_opportunity: value,
              })
            }
          />
        </Col>
        <Col span={12}>
          <CkeditorData
            data={data?.fill_rate}
            label="SUCCESSFUL FILL RATE"
            updateFn={(value: string) =>
              updateFn({
                fill_rate: value,
              })
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CkeditorData
            data={data?.recruitment_process}
            label="RECRUITMENT PROCESS"
            updateFn={(value: string) =>
              updateFn({
                recruitment_process: value,
              })
            }
          />
        </Col>
      </Row>

      <DisplayTag
        data={data?.social_media}
        updateFn={(value: any[]) =>
          updateFn({
            social_media: value,
          })
        }
      />
    </>
  );
}
