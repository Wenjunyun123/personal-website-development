import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioNotes, portfolioWork } from "../../../content/portfolio";
import { PortfolioArticle } from "../../../components/portfolio/portfolio-pages";

const stories = [...portfolioWork, ...portfolioNotes];
export function generateStaticParams() { return stories.map(story => ({ slug: story.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find(item => item.slug === slug);
  return story ? { title: `${story.title} | Wenjun You`, description: story.summaryZh } : {};
}
export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories.find(item => item.slug === slug);
  if (!story) notFound();
  return <PortfolioArticle story={story} />;
}
