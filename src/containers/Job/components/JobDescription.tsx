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
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  responsibility: value,
                },
                onSuccess
              )
            }
          />
        </Col>
        <Col span={12}>
          <CkeditorData
            data={data?.expectation}
            label="ROLE EXPECTATIONS"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  expectation: value,
                },
                onSuccess
              )
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CkeditorData
            data={data?.kpi}
            label="MEASURES of SUCCESS? KPIs"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  kpi: value,
                },
                onSuccess
              )
            }
          />
        </Col>
        <Col span={12}>
          <CkeditorData
            data={data?.selling_point}
            label="SELLING POINT of THE ROLE"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  selling_point: value,
                },
                onSuccess
              )
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CkeditorData
            data={data?.department_structure}
            label="DEPARTMENT STRUCTURE"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  department_structure: value,
                },
                onSuccess
              )
            }
            sublabel="(Manager - Subordinates - Team - Organisation chart? - Where do they fit in the entire company)"
          />
        </Col>
        <Col span={12}>
          <CkeditorData
            data={data?.competency}
            label="COMPETENCIES / BEHAVIOURS"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  competency: value,
                },
                onSuccess
              )
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
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  development_opportunity: value,
                },
                onSuccess
              )
            }
          />
        </Col>
        <Col span={12}>
          <CkeditorData
            data={data?.fill_rate}
            label="SUCCESSFUL FILL RATE"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  fill_rate: value,
                },
                onSuccess
              )
            }
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <CkeditorData
            data={data?.recruitment_process}
            label="RECRUITMENT PROCESS"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  recruitment_process: value,
                },
                onSuccess
              )
            }
          />
        </Col>
      </Row>

      <DisplayTag
        data={data?.social_media}
        updateFn={(value: any[], onSuccess: () => void) =>
          updateFn(
            {
              social_media: value,
            },
            onSuccess
          )
        }
      />
    </>
  );
}
