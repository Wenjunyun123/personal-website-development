import type { Metadata } from "next";
import { RecordIndex } from "../../../components/record/record-index";

export const metadata: Metadata = {
  title: "精选项目 | 游文君 Wenjun You",
  description:
    "游文君的精选项目索引：企业智能客服与 AI 资料查询、企业数据迁移、测评工具修复、插件发布治理与架构笔记。",
  alternates: { canonical: "/selected/" }
};

export default function SelectedPage() {
  return <RecordIndex variant="selected" />;
}
