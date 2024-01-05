import { Col, Row } from "antd";
import CkeditorData from "components/DataEntry/CkeditorData";
import { iDynamicObject } from "utils/models";

export default function ClientDescription({
  data,
  updateFn,
}: {
  data: iDynamicObject;
  updateFn: (value: iDynamicObject, event: () => void) => void;
}) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <CkeditorData
            data={data?.summary}
            label="COMPANY SUMMARY"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  summary: value,
                },
                onSuccess
              )
            }
          />
        </Col>
        <Col span={12}>
          <CkeditorData
            data={data?.culture}
            label="COMPANY CULTURE"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  culture: value,
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
            data={data?.environment}
            label="ENVIRONMENT"
            updateFn={(value: string, onSuccess: () => void) =>
              updateFn(
                {
                  environment: value,
                },
                onSuccess
              )
            }
          />
        </Col>
        <Col span={12}>
          <CkeditorData
            data={data?.selling_point}
            label="UNIQUE SELLING POINT"
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
    </>
  );
}
