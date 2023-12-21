import { Link } from "react-router-dom";
import { Col, Row, Button, Form } from "antd";

import InputNumber from "../../components/DataEntry/InputNumber";
import DataSelect from "../../components/DataEntry/Select";
// import CoordinateSelect from "../components/DataEntry/CoordinateSelect";
import Birthday from "../../components/DataEntry/Birthday";
import DataInput from "../../components/DataEntry/Input";

interface ItemProps {
  label: string;
  value: string;
}

const titles = [
  "Finance & Accounting (F&A)",
  "Accounting and Auditing",
  "Internal Control and Compliance",
  "Corporate Audit",
  "Due Deligence",
  "Investment",
  "Funding",
  "Fundraising",
  "Merger & Acquisition (M&A)",
  "Brokerage",
  "Porfolio Management",
  "Financial Planning and Analysis (FP&A)",
  "Management Accountant (MA)",
  "Commercial Finance",
  "Supply Chain Finance",
  "Financial/Business Analyst",
  "Finance Reporting",
  "IFRS (International Financial Reporting Standards)",
  "U.S. GAAP (Generally Accepted Accounting Principles)",
  "Finance Controlling",
  "Cashflow Management",
  "Taxation",
  "Financial Statement",
  "Financial Accounting",
  "Human Resource (HR)",
  "Learning & Development",
  "Performance Management",
  "HR Communications",
  "Diversity & Inclusion",
  "HR Tech / Service Delivery",
  "Leadership & Succession",
  "Rewards & Recognition",
  "Compensation & Job Matrix",
  "Benefits & Wellbeing",
  "Employee Experience",
  "Leadership of HR",
  "Talent Acquisition",
  "People Analytics",
  "HR Change & Trasformation",
  "HR Solution Design",
  "Organization Design & Culture",
  "Business Acumen",
  "Facilitities & Workplace",
  "HR Partnership",
  "Labor Relation",
  "Information Technology & System (IT&S)",
  "ERP/SAP",
  "IT Infrastructure",
  "IT Help Desk",
  "IT Software",
  "IT Hardware",
  "SAP HANA S4",
  "IT Networks",
  "Logistics",
  "Import & Export",
  "Transportation & Delivery",
  "Warehouse & Storage",
  "Inventory & Stock",
  "Shipping & Custom Clearance",
  "Marketing",
  "Digital Marketing",
  "CRM",
  "Product Marketing",
  "Visual Merchandising",
  "Consumer & Market Insights",
  "Customer Shopper Marketing",
  "Trade Marketing",
  "Communication /PR /Event /Activation",
  "Brand/Product Management",
  "Planning",
  "Demand Planning",
  "Production Planning",
  "Supply Planning",
  "Procurement",
  "Vendor Sourcing & Localization",
  "Capex Procurement",
  "Indirect Procurement",
  "Direct Procurement",
  "Purchase Order (PO) Management",
  "Contract Negotiation",
  "Production Operation",
  "ISO/IEC 27000 (Information Security Management)",
  "LEAN-Six Sigma",
  "Kaizen",
  "ISO 9000 (Quality Management)",
  "ISO 14000 (Environmental Management)",
  "ISO 22000 (Food Safety Management)",
  "GMP (Good Manufacturing Practices)",
  "TQM (Total Qualityl Management)",
  "TPM (Total Productive Management)",
  "HACCP (Hazard Analysis and Critical Control Points)",
  "OHSAS 18001 (Occupational Health and Safety Assessment Series)",
  "GPP (Good Pharmacy Practices)",
  "OEE (Overall Equipment Efficiency)",
  "OTIF ((On time – In full)",
  "DIFOT (Delivery in full on time)",
  'EBIT (Operating Revenue "Operating Expenses (OPEX) + Non-operating Income)',
  "PBIT (Net profit + Interest + Taxes)",
  "Project Management",
  "Green Belt",
  "Yellow Belt",
  "PMP/PMI",
  "Black Belt",
  "Sales (B2B)",
  "Business Development",
  "Aftersales Service",
  "Technical Service",
  "Up-selling",
  "Project Sales",
  "Technical Sales",
  "Services Sales",
  "Dealer Management",
  "Tele-sales",
  "Cross-selling",
  "Sales (B2C)",
  "Retail Operation",
  "Route-To-Market",
  "Channel Development",
  "Key Account Management",
  "Distributor Management",
  "HORECA",
  "Modern Trate (MT)",
  "General Trade (GT)",
  "Tele-sales",
  "Sales Training",
  "Business Intelligence",
  "Commercial Execellence",
  "Sales Operation",
  "E-Commerce",
  "Talent Acquisition",
  "Candidate Sourcing & Management",
  "Candidate Interviewing & Assessment",
  "Candidate Experience",
  "Candidate Selection & Hiring",
  "Candidate Onboarding",
  "Employer Branding",
];

const departments = [
  "CS Department",
  "Digital",
  "FE",
  "Finance",
  "HR",
  "IT",
  "Marketing",
  "Sales",
];

const types = [
  "Full-time",
  "Contract",
  "Part-time",
  "Internship",
  "Temporary",
  "Other",
];

const experiences = [
  "Internship Level",
  "Entry Level",
  "Associate Level",
  "Mid-senior Level",
  "Director",
  "Executive",
];

const users = [
  "Thanh Binh",
  "Test Marketing",
  "Hr Test",
  "Marketing Thy",
  "Marketing 1",
  "Hr Test",
  "Hr Thydo",
  "Hr Test",
  "Hr Thy",
  "Marketing Test",
];

const createSelectData = (data: string[]) => {
  const selectData: ItemProps[] = [];
  for (let i = 0; i < data.length; i++) {
    selectData.push({
      label: data[i],
      value: i.toString(),
    });
  }
  return selectData;
};

export default function ClientAdd() {
  // const [value, setValue] = useState<string[]>([]);

  return (
    <div className="px-12 pb-2">
      <div className="">
        <Link to={"/clients"}>Jobs List</Link>
        <span> / Create Job</span>
      </div>

      <p className="mb-4 font-bold text-xl">Create Job</p>

      <div className="p-4 my-6 bg-white rounded-lg">
        <Form layout="vertical" className="w-full">
          <Row gutter={16}>
            <Col span={12}>
              <DataSelect
                label="Title"
                placeholder="Title"
                name="status"
                required
                defaultValue="1"
                data={createSelectData(titles)}
              />
            </Col>
            <Col span={12}>
              <DataSelect
                label="Department"
                placeholder="Department"
                name="status"
                required
                defaultValue="1"
                data={createSelectData(departments)}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <InputNumber
                label="Quantity"
                placeholder="Quantity"
                name="user_name"
                required={true}
                defaultValue={""}
              />
            </Col>
            <Col span={12}>
              <DataSelect
                label="Type"
                placeholder="Type"
                name="status"
                required
                defaultValue="1"
                data={createSelectData(types)}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DataSelect
                label="Experience Level"
                placeholder="Experience Level"
                name="status"
                required
                defaultValue="1"
                data={createSelectData(experiences)}
              />
            </Col>
            <Col span={12}>
              <DataSelect
                label="Client's Name"
                placeholder="Client's Name"
                name="status"
                required
                defaultValue="1"
                data={createSelectData(users)}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Birthday label="Opening Date" defaultValue="2023-01-01" />
            </Col>
            <Col span={12}>
              <DataInput
                label="Location"
                placeholder="Location"
                name="location"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DataSelect
                label="Search Consultant"
                placeholder="Search Consultant"
                name="status"
                required
                defaultValue="1"
                data={createSelectData(users)}
              />
            </Col>
            <Col span={12}>
              <DataSelect
                label="Mapping by"
                placeholder="Mapping by"
                name="status"
                defaultValue="1"
                data={createSelectData(users)}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              {/* <CoordinateSelect
                label="Industry"
                name="industry"
                firstData={industryData}
                secondData={sectorData}
                thirdData={subsectorData}
              /> */}
            </Col>
          </Row>

          <Form.Item className="flex justify-end space-x-2">
            <Button className="mr-2">Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
