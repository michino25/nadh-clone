/* eslint-disable no-unused-vars */
import DataTable from "components/Table/DataTable";
import { formatName, formatDate } from "utils/format";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { iClient, iUser } from "utils/models";
import { useNavigate } from "react-router-dom";
import { Tag as TagAntd, notification } from "antd";
import { clientApi, userApi } from "apis/index";
import {
  clientColumns,
  clientTable,
  clientType,
  cpa,
  getSelectByValue,
  primaryStatus2,
  statusData4,
} from "_constants/index";
import Tag from "components/Table/Tag";
import useFilter from "src/hooks/useFilter";
import type { ColumnsType } from "antd/es/table";

const customColumns: ColumnsType = clientColumns;
customColumns[3] = {
  ...customColumns[3],
  render: (value: string) => <TagAntd color="geekblue">{value}</TagAntd>,
};
customColumns[4] = {
  ...customColumns[4],

  render: (value: string) => {
    let color;
    switch (value) {
      case "Create Client":
        color = "green";
        break;
      case "Tele Marketing":
        color = "blue";
        break;
      case "Client Meeting":
        color = "default";
        break;
      case "Proposal Sent":
        color = "red";
        break;
      case "Follow Up":
        color = "magenta";
        break;
      case "Sign Contract":
        color = "cyan";
        break;
      case "Job Order Received":
        color = "purple";
        break;
    }
    return <TagAntd color={color}>{value}</TagAntd>;
  },
};
customColumns[6] = {
  ...customColumns[6],

  render: (value: string) => {
    let color;
    switch (value) {
      case "Retained Plus":
        color = "green";
        break;
      case "Retained Minus":
        color = "red";
        break;
      case "New":
        color = "blue";
        break;
      case "Prospecting":
        color = "purple";
        break;
      case "Lost":
        color = "default";
        break;
    }
    return <TagAntd color={color}>{value}</TagAntd>;
  },
};
customColumns[10] = {
  ...customColumns[10],

  render: (value: string) => {
    let color;
    switch (value) {
      case "Active":
        color = "green";
        break;
      case "Off - limit":
        color = "blue";
        break;
      case "Blacklist":
        color = "red";
        break;
      case "Inactive":
        color = "default";
        break;
    }
    return <TagAntd color={color}>{value}</TagAntd>;
  },
};
customColumns[13] = {
  ...customColumns[13],
  render: (value: string) => value && <TagAntd color="purple">{value}</TagAntd>,
};

export default function ClientsList({ userDetail }: { userDetail: iUser }) {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { getAllParams, pageChange } = useFilter();

  const handlePageChange = (page: number) => {
    console.log("Page changed:", page);
    pageChange(getAllParams(), page);
  };

  const pageSize = 10;

  const paginationOption = {
    pageSize,
    handlePageChange,
    total,
  };

  const allParams = getAllParams()["city"]
    ? getAllParams()["city"].split(",").length === 2
      ? {
          ...getAllParams(),
          city: getAllParams()["city"].split(",")[1],
        }
      : {
          ...getAllParams(),
          country: getAllParams()["city"].split(",")[0],
        }
    : getAllParams();

  const { data, isFetching } = useQuery({
    queryKey: ["clients", window.location.href, userDetail.id],
    queryFn: async () =>
      await clientApi
        .getClients({
          perPage: pageSize,
          ...allParams,
          ...(userDetail?.id !== "" ? { lead_consultant: userDetail.id } : {}),
        })
        .then((res) => {
          setTotal(res.data.count);
          return res;
        }),
    enabled: userDetail?.id !== undefined,
    placeholderData: (previousData) => previousData,
    select: (res) =>
      res.data.data.map((client: iClient) => ({
        ...client,
        location: Object.values(client.address).map((location) =>
          typeof location === "object" ? location.label : location
        ),
        lead_consultants: client.lead_consultants.map((item) =>
          formatName(item.full_name)
        ),
        update_last_by: formatName(client.meta?.lastUpdated?.user?.full_name),
        updated_on: formatDate(
          client.meta?.lastUpdated?.time,
          "timestamp",
          "date"
        ),
        account_status: getSelectByValue(
          statusData4,
          client.account_development.status.toString()
        ).label,

        client_jobs: client.jobs_count,
        industry: client.business_line.map((item) => item.sector?.name),
        type: getSelectByValue(clientType, client.type.toString()).label,
        status: getSelectByValue(primaryStatus2, client.status.toString())
          .label,
        cpa: getSelectByValue(cpa, client.cpa.toString()).label,
        contact_person_name:
          client.contact_person_current &&
          client.contact_person_current[0] &&
          formatName(client.contact_person_current[0].full_name),
        contact_person_title:
          client.contact_person_current &&
          client.contact_person_current[0] &&
          formatName(
            client.contact_person_current[0].extra?.contact_info?.title
          ),
      })),
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!navigator.onLine)
        notification.error({
          message: "Get Clients",
          description: "No Internet",
        });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [window.location.href]);

  const goDetail = (id: string) => {
    const clients = data.filter((item: iClient) => item.id === id);
    navigate(`/client-detail/${clients[0].client_id}`);
  };

  const createBtn = {
    handler: () => {
      navigate(`/client-add`);
    },
    title: "Create Client",
  };

  const { data: userData } = useQuery({
    queryKey: ["all_users"],
    queryFn: async () => userApi.getUsers({}),
    select: (res) =>
      res.data.data.map((item: { id: string; full_name: string }) => ({
        value: item.id,
        label: formatName(item.full_name),
      })),
  });

  const filterSelectData = {
    update_last_by: userData,
    lead_consultants: userData,
    cpa: cpa,
    type: clientType,
    account_status: statusData4,
    status: primaryStatus2,
  };

  return (
    <div className="flex-col w-full">
      {userDetail?.id === "" && (
        <Tag filterSelectData={filterSelectData} tableName={clientTable} />
      )}

      <DataTable
        titleTable={`Clients List`}
        tableName={clientTable}
        loading={isFetching}
        filterSelectData={filterSelectData}
        createBtn={createBtn}
        data={data}
        showDetail={goDetail}
        rawColumns={customColumns}
        paginationOption={paginationOption}
        noFilter={userDetail?.id !== ""}
      />
    </div>
  );
}
