import DataTable from "components/Table/DataTable";
import { formatName } from "utils/format";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Skeleton } from "antd";
import { iUser, iCandidate } from "utils/models";
import { useNavigate } from "react-router-dom";
import { candidateApi } from "apis/index";
import { candidateColumns, candidateTable } from "_constants/index";
import Tag from "components/Table/Tag";
import useFilter from "src/hooks/useFilter";

export default function CandidatesList({ userDetail }: { userDetail: iUser }) {
  const navigate = useNavigate();
  const { getAllParams, pageChange } = useFilter();

  // console.log(getAllParams());

  const [total, setTotal] = useState(0);

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

  const { data, isPending } = useQuery({
    queryKey: ["Candidates", window.location.href],
    queryFn: async () =>
      await candidateApi
        .getCandidates({
          perPage: pageSize,
          ...getAllParams(),
          creator_id: userDetail?.id,
        })
        .then((res) => {
          setTotal(res.data.count);

          return res.data.data.map((user: iCandidate) => ({
            ...user,
            full_name: formatName(user.full_name),
            companies: user.current_employments.map(
              (employment) => employment.organization.label
            ),
            positions: user.current_employments.map(
              (employment) => employment.title.label
            ),
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
    <div className="flex-col w-full">
      <Tag tableName={candidateTable} />
      <DataTable
        titleTable={`Candidates List`}
        tableName={candidateTable}
        data={data}
        createBtn={createBtn}
        showDetail={goDetail}
        rawColumns={candidateColumns}
        paginationOption={paginationOption}
        noFilter={userDetail?.id !== ""}
      />
    </div>
  );
}
