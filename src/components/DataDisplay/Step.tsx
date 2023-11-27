import { Steps } from "antd";

interface iData {
  current: number;
  data: string[];
}

export default function Step({ current, data }: iData) {
  const stepData: { title: string }[] = data.map((item: string) => ({
    title: item,
  }));
  return <Steps current={current} items={stepData} />;
}
