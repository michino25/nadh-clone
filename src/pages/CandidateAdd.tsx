import Step from "../components/DataDisplay/Step";

export default function CadidateAdd() {
  return (
    <div className="p-6">
      <Step
        current={1}
        data={[
          "Personal Information",
          "Skills and Industry",
          "Education and Certificat",
          "Working History",
          "Remunertion and Rewards",
          "Finish",
        ]}
      />
    </div>
  );
}
