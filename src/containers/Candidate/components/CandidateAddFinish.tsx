import { Result, Button, Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import { candidateApi } from "apis/index";

export default function CandidateAddFinish() {
  const { data, isPending } = useQuery({
    queryKey: ["Candidates", 1],
    queryFn: async () =>
      await candidateApi
        .getCandidates({
          perPage: 1,
          page: 1,
          creator_id: "",
        })
        .then((res) => res.data.data[0]),
  });

  if (isPending) return <Skeleton active />;

  return (
    <div className="h-[500px] flex justify-center items-center">
      <Result
        status="success"
        title="Create candidate successful!"
        subTitle={"Candidate ID: " + data.candidate_id}
        extra={[
          <Button href={"/candidate-detail/" + data.candidate_id}>
            View Detail
          </Button>,
          <Button href="/candidates" type="primary">
            List Candidates
          </Button>,
        ]}
      />
    </div>
  );
}
