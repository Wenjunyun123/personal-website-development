import type { Metadata } from "next";
import { RecordIndex } from "../../../components/record/record-index";

export const metadata: Metadata = {
  title: "经历与实践 | 游文君 Wenjun You",
  description:
    "游文君的技术判断、架构笔记、公开代码贡献与工作经历：从飞书生态到 Agent 工作流与企业 AI 应用交付。",
  alternates: { canonical: "/explorations/" }
};

export default function ExplorationsPage() {
  return <RecordIndex variant="explorations" />;
}
