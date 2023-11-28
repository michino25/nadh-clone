import { useParams, Link } from "react-router-dom";
import { Anchor, Col, Row, Button, Form, Timeline, Collapse } from "antd";
import type { CollapseProps } from "antd";
import React, { useEffect, useState } from "react";

import Table from "../components/DataDisplay/Table";
import Image from "../components/DataDisplay/Image";

import DataUpload from "../components/DataEntry/Upload";
import TextArea from "../components/DataEntry/TextArea";
import Input from "../components/DataEntry/Input";
import DataSelect from "../components/DataEntry/Select";
import Birthday from "../components/DataEntry/Birthday";
import DataRadio from "../components/DataEntry/Radio";
import DataDatePicker from "../components/DataEntry/DatePicker";
import MultiSelect from "../components/DataEntry/MultiSelect";
import BackToTopButton from "../components/BackToTopButton";

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

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: (
      <div>
        <strong>J-000376 - Accounting Assistant</strong>
        <p>THI TEST 5 - C-000159</p>
      </div>
    ),
    children: (
      <Timeline
        items={[
          {
            color: "green",
            children: (
              <>
                <strong>Rejected by NADH</strong>
                <p>05/04/2023 16:07:30</p>
                <p>0 comments</p>
              </>
            ),
          },
          {
            color: "green",
            children: (
              <>
                <strong>Placement</strong>
                <p>05/04/2023 16:07:30</p>
                <p>0 comments</p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  {
    key: "2",
    label: (
      <div>
        <strong>J-000376 - Accounting Assistant</strong>
        <p>THI TEST 5 - C-000159</p>
      </div>
    ),
    children: (
      <Timeline
        items={[
          {
            color: "green",
            children: (
              <>
                <strong>Rejected by NADH</strong>
                <p>05/04/2023 16:07:30</p>
                <p>0 comments</p>
              </>
            ),
          },
          {
            color: "green",
            children: (
              <>
                <strong>Placement</strong>
                <p>05/04/2023 16:07:30</p>
                <p>0 comments</p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  {
    key: "3",
    label: (
      <div>
        <strong>J-000376 - Accounting Assistant</strong>
        <p>THI TEST 5 - C-000159</p>
      </div>
    ),
    children: (
      <Timeline
        items={[
          {
            color: "green",
            children: "Create a services site 2015-09-01",
          },
          {
            color: "green",
            children: (
              <>
                <strong>Solve initial network problems 1</strong>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </>
            ),
          },
        ]}
      />
    ),
  },
];

export default function Candidates() {
  const { id } = useParams();
  const topRef = React.useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState<number>();

  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);

  return (
    <>
      <BackToTopButton />
      <div className="fixed z-40 bg-gray-100 top-24 left-0 right-0 px-8 pb-2 pt-4">
        <Anchor
          className=""
          direction="horizontal"
          targetOffset={targetOffset}
          items={[
            {
              key: "part-1",
              href: "#part-1",
              title: "Personal Information",
            },
            {
              key: "part-2",
              href: "#part-2",
              title: "Skills and Industry",
            },
            {
              key: "part-3",
              href: "#part-3",
              title: "Attachments",
            },
          ]}
        />
        <div className="py-1">
          <Link to={"/candidates"}>Candidates List</Link>
          <span>
            {" "}
            / CDD-000777 - THANH NAM PHAN33 - ACTIVE - REJECTED BY NADH
          </span>
        </div>
      </div>
      <div className="flex w-full p-5">Detail {id}</div>
      <div className="px-8 my-5">
        <div className="flex">
          <div className="flex-col w-2/3 space-y-4">
            <div id="part-1" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Overview</p>
              <TextArea label="" placeholder="54524" />
            </div>
            <div id="part-2" className="p-4 bg-white rounded-lg">
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
                    <Birthday day="01" month="01" year="2023" />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <DataRadio
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
                    <DataDatePicker label="Created on" disabled />
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
            <div id="part-3" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Skills And Industry</p>
              <Table />
            </div>
            <div id="part-4" className="p-4 bg-white rounded-lg">
              <p className="mb-4 font-bold text-lg">Attachments</p>
              <div className="flex space-x-2">
                <Image
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  size={100}
                />
                <DataUpload label="" />
              </div>
            </div>
          </div>
          <div className="w-1/3 ml-4">
            <div className="bg-white flex-col p-4 rounded-lg">
              <p className="mb-4 font-bold text-lg">Interview Loop</p>
              <Collapse accordion items={items} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
