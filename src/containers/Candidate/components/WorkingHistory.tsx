import CandidateTable from "components/DataDisplay/CandidateTable";

const columns = [
  {
    title: "Company",
    key: "company",
  },
  {
    title: "Position",
    key: "position",
  },
  {
    title: "Start Time",
    key: "start_time",
  },
  {
    title: "End Time",
    key: "end_time",
  },
];

export default function WorkingHistory({ data }: { data: any }) {
  const workingHistory = data
    .filter((item: any) => item.type === 2)
    .map((item: any) => ({
      end_time: item.end_time || "Present",
      start_time: item.start_time,
      position: item.title.label,
      company: item.organization.label,
    }));

  console.log(workingHistory);

  return (
    <CandidateTable
      editClick={(id: any) => console.log(id)}
      createBtn={{
        title: "Add Working History",
        handler: () => console.log("hello"),
      }}
      data={workingHistory}
      titleTable="WORKING HISTORY"
      rawColumns={columns}
    />
  );
}
