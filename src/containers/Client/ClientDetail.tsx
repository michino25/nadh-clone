import { useParams, Link } from "react-router-dom";
import { Anchor, Descriptions, Skeleton } from "antd";

// import Table from "components/DataDisplay/Table";
import Image from "components/DataDisplay/Image";

import BackToTopButton from "components/BackToTopButton";
import { clientApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";
import EditableForm from "components/EditableForm";

export default function Candidates() {
  const { id } = useParams();

  const { data: clientData, isPending } = useQuery({
    queryKey: ["client", id],
    queryFn: async () =>
      await clientApi.getOneClient(id as string).then((res) => {
        return {
          ...res.data,
        };
      }),
  });

  console.log(clientData);

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
            {
              key: "part-3",
              href: "#part-3",
              title: "Client Description",
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
                  {clientData.email}
                </Descriptions.Item>
                <Descriptions.Item label="Tax Code">
                  {clientData.tax_code}
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
                  {clientData.status}
                </Descriptions.Item>
                <Descriptions.Item label="Client's shortened name">
                  <EditableForm
                    value={clientData.code}
                    onSubmit={() => console.log(clientData.code)}
                  />
                  {/* {clientData.code} */}
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
                  {clientData.type}
                </Descriptions.Item>
                <Descriptions.Item label="CPA">
                  {clientData.cpa}
                </Descriptions.Item>
                <Descriptions.Item label="Lead Consultant">
                  {clientData.lead_consultants[0]?.label}
                </Descriptions.Item>
                <Descriptions.Item label="Search Consultant">
                  -
                </Descriptions.Item>
                <Descriptions.Item label="Updated By">
                  {clientData.creator.full_name}
                </Descriptions.Item>
                <Descriptions.Item label="Updated On">
                  {clientData.createdAt}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </div>
        <EditableForm value="hello" onSubmit={() => console.log("hello")} />
      </div>
    </>
  );
}
