export default function ButtonFilter({
  candidate_flows,
  setFilterStatus,
}: {
  candidate_flows: any;
  setFilterStatus: (value: any) => void;
}) {
  const rawData = candidate_flows.map((item: any) => item.status);
  console.log(rawData);

  const data = [
    { key: "2", name: "Screening Call" },
    { key: "3", name: "Interview with NADH" },
    { key: "4", name: "Shortlisting" },
    { key: "5", name: "Submit to Client" },
    { key: "6", name: "Interview with Client" },
    { key: "7", name: "Reference Check" },
  ];

  const data2 = [
    { key: "8", name: "Negotiation" },
    { key: "9", name: "Offer Accepted" },
    { key: "10", name: "Placement" },
    { key: "11", name: "Follow-up" },
    { key: "12", name: "Replacement" },
  ];

  return (
    <>
      <div className="flex justify-start">
        {data.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setFilterStatus(item.key);
              window.location.href = "#part-5";
            }}
            className="hover:text-blue-500 rounded-lg w-1/6 p-3 hover:bg-blue-200/10 border border-transparent hover:border-blue-300 duration-500"
          >
            <p className="font-medium text-lg">
              {
                rawData.filter(
                  (candidate: any) => candidate.toString() === item.key
                ).length
              }
            </p>
            <p>{item.name}</p>
          </button>
        ))}
      </div>
      <div className="flex justify-start mt-8">
        {data2.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setFilterStatus(item.key);
              window.location.href = "#part-5";
            }}
            className="hover:text-blue-500 rounded-lg p-3 w-1/6 hover:bg-blue-200/10 border border-transparent hover:border-blue-300 duration-500"
          >
            <p className="font-medium text-lg">
              {
                rawData.filter(
                  (candidate: any) => candidate.toString() === item.key
                ).length
              }
            </p>
            <p>{item.name}</p>
          </button>
        ))}
      </div>
    </>
  );
}
