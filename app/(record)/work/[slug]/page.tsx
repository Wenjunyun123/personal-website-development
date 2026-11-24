import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecordCase } from "../../../../components/record/record-case";
import { getIndexRecord, indexRecords } from "../../../../content/records";

export const dynamicParams = false;

export function generateStaticParams() {
  return indexRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = getIndexRecord(slug);

  if (!record) return {};

  return {
    title: `${record.titleZh} | 游文君 Wenjun You`,
    description: record.summaryZh,
    alternates: { canonical: record.canonicalHref }
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = getIndexRecord(slug);

  if (!record) notFound();

  return <RecordCase record={record} />;
}
