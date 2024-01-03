export default function ButtonFilter({
  candidate_flows,
  setFilterStatus,
}: {
  candidate_flows: any;
  setFilterStatus: (value: string) => void;
}) {
  const rawData = candidate_flows.map(
    (item: { status: number }) => item.status
  );

  const data = [
    [
      { key: "2", name: "Screening Call" },
      { key: "3", name: "Interview with NADH" },
      { key: "4", name: "Shortlisting" },
      { key: "5", name: "Submit to Client" },
      { key: "6", name: "Interview with Client" },
      { key: "7", name: "Reference Check" },
    ],
    [
      { key: "8", name: "Negotiation" },
      { key: "9", name: "Offer Accepted" },
      { key: "10", name: "Placement" },
      { key: "11", name: "Follow-up" },
      { key: "12", name: "Replacement" },
    ],
  ];

  return (
    <div className="flex-col space-y-5">
      {data.map((dataBlock) => (
        <div className="flex justify-start flex-wrap border border-gray-200 rounded-lg p-5">
          {dataBlock.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setFilterStatus(item.key);
                window.location.href = "#part-5";
              }}
              className="xl:w-1/6 w-1/3 hover:text-blue-500 rounded-lg py-3 hover:bg-blue-200/10 border border-transparent hover:border-blue-300 duration-500"
            >
              <p className="font-medium text-lg">
                {
                  rawData.filter(
                    (candidate: number) => candidate.toString() === item.key
                  ).length
                }
              </p>
              <p>{item.name}</p>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
