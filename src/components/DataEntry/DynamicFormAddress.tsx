import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import Address from "./Address";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface iDataInput {
  defaultValue?: string[];
  setAddress: (data: any) => void;
  address: any;
}

const App = ({ defaultValue = [""], setAddress, address }: iDataInput) => {
  // console.log(defaultValue);
  useEffect(() => {
    setAddress(
      defaultValue?.map((item: any) => ({
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
  }, []);

  const remove = (key: any) => {
    setAddress(address.filter((item: any) => item.id !== key));
  };

  const add = () => {
    setAddress([
      ...address,
      {
        id: uuidv4(),
        address: {},
      },
    ]);
  };

  const update = (id: string, data: any) => {
    setAddress(
      address.map((item: any) =>
        item.id === id ? { id, address: data } : item
      )
    );
  };

  console.log(address);

  return (
    <Form.Item label="Address" className="mb-0">
      {address?.map((item: any) => {
        return (
          <div className="flex space-x-4" key={item.id}>
            <Address
              defaultValue={item.address}
              onChange={(data: any) => update(item.id, data)}
            />

            {address.length > 1 && (
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
