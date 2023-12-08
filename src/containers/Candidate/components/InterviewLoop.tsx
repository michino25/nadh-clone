import { getStatusDataByKey } from "_constants/index";
import { Timeline, Collapse } from "antd";
import type { CollapseProps } from "antd";
import { formatDate } from "utils/format";

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
