import { Card, Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";

export default function CandidateAddFinish({ step1Data }: { step1Data: any }) {
  return (
    <div className="h-[500px] flex justify-center items-center">
      <Card bordered={false}>
        <div className="flex-col items-center justify-center">
          <h5 className="text-2xl font-bold">Create client successful</h5>
          <div className="flex gap-2 justify-center mt-5 mb-8">
            <CheckCircleTwoTone twoToneColor="#52c41a" className="text-6xl" />
          </div>
          <div className="flex gap-2 justify-center">
            <Button href={"/client-detail/" + step1Data.data.client_id}>
              View Detail
            </Button>
            <Button href="/clients" type="primary">
              List Clients
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
