import { Descriptions } from "antd";
import { clientApi, userApi } from "apis/index";
import { formatDate, formatName } from "utils/format";
import EditableInputForm from "containers/Client/components/EditableInputForm";
import EditableSelectForm from "containers/Client/components/EditableSelectForm";
import {
  clientType,
  convertValuetoKey,
  primaryStatus2,
} from "_constants/index";
import EditableForm from "containers/Client/components/EditableAddressForm";
import { MyAvatar } from "components/DataEntry/MyAvatar";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "utils/getUser";

export default function JobInformation({
  data,
  updateMutation,
  editable,
  setEditable,
}: any) {
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

  const onFinish = (values: any) => {
    const data = {
      ...values,
    };
    updateMutation.mutate(data);
    console.log("Received values of form: ", data);
  };

  const onFinishSelect = (values: any, option?: string) => {
    if (option === "lead_consultants") {
      values = {
        lead_consultants: [values.lead_consultants],
      };
    }

    updateMutation.mutate(values);
    console.log("Received values of form: ", values);
  };

  const onFinishAddress = (values: any, option: string) => {
    const data = {
      ...(values.address && { address: values.address }),
      ...(values.country && { country: convertValuetoKey(values.country) }),
      ...(values.city && { city: convertValuetoKey(values.city) }),
      ...(values.district && {
        district: convertValuetoKey(values.district),
      }),
    };

    const transferData =
      option === "factory_site1"
        ? { factory_site: [data, data.factory_site[1]] }
        : option === "factory_site2"
        ? { factory_site: [data.factory_site[0], data] }
        : { address: data };
    // console.log("Received values of form: ", { [option]: [data] });
    updateMutation.mutate(transferData);
  };

  const avtUpload = (id: string) => {
    if (id) {
      const data = {
        mediafiles: {
          logo: id,
        },
      };

      updateMutation.mutate(data);
    }
  };

  return (
    <>
      <EditableInputForm
        editing={editable}
        setEditing={setEditable}
        name="name"
        key="name"
        label=""
        value={data.name}
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
              onSubmit={(data) => onFinishAddress(data, "address")}
              value={data.address}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Phone number">
            {/* <EditablePhoneForm
              editing={editable}
              setEditing={setEditable}
              name="phone"
              onSubmit={(data) => onFinishPhone(data, "phone")}
              value={data.phone}
            /> */}
          </Descriptions.Item>
          <Descriptions.Item label="Fax">
            {/* <EditablePhoneForm
              editing={editable}
              setEditing={setEditable}
              name="fax"
              onSubmit={(data) => onFinishPhone(data, "fax")}
              value={data.fax}
            /> */}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            <EditableInputForm
              editing={editable}
              setEditing={setEditable}
              name="email"
              key={"email"}
              label="Email"
              type="email"
              value={data.email}
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
              value={data.tax_code}
              onSubmit={onFinish}
            />
          </Descriptions.Item>
        </Descriptions>

        <div className="w-1/2">
          <MyAvatar
            editing={editable}
            img={
              data.mediafiles.logo
                ? "https://lubrytics.com:8443/nadh-mediafile/file/" +
                  data.mediafiles.logo
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
            {data.client_id}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <EditableSelectForm
              placeholder="Status"
              editing={editable}
              setEditing={setEditable}
              prevent
              name="status"
              option="tag"
              value={data.status.toString()}
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
              value={data.code}
              onSubmit={onFinish}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Parent Company">
            <EditableSelectForm
              placeholder="Parent Company"
              editing={editable}
              setEditing={setEditable}
              name="parent_id"
              value={data?.parent_company?.key}
              data={!companyIsPending ? companyData : []}
              onSubmit={(values) => onFinishSelect(values)}
            />
          </Descriptions.Item>
          {/* <Descriptions.Item label="Factory Site 1">
            <EditableForm
              editing={editable}
              setEditing={setEditable}
              name="factory_site"
              onSubmit={(data) => onFinishAddress(data, "factory_site1")}
              value={data.factory_site[0]}
            />
          </Descriptions.Item> */}
          {/* <Descriptions.Item label="Factory Site 2">
            <EditableForm
              editing={editable}
              setEditing={setEditable}
              name="factory_site"
              onSubmit={(data) => onFinishAddress(data, "factory_site2")}
              value={data.factory_site[1]}
            />
          </Descriptions.Item> */}
        </Descriptions>

        <Descriptions className="w-1/2" column={1}>
          <Descriptions.Item label="Client Type">
            <EditableSelectForm
              editing={editable}
              placeholder="Client Type"
              setEditing={setEditable}
              name="type"
              value={data.type.toString()}
              data={clientType}
              onSubmit={onFinishSelect}
            />
          </Descriptions.Item>
          <Descriptions.Item label="CPA">
            {/* <EditableSelectForm
              editing={editable}
              placeholder="CPA"
              setEditing={setEditable}
              name="cpa"
              value={data.cpa.toString()}
              data={cpa}
              onSubmit={onFinishSelect}
            /> */}
          </Descriptions.Item>
          <Descriptions.Item label="Lead Consultant">
            {/* <EditableSelectForm
              placeholder="Lead Consultant"
              editing={editable}
              setEditing={setEditable}
              name="lead_consultants"
              value={data.lead_consultants[0]?.id}
              data={!consultantIsPending ? consultantData : []}
              onSubmit={(values) => onFinishSelect(values, "lead_consultants")}
            /> */}
          </Descriptions.Item>
          <Descriptions.Item label="Search Consultant">-</Descriptions.Item>
          <Descriptions.Item label="Updated By">
            {formatName(data.creator.full_name)}
          </Descriptions.Item>
          <Descriptions.Item label="Updated On">
            {formatDate(data.updatedAt, "ISOdate", "date&hour")}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
}
