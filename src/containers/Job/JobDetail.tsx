import { useParams, Link } from "react-router-dom";
import { Anchor, Skeleton, notification, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import BackToTopButton from "components/BackToTopButton";
import { jobApi, otherApi } from "apis/index";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "utils/format";
import { getUser } from "utils/getUser";
import { DataUpload } from "components/DataEntry/index";
import ActivityLogsTable from "../Client/components/ActivityLogsTable";
import { useEffect, useState } from "react";
import Notes from "../Client/components/Notes";
import JobInformation from "./components/JobInformation";
import { v4 as uuidv4 } from "uuid";
import Remuneration from "./components/Remuneration";
import CandidatesList from "./components/CandidatesList";
import ButtonFilter from "./components/ButtonFilter";
import JobDescription from "./components/JobDescription";
import JobRequirements from "./components/JobRequirements";
import Industry from "./components/Industry";

const anchorItems = [
  {
    key: "part-1",
    href: "#part-1",
    title: "Information",
  },
  {
    key: "part-2",
    href: "#part-2",
    title: "Job Requirements",
  },
  {
    key: "part-3",
    href: "#part-3",
    title: "Job Description",
  },
  {
    key: "part-4",
    href: "#part-4",
    title: "Remuneration",
  },
  {
    key: "part-5",
    href: "#part-5",
    title: "Candidates List",
  },
  {
    key: "part-6",
    href: "#part-6",
    title: "Notes",
  },
  {
    key: "part-7",
    href: "#part-7",
    title: "Attachments",
  },
  {
    key: "part-8",
    href: "#part-8",
    title: "Activity Logs",
  },
];

export default function JobDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("");

  const {
    data: jobData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: async () =>
      await jobApi.getOneJob(id as string).then((res) => {
        return {
          ...res.data,
          business_line: res.data.business_line.map((item: any) => ({
            ...item,
            id: uuidv4(),
          })),
        };
      }),
  });

  const [editable, setEditable] = useState(false);
  useEffect(() => {
    if (jobData?.status) {
      setEditable(jobData?.status === 12);
    }
  }, [jobData?.status]);

  const addFlow = async (data: any) => {
    setLoading(true);
    try {
      await otherApi.addCandidateFlows(jobData.id, data);

      // success
      // console.log(res.data);
      refetch();

      notification.success({
        message: "Update Job",
        description: "Update success.",
      });
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Job",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  const addFlowMutation = useMutation({
    mutationFn: (formData: any) => addFlow(formData),
  });

  const updateJob2 = async (data: any) => {
    setLoading(true);
    try {
      await jobApi.updateJob(jobData.job_id, data);

      // success
      // console.log(res.data);
      refetch();

      notification.success({
        message: "Update Job",
        description: "Update success.",
      });
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Job",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMutation2 = useMutation({
    mutationFn: (formData: any) => updateJob2(formData),
  });

  const updateJob = async (data: any) => {
    setLoading(true);
    try {
      await jobApi.updateJob(
        data?.extend_date ? jobData.id + "/extend" : jobData.id,
        data
      );

      // success
      // console.log(res.data);
      refetch();

      notification.success({
        message: "Update Job",
        description: "Update success.",
      });
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Job",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (formData: any) => updateJob(formData),
  });

  const { data: jobImage, refetch: jobImageRefetch } = useQuery({
    queryKey: ["files", jobData?.id],
    queryFn: () =>
      otherApi.getFile(jobData?.id, "job").then((res) => {
        console.log(res.data.data);

        return res.data.data.map((item: any) => ({
          uid: item.id,
          name: item.name,
          status: "done",
          url: `https://lubrytics.com:8443/nadh-mediafile/file/${item.id}`,
          created_at: formatDate(item.created_at, "ISOdate", "date&hour"),
        }));
      }),
    enabled: !!jobData?.id,
  });

  console.log(jobImage);

  const fileUpload = (id: string) => {
    if (id) {
      const data = {
        mediafiles: {
          files: [id],
        },
      };

      updateMutation.mutate(data, {
        onSuccess: () => {
          jobImageRefetch();
        },
      });
    }
  };

  const fileDelete = (id: string) => {
    const data = {
      mediafiles: {
        files: [],
      },
    };

    deleteFileMutation.mutate(id, {
      onSuccess: () => {
        updateMutation.mutate(data, {
          onSuccess: () => {
            jobImageRefetch();
          },
        });
      },
    });
  };

  const deleteFileMutation = useMutation({
    mutationFn: async (formData: any) => {
      try {
        await otherApi.deleteFile(formData);

        // success
        // console.log(res.data);
        notification.success({
          message: "Delete File",
          description: "Delete success.",
        });
        refetch();
      } catch (error: any) {
        // error
        // console.error("Delete failed", error);
        notification.error({
          message: "Delete File",
          description: `Delete failed. ${
            error.response.data[0].message || "Please try again."
          }`,
        });
      }
    },
  });

  if (isPending || !id) return <Skeleton active />;

  return (
    <>
      <BackToTopButton />
      <div className="fixed z-40 bg-gray-100 top-24 left-0 right-0 px-8 pb-2 pt-4">
        <div className="py-1 flex justify-between">
          <div>
            <Link to={"/jobs"}>Jobs List</Link>
            <span>
              {" "}
              / {id} - {jobData.title.label.toUpperCase()}
            </span>
          </div>
          <div>
            <Button
              href={
                "https://lubrytics.com:8443/nadh-api-crm/api/export/jobs/" +
                id +
                "/CV?download=true&token=" +
                getUser().token
              }
              type="primary"
              icon={<DownloadOutlined />}
            >
              Download File PDF
            </Button>
          </div>
        </div>
        <Anchor
          className=""
          direction="horizontal"
          items={anchorItems}
          offsetTop={130}
        />
      </div>
      <div className="flex w-full p-5">Detail {id}</div>
      <div className="px-8 my-5">
        <div className="flex-col space-y-4">
          <div id="part-1" className="p-4 bg-white rounded-lg">
            <ButtonFilter
              candidate_flows={jobData?.candidate_flows}
              setFilterStatus={setFilterStatus}
            />
          </div>

          <div id="part-1" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Job Information</p>
            <JobInformation
              data={jobData}
              updateMutation={updateMutation}
              editable={editable}
              setEditable={setEditable}
            />
          </div>

          <div id="part-1" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Industry</p>
            <Industry
              data={jobData?.business_line}
              updateFn={(value: any) =>
                updateMutation.mutate({
                  business_line: value,
                })
              }
              loading={loading}
            />
          </div>

          <div id="part-2" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Job Requirements</p>
            <JobRequirements
              data={jobData}
              loading={loading}
              updateFn={updateMutation2.mutate}
            />
          </div>

          <div id="part-3" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Job Description</p>
            <JobDescription data={jobData} updateFn={updateMutation2.mutate} />
          </div>

          <div id="part-4" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Remuneration</p>
            <Remuneration
              data={jobData?.remuneration}
              updateFn={updateMutation2.mutate}
            />
          </div>

          <div id="part-5" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Candidates List</p>
            <CandidatesList
              data={jobData}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              addCandidateFlow={addFlowMutation.mutate}
            />
          </div>

          <div id="part-6" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Notes</p>
            <Notes
              data={jobData.detail_comments}
              clientID={jobData.id}
              refetch={refetch}
              module="job"
            />
          </div>

          <div id="part-7" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Attachments</p>
            <div className="flex space-x-2">
              <DataUpload
                label=""
                imgList={jobImage}
                onChange={fileUpload}
                onDelete={fileDelete}
                data={{
                  obj_table: "job",
                  obj_uid: jobData.id,
                  uploadedByUserId: getUser().user_sent.user_id,
                }}
              />
            </div>
          </div>

          <div id="part-8" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Activity Logs</p>
            <div className="flex space-x-2">
              <ActivityLogsTable data={jobData.logs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
