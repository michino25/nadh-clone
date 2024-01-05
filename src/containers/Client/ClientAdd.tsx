import Step from "../../components/DataDisplay/Step";
import { Link } from "react-router-dom";

import { useState } from "react";
import ClientAddStep1 from "./components/ClientAddStep1";
import ClientAddStep2 from "./components/ClientAddStep2";
import ClientAddFinish from "./components/ClientAddFinish";
import { iClient } from "utils/models";

const step = ["Client Information", "Contact Person", "Finish"];

export default function ClientAdd() {
  const [currentStep, setCurrentStep] = useState(0);
  const [step1Data, setStep1Data] = useState<iClient>();

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
          <ClientAddStep1
            setData={setStep1Data}
            nextStep={() => setCurrentStep(currentStep + 1)}
          />
        )}

        {currentStep === 1 && (
          <ClientAddStep2
            step1Data={step1Data}
            prevStep={() => setCurrentStep(currentStep - 1)}
            nextStep={() => setCurrentStep(currentStep + 1)}
          />
        )}

        {currentStep === 2 && <ClientAddFinish />}
      </div>
    </div>
  );
}
