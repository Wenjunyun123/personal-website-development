import type { Metadata } from "next";
import { Explorations } from "../../components/portfolio/portfolio-pages";

export const metadata: Metadata = { title: "Explorations | Wenjun You", description: "FDE 交付方法、架构评审、开源贡献与工作经历。" };
export default function ExplorationsPage() { return <Explorations />; }
