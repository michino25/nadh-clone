import { getLabelByValue, statusData4 } from "_constants/index";
import {
  Timeline,
  Modal,
  Row,
  Col,
  Form,
  Select,
  DatePicker,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { formatDate, formatName } from "utils/format";
import { ExclamationCircleFilled } from "@ant-design/icons";
import CkeditorData from "components/DataEntry/CkeditorData";
import CommentItem from "components/ShareComponents/CommentItem";
import dayjs from "dayjs";
import { otherApi, userApi } from "apis/index";

export default function AccountDevelopment({
  data,
  refetch,
}: {
  data: any;
  refetch: () => void;
}) {
  const [formAction] = Form.useForm();
  const [formDate] = Form.useForm();
  const [formUser] = Form.useForm();

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentFlowItem, setCurrentFlowItem] = useState<any>();
  const [flowItemData, setFlowItemData] = useState<any>();

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: async () =>
      userApi.getUsers({}).then((res) =>
        res.data.data.map((item: any) => ({
          value: item.id,
          label: formatName(item.full_name),
        }))
      ),
  });

  const updateFlow = async (formData: any) => {
    try {
      await otherApi.updateAccountDevelopments(
        data.id,
        formData.params,
        formData.option
      );

      // success
      // console.log(res.data);
      refetch();

      notification.success({
        message: "Update Flow",
        description: "Update success.",
      });
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Flow",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const updateFlowMutation = useMutation({
    mutationFn: (formData: any) => updateFlow(formData),
  });

  const createCmt = async (data: any) => {
    try {
      await otherApi.createComment(data);

      // success
      // console.log(res.data);
      refetch();

      notification.success({
        message: "Add Comment",
        description: "Add success.",
      });
    } catch (error: any) {
      // error
      // console.error("Add failed", error);
      notification.error({
        message: "Add Comment",
        description: `Add failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const createCmtMutation = useMutation({
    mutationFn: (formData: any) => createCmt(formData),
  });

  useEffect(() => {
    setFlowItemData(
      data?.process?.length &&
        data.process.find((item: any) => item.id === currentFlowItem)
    );
  }, [currentFlowItem, data]);

  console.log(data);

  const showConfirm = (
    title: string,
    content: string,
    onOk: () => void,
    onCancel: () => void
  ) => {
    Modal.confirm({
      title,
      icon: <ExclamationCircleFilled />,
      content,
      onOk,
      onCancel,
    });
  };

  const showDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const handleDetailCancel = () => {
    setIsDetailModalOpen(false);
  };

  const handleDetailOk = () => {
    setIsDetailModalOpen(false);
  };

  return (
    <>
      <Timeline
        items={data?.process?.map((flow: any) => ({
          color: "green",
          children: (
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurrentFlowItem(flow.id);
                showDetailModal();
              }}
              className="text-left"
            >
              <strong>
                {getLabelByValue(statusData4, flow.current_status.toString())}
              </strong>
              <p>{formatDate(flow.createdAt, "ISOdate", "date&hour")}</p>
              <p>{flow.comments.length} comments</p>
            </button>
          ),
        }))}
      />

      <Modal
        title={
          flowItemData?.current_status &&
          getLabelByValue(
            statusData4,
            flowItemData?.current_status.toString()
          ) +
            " - " +
            formatDate(flowItemData?.createdAt, "ISOdate", "date&hour")
        }
        open={isDetailModalOpen}
        width={800}
        destroyOnClose
        footer={null}
        onOk={handleDetailOk}
        onCancel={handleDetailCancel}
      >
        <Row gutter={16}>
          <Col span={12}>
            <div className="flex-col mt-1">
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                preserve={false}
                layout="horizontal"
                form={formAction}
              >
                <Form.Item label="Action" className="mb-2" name="status">
                  <Select
                    onChange={() => {
                      showConfirm(
                        `Change this candidate status into ${getLabelByValue(
                          statusData4,
                          formAction.getFieldsValue().status
                        )} ?`,
                        "",
                        () =>
                          updateFlowMutation.mutate(
                            {
                              params: {
                                status: parseInt(
                                  formAction.getFieldsValue().status
                                ),
                              },
                              option: "status",
                            },
                            { onSuccess: () => formAction.resetFields() }
                          ),
                        () => formAction.resetFields()
                      );
                    }}
                    placeholder="Select flow startus"
                    options={statusData4.map((item) => ({
                      ...item,
                      disabled: item.value === "1",
                    }))}
                  />
                </Form.Item>
              </Form>

              {flowItemData?.current_status !== 1 && (
                <Form
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  layout="horizontal"
                  preserve={false}
                  form={formDate}
                >
                  <Form.Item
                    name="time"
                    label="Date"
                    rules={[
                      {
                        type: "object" as const,
                        message: "Please select time!",
                      },
                    ]}
                    className="mb-2"
                    initialValue={
                      flowItemData?.info?.time && dayjs(flowItemData?.info.time)
                    }
                  >
                    <DatePicker
                      onChange={() => {
                        console.log(formDate.getFieldsValue());
                        showConfirm(
                          `Pick ${dayjs(formDate.getFieldsValue().time).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )} into Date ?`,
                          "",
                          () =>
                            updateFlowMutation.mutate({
                              params: {
                                process: {
                                  id: flowItemData.id,
                                  time: dayjs(
                                    formDate.getFieldsValue().time
                                  ).format("YYYY-MM-DD HH:mm:ss"),
                                },
                              },
                            }),
                          () => formDate.resetFields()
                        );
                      }}
                      showTime
                      format="DD-MM-YYYY HH:mm:ss"
                      className="w-full"
                    />
                  </Form.Item>
                </Form>
              )}

              {flowItemData?.current_status !== 1 &&
                flowItemData?.current_status !== 6 &&
                flowItemData?.current_status !== 7 && (
                  <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    preserve={false}
                    layout="horizontal"
                    form={formUser}
                  >
                    <Form.Item
                      name="internal"
                      label="Internal User"
                      className="mb-2"
                      initialValue={flowItemData?.info?.internal}
                    >
                      <Select
                        onChange={() =>
                          updateFlowMutation.mutate({
                            params: {
                              process: {
                                id: flowItemData.id,
                                ...formUser.getFieldsValue(),
                              },
                            },
                          })
                        }
                        mode="multiple"
                        placeholder="Select user"
                        options={userData}
                      />
                    </Form.Item>
                  </Form>
                )}
            </div>
          </Col>

          <Col span={12}>
            <CkeditorData
              data={data?.expectation}
              label="Comments"
              updateFn={(value: string, onSuccess: () => void) =>
                createCmtMutation.mutate(
                  {
                    content: value,
                    source: {
                      module: "client_account_development",
                      section: "process",
                      id: flowItemData.id,
                    },
                    source_uuid: data.id,
                  },
                  { onSuccess }
                )
              }
              resetSuccess
            />

            <p className="pb-2">{flowItemData?.comments?.length} comments</p>
            {flowItemData?.comments?.length > 0 &&
              flowItemData?.comments?.map((item: any) => (
                <div key={item.createdAt}>
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
                  />
                </div>
              ))}
          </Col>
        </Row>
      </Modal>
    </>
  );
}
