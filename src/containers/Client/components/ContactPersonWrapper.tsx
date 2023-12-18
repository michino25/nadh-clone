import { clientApi } from "apis/index";
import ContactPerson from "./ContactPerson";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";

export default function ContactPersonWrapper({ data, clientId, refetch }: any) {
  const createClientContactPersonsApi = async (userData: any) => {
    try {
      await clientApi.createContactPersons(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Create ContactPersons",
        description: "Create success.",
      });
      refetch();
    } catch (error: any) {
      // error
      // console.error("Create failed", error);
      notification.error({
        message: "Create ContactPersons",
        description: `Create failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const deleteClientContactPersonsApi = async (userData: any) => {
    try {
      await clientApi.deleteContactPersons(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Delete ContactPersons",
        description: "Delete success.",
      });
      refetch();
    } catch (error: any) {
      // error
      // console.error("Delete failed", error);
      notification.error({
        message: "Delete ContactPersons",
        description: `Delete failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const updateClientContactPersonsApi = async (userData: any, id: string) => {
    try {
      await clientApi.updateContactPersons(id, userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Update ContactPersons",
        description: "Update success.",
      });
      refetch();
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update ContactPersons",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const createClientContactPersonsMutation = useMutation({
    mutationFn: (formData: any) => createClientContactPersonsApi(formData),
  });

  const deleteClientContactPersonsMutation = useMutation({
    mutationFn: (formData: any) => deleteClientContactPersonsApi(formData),
  });

  const updateClientContactPersonsMutation = useMutation({
    mutationFn: (formData: any) =>
      updateClientContactPersonsApi(formData, formData.id),
  });

  const updateClientContactPersons = (data: any, id: string) => {
    data.client_id = clientId;
    data.id = id;
    updateClientContactPersonsMutation.mutate(data);
  };

  const createClientContactPersons = (data: any) => {
    data.client_id = clientId;
    createClientContactPersonsMutation.mutate(data);
  };

  return (
    <ContactPerson
      data={data}
      addFn={createClientContactPersons}
      deleteFn={(id) => deleteClientContactPersonsMutation.mutate(id)}
      updateFn={(data, id) => updateClientContactPersons(data, id)}
    />
  );
}
