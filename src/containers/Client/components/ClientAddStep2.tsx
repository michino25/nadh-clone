import { Modal, Button, Skeleton } from "antd";

import { useQuery } from "@tanstack/react-query";
import { clientApi } from "apis/index";
import ContactPersonWrapper from "./ContactPersonWrapper";

export default function CandidateAddStep1({
  nextStep,
  // prevStep,
  step1Data,
}: {
  step1Data: any;
  nextStep: () => void;
  prevStep: () => void;
}) {
  // client_id: step1Data.data.id,
  console.log(step1Data.data.id);

  const {
    data: clientData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["client", step1Data.data.id],
    queryFn: async () =>
      await clientApi.getOneClient(step1Data.data.id as string).then((res) => {
        return {
          ...res.data,
        };
      }),
  });

  const showConfirmSubmit = () => {
    Modal.confirm({
      title: "Confirm to create client",
      content: "Are you sure you want to create new client ?",
      onOk: () => nextStep(),
    });
  };

  if (isPending) return <Skeleton className="p-12" active />;

  return (
    <>
      <ContactPersonWrapper
        data={clientData?.pic}
        clientId={clientData.id}
        refetch={refetch}
      />

      <div className="w-full flex justify-end mt-5">
        <Button onClick={showConfirmSubmit} type="primary" htmlType="submit">
          Finish
        </Button>
      </div>
    </>
  );
}
