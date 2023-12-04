import Step from "components/DataDisplay/Step";
import { useState } from "react";

import { Link } from "react-router-dom";
import CandidateAddStep1 from "./components/CandidateAddStep1";
import CandidateAddFinish from "./components/CandidateAddFinish";

const step = ["Personal Information", "Finish"];

export default function CadidateAdd() {
  const [currentStep, setCurrentStep] = useState(0);
  // console.log(currentStep);

  return (
    <div className="px-12 pb-2">
      <div className="">
        <Link to={"/candidates"}>Candidates List</Link>
        <span> / Create Candidate</span>
      </div>

      <p className="mb-4 font-bold text-xl">Create Candidate</p>

      <div className="px-12">
        <Step current={currentStep} data={step} />
      </div>

      <div className="p-4 my-6 bg-white rounded-lg">
        <p className="mb-4 font-bold text-lg">{step[currentStep]}</p>
        {currentStep === 0 && (
          <CandidateAddStep1 nextStep={() => setCurrentStep(currentStep + 1)} />
        )}
        {currentStep === 1 && <CandidateAddFinish />}
      </div>
    </div>
  );
}
