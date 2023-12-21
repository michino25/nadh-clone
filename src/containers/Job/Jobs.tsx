import JobsList from "./components/JobsList";

export default function Jobs() {
  return (
    <div className="flex w-full p-5">
      <JobsList userDetail={{ id: "" }} />
    </div>
  );
}
