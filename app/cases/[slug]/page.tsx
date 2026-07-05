import { notFound } from "next/navigation";
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

  return (
    <main className="page-shell">
      <article className="case-page">
        <p className="kicker">Project case / {caseStudy.role}</p>
        <h1>{caseStudy.title}</h1>
        <div className="case-meta">
          <span className="badge">{caseStudy.evidenceStatus}</span>
          {caseStudy.platforms.map((platform) => (
            <span className="badge" key={platform}>
              {platform}
            </span>
          ))}
        </div>

        <section className="case-spine" aria-label="Case study spine">
          <article>
            <h2>Problem</h2>
            <p>{caseStudy.problem}</p>
          </article>
          <article>
            <h2>Product decision</h2>
            <p>{caseStudy.productDecision}</p>
          </article>
          <article>
            <h2>Interface</h2>
            <p>{caseStudy.interface}</p>
          </article>
          <article>
            <h2>Technical build</h2>
            <p>{caseStudy.technicalBuild}</p>
          </article>
          <article>
            <h2>Outcome</h2>
            <p>{caseStudy.outcome}</p>
          </article>
        </section>
      </article>
    </main>
  );
}
