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
    title: "Degree",
    key: "degree",
  },
];

export default function Certificate({ data }: { data: any }) {
  console.log(data);

  const certData = data
    .filter((item: any) => item.type === 3)
    .map((item: any) => ({
      status: item.status === 1 ? "Is current school" : "",
      end_time: item.end_time?.split("-")[0],
      start_time: item.start_time?.split("-")[0],
      degree: item.title?.label,
      school: item.organization?.label,
    }));

  return (
    <CandidateTable
      editClick={(id: any) => console.log(id)}
      createBtn={{
        title: "Add Certificate",
        handler: () => console.log("hello"),
      }}
      data={certData}
      titleTable="CERTIFICATE"
      rawColumns={columns}
    />
  );
}
