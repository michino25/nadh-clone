import { Card, Button, Skeleton } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { candidateApi } from "apis/index";

export default function CandidateAddFinish() {
  const { data, isPending } = useQuery({
    queryKey: ["Candidates", 1],
    queryFn: async () =>
      await candidateApi
        .getCandidates({
          perPage: 10,
          page: 1,
          creator_id: "",
        })
        .then((res) => res.data.data[0].candidate_id_int),
  });

  if (isPending) return <Skeleton active />;

  return (
    <div className="h-[500px] flex justify-center items-center">
      <Card bordered={false}>
        <div className="flex-col items-center justify-center">
          <h5 className="text-2xl font-bold">Create candidate successful</h5>
          <div className="flex gap-2 justify-center mt-5 mb-8">
            <CheckCircleTwoTone twoToneColor="#52c41a" className="text-6xl" />
          </div>
          <div className="flex gap-2 justify-center">
            <Button href={"/candidate-detail/CDD-000" + (data + 1)}>
              View Detail
            </Button>
            <Button href="/candidates" type="primary">
              List Candidates
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
