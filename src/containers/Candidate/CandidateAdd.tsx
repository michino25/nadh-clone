import Step from "components/DataDisplay/Step";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import CandidateAddStep1 from "./components/CandidateAddStep1";
import CandidateAddFinish from "./components/CandidateAddFinish";
import { Button, notification, Form } from "antd";
import Academic from "./components/Academic";
import Certificate from "./components/Certificate";
import WorkingHistory from "./components/WorkingHistory";
import Remuneration from "./components/Remuneration";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { candidateApi } from "apis/index";
import { v4 as uuidv4 } from "uuid";
import FormIndustry from "containers/Client/components/FormIndustry";
import IndustryTable from "components/DataDisplay/IndustryTable";

const step = [
  "Personal Information",
  "Skills and Industry",
  "Education",
  "Working History",
  "Remunertion",
  "Finish",
];

export default function CadidateAdd() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    refetch();
  }, [currentStep]);

  const { data: candidateId } = useQuery({
    queryKey: ["Candidates", 1],
    queryFn: async () =>
      await candidateApi
        .getCandidates({
          perPage: 1,
          page: 1,
          creator_id: "",
        })
        .then((res) => res.data.data[0].id),
  });

  const { data: candidateData, refetch } = useQuery({
    queryKey: ["candidate", candidateId],
    queryFn: async () =>
      await candidateApi.getOneCandidate(candidateId as string).then((res) => {
        return {
          ...res.data,
          addresses: res.data.addresses.map((addressItem: any) => ({
            address: addressItem.address,
            country: addressItem.country
              ? addressItem.country.key + "_" + addressItem.country.label
              : null,
            city: addressItem.city
              ? addressItem.city.key + "_" + addressItem.city.label
              : null,
            district: addressItem.district
              ? addressItem.district.key + "_" + addressItem.district.label
              : null,
          })),
          business_line: res.data.business_line.map((item: any) => ({
            ...item,
            id: uuidv4(),
          })),
        };
      }),
  });

  const [currency, setCurrency] = useState<number>(
    candidateData?.remuneration?.currency?.id || 2
  );

  console.log(candidateData);

  const updateMutation = useMutation({
    mutationFn: (formData: any) => updateCandidate(formData),
  });

  const updateCandidate = async (userData: any) => {
    try {
      await candidateApi.updateCandidate(candidateData.id, userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Update Candidate",
        description: "Update success.",
      });
      refetch();
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Candidate",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const addIndustry = (data: any) => {
    const newData: any = {};
    if (data.industry) newData.industry_id = data.industry.value;
    if (data.sector) newData.sector_id = data.sector.value;
    if (data.category) newData.category_id = data.category.value;
    newData.primary = -1;

    const transformedData = candidateData?.business_line.map((item: any) => {
      const transformedItem: any = {
        industry_id: item.industry.id,
        primary: item.primary,
      };

      if (item.sector) transformedItem.sector_id = item.sector.id;
      if (item.category) transformedItem.category_id = item.category.id;

      return transformedItem;
    });

    if (transformedData)
      updateMutation.mutate({ business_line: [...transformedData, newData] });
    else updateMutation.mutate({ business_line: [newData] });
  };

  console.log(candidateData);

  const deleteIndustry = (id: string) => {
    const transformedData = candidateData?.business_line
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
    const transformedData = candidateData?.business_line.map((item: any) => {
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

  const createCandidateHistoriesApi = async (userData: any) => {
    try {
      await candidateApi.createCandidateHistories(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Create Histories",
        description: "Create success.",
      });
      refetch();
    } catch (error: any) {
      // error
      // console.error("Create failed", error);
      notification.error({
        message: "Create Histories",
        description: `Create failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const deleteCandidateHistoriesApi = async (userData: any) => {
    try {
      await candidateApi.deleteCandidateHistories(userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Delete Histories",
        description: "Delete success.",
      });
      refetch();
    } catch (error: any) {
      // error
      // console.error("Delete failed", error);
      notification.error({
        message: "Delete Histories",
        description: `Delete failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const updateCandidateHistoriesApi = async (userData: any, id: string) => {
    try {
      await candidateApi.updateCandidateHistories(id, userData);

      // success
      // console.log(res.data);
      notification.success({
        message: "Update Histories",
        description: "Update success.",
      });
      refetch();
    } catch (error: any) {
      // error
      // console.error("Update failed", error);
      notification.error({
        message: "Update Histories",
        description: `Update failed. ${
          error.response.data[0].message || "Please try again."
        }`,
      });
    }
  };

  const createCandidateHistoriesMutation = useMutation({
    mutationFn: (formData: any) => createCandidateHistoriesApi(formData),
  });

  const deleteCandidateHistoriesMutation = useMutation({
    mutationFn: (formData: any) => deleteCandidateHistoriesApi(formData),
  });

  const updateCandidateHistoriesMutation = useMutation({
    mutationFn: (formData: any) =>
      updateCandidateHistoriesApi(formData, formData.id),
  });

  const updateCandidateHistories = (data: any, id: string) => {
    data.candidate_id = candidateData.id;
    data.id = id;
    updateCandidateHistoriesMutation.mutate(data);
  };

  const createCandidateHistories = (data: any) => {
    data.candidate_id = candidateData.id;
    createCandidateHistoriesMutation.mutate(data);
  };

  const onFinish = (values: any) => {
    const remunerationObject = {
      notice_days: parseInt(values.notice_days),
      remuneration: {
        benefit: {
          over_thirteen: parseInt(values.over_thirteen),
          lunch_check: parseInt(values.lunch_check),
          car_parking: parseInt(values.car_parking),
          car_allowance: parseInt(values.car_allowance),
          phone: parseInt(values.phone),
          laptop: parseInt(values.laptop),
          share_option: parseInt(values.share_option),
          health_cover: parseInt(values.health_cover),

          ...(values.over_thirteen === "1"
            ? { over_thirteen_text: values.over_thirteen_text }
            : {}),
          ...(values.lunch_check === "1"
            ? { lunch_check_text: values.lunch_check_text }
            : {}),
          ...(values.car_parking === "1"
            ? { car_parking_text: values.car_parking_text }
            : {}),
          ...(values.car_allowance === "1"
            ? { car_allowance_text: values.car_allowance_text }
            : {}),
          ...(values.phone === "1" ? { phone_text: values.phone_text } : {}),
          ...(values.laptop === "1" ? { laptop_text: values.laptop_text } : {}),
          ...(values.share_option === "1"
            ? { share_option_text: values.share_option_text }
            : {}),
          ...(values.health_cover === "1"
            ? { health_cover_text: values.health_cover_text }
            : {}),

          pension_scheme: parseInt(values.pension_scheme),
          no_holiday: parseInt(values.no_holiday),
          working_hour: parseInt(values.working_hour),
          overtime_hour: parseInt(values.overtime_hour),
        },
        currency,
        current_salary: values.current_salary,
        salary: {
          from: values.salary_from,
          to: values.salary_to,
        },
        expectations: null,
        future_prospects: null,
        notice_days: parseInt(values.notice_days),
      },
    };

    updateMutation.mutate(remunerationObject, {
      onSuccess: () => {
        setCurrentStep(currentStep + 1);
      },
    });
  };
  return (
    <div className="px-12 pb-2">
      <div className="">
        <Link to={"/candidates"}>Candidates List</Link>
        <span> / Create Candidate</span>
      </div>

      <p className="mb-4 font-bold text-xl">Create Candidate</p>

      <div className="px-1">
        <Step current={currentStep} data={step} />
      </div>

      <div className="p-4 my-6 bg-white rounded-lg">
        <p className="mb-4 font-bold text-lg">{step[currentStep]}</p>
        {currentStep === 0 && (
          <CandidateAddStep1 nextStep={() => setCurrentStep(currentStep + 1)} />
        )}

        {currentStep === 1 && (
          <>
            <FormIndustry saveData={addIndustry} />
            <IndustryTable
              deleteItem={deleteIndustry}
              primaryItem={primaryIndustry}
              data={candidateData?.business_line}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <Academic
              data={candidateData?.histories}
              addFn={createCandidateHistories}
              deleteFn={(id) => deleteCandidateHistoriesMutation.mutate(id)}
              updateFn={(data, id) => updateCandidateHistories(data, id)}
            />
            <span className="p-1"></span>
            <Certificate
              data={candidateData?.histories}
              addFn={createCandidateHistories}
              deleteFn={(id) => deleteCandidateHistoriesMutation.mutate(id)}
              updateFn={(data, id) => updateCandidateHistories(data, id)}
            />
          </>
        )}

        {currentStep === 3 && (
          <WorkingHistory
            data={candidateData?.histories}
            addFn={createCandidateHistories}
            deleteFn={(id) => deleteCandidateHistoriesMutation.mutate(id)}
            updateFn={(data, id) => updateCandidateHistories(data, id)}
          />
        )}

        {currentStep === 4 && (
          <>
            <Form layout="vertical" className="w-full" onFinish={onFinish}>
              <Remuneration
                data={candidateData?.remuneration}
                currency={currency}
                setCurrency={setCurrency}
                form={form}
              />
              <Form.Item className="flex justify-end w-full gap-3 mt-5">
                <Button
                  className="mr-3"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
                <Button type="primary" htmlType="submit">
                  Finish
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {currentStep === 5 && (
          <CandidateAddFinish id={candidateData.candidate_id} />
        )}

        <div className="flex justify-end w-full gap-3 mt-5">
          {currentStep > 1 && currentStep < 4 && (
            <Button onClick={() => setCurrentStep(currentStep - 1)}>
              Previous
            </Button>
          )}
          {currentStep > 0 && currentStep < 4 && (
            <Button
              type="primary"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
