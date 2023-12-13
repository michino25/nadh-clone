import { Result, Button } from "antd";

export default function CandidateAddFinish({ id }: { id: string }) {
  return (
    <div className="h-[500px] flex justify-center items-center">
      <Result
        status="success"
        title="Create candidate successful!"
        subTitle={"Candidate ID: " + id}
        extra={[
          <Button href={"/candidate-detail/" + id}>View Detail</Button>,
          <Button href="/candidates" type="primary">
            List Candidates
          </Button>,
        ]}
      />
    </div>
  );
}
