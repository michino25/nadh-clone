import CandidatesList from "../components/Table/CandidatesList";

export default function Candidates() {
  return (
    <div className="flex w-full p-5">
      <CandidatesList userDetail={{ id: "" }} />;
    </div>
  );
}
