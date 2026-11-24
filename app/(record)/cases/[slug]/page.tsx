import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecordCase } from "../../../../components/record/record-case";
import { caseRecords, getCaseRecord } from "../../../../content/records";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = getCaseRecord(slug);

  if (!record) return {};

  return {
    title: `${record.titleZh} | 游文君 Wenjun You`,
    description: record.summaryZh,
    alternates: { canonical: record.canonicalHref }
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = getCaseRecord(slug);

  if (!record) notFound();

  return <RecordCase record={record} />;
}
