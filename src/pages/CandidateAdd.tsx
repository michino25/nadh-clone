import Step from "../components/DataDisplay/Step";
import { Link } from "react-router-dom";
import { Col, Row, Button, Form } from "antd";
import { useState } from "react";

import Input from "../components/DataEntry/Input";
import DataSelect from "../components/DataEntry/Select";
import Birthday from "../components/DataEntry/Birthday";
import DataRadio from "../components/DataEntry/Radio";
import DataDatePicker from "../components/DataEntry/DatePicker";
import MultiSelect from "../components/DataEntry/MultiSelect";

interface ItemProps {
  label: string;
  value: string;
}

const options: ItemProps[] = [];

const data = [
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

for (let i = 0; i < data.length; i++) {
  options.push({
    label: data[i],
    value: i.toString(),
  });
}

export default function CadidateAdd() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="px-12 pb-2">
      <div className="">
        <Link to={"/candidates"}>Candidates List</Link>
        <span> / Create Candidate</span>
      </div>

      <p className="mb-4 font-bold text-xl">Create Candidate</p>

      <Step
        current={0}
        data={[
          "Personal Information",
          "Skills and Industry",
          "Education and Certificat",
          "Working History",
          "Remunertion and Rewards",
          "Finish",
        ]}
      />

      <div className="p-4 my-6 bg-white rounded-lg">
        <p className="mb-4 font-bold text-lg">Personal Information</p>

        <Form layout="vertical" className="w-full">
          <Row gutter={16}>
            <Col span={12}>
              <Input
                label="First Name"
                name="full_name"
                required={true}
                defaultValue={"thanh binh"}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Last Name"
                name="user_name"
                required={true}
                defaultValue={"thanhbinh"}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Input
                label="Middle Name"
                name="user_name"
                required={true}
                defaultValue={"thanhbinh"}
              />
            </Col>
            <Col span={12}>
              <DataSelect
                label="Primary status"
                name="status"
                required={true}
                defaultValue="active"
                data={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Birthday defaultValue="2023-01-01" />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DataRadio
                name="gender"
                label="Gender"
                data={[
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Female",
                    value: "female",
                  },
                  {
                    label: "Complicated",
                    value: "complicated",
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <DataRadio
                name="status"
                label="Marital Status"
                data={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DataSelect
                label="Ready to move"
                name="status"
                required={true}
                defaultValue="yes"
                data={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Source"
                name="user_name"
                required={true}
                defaultValue={"Source ne"}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Input
                label="Created by"
                name="user_name"
                required={true}
                defaultValue={"Quynh Thi"}
                disabled
              />
            </Col>
            <Col span={12}>
              <DataDatePicker name="createAt" label="Created on" disabled />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Input
                label="Email"
                name="user_name"
                required={true}
                defaultValue={"thanhbinh@lubrytics.com"}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Address"
                name="user_name"
                required={true}
                defaultValue={"ex: 2 Hai Trieu, Bitexco Financial Tower"}
              />
            </Col>
          </Row>

          <Row>
            <MultiSelect
              label="Position Applied"
              name="position"
              required={false}
              value={value}
              setValue={setValue}
              options={options}
            />
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
