import Step from "components/DataDisplay/Step";
import { Button } from "antd";
import { useState } from "react";

import { Link } from "react-router-dom";
import CandidateAddStep1 from "./components/CandidateAddStep1";

const step = [
  "Personal Information",
  "Skills and Industry",
  "Education and Certificat",
  "Working History",
  "Remunertion and Rewards",
  "Finish",
];

export default function CadidateAdd() {
  const [currentStep, setCurrentStep] = useState(1);
  console.log(currentStep);

  return (
    <div className="px-12 pb-2">
      <div className="">
        <Link to={"/candidates"}>Candidates List</Link>
        <span> / Create Candidate</span>
      </div>

      <p className="mb-4 font-bold text-xl">Create Candidate</p>

      <Step current={currentStep} data={step} />

      <div className="p-4 my-6 bg-white rounded-lg">
        <p className="mb-4 font-bold text-lg">{step[currentStep]}</p>
        {currentStep === 0 && <CandidateAddStep1 />}
      </div>
      <Button onClick={() => setCurrentStep(currentStep - 1)} className="mr-2">
        Prev
      </Button>
      <Button onClick={() => setCurrentStep(currentStep + 1)} className="mr-2">
        Next
      </Button>
    </div>
  );
}
