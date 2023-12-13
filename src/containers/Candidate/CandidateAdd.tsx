import Step from "components/DataDisplay/Step";
import { useState } from "react";

import { Link } from "react-router-dom";
import CandidateAddStep1 from "./components/CandidateAddStep1";
import CandidateAddFinish from "./components/CandidateAddFinish";
import FormIndustry from "containers/Client/components/FormIndustry";
import IndustryTable from "components/DataDisplay/IndustryTable";
import { Button } from "antd";
import Academic from "./components/Academic";
import Certificate from "./components/Certificate";
import WorkingHistory from "./components/WorkingHistory";
import Remuneration from "./components/Remuneration";

const step = [
  "Personal Information",
  "Skills and Industry",
  "Education",
  "Working History",
  "Remunertion and Rewards",
  "Finish",
];

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

        {currentStep === 1 && (
          <>
            <FormIndustry
              saveData={() => {}}
              // saveData={addIndustry}
            />
            <IndustryTable
              deleteItem={() => {}}
              primaryItem={() => {}}
              data={[]}
              // deleteItem={deleteIndustry}
              // primaryItem={primaryIndustry}
              // data={candidateData?.business_line}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <Academic
              data={[]}
              // data={candidateData?.histories}
            />
            <span className="p-1"></span>
            <Certificate
              data={[]}
              // data={candidateData?.histories}
            />
          </>
        )}

        {currentStep === 3 && (
          <>
            <WorkingHistory
              data={[]}
              // data={candidateData?.histories}
            />
          </>
        )}

        {currentStep === 4 && (
          <>
            <Remuneration
              data={{}}
              // data={candidateData?.remuneration}
            />
          </>
        )}

        {currentStep === 5 && <CandidateAddFinish />}
      </div>
      <Button onClick={() => setCurrentStep(currentStep - 1)}>prev</Button>
      <Button onClick={() => setCurrentStep(currentStep + 1)}>next</Button>
    </div>
  );
}
