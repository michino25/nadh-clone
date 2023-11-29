import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Form } from "antd";
import { formatDate } from "../../../utils/format";

dayjs.extend(customParseFormat);

interface iDataInput {
  label: string;
  disabled?: boolean;
  name: string;
  required?: boolean;
  defaultValue?: string | number;
}

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const App = ({ label, name, required, defaultValue, disabled }: iDataInput) => (
  <Form.Item
    label={label}
    name={name}
    initialValue={dayjs(
      formatDate(defaultValue, "ISOdate", "date"),
      dateFormatList[0]
    )}
    rules={[
      {
        required: required,
        message: `Please input your your ${label}!`,
      },
    ]}
  >
    <DatePicker
      format={dateFormatList}
      disabled={disabled}
      className="w-full"
    />
  </Form.Item>
);

export default App;
