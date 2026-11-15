const modules = [
  {
    number: "01",
    title: "Community workspace",
    description: "A structured space for community-managed records and activity.",
    status: "Planned",
  },
  {
    number: "02",
    title: "Governance records",
    description: "Organise governance documents and representative records.",
    status: "Planned",
  },
  {
    number: "03",
    title: "Evidence portfolio",
    description: "Catalogue supporting documents with source and verification notes.",
    status: "Planned",
  },
  {
    number: "04",
    title: "Access and permissions",
    description: "Prepare controlled, purpose-specific access workflows.",
    status: "Planned",
  },
  {
    number: "05",
    title: "Objections and complaints",
    description: "Track concerns through confidential review workflows.",
    status: "Planned",
  },
  {
    number: "06",
    title: "Audit and export",
    description: "Support accountable activity records and portable exports.",
    status: "Planned",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <div className="notice" role="note">
        <strong>Prototype environment</strong>
        <span>
          Synthetic demonstration data only. Do not enter real community,
          customary, cultural, biological or sensitive personal information.
        </span>
      </div>

      <header className="site-header">
        <a className="brand" href="/" aria-label="BCSE home">
          <span className="brand-mark">B</span>
          <span>
            <strong>BCSE</strong>
            <small>COMMUNITY RIGHTS REGISTRY</small>
          </span>
        </a>
        <span className="environment-tag">FOUNDATION PREVIEW</span>
      </header>

      <section className="hero">
        <p className="eyebrow">OUR HERITAGE. OUR AUTHORITY. OUR FUTURE.</p>
        <h1>Community records.<br /><em>Community authority.</em></h1>
        <p className="hero-copy">
          A digital workspace concept for organising governance records,
          supporting evidence and community-controlled permissions — while
          keeping decision-making authority with communities.
        </p>
        <div className="hero-actions">
          <a className="primary-link" href="#modules">Explore the foundation <span aria-hidden="true">→</span></a>
          <span className="phase-label">Batch 0 · In development</span>
        </div>
      </section>

      <section className="principle-strip" aria-label="Product principles">
        <div><span>01</span><strong>Community authority</strong><small>Communities retain control over their decisions and heritage.</small></div>
        <div><span>02</span><strong>Evidence, not verdicts</strong><small>Records organise information; they do not determine legal ownership.</small></div>
        <div><span>03</span><strong>Privacy by design</strong><small>Restricted information is not public by default.</small></div>
      </section>

      <section className="modules" id="modules">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE FIRST PRODUCT</p>
            <h2>Registry foundations</h2>
          </div>
          <p>Six connected capabilities, developed in controlled stages.</p>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <article className="module-card" key={module.number}>
              <span className="module-number">{module.number}</span>
              <div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
              <span className="module-status">{module.status}</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p><strong>BCSE</strong> · Community Rights Registry</p>
        <p>
          BCSE is not a land-title authority, legal adjudicator or statutory
          registry. This prototype does not verify ownership, representation
          or consent.
        </p>
      </footer>
    </main>
  );
}
