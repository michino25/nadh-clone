import { Col, Row, Popover, Button } from "antd";
import CkeditorData from "components/DataEntry/CkeditorData";
import DisplayTag from "./DisplayTag";
import CompetenciesInstruction from "./CompetenciesInstruction";

export default function JobDescription({ data, updateFn }: any) {
  const templateContent = `<p>• Is the job and budget to be signed off? Yes or No</p>
  <p>• Why is the position open?</p>
  <p>• How long have you been looking?</p>
  <p>• Internal applications?</p>
  <p>• Adverts published where?</p>
  <p>• Agencies used?</p>
  <p>• Prior interviews - Names</p>
  <p>• What stage with others</p>`;

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
            sublabel={
              <>
                <p>The client is looking for vs candidate's competencies</p>
                <Popover
                  content={
                    <div className="w-[500px] h-[300px]">
                      <CompetenciesInstruction />
                    </div>
                  }
                  title=""
                >
                  <Button className="p-0" type="link">
                    Competencies Instruction
                  </Button>
                </Popover>
              </>
            }
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
            templateBtn={{
              content: templateContent,
              title: "Template",
            }}
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
