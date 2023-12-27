import { getIndustryString } from "_constants/index";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";

export default function CompareTable({
  dataCompare,
  candidateName,
  candidateId,
  jobName,
  jobId,
}: {
  dataCompare: any;
  candidateName: string;
  candidateId: string;
  jobName: string;
  jobId: string;
}) {
  console.log(dataCompare);
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "",
      children: (
        <span className="font-bold">
          CANDIDATE {candidateId} - {candidateName}
        </span>
      ),
    },
    {
      key: "2",
      label: "Or",
      children: (
        <span className="font-bold">
          JOB {jobId} - {jobName}
        </span>
      ),
    },
    {
      key: "3",
      label: "Industry Year of Services",
      children: dataCompare.candidate.industry_experience,
    },
    {
      key: "4",
      label: "Vs.",
      children: dataCompare.job.industry_experience,
    },
    {
      key: "5",
      label: "Year of Management",
      children: dataCompare.candidate.role_experience,
    },
    {
      key: "6",
      label: "Vs.",
      children: dataCompare.job.role_experience,
    },
    {
      key: "7",
      label: "Industry",
      children: dataCompare.candidate.industry.map((item: any) => (
        <p>{getIndustryString(item)}</p>
      )),
    },
    {
      key: "8",
      label: "Vs.",
      children: dataCompare.job.industry.map((item: any) => (
        <p>{getIndustryString(item)}</p>
      )),
    },
    {
      key: "9",
      label: "Appearance",
      children: dataCompare.candidate.appearance,
    },
    {
      key: "10",
      label: "Vs.",
      children: dataCompare.job.appearance,
    },
    {
      key: "11",
      label: "Attitude",
      children: dataCompare.candidate.attitude,
    },
    {
      key: "12",
      label: "Vs.",
      children: dataCompare.job.attitude,
    },
    {
      key: "13",
      label: "Communication",
      children: dataCompare.candidate.communication,
    },
    {
      key: "14",
      label: "Vs.",
      children: dataCompare.job.communication,
    },
    {
      key: "15",
      label: "Job Competencies",
      children: dataCompare.candidate.competency,
    },
    {
      key: "16",
      label: "Vs.",
      children: dataCompare.job.competency,
    },
    {
      key: "17",
      label: "Strengths",
      children: dataCompare.candidate.strength,
    },
    {
      key: "18",
      label: "Vs.",
      children: dataCompare.job.strength,
    },
    {
      key: "19",
      label: "Others",
      children: dataCompare.candidate.other,
    },
    {
      key: "20",
      label: "Vs.",
      children: dataCompare.job.other,
    },
  ];

  return <Descriptions title="" column={2} bordered items={items} />;
}
