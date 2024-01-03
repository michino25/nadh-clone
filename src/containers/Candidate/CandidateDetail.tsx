import { useParams, Link } from "react-router-dom";
import { Anchor, Button, Form, Skeleton, notification } from "antd";
import { DownloadOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import { DataUpload, TextArea } from "components/DataEntry/index";

import BackToTopButton from "components/ShareComponents/BackToTopButton";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import InterviewLoop from "containers/Candidate/components/InterviewLoop";

import { candidateApi, otherApi } from "apis/index";
import { getUser } from "utils/getUser";
import WorkingHistory from "./components/WorkingHistory";
import Academic from "./components/Academic";
import Certificate from "./components/Certificate";
import Remuneration from "./components/Remuneration";
import PersonalInformationForm from "./components/PersonalInformationForm";
import { formatDate, formatName } from "utils/format";
import CommentItem from "components/ShareComponents/CommentItem";
import SkillsAndIndustry from "./components/SkillsAndIndustry";

import dayjs from "dayjs";

const anchorItems = [
  {
    key: "information",
    href: "#information",
    title: "Personal Information",
  },
  {
    key: "industry",
    href: "#industry",
    title: "Skills and Industry",
  },
  {
    key: "education",
    href: "#education",
    title: "Education",
  },
  {
    key: "working",
    href: "#working",
    title: "Working History",
  },
  {
    key: "remuneration",
    href: "#remuneration",
    title: "Remuneration And Rewards",
  },
  {
    key: "attachments",
    href: "#attachments",
    title: "Attachments",
  },
  {
    key: "note",
    href: "#note",
    title: "Note",
  },
];

export default function Candidates() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [resetAddress, setResetAddress] = useState(false);

  const {
    data: candidateData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["candidate", id],
    queryFn: async () =>
      await candidateApi.getOneCandidate(id as string).then((res) => res.data),
  });

  useEffect(() => {
    if (isPending && window.location.hash !== "") {
      setTimeout(() => {
        const id = window.location.hash.replace("#", "");
        const yOffset = -200;
        const element = document.getElementById(id)!;

        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }, 300);
    }
  }, [isPending]);

  const { data: candidateImage, refetch: candidateImageRefetch } = useQuery({
    queryKey: ["files", candidateData?.id],
    queryFn: () =>
      otherApi.getFile(candidateData?.id, "candidates").then((res) => {
        console.log(res.data.data);

        return res.data.data.map((item: any) => ({
          uid: item.id,
          name: item.name,
          status: "done",
          url: `https://lubrytics.com:8443/nadh-mediafile/file/${item.id}`,
          created_at: formatDate(item.created_at, "ISOdate", "date&hour"),
        }));
      }),
    enabled: !!candidateData?.id,
  });

  console.log(candidateImage);

  const [address, setAddress] = useState<any[]>();
  const [form] = Form.useForm();
  const [currency, setCurrency] = useState<number>();

  const fileUpload = (id: string) => {
    if (id) {
      const data = {
        mediafiles: {
          files: [id],
        },
      };

      updateMutation.mutate(data, {
        onSuccess: () => {
          candidateImageRefetch();
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
            candidateImageRefetch();
          },
        });
      },
    });
  };

  const updateCandidate = async (userData: any) => {
    setLoading(true);

    try {
      await candidateApi.updateCandidate(candidateData.id, userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Update Candidate",
        description: "Update success.",
      });
      refetch();
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Candidate",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (formData: any) => updateCandidate(formData),
  });

  const onFinish = (values: any) => {
    const remunerationObject = {
      notice_days: parseInt(values.notice_days),
      remuneration: {
        benefit: {
          over_thirteen: parseInt(values.over_thirteen),
          lunch_check: parseInt(values.lunch_check),
          car_parking: parseInt(values.car_parking),
          car_allowance: parseInt(values.car_allowance),
          phone: parseInt(values.phone),
          laptop: parseInt(values.laptop),
          share_option: parseInt(values.share_option),
          health_cover: parseInt(values.health_cover),

          ...(values.over_thirteen === "1"
            ? { over_thirteen_text: values.over_thirteen_text }
            : {}),
          ...(values.lunch_check === "1"
            ? { lunch_check_text: values.lunch_check_text }
            : {}),
          ...(values.car_parking === "1"
            ? { car_parking_text: values.car_parking_text }
            : {}),
          ...(values.car_allowance === "1"
            ? { car_allowance_text: values.car_allowance_text }
            : {}),
          ...(values.phone === "1" ? { phone_text: values.phone_text } : {}),
          ...(values.laptop === "1" ? { laptop_text: values.laptop_text } : {}),
          ...(values.share_option === "1"
            ? { share_option_text: values.share_option_text }
            : {}),
          ...(values.health_cover === "1"
            ? { health_cover_text: values.health_cover_text }
            : {}),

          pension_scheme: parseInt(values.pension_scheme),
          no_holiday: parseInt(values.no_holiday),
          working_hour: parseInt(values.working_hour),
          overtime_hour: parseInt(values.overtime_hour),
        },
        currency,
        current_salary: values.current_salary,
        salary: {
          from: values.salary_from,
          to: values.salary_to,
        },
        expectations: null,
        future_prospects: null,
        notice_days: parseInt(values.notice_days),
      },
    };

    const dob =
      values.birthday.year && values.birthday.month && values.birthday.day
        ? `${values.birthday.year}-${values.birthday.month}-${values.birthday.day}`
        : null;

    // console.log(values.addresses[0].country);

    const data = {
      ...values,
      addresses:
        address && address[0]?.address?.country
          ? address.map((item) => ({
              address: item.address.address,
              ...{
                country: item.address.country && {
                  key: item.address.country.value,
                  label: item.address.country.label,
                },
              },
              ...{
                city: item.address.city && {
                  key: item.address.city.value,
                  label: item.address.city.label,
                },
              },
              ...{
                district: item.address.district && {
                  key: item.address.district.value,
                  label: item.address.district.label,
                },
              },
            }))
          : [],

      dob: dob,
      gender: parseInt(values.gender),
      ...(values.highest_education && {
        highest_education: {
          key: values.highest_education.split("_")[0],
          label: values.highest_education.split("_")[1],
        },
      }),
      nationality: values.nationality.map((item: any) => ({
        key: item.split("_")[0],
        label: item.split("_")[1],
      })),
      phones: values.phones,
      // phones: values.phones.map((item: any) => ({
      //   number: item,
      //   current: -1,
      //   phone_code: { key: 1280 },
      // })),

      prefer_position: {
        positions: values.prefer_position.map((item: any) => ({
          key: item.split("_")[0],
          label: item.split("_")[1],
        })),
      },

      priority_status: parseInt(values.priority_status),
      relocating_willingness: parseInt(values.relocating_willingness),
      ...remunerationObject,
    };
    updateMutation.mutate(data, { onSuccess: () => setShowBtn(false) });
    console.log("Received values of form: ", data);
    console.log(address);
  };

  const [showBtn, setShowBtn] = useState(false);
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    if (!firstRender) {
      if (!(isPending || !id))
        setTimeout(() => {
          setFirstRender(true);
        }, 500);
    } else setShowBtn(true);
  }, [address]);

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

  const createCandidateHistoriesApi = async (userData: any) => {
    try {
      await candidateApi.createCandidateHistories(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Create Histories",
        description: "Create success.",
      });
      refetch();
    } catch (error: any) {
      // error
      // console.error("Create failed", error);
      notification.error({
        message: "Create Histories",
        description: `Create failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const deleteCandidateHistoriesApi = async (userData: any) => {
    try {
      await candidateApi.deleteCandidateHistories(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Delete Histories",
        description: "Delete success.",
      });
      refetch();
    } catch (error: any) {
      // error
      // console.error("Delete failed", error);
      notification.error({
        message: "Delete Histories",
        description: `Delete failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const updateCandidateHistoriesApi = async (userData: any, id: string) => {
    try {
      await candidateApi.updateCandidateHistories(id, userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Update Histories",
        description: "Update success.",
      });
      refetch();
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Histories",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const createCandidateHistoriesMutation = useMutation({
    mutationFn: (formData: any) => createCandidateHistoriesApi(formData),
  });

  const deleteCandidateHistoriesMutation = useMutation({
    mutationFn: (formData: any) => deleteCandidateHistoriesApi(formData),
  });

  const updateCandidateHistoriesMutation = useMutation({
    mutationFn: (formData: any) =>
      updateCandidateHistoriesApi(formData, formData.id),
  });

  const updateCandidateHistories = (data: any, id: string) => {
    data.candidate_id = candidateData.id;
    data.id = id;
    updateCandidateHistoriesMutation.mutate(data);
  };

  const createCandidateHistories = (data: any) => {
    data.candidate_id = candidateData.id;
    createCandidateHistoriesMutation.mutate(data);
  };

  const addFlow = async (data: any) => {
    setLoading(true);
    try {
      await otherApi.addCandidateFlows2(candidateData.id, data);

      // success
      // console.log(res.data);
      refetch();

      notification.success({
        message: "Update Candidate",
        description: "Update success.",
      });
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Candidate",
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

  const linkPDF =
    "https://lubrytics.com:8443/nadh-api-crm/api/export/candidates/" +
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
          "Candidate-" + id + "-" + dayjs().format("DDMMYY_HHmmss")
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
            <Link to={"/candidates"}>Candidates List</Link>
            <span>
              {" "}
              / {candidateData.candidate_id} -{" "}
              {candidateData.full_name.toUpperCase()}
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
          affix={false}
          offsetTop={200}
          direction="horizontal"
          items={anchorItems}
        />
      </div>
      <div className="flex w-full p-5">Detail {id}</div>
      <div className="px-8 my-5">
        <Form
          layout="vertical"
          className="w-full flex"
          onFinish={onFinish}
          onReset={() => {
            setResetAddress(true);
            form.resetFields();
            setTimeout(() => {
              setShowBtn(false);
            }, 500);
          }}
          form={form}
          onValuesChange={() => {
            setShowBtn(true);
            setResetAddress(false);
          }}
        >
          <div className="flex-col w-2/3 space-y-4 pb-12">
            <div className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Overview</p>
              <TextArea
                name="overview_text_new"
                label=""
                placeholder="Overview"
                defaultValue={candidateData.overview_text_new}
              />
            </div>

            <div id="information" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Personal Information</p>

              <PersonalInformationForm
                candidateData={candidateData}
                setAddress={setAddress}
                address={address}
                reset={resetAddress}
                setReset={setResetAddress}
              />
            </div>

            <div id="industry" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Skills And Industry</p>
              <SkillsAndIndustry
                updateFn={updateMutation.mutate}
                loading={loading}
                data={candidateData}
              />
            </div>

            <div id="education" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Education</p>
              <Academic
                data={candidateData?.histories}
                addFn={createCandidateHistories}
                deleteFn={(id) => deleteCandidateHistoriesMutation.mutate(id)}
                updateFn={(data, id) => updateCandidateHistories(data, id)}
              />
              <span className="p-1"></span>
              <Certificate
                data={candidateData?.histories}
                addFn={createCandidateHistories}
                deleteFn={(id) => deleteCandidateHistoriesMutation.mutate(id)}
                updateFn={(data, id) => updateCandidateHistories(data, id)}
              />
            </div>

            <div className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Certificate</p>
              <TextArea
                name="certificate_text"
                label=""
                placeholder="Certificate"
                defaultValue={candidateData.certificate_text}
              />
            </div>

            <div id="working" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Working History</p>
              <WorkingHistory
                data={candidateData?.histories}
                addFn={createCandidateHistories}
                deleteFn={(id) => deleteCandidateHistoriesMutation.mutate(id)}
                updateFn={(data, id) => updateCandidateHistories(data, id)}
              />
            </div>

            <div id="remuneration" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Remuneration And Rewards</p>

              <Remuneration
                data={candidateData?.remuneration}
                currency={currency}
                setCurrency={setCurrency}
                form={form}
                updateFn={updateMutation.mutate}
              />
            </div>

            <div id="attachments" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Attachments</p>
              <div className="flex space-x-2">
                <DataUpload
                  label=""
                  imgList={candidateImage}
                  onChange={fileUpload}
                  onDelete={fileDelete}
                  data={{
                    obj_table: "candidates",
                    obj_uid: candidateData.id,
                    uploadedByUserId: getUser().user_sent.user_id,
                  }}
                  loading={loading}
                />
              </div>
            </div>

            <div id="note" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Note</p>
              <div className="max-h-[400px] overflow-y-auto px-2">
                {candidateData?.notes.length > 0 ? (
                  candidateData?.notes.map((item: any) => (
                    <CommentItem
                      name={formatName(item.user.full_name) as string}
                      content={item.content}
                      date={
                        formatDate(
                          item.createdAt,
                          "ISOdate",
                          "date&hour"
                        ) as string
                      }
                      avtLink={
                        item.user.mediafiles.avatar &&
                        "https://lubrytics.com:8443/nadh-mediafile/file/" +
                          item.user.mediafiles.avatar
                      }
                      optionFn={() =>
                        updateMutation.mutate({
                          note_comments: candidateData?.notes
                            .map((item: any) => item.id)
                            .filter((note: string) => note !== item.id),
                        })
                      }
                      optionTitle="Remove from Note"
                    />
                  ))
                ) : (
                  <p className="text-gray-400">Can't find any note</p>
                )}
              </div>
            </div>
          </div>
          {showBtn && (
            <Form.Item className="fixed bottom-0 right-0 left-0 bg-gray-200 mb-0 z-40 flex justify-end py-3 px-8">
              <Button type="default" className="mr-3 bg-white" htmlType="reset">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          )}
          <div className="w-1/3 pl-5 fixed right-4">
            <div className="bg-white flex-col p-4 rounded-lg">
              <p className="mb-4 font-bold text-lg">Interview Loop</p>
              <InterviewLoop
                allData={candidateData}
                updateFn={(value: any, onSuccess?: () => void) =>
                  updateMutation.mutate(value, { onSuccess })
                }
                refetch={refetch}
                addCandidateFlow={addFlowMutation.mutate}
              />
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
