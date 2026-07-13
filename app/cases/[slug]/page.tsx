import { notFound } from "next/navigation";
import { CaseDetail } from "../../../components/case-detail";
import { cases } from "../../../content/cases";

type CasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return cases.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: CasePageProps) {
  const { slug } = await params;
  const caseStudy = cases.find((item) => item.slug === slug);

  if (!caseStudy) {
    return {};
  }

  return {
    title: `${caseStudy.title} | Wenjun You`
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseStudy = cases.find((item) => item.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return <CaseDetail caseStudy={caseStudy} />;
}
