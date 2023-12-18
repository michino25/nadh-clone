import { useParams, Link } from "react-router-dom";
import { Anchor, Button, Form, Skeleton, notification } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import IndustryTable from "components/DataDisplay/IndustryTable";

import { DataUpload, TextArea } from "components/DataEntry/index";

import BackToTopButton from "components/BackToTopButton";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

import InterviewLoop from "containers/Candidate/components/InterviewLoop";

import { candidateApi, otherApi } from "apis/index";
import { getUser } from "utils/getUser";
import FormIndustry from "containers/Client/components/FormIndustry";
import WorkingHistory from "./components/WorkingHistory";
import Academic from "./components/Academic";
import Certificate from "./components/Certificate";
import Remuneration from "./components/Remuneration";
import PersonalInformationForm from "./components/PersonalInformationForm";
import { formatDate } from "utils/format";

export default function Candidates() {
  const { id } = useParams();
  const [address, setAddress] = useState<any[]>();

  const addIndustry = (data: any) => {
    const newData: any = {};
    if (data.industry) newData.industry_id = data.industry.value;
    if (data.sector) newData.sector_id = data.sector.value;
    if (data.category) newData.category_id = data.category.value;
    newData.primary = -1;

    const transformedData = candidateData?.business_line.map((item: any) => {
      const transformedItem: any = {
        industry_id: item.industry.id,
        primary: item.primary,
      };

      if (item.sector) transformedItem.sector_id = item.sector.id;
      if (item.category) transformedItem.category_id = item.category.id;

      return transformedItem;
    });

    updateMutation.mutate({ business_line: [...transformedData, newData] });
  };

  const deleteIndustry = (id: string) => {
    const transformedData = candidateData?.business_line
      .filter((item: any) => item.id !== id)
      .map((item: any) => {
        const transformedItem: any = {
          industry_id: item.industry.id,
          primary: item.primary,
        };

        if (item.sector) transformedItem.sector_id = item.sector.id;
        if (item.category) transformedItem.category_id = item.category.id;

        return transformedItem;
      });

    updateMutation.mutate({ business_line: transformedData });
  };

  const primaryIndustry = (id: string) => {
    const transformedData = candidateData?.business_line.map((item: any) => {
      const transformedItem: any = {
        industry_id: item.industry.id,
        primary: item.id === id ? item.primary * -1 : item.primary,
      };

      if (item.sector) transformedItem.sector_id = item.sector.id;
      if (item.category) transformedItem.category_id = item.category.id;

      return transformedItem;
    });

    updateMutation.mutate({ business_line: transformedData });
  };

  const {
    data: candidateData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["candidate", id],
    queryFn: async () =>
      await candidateApi.getOneCandidate(id as string).then((res) => {
        // console.log(!res.data.addresses[0].city);
        return {
          ...res.data,
          // addresses: res.data.addresses.map((addressItem: any) => ({
          //   address: addressItem.address,
          //   country: addressItem.country
          //     ? addressItem.country.key + "_" + addressItem.country.label
          //     : null,
          //   city: addressItem.city
          //     ? addressItem.city.key + "_" + addressItem.city.label
          //     : null,
          //   district: addressItem.district
          //     ? addressItem.district.key + "_" + addressItem.district.label
          //     : null,
          // })),
          business_line: res.data.business_line.map((item: any) => ({
            ...item,
            id: uuidv4(),
          })),
        };
      }),
  });

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
    }
  };

  const updateMutation = useMutation({
    mutationFn: (formData: any) => updateCandidate(formData),
  });

  const onFinish = (values: any) => {
    const dob =
      values.birthday.year && values.birthday.month && values.birthday.day
        ? `${values.birthday.year}-${values.birthday.month}-${values.birthday.day}`
        : null;

    // console.log(values.addresses[0].country);

    const data = {
      ...values,
      addresses:
        address &&
        address.map((item) => ({
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
        })),

      dob: dob,
      gender: parseInt(values.gender),
      highest_education: {
        key: values.highest_education.split("_")[0],
        label: values.highest_education.split("_")[1],
      },
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
    };
    updateMutation.mutate(data);
    console.log("Received values of form: ", data);
    console.log(address);
  };

  const [showBtn, setShowBtn] = useState(false);
  const [showOverviewSave, setShowOverviewSave] = useState(false);
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    if (!firstRender)
      setTimeout(() => {
        setFirstRender(true);
      }, 1000);
    else setShowBtn(true);
  }, [address]);

  const onFinishOverview = (values: any) => {
    updateMutation.mutate(values);
    console.log("Received values of form: ", values);
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

  if (isPending || !id) return <Skeleton active />;

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
          <div>
            <Button
              href={
                "https://lubrytics.com:8443/nadh-api-crm/api/export/candidates/" +
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
          items={[
            {
              key: "part-1",
              href: "#part-1",
              title: "Personal Information",
            },
            {
              key: "part-2",
              href: "#part-2",
              title: "Skills and Industry",
            },
            {
              key: "part-3",
              href: "#part-3",
              title: "Education",
            },
            {
              key: "part-4",
              href: "#part-4",
              title: "Working History",
            },
            {
              key: "part-5",
              href: "#part-5",
              title: "Remuneration And Rewards",
            },
            {
              key: "part-6",
              href: "#part-6",
              title: "Attachments",
            },
          ]}
        />
      </div>
      <div className="flex w-full p-5">Detail {id}</div>
      <div className="px-8 my-5">
        <div className="flex">
          <div className="flex-col w-2/3 space-y-4">
            <div id="part-1" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Overview</p>
              <Form
                layout="vertical"
                className="w-full"
                onFinish={onFinishOverview}
                onValuesChange={() => setShowOverviewSave(true)}
              >
                <TextArea
                  name="overview_text_new"
                  label=""
                  placeholder="Overview"
                  defaultValue={candidateData.overview_text_new}
                />
                {showOverviewSave && (
                  <Form.Item className="flex justify-end space-x-2">
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </div>
            <div id="part-2" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Personal Information</p>

              <Form
                layout="vertical"
                className="w-full"
                onFinish={onFinish}
                onValuesChange={() => setShowBtn(true)}
              >
                <PersonalInformationForm
                  candidateData={candidateData}
                  setAddress={setAddress}
                  address={address}
                />

                {showBtn && (
                  <Form.Item className="fixed bottom-0 right-0 left-0 bg-gray-200 mb-0 z-40 flex justify-end space-x-2 py-3 px-8">
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </div>
            <div id="part-3" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Skills And Industry</p>
              <FormIndustry saveData={addIndustry} />
              <IndustryTable
                deleteItem={deleteIndustry}
                primaryItem={primaryIndustry}
                data={candidateData?.business_line}
              />
            </div>
            <div id="part-4" className="p-4 bg-white rounded-lg">
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
            <div id="part-5" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Working History</p>
              <WorkingHistory
                data={candidateData?.histories}
                addFn={createCandidateHistories}
                deleteFn={(id) => deleteCandidateHistoriesMutation.mutate(id)}
                updateFn={(data, id) => updateCandidateHistories(data, id)}
              />
            </div>
            <div id="part-6" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Remuneration And Rewards</p>
              <Remuneration
                data={candidateData?.remuneration}
                onSave={(data) => updateMutation.mutate(data)}
              />
            </div>
            <div id="part-7" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Attachments</p>
              <div className="flex space-x-2">
                {candidateImage?.length > 0 && (
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
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-1/3 pl-5">
            <div className="bg-white flex-col p-4 rounded-lg">
              <p className="mb-4 font-bold text-lg">Interview Loop</p>
              <InterviewLoop data={candidateData?.flows} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
