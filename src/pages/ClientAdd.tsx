import Step from "../components/DataDisplay/Step";
import { Link } from "react-router-dom";
import { Col, Row, Button, Form } from "antd";

import Input from "../components/DataEntry/Input";
import DataSelect from "../components/DataEntry/Select";
import CoordinateSelect from "../components/DataEntry/CoordinateSelect";

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

const industryData: string[] = [
  "Corporate Strategy",
  "Legal",
  "Risk Management",
  "Corporate Communications",
];

const sectorData = {
  "Corporate Strategy": ["Investment Management", "Accounting"],
  Legal: ["Banking", "Insurance"],
  "Risk Management": ["Consulting", "Legal Services"],
  "Corporate Communications": ["Business Advisory", "Human Resources"],
};

const subsectorData = {
  "Investment Management": [
    "Asset Management",
    "Portfolio Management",
    "Wealth Management",
  ],
  Accounting: ["Audit Services", "Tax Advisory", "Financial Reporting"],
  Banking: ["Retail Banking", "Corporate Banking", "Investment Banking"],
  Insurance: [
    "Life Insurance",
    "Property and Casualty Insurance",
    "Reinsurance",
  ],
  Consulting: ["Management Consulting", "IT Consulting", "Strategy Consulting"],
  "Legal Services": ["Corporate Law", "Litigation", "Intellectual Property"],
  "Business Advisory": [
    "Business Planning",
    "Market Research",
    "Risk Assessment",
  ],
  "Human Resources": [
    "Talent Acquisition",
    "Employee Relations",
    "Training and Development",
  ],
  "Supply Chain Strategy": [
    "Network Design",
    "Risk Assessment",
    "Sustainability Planning",
  ],
  Logistics: ["Transportation", "Distribution", "Warehouse Management"],
  Procurement: ["Supplier Management", "Contract Negotiation", "Sourcing"],
  "Inventory Management": [
    "Stock Control",
    "Demand Forecasting",
    "Order Fulfillment",
  ],
  "Demand Planning": [
    "Forecast Accuracy Analysis",
    "Demand Sensing",
    "Collaborative Planning",
  ],
};

for (let i = 0; i < data.length; i++) {
  options.push({
    label: data[i],
    value: i.toString(),
  });
}

export default function ClientAdd() {
  // const [value, setValue] = useState<string[]>([]);

  return (
    <div className="px-12 pb-2">
      <div className="">
        <Link to={"/clients"}>Clients List</Link>
        <span> / Create Client</span>
      </div>

      <p className="mb-4 font-bold text-xl">Create Client</p>

      <Step
        current={0}
        data={["Client Information", "Contact Person", "Finish"]}
      />

      <div className="p-4 my-6 bg-white rounded-lg">
        <p className="mb-4 font-bold text-lg">Client Information</p>

        <Form layout="vertical" className="w-full">
          <Row gutter={16}>
            <Col span={12}>
              <Input
                label="Trade Name"
                name="full_name"
                required={true}
                defaultValue={""}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Client's Shortened Name"
                name="user_name"
                required={false}
                defaultValue={""}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Input
                label="Phone Number"
                name="user_name"
                required={true}
                defaultValue={""}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Fax"
                name="user_name"
                required={false}
                defaultValue={""}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DataSelect
                label="Lead consultant"
                name="status"
                required={true}
                defaultValue="1"
                data={[
                  { label: "Thanh Binh", value: "1" },
                  { label: "Test Marketing", value: "2" },
                  { label: "Hr Test", value: "3" },
                  { label: "Marketing Thy", value: "4" },
                  { label: "Marketing 1", value: "5" },
                  { label: "Hr Test", value: "6" },
                  { label: "Hr Thydo", value: "7" },
                  { label: "Hr Test", value: "8" },
                  { label: "Hr Thy", value: "9" },
                  { label: "Marketing Test", value: "10" },
                ]}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Tax code"
                name="user_name"
                required={true}
                defaultValue={""}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Input
                label="Email"
                name="user_name"
                defaultValue={"thanhbinh@lubrytics.com"}
              />
            </Col>
            <Col span={12}>
              <Input
                label="Address"
                name="user_name"
                defaultValue={"ex: 2 Hai Trieu, Bitexco Financial Tower"}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DataSelect
                label="Parent Company"
                name="status"
                required={true}
                defaultValue="1"
                data={[
                  { label: "SCHNEIDER ELECTRIC", value: "1" },
                  { label: "MEKONG CAPITAL", value: "2" },
                  { label: "GRAB", value: "3" },
                  { label: "FPT SOFTWARE", value: "4" },
                  { label: "EXXON MOBIL", value: "5" },
                ]}
              />
            </Col>
            <Col span={12}>
              <DataSelect
                label="Status"
                name="status"
                required={true}
                defaultValue="1"
                data={[
                  { label: "Active", value: "1" },
                  { label: "Blacklist", value: "2" },
                  { label: "Off-limit", value: "3" },
                  { label: "Inactive", value: "4" },
                ]}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <DataSelect
                label="CPA"
                name="status"
                defaultValue="1"
                data={[
                  { label: "Retained Plus", value: "1" },
                  { label: "Retained Minus", value: "2" },
                  { label: "New", value: "3" },
                  { label: "Prospecting", value: "4" },
                  { label: "Lost", value: "5" },
                ]}
              />
            </Col>
            <Col span={12}>
              <DataSelect
                label="Type"
                name="status"
                defaultValue="1"
                data={[
                  { label: "Type A", value: "1" },
                  { label: "Type B", value: "2" },
                  { label: "Type C", value: "3" },
                  { label: "Type D", value: "4" },
                ]}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <CoordinateSelect
                label="Industry"
                name="industry"
                firstData={industryData}
                secondData={sectorData}
                thirdData={subsectorData}
              />
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
