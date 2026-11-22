import type { Metadata } from "next";
import { SelectedWork } from "../../components/portfolio/portfolio-pages";

export const metadata: Metadata = { title: "Selected work | Wenjun You", description: "企业智能客服、产品知识工程、数据迁移与业务看板等 FDE 交付项目。" };
export default function SelectedPage() { return <SelectedWork />; }
