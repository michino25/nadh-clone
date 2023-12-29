import EditablePhoneForm from "components/EditableForm/EditablePhoneForm";
import EditableForm from "components/EditableForm/EditableAddressForm";
import EditableInputForm from "components/EditableForm/EditableInputForm";
import EditableSelectForm from "components/EditableForm/EditableSelectForm";
import { MyAvatar } from "components/DataEntry/MyAvatar";
import { Descriptions } from "antd";
import { useQuery } from "@tanstack/react-query";
import {
  convertValuetoKey,
  clientType,
  cpa,
  getSelectByValue,
  primaryStatus2,
} from "_constants/index";
import { clientApi, otherApi, userApi } from "apis/index";
import { formatDate, formatName } from "utils/format";
import { getUser } from "utils/getUser";

export default function ClientInformation({
  clientData,
  editable,
  setEditable,
  updateFn,
  clientImageRefetch,
}: {
  clientData: any;
  editable: boolean;
  setEditable: (value: boolean) => void;
  updateFn: (data: any, event: any) => void;
  clientImageRefetch: () => void;
}) {
  const { data: countries } = useQuery({
    queryKey: ["countries", "phonekey"],
    queryFn: async () =>
      await otherApi.getCountries().then((res) => res.data.data),
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
  const onFinish = (values: any, onSuccess: () => void) => {
    const data = {
      ...values,
    };
    updateFn(data, { onSuccess });
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

    updateFn(values, { onSuccess });
    console.log("Received values of form: ", values);
  };

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
      updateFn(data, { onSuccess });
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
      ...(values.district && {
        district: convertValuetoKey(values.district),
      }),
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
    updateFn(transferData, { onSuccess });
  };

  const avtUpload = (id: string) => {
    if (id) {
      const data = {
        mediafiles: {
          logo: id,
        },
      };

      updateFn(data, {
        onSuccess: () => {
          clientImageRefetch();
        },
      });
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
      <div className="font-bold text-lg my-5">Client Information</div>
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
              value={getSelectByValue(clientType, clientData.type.toString())}
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
                      label: formatName(clientData?.lead_consultants[0]?.label),
                    }
                  : {}
              }
              data={!consultantIsPending ? consultantData : []}
              onSubmit={(values, onSuccess) =>
                onFinishSelect(values, onSuccess, "lead_consultants")
              }
            />
          </Descriptions.Item>
          <Descriptions.Item label="Search Consultant">-</Descriptions.Item>
          <Descriptions.Item label="Updated By">
            {formatName(clientData.creator.full_name)}
          </Descriptions.Item>
          <Descriptions.Item label="Updated On">
            {formatDate(clientData.updatedAt, "ISOdate", "date&hour")}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
}
