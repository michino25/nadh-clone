/* eslint-disable no-unused-vars */
import DataTable from "components/Table/DataTable";
import { formatName, formatDate } from "utils/format";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { iClient, iUser } from "utils/models";
import { useNavigate } from "react-router-dom";
import { clientApi, userApi } from "apis/index";
import {
  clientColumns,
  clientTable,
  clientType,
  cpa,
  getSelectByValue,
  getStatusDataByKey,
  primaryStatus2,
  statusData2,
} from "_constants/index";
import Tag from "components/Table/Tag";
import useFilter from "src/hooks/useFilter";

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

  const { data, status, isPending } = useQuery({
    queryKey: ["Clients", window.location.href],
    queryFn: async () =>
      await clientApi
        .getClients({
          perPage: pageSize,
          ...allParams,
          lead_consultant: userDetail?.id,
        })
        .then((res) => {
          setTotal(res.data.count);
          console.log(res.data);

          return res.data.data.map((client: iClient) => ({
            ...client,
            location: Object.values(client.address).map((location) =>
              typeof location === "object" ? location.label : location
            ),
            lead_consultants: client.lead_consultants.map((item) =>
              formatName(item.full_name)
            ),
            update_last_by: formatName(
              client.meta?.lastUpdated?.user?.full_name
            ),
            updated_on: formatDate(
              client.meta?.lastUpdated?.time,
              "timestamp",
              "date"
            ),
            account_status: getStatusDataByKey(
              client.account_development.status
            ),

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
          }));
        }),
    enabled: userDetail?.id !== undefined,
  });

  useEffect(() => {
    console.log("Data status:", status);
    console.log("Data:", data);
  }, [data, status]);

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
    queryKey: ["Role"],
    queryFn: async () =>
      userApi.getUsers({}).then((res) =>
        res.data.data.map((item: any) => ({
          value: item.id,
          label: formatName(item.full_name),
        }))
      ),
  });

  const filterSelectData = {
    update_last_by: userData,
    lead_consultants: userData,
    cpa: cpa,
    type: clientType,
    account_status: statusData2,
    status: primaryStatus2,
  };

  if (isPending) return <Skeleton active />;

  return (
    <div className="flex-col w-full">
      <Tag filterSelectData={filterSelectData} tableName={clientTable} />
      {data && (
        <DataTable
          titleTable={`Clients List`}
          tableName={clientTable}
          filterSelectData={filterSelectData}
          createBtn={createBtn}
          data={data}
          showDetail={goDetail}
          rawColumns={clientColumns}
          paginationOption={paginationOption}
          noFilter={userDetail?.id !== ""}
        />
      )}
    </div>
  );
}
