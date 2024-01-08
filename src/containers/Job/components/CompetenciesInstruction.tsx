import { Table } from "antd";

export default function CompetenciesInstruction() {
  const dataSource = [
    {
      key: "1",
      com: "ACTION ORIENTATION",
      be: "Readiness to make decisions, take initiative and initiate action.",
    },
    {
      key: "2",
      com: "COMMERCIAL AWARENESS",
      be: "Sees issues in terms of costs, time, profits, markets and added value.",
    },
    {
      key: "3",
      com: "CREATIVITY & INNOVATION",
      be: "Creates new and different approaches to work issues. Willingness to be constructively critical of traditional assumptions",
    },
    {
      key: "4",
      com: "DRIVE & RESILIENCE",
      be: "Maintains effective work behaviour in face of setbacks or pressure. Stays calm, stable and in control of themselves.",
    },
    {
      key: "5",
      com: "FLEXIBILITY",
      be: "Successfully adapts to changing demands and conditions.",
    },
    {
      key: "6",
      com: "INTERPERSONAL SENSITIVITY",
      be: "Works with others well, in an effective and sensitive way. Respects others.",
    },
    {
      key: "7",
      com: "LEADERSHIP",
      be: "Empowers and motivates others to reach both theirs and the organisations goals.",
    },
    {
      key: "8",
      com: "ORAL COMMUNICATION",
      be: "Speaks clearly, fluently and effectively to both individuals and groups.",
    },
    {
      key: "9",
      com: "PERSONAL MOTIVATION",
      be: "Shows enthusiasm, career commitment, and works hard towards goals.",
    },
    {
      key: "10",
      com: "PERSUASIVENESS",
      be: "Influences, convinces and impresses others in manner that results in agreement, acceptance or behavioural change.",
    },
    {
      key: "11",
      com: "PLANNING & ORGANISATION",
      be: "Effectively organises and schedules events and resources. Establishes and uses systems to monitor plans and timescales.",
    },
    {
      key: "12",
      com: "PROBLEM SOLVING & ANALYSIS",
      be: "Analyses issues and breaks them down into component parts. Demonstrates ability to make rational judgements on relevant information.",
    },
    {
      key: "13",
      com: "QUALITY ORIENTATION",
      be: "Demonstrates awareness of goals and standards. Follows through to ensure standards met.",
    },
    {
      key: "14",
      com: "SPECIALIST KNOWLEDGE",
      be: "Understands professional and technical aspects of work. Maintains that knowledge.",
    },
    {
      key: "15",
      com: "STRATEGIC",
      be: "Shows broad based view of issues, their long-term impact and wider implications. Demonstrates ability to think beyond existing issues into the future.",
    },
    {
      key: "16",
      com: "WRITTEN COMMUNICATION",
      be: "Writes in clear, concise manner, using appropriate grammar, language and style for readers.",
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      width: "2%",
    },
    {
      title: "COMPETENCY",
      dataIndex: "com",
      key: "com",
      width: "5%",
    },
    {
      title: "BEHAVIOUR LOOKED FOR",
      dataIndex: "be",
      key: "be",
      width: "15%",
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      scroll={{ x: true, y: 240 }}
    />
  );
}
