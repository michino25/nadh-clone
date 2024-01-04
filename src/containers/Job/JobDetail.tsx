import { useParams, Link } from "react-router-dom";
import { Anchor, Skeleton, notification, Button } from "antd";
import { DownloadOutlined, FilePdfOutlined } from "@ant-design/icons";

import BackToTopButton from "components/ShareComponents/BackToTopButton";
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
import IndustryAPI from "components/ShareComponents/IndustryAPI";

import dayjs from "dayjs";
import { scrollTo } from "utils/others";
import { iFile, iIndustry } from "utils/models";
import { AxiosError } from "axios";

const anchorItems = [
  {
    key: "information",
    href: "#information",
    title: "Information",
  },
  {
    key: "requirements",
    href: "#requirements",
    title: "Job Requirements",
  },
  {
    key: "description",
    href: "#description",
    title: "Job Description",
  },
  {
    key: "remuneration",
    href: "#remuneration",
    title: "Remuneration",
  },
  {
    key: "candidateslist",
    href: "#candidateslist",
    title: "Candidates List",
  },
  {
    key: "notes",
    href: "#notes",
    title: "Notes",
  },
  {
    key: "attachments",
    href: "#attachments",
    title: "Attachments",
  },
  {
    key: "logs",
    href: "#logs",
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
          business_line: res.data.business_line.map((item: iIndustry) => ({
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

  useEffect(() => {
    if (!(isPending || !id) && window.location.hash !== "") {
      setTimeout(() => {
        const id = window.location.hash.replace("#", "");
        scrollTo(id);
      }, 300);
    }
  }, [isPending, id]);

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
    } catch (error: unknown) {
      // error
      // console.error("Update failed", error);
      if (error instanceof AxiosError)
        notification.error({
          message: "Update Job",
          description: `Update failed. ${
            error.response?.data[0].message || "Please try again."
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
    } catch (error: unknown) {
      // error
      // console.error("Update failed", error);
      if (error instanceof AxiosError)
        notification.error({
          message: "Update Job",
          description: `Update failed. ${
            error.response?.data[0].message || "Please try again."
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
    } catch (error: unknown) {
      // error
      // console.error("Update failed", error);
      if (error instanceof AxiosError)
        notification.error({
          message: "Update Job",
          description: `Update failed. ${
            error.response?.data[0].message || "Please try again."
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
        return res.data.data.map((item: iFile) => ({
          uid: item.id,
          name: item.name,
          status: "done",
          url: `https://lubrytics.com:8443/nadh-mediafile/file/${item.id}`,
          created_at: formatDate(item.created_at, "ISOdate", "date&hour"),
        }));
      }),
    enabled: !!jobData?.id,
  });

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
      } catch (error: unknown) {
        // error
        // console.error("Delete failed", error);
        if (error instanceof AxiosError)
          notification.error({
            message: "Delete File",
            description: `Delete failed. ${
              error.response?.data[0].message || "Please try again."
            }`,
          });
      }
    },
  });

  const linkPDF =
    "https://lubrytics.com:8443/nadh-api-crm/api/export/jobs/" +
    id +
    "/CV?download=true&token=" +
    getUser().token;

  const [pdfLoading, setPdfLoading] = useState("");
  const pdfHandler = async (link: string, type: "download" | "view") => {
    setPdfLoading(type);
    try {
      const data = await fetch(link).then((r) => r.blob());
      const fileURL = window.URL.createObjectURL(data);

      if (type === "view") window.open(fileURL);
      else {
        const a = document.createElement("a");
        a.href = fileURL;
        a.setAttribute(
          "download",
          "Job-" + id + "-" + dayjs().format("DDMMYY_HHmmss")
        );
        a.click();
      }
    } finally {
      setPdfLoading("");
    }
  };

  if (isPending || !id) return <Skeleton className="p-12" active />;

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

          <div className="flex gap-3">
            <Button
              loading={pdfLoading === "download"}
              onClick={() => pdfHandler(linkPDF, "download")}
              icon={<DownloadOutlined />}
            >
              Download File PDF
            </Button>

            <Button
              loading={pdfLoading === "view"}
              onClick={() => pdfHandler(linkPDF, "view")}
              type="primary"
              icon={<FilePdfOutlined />}
            >
              View File PDF
            </Button>
          </div>
        </div>
        <Anchor
          direction="horizontal"
          items={anchorItems}
          affix={false}
          offsetTop={200}
        />
      </div>
      <div className="flex w-full p-5">Detail {id}</div>

      <div className="px-8 my-5">
        <div className="flex-col space-y-4">
          <div className="p-4 bg-white rounded-lg">
            <ButtonFilter
              candidate_flows={jobData?.candidate_flows}
              setFilterStatus={setFilterStatus}
            />
          </div>

          <div id="information" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Job Information</p>
            <JobInformation
              data={jobData}
              updateMutation={updateMutation}
              editable={editable}
              setEditable={setEditable}
            />
          </div>

          <div className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Industry</p>
            <IndustryAPI
              data={jobData?.business_line}
              updateFn={(value: any) =>
                updateMutation.mutate({
                  business_line: value,
                })
              }
              loading={loading}
            />
          </div>

          <div id="requirements" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Job Requirements</p>
            <JobRequirements
              data={jobData}
              loading={loading}
              updateFn={updateMutation2.mutate}
            />
          </div>

          <div id="description" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Job Description</p>
            <JobDescription
              data={jobData}
              updateFn={(value: any, onSuccess: () => void) =>
                updateMutation2.mutate(value, { onSuccess })
              }
            />
          </div>

          <div id="remuneration" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Remuneration</p>
            <Remuneration
              data={jobData?.remuneration}
              updateFn={updateMutation2.mutate}
            />
          </div>

          <div id="candidateslist" className="p-4 bg-white rounded-lg">
            <CandidatesList
              data={jobData}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              addCandidateFlow={addFlowMutation.mutate}
            />
          </div>

          <div id="notes" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Notes</p>
            <Notes
              data={jobData.detail_comments}
              clientID={jobData.id}
              refetch={refetch}
              module="job"
            />
          </div>

          <div id="attachments" className="p-4 bg-white rounded-lg">
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
                loading={loading}
              />
            </div>
          </div>

          <div id="logs" className="p-4 bg-white rounded-lg">
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
