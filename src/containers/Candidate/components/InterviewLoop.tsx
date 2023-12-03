import { Timeline, Collapse } from "antd";
import type { CollapseProps } from "antd";
import { formatDate } from "utils/format";

interface StatusData {
  [key: number]: string;
}

const statusData: StatusData[] = [
  { 1: "Raw" },
  { 2: "Screening Call" },
  { "-4": "Client Canceled" },
  { 3: "Interview with NADH" },
  { 4: "Shortlisting" },
  { 5: "Submit to Client" },
  { 6: "Interview with Client - Round 1" },
  { 7: "Reference Check" },
  { 8: "Negotiation" },
  { 9: "Offer Accepted" },
  { 10: "Placement" },
  { 11: "Follow-up" },
  { "-2": "Rejected by NADH" },
  { "-1": "Candidate Declined" },
];

const getStatusDataByKey = (key: number): string | undefined => {
  const statusObject = statusData.find((status) =>
    Object.keys(status).includes(key.toString())
  );
  return statusObject ? statusObject[key] : undefined;
};

export default function InterviewLoop({ data }: { data: any }) {
  const items: CollapseProps["items"] = data.map(
    (item: any, index: number) => ({
      key: index.toString(),
      label: (
        <div>
          <strong>
            {item.job.job_id} - {item.job.title.label}
          </strong>
          <p>
            {item.job.client.name} - {item.job.client.client_id}
          </p>
        </div>
      ),
      children: (
        <Timeline
          items={item.flow.map((flow: any) => ({
            color: "green",
            children: (
              <>
                <strong>{getStatusDataByKey(flow.current_status)}</strong>
                <p>{formatDate(flow.createdAt, "ISOdate", "date&hour")}</p>
                <p>{flow.comments.length} comments</p>
              </>
            ),
          }))}
        />
      ),
    })
  );

  console.log(data);

  return <Collapse accordion items={items} />;
}
