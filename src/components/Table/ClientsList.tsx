/* eslint-disable no-unused-vars */
import DataTable from "../DataTable";
import { formatName, formatDate } from "../../../utils/format";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { iClient, iUser } from "../../../utils/models";
import { getUser } from "../../../utils/getUser";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API_URL;

const rawColumns = [
  {
    title: "ID",
    key: "client_id",
  },
  {
    title: "Trade Name",
    key: "name",
  },
  {
    title: "City",
    key: "city",
  },
  {
    title: "Lead Consultant",
    key: "lead_consultant",
  },
  {
    title: "Tax Code",
    key: "tax_code",
  },
  {
    title: "Industry",
    key: "industry",
  },
  {
    title: "Jobs",
    key: "jobs_count",
  },
  {
    title: "Updated by",
    key: "updated_by",
  },
  {
    title: "Updated on",
    key: "updated_on",
  },
];

export default function ClientsList({ userDetail }: { userDetail: iUser }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    console.log("Page changed:", page);
    setCurrentPage(page);
  };

  const pageSize = 10;

  const paginationOption = {
    pageSize,
    currentPage,
    handlePageChange,
    total,
  };

  const { data, refetch, status, isPending } = useQuery({
    queryKey: ["Clients", userDetail?.id],
    queryFn: () =>
      axios
        .get(
          api +
            `clients?perPage=${pageSize}&page=${currentPage}&lead_consultant=${userDetail?.id}`,
          {
            headers: {
              Authorization: `Bearer ${getUser()?.token}`,
            },
          }
        )
        .then((res) => {
          setTotal(res.data.count);

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
    enabled: !!userDetail?.id,
  });

  useEffect(() => {
    refetch();
  }, [userDetail, refetch, currentPage]);

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
    data && (
      <DataTable
        titleTable={`Clients List`}
        createBtn={createBtn}
        data={data}
        showDetail={goDetail}
        rawColumns={rawColumns}
        paginationOption={paginationOption}
      />
    )
  );
}
