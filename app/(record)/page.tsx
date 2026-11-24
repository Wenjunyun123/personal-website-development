import type { Metadata } from "next";
import { RecordHome } from "../../components/record/record-home";

export const metadata: Metadata = {
  title: "游文君 | 交付记录 / The Delivery Record",
  description:
    "AI 应用交付工程师（FDE）游文君的个人交付记录：企业智能客服与资料查询、数据迁移、插件发布治理，以及可核查的公开证据。",
  alternates: { canonical: "/" }
};

export default function HomePage() {
  return <RecordHome />;
}
