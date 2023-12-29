import { useQuery } from "@tanstack/react-query";
import { Result, Button, Skeleton } from "antd";
import { clientApi } from "apis/index";

export default function CandidateAddFinish() {
  const { data, isPending } = useQuery({
    queryKey: ["Candidates", 1],
    queryFn: async () =>
      await clientApi
        .getClients({
          perPage: 1,
          page: 1,
          creator_id: "",
        })
        .then((res) => res.data.data[0]),
  });

  console.log(data);

  if (isPending) return <Skeleton className="p-12" active />;

  return (
    <div className="h-[500px] flex justify-center items-center">
      <Result
        status="success"
        title="Create client successful!"
        subTitle={"Client ID: " + data.client_id}
        extra={[
          <Button href={"/client-detail/" + data.client_id}>
            View Detail
          </Button>,
          <Button href="/clients" type="primary">
            List Clients
          </Button>,
        ]}
      />
    </div>
  );
}
