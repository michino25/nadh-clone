import { useParams, Link } from "react-router-dom";
import { Timeline, Anchor, Descriptions, Skeleton, notification } from "antd";

import Image from "components/DataDisplay/Image";
import BackToTopButton from "components/BackToTopButton";
import { clientApi, otherApi } from "apis/index";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import EditableInputForm from "./components/EditableInputForm";
import EditableSelectForm from "./components/EditableSelectForm";
import { clientType, cpa, primaryStatus2 } from "_constants/index";
import { formatDate, formatName } from "utils/format";
import FormIndustry from "./components/FormIndustry";
import IndustryTable from "components/DataDisplay/IndustryTable";
import { getUser } from "utils/getUser";
import { DataUpload } from "components/DataEntry/index";
import ActivityLogsTable from "./components/ActivityLogsTable";
import { v4 as uuidv4 } from "uuid";
import ContactPersonWrapper from "./components/ContactPersonWrapper";

const statusData: any = ["Create Client", "Tele Marketing", "Client Meeting"];

const anchorItems = [
  {
    key: "part-1",
    href: "#part-1",
    title: "Information",
  },
  {
    key: "part-2",
    href: "#part-2",
    title: "Industry & Contact Person & Account Development",
  },
  {
    key: "part-3",
    href: "#part-3",
    title: "Attachments",
  },
  {
    key: "part-4",
    href: "#part-4",
    title: "Activity Logs",
  },
];

export default function Clients() {
  const { id } = useParams();

  const {
    data: clientData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: async () =>
      await clientApi.getOneClient(id as string).then((res) => {
        return {
          ...res.data,
          business_line: res.data.business_line.map((item: any) => ({
            ...item,
            id: uuidv4(),
          })),
        };
      }),
  });

  const updateClient = async (data: any) => {
    try {
      await clientApi.updateClient(clientData.id, data);

      // success
      // console.log(res.data);
      refetch();

      notification.success({
        message: "Update Client",
        description: "Update success.",
      });
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Client",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const updateMutation = useMutation({
    mutationFn: (formData: any) => updateClient(formData),
  });

  const { data: clientImage, refetch: clientImageRefetch } = useQuery({
    queryKey: ["files", clientData?.id],
    queryFn: () =>
      otherApi.getFile(clientData?.id, "client").then((res) => {
        console.log(res.data.data);

        return res.data.data.map((item: any) => ({
          uid: item.id,
          name: item.name,
          status: "done",
          url: `https://lubrytics.com:8443/nadh-mediafile/file/${item.id}`,
          created_at: formatDate(item.created_at, "ISOdate", "date&hour"),
        }));
      }),
    enabled: !!clientData?.id,
  });

  console.log(clientImage);

  const fileUpload = (id: string) => {
    if (id) {
      const data = {
        mediafiles: {
          files: [id],
        },
      };

      updateMutation.mutate(data, {
        onSuccess: () => {
          clientImageRefetch();
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
            clientImageRefetch();
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

  const onFinish = (values: any) => {
    const data = {
      ...values,
    };
    updateMutation.mutate(data);
    console.log("Received values of form: ", data);
  };

  const onFinishSelect = (values: any) => {
    // const keys = Object.keys(values);

    // const data = {
    //   [keys[0]]: JSON.parse(values[keys[0]]),
    // };

    updateMutation.mutate(values);
    console.log("Received values of form: ", values);
  };

  const addIndustry = (data: any) => {
    const newData: any = {};
    if (data.industry) newData.industry_id = data.industry.value;
    if (data.sector) newData.sector_id = data.sector.value;
    if (data.category) newData.category_id = data.category.value;
    newData.primary = -1;

    const transformedData = clientData?.business_line.map((item: any) => {
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
    const transformedData = clientData?.business_line
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
    const transformedData = clientData?.business_line.map((item: any) => {
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

  if (isPending || !id) return <Skeleton active />;

  return (
    <>
      <BackToTopButton />
      <div className="fixed z-40 bg-gray-100 top-24 left-0 right-0 px-8 pb-2 pt-4">
        <div className="py-1">
          <Link to={"/candidates"}>Clients List</Link>
          <span>
            {" "}
            / {id} | {clientData.name}
          </span>
        </div>
        <Anchor className="" direction="horizontal" items={anchorItems} />
      </div>
      <div className="flex w-full p-5">Detail {id}</div>
      <div className="px-8 my-5">
        <div className="flex-col space-y-4">
          <div id="part-1" className="p-6 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">{clientData.name}</p>
            <div className="flex">
              <Descriptions className="w-1/2" column={1}>
                <Descriptions.Item label="Address">
                  {clientData.address.country?.label}
                </Descriptions.Item>
                <Descriptions.Item label="Phone number">
                  {clientData.phone.phone_code.extra.dial_code}{" "}
                  {clientData.phone.number}
                </Descriptions.Item>
                <Descriptions.Item label="Fax">
                  {clientData.fax.phone_code.extra.dial_code}{" "}
                  {clientData.fax.number}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  <EditableInputForm
                    name="email"
                    key={"email"}
                    label="Email"
                    value={clientData.email}
                    onSubmit={onFinish}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Tax Code">
                  <EditableInputForm
                    name="tax_code"
                    key={"tax_code"}
                    label="Tax Code"
                    value={clientData.tax_code}
                    onSubmit={onFinish}
                  />
                </Descriptions.Item>
              </Descriptions>

              <Image
                src={
                  "https://lubrytics.com:8443/nadh-mediafile/file/" +
                  clientData.mediafiles.logo
                }
                size={200}
              />
            </div>
            <div className="my-5 font-medium text-lg">Client Information</div>
            <div className="flex">
              <Descriptions className="w-1/2" column={1}>
                <Descriptions.Item label="Client ID">
                  {clientData.client_id}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <EditableSelectForm
                    name="status"
                    value={clientData.status.toString()}
                    data={primaryStatus2}
                    onSubmit={onFinishSelect}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Client's shortened name">
                  <EditableInputForm
                    name="code"
                    key={"code"}
                    label="Client's shortened name"
                    value={clientData.code}
                    onSubmit={onFinish}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Parent Company">
                  {clientData.parent_company?.label}
                </Descriptions.Item>
                <Descriptions.Item label="Factory Site 1">
                  {clientData.factory_site[0]?.district?.label} -{" "}
                  {clientData.factory_site[0]?.city?.label} -{" "}
                  {clientData.factory_site[0]?.country?.label}
                </Descriptions.Item>
                <Descriptions.Item label="Factory Site 2">-</Descriptions.Item>
              </Descriptions>

              <Descriptions className="w-1/2" column={1}>
                <Descriptions.Item label="Client Type">
                  <EditableSelectForm
                    name="type"
                    value={clientData.type.toString()}
                    data={clientType}
                    onSubmit={onFinishSelect}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="CPA">
                  <EditableSelectForm
                    name="cpa"
                    value={clientData.cpa.toString()}
                    data={cpa}
                    onSubmit={onFinishSelect}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Lead Consultant">
                  {formatName(clientData.lead_consultants[0]?.label)}
                </Descriptions.Item>
                <Descriptions.Item label="Search Consultant">
                  -
                </Descriptions.Item>
                <Descriptions.Item label="Updated By">
                  {formatName(clientData.creator.full_name)}
                </Descriptions.Item>
                <Descriptions.Item label="Updated On">
                  {formatDate(clientData.updatedAt, "ISOdate", "date&hour")}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>

          <div id="part-2" className="flex">
            <div className="w-2/3">
              <div className="bg-white rounded-lg p-6 mb-5">
                <p className="mb-4 font-bold text-lg">Industry</p>
                <FormIndustry saveData={addIndustry} />
                <IndustryTable
                  data={clientData?.business_line}
                  deleteItem={deleteIndustry}
                  primaryItem={primaryIndustry}
                />
              </div>
              <div className="bg-white rounded-lg p-6">
                <p className="mb-4 font-bold text-lg">Contact Person</p>{" "}
                <ContactPersonWrapper
                  data={clientData?.pic}
                  clientId={clientData.id}
                  refetch={refetch}
                />
              </div>
            </div>
            <div className="w-1/3 bg-white rounded-lg ml-5 p-6">
              <p className="mb-4 font-bold text-lg">Account Development</p>

              <Timeline
                items={clientData.account_development.process.map(
                  (flow: any) => ({
                    color: "green",
                    children: (
                      <>
                        <strong>{statusData[flow.current_status - 1]}</strong>
                        <p>
                          {formatDate(flow.createdAt, "ISOdate", "date&hour")}
                        </p>
                        <p>0 comments</p>
                      </>
                    ),
                  })
                )}
              />
            </div>
          </div>

          <div id="part-3" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Attachments</p>
            <div className="flex space-x-2">
              {clientImage?.length > 0 && (
                <DataUpload
                  label=""
                  imgList={clientImage}
                  onChange={fileUpload}
                  onDelete={fileDelete}
                  data={{
                    obj_table: "client",
                    obj_uid: clientData.id,
                    uploadedByUserId: getUser().user_sent.user_id,
                  }}
                />
              )}
            </div>
          </div>

          <div id="part-4" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Activity Logs</p>
            <div className="flex space-x-2">
              <ActivityLogsTable data={clientData.logs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
