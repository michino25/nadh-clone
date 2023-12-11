import CandidateTable from "components/DataDisplay/CandidateTable";

const columns = [
  {
    title: "Current School",
    key: "status",
  },
  {
    title: "Start Year",
    key: "start_time",
  },
  {
    title: "Graduation Year",
    key: "end_time",
  },
  {
    title: "School",
    key: "school",
  },
  {
    title: "Major",
    key: "major",
  },
  {
    title: "Degree",
    key: "degree",
  },
];

export default function Academic({ data }: { data: any }) {
  const eduData = data
    .filter((item: any) => item.type === 1)
    .map((item: any) => ({
      status: item.status === 1 ? "Is current school" : "",
      end_time: item.end_time?.split("-")[0],
      start_time: item.start_time?.split("-")[0],
      major: item.title?.label,
      school: item.organization?.label,
      degree: item.degree.label,
    }));

  console.log(eduData);

  return (
    <CandidateTable
      editClick={(id: any) => console.log(id)}
      createBtn={{
        title: "Add Education",
        handler: () => console.log("hello"),
      }}
      data={eduData}
      titleTable="ACADEMIC"
      rawColumns={columns}
    />
  );
}
