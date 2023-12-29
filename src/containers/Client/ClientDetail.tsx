import { useParams, Link } from "react-router-dom";
import { Anchor, Descriptions, Skeleton, notification } from "antd";

import BackToTopButton from "components/ShareComponents/BackToTopButton";
import { clientApi, otherApi, userApi } from "apis/index";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  clientType,
  convertValuetoKey,
  cpa,
  getSelectByValue,
  primaryStatus2,
} from "_constants/index";
import { formatDate, formatName } from "utils/format";
import FormIndustry from "./components/FormIndustry";
import IndustryTable from "components/DataDisplay/IndustryTable";
import { getUser } from "utils/getUser";
import { DataUpload } from "components/DataEntry/index";
import ActivityLogsTable from "./components/ActivityLogsTable";
import { v4 as uuidv4 } from "uuid";
import ContactPersonWrapper from "./components/ContactPersonWrapper";
import EditablePhoneForm from "components/EditableForm/EditablePhoneForm";
import EditableForm from "components/EditableForm/EditableAddressForm";
import EditableInputForm from "components/EditableForm/EditableInputForm";
import EditableSelectForm from "components/EditableForm/EditableSelectForm";
import { useEffect, useState } from "react";
import Notes from "./components/Notes";
import { MyAvatar } from "components/DataEntry/MyAvatar";
import AccountDevelopment from "./components/AccountDevelopment";
import RelatedJob from "./components/RelatedJob";
import ClientDescription from "./components/ClientDescription";

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
    title: "Notes",
  },
  {
    key: "part-4",
    href: "#part-4",
    title: "Related Job Codes",
  },
  {
    key: "part-5",
    href: "#part-5",
    title: "Attachments",
  },
  {
    key: "part-6",
    href: "#part-6",
    title: "Activity Logs",
  },
];

export default function Clients() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

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

  const { data: accountDevelopmentsData, refetch: accountDevelopmentRefetch } =
    useQuery({
      queryKey: ["accountDevelopments", clientData?.id_int],
      queryFn: async () =>
        await otherApi
          .getAccountDevelopments(clientData?.id_int as string)
          .then((res) => {
            return res.data;
          }),
      enabled: !!clientData,
    });

  const { data: companyData, isPending: companyIsPending } = useQuery({
    queryKey: ["company"],
    queryFn: async () =>
      await clientApi
        .getClients({
          getAll: true,
        })
        .then((res) => {
          return res.data.data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }));
        }),
  });

  const { data: consultantData, isPending: consultantIsPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      await userApi.getUsers({ page: 1, getAll: true }).then((res) => {
        return res.data.data.map((item: any) => ({
          label: formatName(item.full_name),
          value: item.id,
        }));
      }),
  });

  const [editable, setEditable] = useState(false);
  useEffect(() => {
    if (clientData?.status) {
      setEditable(clientData?.status === 12);
    }
  }, [clientData?.status]);

  const updateClient = async (data: any) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (formData: any) => updateClient(formData),
  });

  const { data: clientImage, refetch: clientImageRefetch } = useQuery({
    queryKey: ["files", clientData?.id],
    queryFn: () =>
      otherApi.getFile(clientData?.id, "client").then((res) => {
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

  const avtUpload = (id: string) => {
    if (id) {
      const data = {
        mediafiles: {
          logo: id,
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

  const onFinish = (values: any, onSuccess: () => void) => {
    const data = {
      ...values,
    };
    updateMutation.mutate(data, { onSuccess });
    console.log("Received values of form: ", data);
  };

  const onFinishSelect = (
    values: any,
    onSuccess: () => void,
    option?: string
  ) => {
    if (option === "lead_consultants") {
      values = {
        lead_consultants: [values.lead_consultants],
      };
    }

    updateMutation.mutate(values, { onSuccess });
    console.log("Received values of form: ", values);
  };

  const { data: countries } = useQuery({
    queryKey: ["countries", "phonekey"],
    queryFn: async () =>
      await otherApi.getCountries().then((res) => res.data.data),
  });

  const onFinishPhone = (
    values: any,
    onSuccess: () => void,
    option: string
  ) => {
    const countryCode = values[option].phone_code.extra.dial_code;

    const countryInfo = countries.find(
      (country: any) => country.extra.dial_code === countryCode
    );

    if (countryInfo) {
      const data = {
        [option]: {
          number: parseInt(values[option].number),
          phone_code: {
            key: countryInfo.key.toString(),
          },
        },
      };
      // console.log("Received values of form: ", data);
      updateMutation.mutate(data, { onSuccess });
    }
  };

  const onFinishAddress = (
    values: any,
    onSuccess: () => void,
    option: string
  ) => {
    const data = {
      ...(values.address && { address: values.address }),
      ...(values.country && { country: convertValuetoKey(values.country) }),
      ...(values.city && { city: convertValuetoKey(values.city) }),
      ...(values.district && { district: convertValuetoKey(values.district) }),
    };

    const transferData =
      option === "factory_site1"
        ? {
            factory_site: [
              ...(data && Object.keys(data).length > 0 ? [data] : []),
              ...(clientData.factory_site[1]
                ? [clientData.factory_site[1]]
                : []),
            ],
          }
        : option === "factory_site2"
        ? {
            factory_site: [
              ...(clientData.factory_site[0]
                ? [clientData.factory_site[0]]
                : []),
              ...(data && Object.keys(data).length > 0 ? [data] : []),
            ],
          }
        : { address: data };
    // console.log("Received values of form: ", { [option]: [data] });
    updateMutation.mutate(transferData, { onSuccess });
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
            <EditableInputForm
              editing={editable}
              setEditing={setEditable}
              name="name"
              key="name"
              label=""
              value={clientData.name}
              onSubmit={onFinish}
              className="mb-4 font-bold text-lg"
            />

            <div className="flex">
              <Descriptions className="w-1/2" column={1}>
                <Descriptions.Item label="Address">
                  <EditableForm
                    editing={editable}
                    setEditing={setEditable}
                    name="address"
                    onSubmit={(data, onSuccess) =>
                      onFinishAddress(data, onSuccess, "address")
                    }
                    value={clientData.address}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Phone number">
                  <EditablePhoneForm
                    editing={editable}
                    setEditing={setEditable}
                    name="phone"
                    onSubmit={(data, onSuccess) =>
                      onFinishPhone(data, onSuccess, "phone")
                    }
                    value={clientData.phone}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Fax">
                  <EditablePhoneForm
                    editing={editable}
                    setEditing={setEditable}
                    name="fax"
                    onSubmit={(data, onSuccess) =>
                      onFinishPhone(data, onSuccess, "fax")
                    }
                    value={clientData.fax}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  <EditableInputForm
                    editing={editable}
                    setEditing={setEditable}
                    name="email"
                    key={"email"}
                    label="Email"
                    type="email"
                    value={clientData.email}
                    onSubmit={onFinish}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Tax Code">
                  <EditableInputForm
                    editing={true}
                    setEditing={setEditable}
                    name="tax_code"
                    key={"tax_code"}
                    label="Tax Code"
                    value={clientData.tax_code}
                    onSubmit={onFinish}
                  />
                </Descriptions.Item>
              </Descriptions>

              <div className="w-1/2">
                <MyAvatar
                  editing={editable}
                  img={
                    clientData.mediafiles.logo
                      ? "https://lubrytics.com:8443/nadh-mediafile/file/" +
                        clientData.mediafiles.logo
                      : ""
                  }
                  data={{
                    type: "avatar",
                    uploadedByUserId: getUser().user_sent.user_id,
                  }}
                  onChange={avtUpload}
                />
              </div>
            </div>
            <div className="my-5 font-medium text-lg">Client Information</div>
            <div className="flex">
              <Descriptions className="w-1/2" column={1}>
                <Descriptions.Item label="Client ID">
                  {clientData.client_id}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <EditableSelectForm
                    placeholder="Status"
                    editing={editable}
                    setEditing={setEditable}
                    prevent={clientData.status !== "12"}
                    name="status"
                    option="tag"
                    value={getSelectByValue(
                      primaryStatus2,
                      clientData.status.toString()
                    )}
                    data={primaryStatus2}
                    onSubmit={onFinishSelect}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Client's shortened name">
                  <EditableInputForm
                    editing={editable}
                    setEditing={setEditable}
                    name="code"
                    key={"code"}
                    label="Client's shortened name"
                    value={clientData.code}
                    onSubmit={onFinish}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Parent Company">
                  <EditableSelectForm
                    placeholder="Parent Company"
                    editing={editable}
                    setEditing={setEditable}
                    name="parent_id"
                    value={
                      clientData?.parent_company
                        ? {
                            value: clientData?.parent_company?.key,
                            label: clientData?.parent_company?.label,
                          }
                        : {}
                    }
                    data={!companyIsPending ? companyData : []}
                    onSubmit={(values, onSuccess) =>
                      onFinishSelect(values, onSuccess)
                    }
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Factory Site 1">
                  <EditableForm
                    editing={editable}
                    setEditing={setEditable}
                    name="factory_site"
                    onSubmit={(data, onSuccess) =>
                      onFinishAddress(data, onSuccess, "factory_site1")
                    }
                    value={clientData.factory_site[0]}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Factory Site 2">
                  <EditableForm
                    editing={editable}
                    setEditing={setEditable}
                    name="factory_site"
                    onSubmit={(data, onSuccess) =>
                      onFinishAddress(data, onSuccess, "factory_site2")
                    }
                    value={clientData.factory_site[1]}
                  />
                </Descriptions.Item>
              </Descriptions>

              <Descriptions className="w-1/2" column={1}>
                <Descriptions.Item label="Client Type">
                  <EditableSelectForm
                    editing={editable}
                    placeholder="Client Type"
                    setEditing={setEditable}
                    name="type"
                    value={getSelectByValue(
                      clientType,
                      clientData.type.toString()
                    )}
                    data={clientType}
                    onSubmit={onFinishSelect}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="CPA">
                  <EditableSelectForm
                    editing={editable}
                    placeholder="CPA"
                    setEditing={setEditable}
                    name="cpa"
                    value={getSelectByValue(cpa, clientData.cpa.toString())}
                    data={cpa}
                    onSubmit={onFinishSelect}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Lead Consultant">
                  <EditableSelectForm
                    placeholder="Lead Consultant"
                    editing={editable}
                    setEditing={setEditable}
                    name="lead_consultants"
                    value={
                      clientData.lead_consultants[0]
                        ? {
                            value: clientData?.lead_consultants[0]?.key,
                            label: formatName(
                              clientData?.lead_consultants[0]?.label
                            ),
                          }
                        : {}
                    }
                    data={!consultantIsPending ? consultantData : []}
                    onSubmit={(values, onSuccess) =>
                      onFinishSelect(values, onSuccess, "lead_consultants")
                    }
                  />
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
                  loading={loading}
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
              <div className="max-h-[630px] h-full overflow-y-auto">
                <AccountDevelopment
                  data={accountDevelopmentsData}
                  refetch={accountDevelopmentRefetch}
                />
              </div>
            </div>
          </div>

          <div id="part-3" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Client Description</p>
            <ClientDescription
              data={clientData}
              updateFn={(value: any, onSuccess: () => void) =>
                updateMutation.mutate(value, { onSuccess })
              }
            />
          </div>

          <div id="part-3" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Notes</p>
            <Notes
              data={clientData.detail_comments}
              clientID={clientData.id}
              refetch={refetch}
            />
          </div>

          <div id="part-4" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Related Job Codes</p>
            <div className="flex space-x-2">
              <RelatedJob
                data={clientData.jobs}
                clientId={clientData.id}
                refetch={refetch}
              />
            </div>
          </div>

          <div id="part-5" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Attachments</p>
            <div className="flex space-x-2">
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
            </div>
          </div>

          <div id="part-6" className="p-4 bg-white rounded-lg">
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
