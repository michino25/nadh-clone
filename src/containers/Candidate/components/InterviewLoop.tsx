import {
  getIndustryString,
  getLabelByValue,
  getStatusDataByKey,
  statusData2,
  statusData3,
} from "_constants/index";
import dayjs from "dayjs";
import {
  Button,
  Timeline,
  Collapse,
  Dropdown,
  Modal,
  Form,
  Row,
  Col,
  DatePicker,
  Select,
  notification,
  Descriptions,
} from "antd";
import type { CollapseProps } from "antd";
import { formatDate, formatName } from "utils/format";
import {
  MoreOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { jobApi, otherApi, userApi } from "apis/index";
import CompareTable from "./CompareTable";
import CommentItem from "components/ShareComponents/CommentItem";
import CkeditorData from "components/DataEntry/CkeditorData";

export default function InterviewLoop({
  allData,
  updateFn,
  refetch,
  addCandidateFlow,
}: {
  allData: any;
  updateFn: (value: any, onSuccess?: () => void) => void;
  refetch: () => void;
  addCandidateFlow: (data: any, option?: any) => void;
}) {
  const data = allData?.flows;
  const currentNote = allData.notes.map((item: any) => item.id);
  console.log(data);

  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [jobCode, setJobCode] = useState("");
  const [jobID, setJobID] = useState("");
  const [jobName, setJobName] = useState("");

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentFlow, setCurrentFlow] = useState<any>();
  const [currentFlowItem, setCurrentFlowItem] = useState<any>();

  const [flowData, setFlowData] = useState<any>();
  const [flowItemData, setFlowItemData] = useState<any>();

  const [formAction] = Form.useForm();
  const [formDate] = Form.useForm();
  const [formConsultant] = Form.useForm();

  useEffect(() => {
    setFlowData(data.find((item: any) => item.id === currentFlow));
  }, [currentFlow, data]);

  useEffect(() => {
    setFlowItemData(
      flowData &&
        flowData?.flow.find((item: any) => item.id === currentFlowItem)
    );
  }, [currentFlowItem, flowData]);

  console.log(currentFlow);
  console.log(currentFlowItem);

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: async () =>
      userApi.getUsers({}).then((res) =>
        res.data.data.map((item: any) => ({
          value: item.user_id,
          label: formatName(item.full_name),
        }))
      ),
  });
  const { data: compareData } = useQuery({
    queryKey: ["compare", allData.id, jobID],
    queryFn: async () =>
      await otherApi.getCompare(allData.id, jobID).then((res) => {
        // console.log(!res.data.addresses[0].city);
        return res.data;
      }),
    enabled: !!jobID,
  });

  const createNote = async (data: any) => {
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

  const createMutation = useMutation({
    mutationFn: (formData: any) => createNote(formData),
  });

  const updateFlow = async (data: any) => {
    try {
      await otherApi.updateCandidateFlows(
        currentFlow,
        data.params,
        data.option
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

  const showCompareModal = () => {
    setIsCompareModalOpen(true);
  };

  const handleCompareCancel = () => {
    setIsCompareModalOpen(false);
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

  const itemsMenu: MenuProps["items"] = [
    {
      label: <button onClick={showCompareModal}>Candidate Assessment</button>,
      key: "0",
    },
  ];

  const genExtra = (job: any) => (
    <Row onClick={(event) => event.stopPropagation()}>
      <Col>
        <Dropdown menu={{ items: itemsMenu }} trigger={["click"]}>
          <MoreOutlined
            className="hover:bg-gray-400/10 rounded-lg p-2"
            onClick={(e) => {
              e.preventDefault();
              setJobID(job.id);
              setJobCode(job.job_id);
              setJobName(job.title.label);
            }}
          />
        </Dropdown>
      </Col>
    </Row>
  );

  const items: CollapseProps["items"] = data.map(
    (item: any, index: number) => ({
      key: index.toString(),
      label: (
        <div>
          <strong>
            {item.job.job_id} - {item.job.title.label}
          </strong>
          <p>
            {item.job.client.name} - {item.job.client.client_id}
          </p>
        </div>
      ),
      children: (
        <Timeline
          items={item.flow.map((flow: any) => ({
            color: "green",
            children: (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentFlow(item.id);
                  setCurrentFlowItem(flow.id);
                  showDetailModal();
                }}
                className="text-left"
              >
                <strong>{getStatusDataByKey(flow.current_status)}</strong>
                <p>{formatDate(flow.createdAt, "ISOdate", "date&hour")}</p>
                <p>{flow.comments.length} comments</p>
              </button>
            ),
          }))}
        />
      ),
      extra: genExtra(item.job),
    })
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState<any[]>();

  useQuery({
    queryKey: ["job", searchValue],
    queryFn: async () =>
      await jobApi
        .getJobs(
          searchValue
            ? {
                advance_search: searchValue,
              }
            : {
                page: 1,
                perPage: 20,
              }
        )
        .then((res) => {
          // setSearchData(res.data.data);
          setSearchData(
            res.data.data.length &&
              res.data.data.map((item: any) => ({
                label: (
                  <>
                    <p className="font-bold">
                      {item.job_id} - {item.title.label} - {item.target_date}
                    </p>
                    <p>
                      <span className="font-bold">Client Name: </span>
                      {item.client.code}
                    </p>
                    <p>
                      <span className="font-bold">Industry: </span>
                      {item.business_line.map((item: any) => (
                        <p>{getIndustryString(item)}</p>
                      ))}
                    </p>
                  </>
                ),
                value: item.id,
              }))
          );
        }),
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    addCandidateFlow(selectedItems, {
      onSuccess: () => setSelectedItems([]),
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedItems([]);
  };

  console.log(flowData);
  console.log(flowItemData);

  return (
    <>
      <Button onClick={showModal} className="flex items-center mb-4">
        <PlusOutlined />
        Pick Job
      </Button>

      <Collapse accordion items={items} />

      <Modal
        title="Candidate Assessment"
        open={isCompareModalOpen}
        width={1000}
        footer={null}
        onCancel={handleCompareCancel}
      >
        <CompareTable
          dataCompare={compareData}
          candidateName={formatName(allData.full_name) as string}
          candidateId={allData.code}
          jobName={jobName}
          jobId={jobCode}
        />
      </Modal>

      <Modal
        title={
          flowItemData?.current_status &&
          getStatusDataByKey(flowItemData?.current_status) +
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
            <div className="flex-col">
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
              >
                <Form.Item label="Creator" className="mb-2">
                  {flowItemData?.creator?.full_name +
                    " - " +
                    flowItemData?.creator.role.name}
                </Form.Item>
                <Form.Item label="Job" className="mb-2">
                  {flowData?.job.title.label}
                </Form.Item>
                <Form.Item label="Job-code" className="mb-2">
                  {flowData?.job.job_id}
                </Form.Item>
                <Form.Item label="Job status" className="mb-2">
                  {getLabelByValue(
                    statusData3,
                    flowData?.job.status.toString()
                  )}
                </Form.Item>
              </Form>

              {flowData?.flow[0]?.id === flowItemData?.id && (
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  preserve={false}
                  layout="horizontal"
                  form={formAction}
                >
                  <Form.Item label="Action" className="mb-2" name="status">
                    <Select
                      onChange={() => {
                        console.log(formAction.getFieldsValue());
                        showConfirm(
                          `Change this candidate status into ${getLabelByValue(
                            statusData2,
                            formAction.getFieldsValue().status
                          )} ?`,
                          "",
                          () =>
                            updateFlowMutation.mutate({
                              params: formAction.getFieldsValue(),
                              option: "status",
                            }),
                          () => formAction.resetFields()
                        );
                      }}
                      placeholder="Select flow startus"
                      options={statusData2.map((item) =>
                        flowItemData?.current_status < parseInt(item.value)
                          ? item
                          : {
                              ...item,
                              disabled: true,
                            }
                      )}
                    />
                  </Form.Item>
                </Form>
              )}

              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
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
                              flow: {
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

              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                preserve={false}
                layout="horizontal"
                form={formConsultant}
              >
                <Form.Item
                  name="interviewer"
                  label="Consultant"
                  className="mb-2"
                  initialValue={flowItemData?.info?.interviewer.map(
                    (item: any) => item.user_id
                  )}
                >
                  <Select
                    onChange={() =>
                      updateFlowMutation.mutate({
                        params: {
                          flow: {
                            id: flowItemData.id,
                            interviewer:
                              formConsultant.getFieldsValue().interviewer,
                          },
                        },
                      })
                    }
                    mode="multiple"
                    placeholder="Select interviewer"
                    options={userData}
                  />
                </Form.Item>
              </Form>
            </div>
          </Col>

          <Col span={12}>
            <CkeditorData
              data={data?.expectation}
              label="Comments"
              updateFn={(value: string, onSuccess: () => void) =>
                createMutation.mutate(
                  {
                    content: value,
                    source: {
                      module: "candidate_flow",
                      section: "flow_status",
                      id: flowItemData.id,
                    },
                    source_uuid: flowData.id,
                  },
                  { onSuccess }
                )
              }
              resetSuccess
            />

            <p className="pb-2">{flowItemData?.comments.length} comments</p>
            {flowItemData?.comments.length > 0 &&
              flowItemData?.comments.map((item: any) => (
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
                    optionFn={() =>
                      updateFn({
                        note_comments: currentNote.includes(item.id)
                          ? currentNote.filter(
                              (note: string) => note !== item.id
                            )
                          : [...currentNote, item.id],
                      })
                    }
                    optionTitle={
                      currentNote.includes(item.id)
                        ? "Remove from Note"
                        : "Pick to Note"
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

      <Modal
        title="Pick Job"
        open={isModalOpen}
        okText="Pick"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Descriptions column={1} layout="horizontal">
          <Descriptions.Item label="Full name">
            {formatName(allData?.full_name)}
          </Descriptions.Item>
          <Descriptions.Item label="Position Applied">
            {allData?.prefer_position.positions
              .map((item: any) => item.label)
              .join(", ")}
          </Descriptions.Item>
          <Descriptions.Item label="Industry">
            <div className="flex-col">
              {allData?.business_line.map((item: any) => (
                <p>{getIndustryString(item)}</p>
              ))}
            </div>
          </Descriptions.Item>
        </Descriptions>

        <Select
          mode="multiple"
          placeholder="Select Job"
          value={[]}
          onChange={(value) => setSelectedItems([...value, ...selectedItems])}
          style={{ width: "100%" }}
          options={
            searchData?.length
              ? searchData?.map((item) => ({
                  ...item,
                  disabled:
                    selectedItems.includes(item.value) ||
                    data.map((item: any) => item.job_id).includes(item.value),
                }))
              : []
          }
          onSearch={setSearchValue}
          onBlur={() => setSearchValue("")}
        />
        <p className="font-semibold my-5 text-base">
          {selectedItems.length} Jobs Picked
        </p>
        <div className="max-h-[400px] overflow-y-scroll mt-5">
          {selectedItems.map((item) => (
            <div className="mt-3 pb-3 flex justify-between border-b border-gray-200">
              <p>
                {searchData &&
                  searchData.length &&
                  searchData.find((candidate) => candidate.value === item)
                    .label}
              </p>
              <DeleteOutlined
                className="hover:text-red-500 cursor-pointer p-4"
                onClick={() =>
                  setSelectedItems(
                    selectedItems.filter((candidate) => candidate !== item)
                  )
                }
              />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
