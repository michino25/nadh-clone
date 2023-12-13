import { useEffect, useState } from "react";
import useFilter from "src/hooks/useFilter";
import { Select, Button, Form, Skeleton } from "antd";
import { otherApi } from "apis/index";
import { useQuery } from "@tanstack/react-query";
import { iOption } from "_constants/index";

const filterOption = (input: string, option?: iOption) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function SearchAddress({ closeFn }: { closeFn: () => void }) {
  const { getAllParams, removeOneFilter, changeOneFilter } = useFilter();

  const [country, setCountry] = useState<number>();
  const [city, setCity] = useState<number>();
  const [cityData, setCityData] = useState<iOption[]>([]);

  const getInit = async () => {
    const data = getAllParams()["city"].split(",");
    if (data[0]) {
      setCountry(parseInt(data[0]));
      setCityData(await getCity(parseInt(data[0])));
    }
    if (data[1]) setCity(parseInt(data[1]));
  };

  useEffect(() => {
    if (getAllParams()["city"]) {
      getInit();
    }
  }, [getAllParams()["city"]]);

  const { data: countryData, isPending } = useQuery({
    queryKey: ["countries"],
    queryFn: async () =>
      await otherApi.getCountries().then((res) =>
        res.data.data.map((item: any) => ({
          value: item.key,
          label: item.label,
        }))
      ),
  });

  console.log(countryData);

  const getCity = async (id: any) => {
    const res = await otherApi.getLocation(1, id);

    return res.data.data.map((item: any) => ({
      value: item.key,
      label: item.label,
    }));
  };

  const submit = () => {
    console.log(city, country);
    const data = country + (city ? "," + city : "");

    if (data) {
      changeOneFilter(getAllParams(), "city", data);
      closeFn();
    } else reset();
  };

  // value={getAllParams()[columnKey] && selected}

  const reset = () => {
    // console.log(filter);
    removeOneFilter(getAllParams(), "city");
    setCountry(undefined);
    setCity(undefined);
    closeFn();
  };

  const handleChangeCountry = async (value: number) => {
    setCountry(value);

    setCityData(await getCity(value));
    setCity(undefined);
  };

  const handleChangeCity = (value: number) => {
    setCity(value);
  };

  if (isPending) return <Skeleton active />;

  return (
    <div className="p-3" onKeyDown={(e) => e.stopPropagation()}>
      <div className="w-full flex justify-between gap-2">
        <Button className="w-1/2" type="primary" onClick={submit} size="small">
          Search
        </Button>
        <Button className="w-1/2" onClick={reset} size="small">
          Reset
        </Button>
      </div>

      <div className="flex-col w-[300px] mt-3 space-y-3">
        <Form.Item className="w-full mb-3">
          <Select
            allowClear
            showSearch
            filterOption={filterOption}
            options={countryData}
            value={country}
            onChange={handleChangeCountry}
            placeholder="Country"
          />
        </Form.Item>

        <Form.Item className="w-full mb-3">
          <Select
            allowClear
            showSearch
            filterOption={filterOption}
            options={cityData}
            value={city}
            disabled={!cityData || cityData.length === 0}
            onChange={handleChangeCity}
            placeholder="City"
          />
        </Form.Item>
      </div>
    </div>
  );
}
