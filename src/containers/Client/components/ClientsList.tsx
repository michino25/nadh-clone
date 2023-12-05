/* eslint-disable no-unused-vars */
import DataTable from "components/Table/DataTable";
import { formatName, formatDate } from "utils/format";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { iClient, iUser } from "utils/models";
import { useNavigate } from "react-router-dom";
import { clientApi } from "apis/index";
import { clientColumns, clientTable } from "_constants/index";
import { pageChange } from "utils/filter";
import { getStore } from "utils/localStorage";
import Tag from "components/Table/Tag";

export default function ClientsList({ userDetail }: { userDetail: iUser }) {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    console.log("Page changed:", page);
    pageChange(clientTable, page, refetch);
  };

  const pageSize = 10;

  const paginationOption = {
    pageSize,
    handlePageChange,
    total,
  };

  const { data, status, isPending, refetch } = useQuery({
    queryKey: ["Clients", getStore(clientTable).page],
    queryFn: async () =>
      await clientApi
        .getClients({
          perPage: pageSize,
          page: getStore(clientTable).page,
          ...getStore(clientTable).filter,
          lead_consultant: userDetail?.id,
        })
        .then((res) => {
          setTotal(res.data.count);
          console.log(res.data);

          return res.data.data.map((client: iClient) => ({
            ...client,
            city: client.address?.country?.label,
            lead_consultant: formatName(client.lead_consultants[0]?.full_name),
            updated_by: formatName(client.meta?.lastUpdated?.user?.full_name),
            updated_on: formatDate(
              client.meta?.lastUpdated?.time,
              "timestamp",
              "date"
            ),
            industry: client.business_line[0]?.sector?.name,
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

  if (isPending) return <Skeleton active />;

  return (
    <div className="flex-col w-full">
      <Tag tableName={clientTable} refetch={refetch} />
      {data && (
        <DataTable
          titleTable={`Clients List`}
          tableName={clientTable}
          refetch={refetch}
          createBtn={createBtn}
          data={data}
          showDetail={goDetail}
          rawColumns={clientColumns}
          paginationOption={paginationOption}
        />
      )}
    </div>
  );
}
