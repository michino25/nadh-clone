import DataTable from "components/Table/DataTable";
import { notification, Tag as TagAntd } from "antd";
import { formatName } from "utils/format";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { iUser, iCandidate } from "utils/models";
import { useNavigate } from "react-router-dom";
import { candidateApi, otherApi } from "apis/index";
import {
  candidateColumns,
  candidateTable,
  getSelectByValue,
  getStatusDataByKey,
  highest_education,
  primaryStatus,
  statusData2,
} from "_constants/index";
import Tag from "components/Table/Tag";
import useFilter from "src/hooks/useFilter";

const customColumns: any[] = candidateColumns;
customColumns[2] = {
  ...customColumns[2],

  render: (value: any) => {
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

  const allParams = getAllParams()["city"]
    ? getAllParams()["city"].split(",").length > 0 && {
        ...getAllParams(),
        country: getAllParams()["city"].split(",")[0],
        city: getAllParams()["city"].split(",")[1],
      }
    : getAllParams();

  const [data, setData] = useState<any[]>([]);
  const { isPending, isError, error } = useQuery({
    queryKey: ["Candidates", window.location.href, userDetail.id],
    queryFn: async () =>
      await candidateApi
        .getCandidates({
          perPage: pageSize,
          ...allParams,
          ...(userDetail?.id !== "" ? { creator_id: userDetail.id } : {}),
        })
        .then((res) => {
          setTotal(res.data.count);

          return res.data.data.map((user: iCandidate) => ({
            ...user,
            full_name: formatName(user.full_name),
            priority_status: getSelectByValue(
              primaryStatus,
              user.priority_status.toString()
            ).label,
            language: user.languages.map((lang: any) => lang.label),
            location:
              user.addresses.length > 0 &&
              Object.values(user.addresses[0]).map((location: any) =>
                typeof location === "object" && location !== null
                  ? location.label
                  : ""
              ),
            highest_education: user.highest_education.label,

            yob: user.dob ? user.dob.substring(0, 4) : "",
            industry: user.business_line.map((item: any) => item.sector?.name),
            flow_status: getStatusDataByKey(user.flow_status),

            current_company: user.current_employments.map(
              (employment) => employment.organization.label
            ),
            current_position: user.current_employments.map(
              (employment) => employment.title.label
            ),
          }));
        })
        .then((res) => setData(res)),
    enabled: userDetail?.id !== undefined,
  });

  useEffect(() => {
    if ((error as any)?.response?.status) {
      setData([]);
      notification.error({
        message: "Get Candidate",
        description: "Not Found",
      });
    }
  }, [isError, error]);

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

  const { data: langData, isPending: langPending } = useQuery({
    queryKey: ["langData"],
    queryFn: async () =>
      otherApi.getOneProperty().then((res) =>
        res.data
          .filter((item: any) => item.name === "language")[0]
          .values.map((item: any) => ({
            label: item.label,
            value: item.key.toString(),
          }))
      ),
  });

  // console.log(langData);

  const filterSelectData = {
    flow_status: statusData2,
    highest_education: highest_education,
    language: langData,
    priority_status: primaryStatus,
  };

  return (
    <div className="flex-col w-full">
      {userDetail?.id === "" && !langPending && (
        <Tag tableName={candidateTable} filterSelectData={filterSelectData} />
      )}

      <DataTable
        titleTable={`Candidates List`}
        loading={isPending}
        filterSelectData={filterSelectData}
        tableName={candidateTable}
        data={data}
        createBtn={createBtn}
        showDetail={goDetail}
        rawColumns={customColumns}
        paginationOption={paginationOption}
        noFilter={userDetail?.id !== ""}
      />
    </div>
  );
}
