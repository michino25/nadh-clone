import { Button, Form } from "antd";

import { clientApi, userApi } from "apis/index";
import { formatName } from "utils/format";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ContactPerson from "./ContactPerson";

export default function CandidateAddStep1({
  nextStep,
}: {
  nextStep: () => void;
}) {
  const [value, setValue] = useState<any[]>([]);

  useQuery({
    queryKey: ["User"],
    queryFn: async () =>
      await userApi.getUsers({}).then((res: any) =>
        res.data.data.map((user: any) => ({
          label: formatName(user.full_name),
          value: user.id,
        }))
      ),
  });

  useQuery({
    queryKey: ["Client"],
    queryFn: async () =>
      await clientApi.getClients({}).then((res: any) =>
        res.data.data.map((clients: any) => ({
          label: formatName(clients.name),
          value: clients.id,
        }))
      ),
  });

  return (
    <Form layout="vertical" className="w-full">
      <Form.Item className="flex flex-1 space-x-2 mt-5">
        <ContactPerson data={[]} />

        <Button className="mr-2">Cancel</Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
