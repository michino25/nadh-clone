import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import Address from "./Address";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { iAddress, iLocation } from "utils/models";

interface iDataInput {
  defaultValue?: iAddress[];
  setAddress: (data: iLocation[]) => void;
  address: iLocation[];
  reset?: boolean;
  setReset: (data: boolean) => void;
}

const App = ({
  defaultValue = [{}],
  setAddress,
  address,
  reset,
  setReset,
}: iDataInput) => {
  // console.log(defaultValue);

  const init = () => {
    if (defaultValue[0])
      setAddress(
        defaultValue.map((item: iAddress) => ({
          id: uuidv4(),
          address: {
            ...{
              country: item?.country && {
                value: item.country.key,
                label: item.country.label,
              },
            },
            ...{
              city: item?.city && {
                value: item.city.key,
                label: item.city.label,
              },
            },
            ...{
              district: item?.district && {
                value: item.district.key,
                label: item.district.label,
              },
            },
            address: item?.address,
          },
        }))
      );
  };

  console.log(defaultValue);

  useEffect(() => {
    if (reset === true) {
      init();
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    init();
  }, []);

  const remove = (key: string) => {
    setAddress(address.filter((item: iLocation) => item.id !== key));
  };

  const add = () => {
    setAddress([
      ...(address ? address : []),
      {
        id: uuidv4(),
        address: {},
      },
    ]);
  };

  const update = (id: string, data: iAddress) => {
    setAddress(
      address.map((item: iLocation) =>
        item.id === id ? { id, address: data } : item
      )
    );
  };

  console.log(address);

  return (
    <Form.Item label="Address" className="mb-0">
      {address?.map((item: iLocation) => {
        console.log(item.address);

        return (
          <div className="flex space-x-4" key={item.id}>
            <Address
              defaultValue={item.address}
              onChange={(data: iAddress) => update(item.id, data)}
            />

            {address.length > 0 && (
              <MinusCircleOutlined
                className="hover:text-red-500 pb-3"
                onClick={() => remove(item.id)}
              />
            )}
          </div>
        );
      })}
      <Form.Item>
        <Button
          type="dashed"
          onClick={() => add()}
          block
          icon={<PlusOutlined />}
        >
          Add field
        </Button>
      </Form.Item>
    </Form.Item>
  );
};

export default App;
