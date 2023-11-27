/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import DataTable from "../DataTable";
import { formatName } from "../../../utils/format";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { iUser, iCandidate } from "../../../utils/models";
import { getUser } from "../../../utils/getUser";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API_URL;

const rawColumns = [
  {
    title: "ID",
    key: "candidate_id",
  },
  {
    title: "Name",
    key: "full_name",
  },
  {
    title: "Recent companies",
    key: "companies",
  },
  {
    title: "Recent positions",
    key: "positions",
  },
  {
    title: "Year of services",
    key: "industry_years",
  },
  {
    title: "Year of management",
    key: "management_years",
  },
];

export default function CandidatesList({ userDetail }: { userDetail: iUser }) {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

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
    queryKey: ["Candidates", userDetail?.id],
    queryFn: () =>
      axios
        .get(
          api +
            `candidates?perPage=${pageSize}&page=${currentPage}&creator_id=${userDetail?.id}`,
          {
            headers: {
              Authorization: `Bearer ${getUser()?.token}`,
            },
          }
        )
        .then((res) => {
          setTotal(res.data.count);

          return res.data.data.map((user: iCandidate) => ({
            ...user,
            full_name: formatName(user.full_name),
            companies: user.current_employments
              .map((employment) => employment.organization.label)
              .join(", "),
            positions: user.current_employments
              .map((employment) => employment.title.label)
              .join(", "),
          }));
        }),
    enabled: !!userDetail?.id,
  });

  const goDetail = (id: string) => {
    const candidates = data.filter((item: iCandidate) => item.id === id);
    navigate(`/candidate-detail/${candidates[0].candidate_id}`);
  };

  useEffect(() => {
    refetch();
  }, [userDetail, refetch, currentPage]);

  const createBtn = {
    handler: () => {
      navigate(`/candidate-add`);
    },
    title: "Create Candidate",
  };

  if (isPending) return <Skeleton active />;

  return (
    <DataTable
      titleTable={`Candidates List`}
      data={data}
      createBtn={createBtn}
      showDetail={goDetail}
      rawColumns={rawColumns}
      paginationOption={paginationOption}
    />
  );
}
