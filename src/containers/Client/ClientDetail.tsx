import { useParams, Link } from "react-router-dom";
import { Anchor, Skeleton, notification } from "antd";
import BackToTopButton from "components/ShareComponents/BackToTopButton";
import { clientApi, otherApi } from "apis/index";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "utils/format";
import { getUser } from "utils/getUser";
import { DataUpload } from "components/DataEntry/index";
import ActivityLogsTable from "./components/ActivityLogsTable";
import { v4 as uuidv4 } from "uuid";
import ContactPersonWrapper from "./components/ContactPersonWrapper";
import { useEffect, useState } from "react";
import Notes from "./components/Notes";
import AccountDevelopment from "./components/AccountDevelopment";
import RelatedJob from "./components/RelatedJob";
import ClientDescription from "./components/ClientDescription";
import ClientInformation from "./components/ClientInformation";
import IndustryAPI from "components/ShareComponents/IndustryAPI";

const anchorItems = [
  {
    key: "information",
    href: "#information",
    title: "Information",
  },
  {
    key: "industry",
    href: "#industry",
    title: "Industry & Contact Person & Account Development",
  },
  {
    key: "description",
    href: "#description",
    title: "Client Description",
  },
  {
    key: "notes",
    href: "#notes",
    title: "Notes",
  },
  {
    key: "relatedjob",
    href: "#relatedjob",
    title: "Related Job Codes",
  },
  {
    key: "attachments",
    href: "#attachments",
    title: "Attachments",
  },
  {
    key: "logs",
    href: "#logs",
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
      await clientApi.getOneClient(id as string).then((res) => res.data),
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

  const [editable, setEditable] = useState(false);
  useEffect(() => {
    if (clientData?.status) {
      setEditable(clientData?.status === 12);
    }
  }, [clientData?.status]);

  useEffect(() => {
    if (isPending && window.location.hash !== "") {
      setTimeout(() => {
        const id = window.location.hash.replace("#", "");
        const yOffset = -200;
        const element = document.getElementById(id)!;

        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }, 300);
    }
  }, [isPending]);

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

  if (isPending || !id) return <Skeleton className="p-12" active />;

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
        <Anchor
          affix={false}
          offsetTop={200}
          direction="horizontal"
          items={anchorItems}
        />
      </div>

      <div className="flex w-full p-5">Detail {id}</div>
      <div className="px-8 my-5">
        <div className="flex-col space-y-4">
          <div id="information" className="p-6 bg-white rounded-lg">
            <ClientInformation
              clientData={clientData}
              editable={editable}
              setEditable={setEditable}
              updateFn={updateMutation.mutate}
              clientImageRefetch={clientImageRefetch}
            />
          </div>

          <div id="industry" className="flex">
            <div className="w-2/3">
              <div className="bg-white rounded-lg p-6 mb-5">
                <p className="mb-4 font-bold text-lg">Industry</p>
                <IndustryAPI
                  data={clientData?.business_line.map((item: any) => ({
                    ...item,
                    id: uuidv4(),
                  }))}
                  updateFn={(value: any) =>
                    updateMutation.mutate({
                      business_line: value,
                    })
                  }
                  loading={loading}
                />
              </div>
              <div className="bg-white rounded-lg p-6">
                <p className="mb-4 font-bold text-lg">Contact Person</p>
                <ContactPersonWrapper
                  data={clientData?.pic}
                  clientId={clientData.id}
                  refetch={refetch}
                />
              </div>
            </div>
            <div className="relative w-1/3 bg-white rounded-lg ml-4 p-6">
              <p className="mb-4 font-bold text-lg">Account Development</p>
              <div className="absolute inset-6 top-16 pt-5 overflow-y-auto">
                <AccountDevelopment
                  data={accountDevelopmentsData}
                  refetch={accountDevelopmentRefetch}
                />
              </div>
            </div>
          </div>

          <div id="description" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Client Description</p>
            <ClientDescription
              data={clientData}
              updateFn={(value: any, onSuccess: () => void) =>
                updateMutation.mutate(value, { onSuccess })
              }
            />
          </div>

          <div id="notes" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Notes</p>
            <Notes
              data={clientData.detail_comments}
              clientID={clientData.id}
              refetch={refetch}
            />
          </div>

          <div id="relatedjob" className="p-4 bg-white rounded-lg">
            <p className="mb-4 font-bold text-lg">Related Job Codes</p>
            <div className="flex space-x-2">
              <RelatedJob
                data={clientData.jobs}
                clientId={clientData.id}
                refetch={refetch}
              />
            </div>
          </div>

          <div id="attachments" className="p-4 bg-white rounded-lg">
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
                loading={loading}
              />
            </div>
          </div>

          <div id="logs" className="p-4 bg-white rounded-lg">
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
