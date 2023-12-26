import dayjs from "dayjs";
import { Descriptions } from "antd";
import { clientApi, otherApi, userApi } from "apis/index";
import { formatDate, formatName } from "utils/format";
import EditableAddressForm from "components/EditableForm/EditableAddressForm";
import EditableSelectForm from "components/EditableForm/EditableSelectForm";
import EditableInputNumberForm from "components/EditableForm/EditableInputNumberForm";
import {
  convertValuetoKey,
  experiences,
  statusData3,
  typeJob,
} from "_constants/index";
import { useQuery } from "@tanstack/react-query";
import EditableForm from "components/EditableForm/EditableDateForm";
import EditableMultiSelectForm from "components/EditableForm/EditableMultiSelectForm";

export default function JobInformation({
  data,
  updateMutation,
  editable,
  setEditable,
}: any) {
  const { data: clientData, isPending: clientIsPending } = useQuery({
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

  const { data: userData, isPending: userIsPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      await userApi.getUsers({ page: 1, getAll: true }).then((res) => {
        return res.data.data.map((item: any) => ({
          label: formatName(item.full_name),
          value: item.id,
        }));
      }),
  });

  const { data: positionData, isPending: positionIsPending } = useQuery({
    queryKey: ["position", "info"],
    queryFn: async () =>
      await otherApi.getProperty("position").then((res) =>
        res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key,
        }))
      ),
  });

  const { data: departmentData, isPending: departmentIsPending } = useQuery({
    queryKey: ["department", "info"],
    queryFn: async () =>
      await otherApi.getProperty("department").then((res) =>
        res.data.data.map((item: any) => ({
          label: item.label,
          value: item.key,
        }))
      ),
  });

  const { data: contactPersonsData, isPending: contactPersonsIsPending } =
    useQuery({
      queryKey: ["contact_persons", data.client_id],
      queryFn: async () =>
        await clientApi.getContactPersonsInClient(data.client_id).then((res) =>
          res.data.data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))
        ),
      enabled: !!data?.client_id,
    });

  console.log(contactPersonsData);

  const onFinish = (values: any) => {
    const data = {
      ...values,
    };
    updateMutation.mutate(data);
    console.log("Received values of form: ", data);
  };

  const onFinishDate = (values: any) => {
    const date = dayjs(values.extend_date.$d.toLocaleDateString()).format(
      "YYYY-MM-DD"
    );

    const data = {
      extend_date: date,
    };

    updateMutation.mutate(data);
    console.log("Received values of form: ", data);
  };

  const onFinishSelect = (values: any, option?: string) => {
    if (!option)
      values = {
        [Object.keys(values)[0]]: { key: values[Object.keys(values)[0]] },
      };

    if (option === "array")
      values = {
        [Object.keys(values)[0]]: [values[Object.keys(values)[0]]],
      };

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

    const transferData = { [option]: data };
    // console.log("Received values of form: ", { [option]: [data] });
    updateMutation.mutate(transferData);
  };

  return (
    <div className="flex">
      <Descriptions className="w-1/2" column={1}>
        <Descriptions.Item label="Job ID">{data.job_id}</Descriptions.Item>
        <Descriptions.Item label="Job Title">
          <EditableSelectForm
            placeholder="Job Title"
            editing={editable}
            setEditing={setEditable}
            name="title"
            value={data.title.key}
            data={!positionIsPending ? positionData : []}
            onSubmit={onFinishSelect}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Department">
          <EditableSelectForm
            placeholder="Department"
            editing={editable}
            setEditing={setEditable}
            name="department"
            value={data.department.key}
            data={!departmentIsPending ? departmentData : []}
            onSubmit={onFinishSelect}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Quantity">
          <EditableInputNumberForm
            editing={editable}
            setEditing={setEditable}
            name="quantity"
            key={"quantity"}
            label="Quantity"
            value={data.quantity}
            onSubmit={onFinish}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Job Type">
          <EditableSelectForm
            placeholder="Job Type"
            editing={editable}
            setEditing={setEditable}
            name="type"
            value={data.type.toString()}
            data={typeJob}
            onSubmit={(values) => onFinishSelect(values, "nokey")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Experience Level">
          <EditableSelectForm
            placeholder="Experience Level"
            editing={editable}
            setEditing={setEditable}
            name="experience_level"
            value={data.experience_level.toString()}
            data={experiences}
            onSubmit={(values) => onFinishSelect(values, "nokey")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Created By">
          {formatName(data.creator.full_name)}
        </Descriptions.Item>
        <Descriptions.Item label="Created On">
          {formatDate(data.createdAt, "ISOdate", "date&hour")}
        </Descriptions.Item>
        <Descriptions.Item label="Last Updated">
          {formatDate(data.updatedAt, "ISOdate", "date&hour")}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions className="w-1/2" column={1}>
        <Descriptions.Item label="Job Status">
          <EditableSelectForm
            placeholder="Job Status"
            editing={editable}
            setEditing={setEditable}
            name="status"
            option="tag"
            value={data.status.toString()}
            data={statusData3}
            onSubmit={(values) => onFinishSelect(values, "nokey")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Open Date">
          <EditableForm
            editing={true}
            setEditing={setEditable}
            name="target_date"
            value={data.target_date}
            onSubmit={onFinishSelect}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Expire Date">
          <EditableForm
            editing={true}
            setEditing={setEditable}
            name="end_date"
            value={data.end_date}
            onSubmit={onFinishSelect}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Extend Date">
          <EditableForm
            editing={editable}
            setEditing={setEditable}
            name="extend_date"
            value={data.extend_date}
            onSubmit={(value) => onFinishDate(value)}
          />
        </Descriptions.Item>

        <Descriptions.Item label="Address">
          <EditableAddressForm
            editing={editable}
            setEditing={setEditable}
            name="location"
            onSubmit={(data) => onFinishAddress(data, "location")}
            value={data.location}
            onlyCity
          />
        </Descriptions.Item>

        <Descriptions.Item label="Client's Name">
          <EditableSelectForm
            placeholder="Client's Name"
            editing={editable}
            setEditing={setEditable}
            name="client_id"
            value={data?.client_id}
            data={!clientIsPending ? clientData : []}
            onSubmit={(values) => onFinishSelect(values, "nokey")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Client's Contact Person">
          <EditableMultiSelectForm
            placeholder="Client's Contact Person"
            editing={editable}
            setEditing={setEditable}
            name="pic"
            value={data.pic}
            data={!contactPersonsIsPending ? contactPersonsData : []}
            onSubmit={(values) => onFinishSelect(values, "-")}
          />
        </Descriptions.Item>

        <Descriptions.Item label="Search Consultant">
          <EditableSelectForm
            placeholder="Search Consultant"
            editing={editable}
            setEditing={setEditable}
            name="recruiters"
            value={data.recruiters[0]?.id}
            data={!userIsPending ? userData : []}
            onSubmit={(values) => onFinishSelect(values, "array")}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Mapping by">
          <EditableMultiSelectForm
            placeholder="Mapping by"
            editing={editable}
            setEditing={setEditable}
            name="related_users"
            value={data.related_users}
            data={!userIsPending ? userData : []}
            onSubmit={(values) => onFinishSelect(values, "-")}
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
