import DataTable from "components/Table/DataTable";
import { formatName } from "utils/format";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Skeleton } from "antd";
import { iUser, iCandidate } from "utils/models";
import { useNavigate } from "react-router-dom";
import { candidateApi } from "apis/index";
import { candidateColumns } from "_constants/index";

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

  const { data, isPending } = useQuery({
    queryKey: ["Candidates", userDetail?.id, currentPage],
    queryFn: async () =>
      await candidateApi
        .getCandidates({
          perPage: pageSize,
          page: currentPage,
          creator_id: userDetail?.id,
        })
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
    enabled: userDetail?.id !== undefined,
  });

  const goDetail = (id: string) => {
    const candidates = data.filter((item: iCandidate) => item.id === id);
    navigate(`/candidate-detail/${candidates[0].candidate_id}`);
  };

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
      rawColumns={candidateColumns}
      paginationOption={paginationOption}
    />
  );
}
