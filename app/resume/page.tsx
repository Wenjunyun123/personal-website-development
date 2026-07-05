export const metadata = {
  title: "Resume | Wenjun You"
};

export default function ResumePage() {
  return (
    <main className="page-shell">
      <article className="case-page">
        <p className="kicker">Resume / public summary</p>
        <h1>Resume</h1>
        <div className="case-meta">
          <span className="badge">Wenjun You</span>
          <span className="badge">AI Delivery Engineer</span>
          <span className="badge">FDE</span>
        </div>

        <section className="case-spine" aria-label="Resume summary">
          <article>
            <h2>Positioning</h2>
            <p>
              AI application frontend and Agent workflow engineer who turns business needs into plugin interfaces,
              automation flows, release verification, and handoff evidence.
            </p>
          </article>
          <article>
            <h2>Experience</h2>
            <p>
              Shanghai Yichong Technology, Shanghai Yimu Furniture, and Shanghai Kaichun Industry experience across AI
              plugin delivery, Feishu Base automation, product-image generation, ETL, and data-quality workflows.
            </p>
          </article>
          <article>
            <h2>Skills</h2>
            <p>
              TypeScript, React, JavaScript, Python, SQL, Node.js, FastAPI, MCP, Agent workflows, RAG, n8n, Coze, Dify,
              Feishu/Lark ecosystem, GitHub collaboration, and package validation.
            </p>
          </article>
          <article>
            <h2>Education</h2>
            <p>
              Shanghai Sanda University, E-commerce undergraduate, with integrated circuit application technology minor
              and coursework across NLP, deep learning, machine learning, data structures, databases, UX, and prototyping.
            </p>
          </article>
        </section>
      </article>
    </main>
  );
}
