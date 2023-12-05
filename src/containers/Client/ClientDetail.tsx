import { useParams, Link } from "react-router-dom";
import { Timeline, Anchor, Descriptions, Skeleton, notification } from "antd";

// import Table from "components/DataDisplay/Table";
import Image from "components/DataDisplay/Image";

import BackToTopButton from "components/BackToTopButton";
import { clientApi } from "apis/index";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import EditableInputForm from "./components/EditableInputForm";
import EditableSelectForm from "./components/EditableSelectForm";
import { clientType, cpa, primaryStatus2 } from "_constants/index";
import { formatDate, formatName } from "utils/format";
import FormIndustry from "./components/FormIndustry";
import { useState } from "react";
import ContactPerson from "./components/ContactPerson";

const statusData: any = ["Create Client", "Tele Marketing", "Client Meeting"];

export default function Candidates() {
  const { id } = useParams();
  const [value, setValue] = useState();
  const {
    data: clientData,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: async () =>
      await clientApi.getOneClient(id as string).then((res) => {
        setValue(res.data.business_line);
        return {
          ...res.data,
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

  if (isPending || !id) return <Skeleton active />;

  return (
    <>
      <BackToTopButton />
      <div className="fixed z-40 bg-gray-100 top-24 left-0 right-0 px-8 pb-2 pt-4">
        <Anchor
          className=""
          direction="horizontal"
          items={[
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
          ]}
        />
        <div className="py-1">
          <Link to={"/candidates"}>Clients List</Link>
          <span>
            {" "}
            / {id} | {clientData.name}
          </span>
        </div>
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
                    value={clientData.status}
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
                    value={clientData.type}
                    data={clientType}
                    onSubmit={onFinishSelect}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="CPA">
                  <EditableSelectForm
                    name="cpa"
                    value={clientData.cpa}
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
                  {formatDate(clientData.createdAt, "ISOdate", "date&hour")}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>

          <div id="part-2" className="flex">
            <div className="w-2/3">
              <div className="bg-white rounded-lg p-6 mb-5">
                <p className="mb-4 font-bold text-lg">Industry</p>
                <FormIndustry setValue={setValue} value={value} />
              </div>
              <div className="bg-white rounded-lg p-6">
                <p className="mb-4 font-bold text-lg">Contact Person</p>
                <ContactPerson setData={() => {}} data={clientData.pic} />
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
        </div>
      </div>
    </>
  );
}
