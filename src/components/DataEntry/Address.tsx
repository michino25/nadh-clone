import { Select, Form, Skeleton, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import { otherApi } from "apis/index";
import { iOption } from "_constants/index";
import { useEffect, useState } from "react";

const filterOption = (input: string, option?: iOption) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function Address({
  defaultValue,
  onChange,
  onlyCity,
}: {
  defaultValue?: any;
  onChange: (data: any) => void;
  onlyCity?: boolean;
}) {
  const [country, setCountry] = useState<iOption | undefined>(
    defaultValue?.country
  );
  const [city, setCity] = useState<iOption | undefined>(defaultValue?.city);
  const [district, setDistrict] = useState<iOption | undefined>(
    defaultValue?.district
  );

  const [address, setAddress] = useState(defaultValue?.address);

  const [cityData, setCityData] = useState<iOption[]>();
  const [districtData, setDistrictData] = useState<iOption[]>();

  const initData = async (defaultValue: any) => {
    if (defaultValue.country) {
      setCityData(await getCity(defaultValue.country.value).then((res) => res));
    }
    if (defaultValue.city) {
      setDistrictData(
        await getDistrict(defaultValue.city.value).then((res) => res)
      );
    }
  };

  useEffect(() => {
    // console.log(defaultValue);
    if (defaultValue) initData(defaultValue);
  }, []);

  const { data: countryData, isPending: countryIsPending } = useQuery({
    queryKey: ["countryData", "address2"],
    queryFn: async () =>
      await otherApi.getCountries().then((res) =>
        res.data.data.map((item: any) => ({
          value: item.key,
          label: item.label,
        }))
      ),
  });

  const getCity = async (id: any) => {
    try {
      return await otherApi.getLocation(1, id).then((res) =>
        res.data.data.map((item: any) => ({
          value: item.key,
          label: item.label,
        }))
      );
    } catch (error) {
      // error
      console.error("Create failed", error);
    }
  };

  const getDistrict = async (id: any) => {
    try {
      return await otherApi.getLocation(2, id).then((res) =>
        res.data.data.map((item: any) => ({
          value: item.key,
          label: item.label,
        }))
      );
    } catch (error) {
      // error
      console.error("Create failed", error);
    }
  };

  const handleChangeCountry = async (value: number) => {
    setCountry(countryData.filter((item: any) => item.value === value)[0]);

    if (value) setCityData(await getCity(value).then((res) => res));
    else setCityData(undefined);
    setCity(undefined);

    setDistrictData(undefined);
    setDistrict(undefined);
  };

  const handleChangeCity = async (value: number) => {
    setCity(cityData?.filter((item: any) => item.value === value)[0]);

    if (value) setDistrictData(await getDistrict(value).then((res) => res));
    else setDistrictData(undefined);

    setDistrict(undefined);
  };

  const handleChangeDistrict = (value: number) => {
    setDistrict(districtData?.filter((item: any) => item.value === value)[0]);
  };

  useEffect(() => {
    onChange({
      country,
      city,
      district,
      address,
    });
  }, [country, city, district, address]);

  if (countryIsPending) return <Skeleton active />;

  return (
    <div className="flex-col w-full justify-between items-center">
      <div className="flex w-full space-x-3">
        <Form.Item
          className={onlyCity ? "w-1/2 mb-3" : "w-1/3 mb-3"}
          rules={[
            {
              required: true,
              message: "Missing this field",
            },
          ]}
          initialValue={country ? (country.value as number) : undefined}
        >
          <Select
            allowClear
            showSearch
            filterOption={filterOption}
            options={countryData}
            value={country ? (country.value as number) : undefined}
            onChange={handleChangeCountry}
            placeholder="Country"
          />
        </Form.Item>

        <Form.Item
          className={onlyCity ? "w-1/2 mb-3" : "w-1/3 mb-3"}
          initialValue={city ? (city.value as number) : undefined}
        >
          <Select
            allowClear
            showSearch
            filterOption={filterOption}
            options={cityData}
            value={city ? (city.value as number) : undefined}
            disabled={!cityData}
            onChange={handleChangeCity}
            placeholder="City"
          />
        </Form.Item>

        <Form.Item
          className={"w-1/3 mb-3"}
          hidden={onlyCity}
          initialValue={district ? (district.value as number) : undefined}
        >
          <Select
            allowClear
            showSearch
            filterOption={filterOption}
            options={districtData}
            value={district ? (district.value as number) : undefined}
            disabled={!districtData}
            onChange={handleChangeDistrict}
            placeholder="District"
          />
        </Form.Item>
      </div>

      <Form.Item hidden={onlyCity} className="w-full mb-3">
        <Input
          placeholder="Address..."
          className="w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Item>
    </div>
  );
}
