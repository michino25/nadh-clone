import Step from "../../components/DataDisplay/Step";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useQuery } from "@tanstack/react-query";

import { formatName } from "utils/format";
import { clientApi, userApi } from "apis/index";
import { useState } from "react";
import ClientAddStep1 from "./components/ClientAddStep1";
import ClientAddStep2 from "./components/ClientAddStep2";
import ClientAddFinish from "./components/ClientAddFinish";

const step = ["Client Information", "Contact Person", "Finish"];

export default function ClientAdd() {
  const [currentStep, setCurrentStep] = useState(0);

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
    <div className="px-12 pb-2">
      <div className="">
        <Link to={"/clients"}>Clients List</Link>
        <span> / Create Client</span>
      </div>

      <p className="mb-4 font-bold text-xl">Create Client</p>

      <Step current={currentStep} data={step} />

      <div className="p-4 my-6 bg-white rounded-lg">
        <p className="mb-4 font-bold text-lg">{step[currentStep]}</p>

        {currentStep === 0 && (
          <ClientAddStep1 nextStep={() => setCurrentStep(currentStep + 1)} />
        )}

        {currentStep === 1 && (
          <ClientAddStep2 nextStep={() => setCurrentStep(currentStep + 1)} />
        )}

        {currentStep === 2 && <ClientAddFinish />}

        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="mr-2"
        >
          prev
        </Button>
        <Button
          onClick={() => setCurrentStep(currentStep + 1)}
          className="mr-2"
        >
          next
        </Button>
      </div>
    </div>
  );
}
