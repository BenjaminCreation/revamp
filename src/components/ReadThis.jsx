import React from 'react';

export default function ReadThis({ navigate }) {
  return (
    <>
      <p className="pagebreak-label">Separate page · /read-this · optional</p>
      <div className="frame pagebreak" id="readthis" style={{ marginTop: '12px' }}>
        <span className="tag">/read-this · Evidence</span>
        <h2 style={{ fontSize: '30px' }}>Still not convinced? Good. Check our homework.</h2>
        <p className="mono" style={{ fontSize: '12.5px', color: 'var(--ink-soft)' }}>
          4 facts · all public · all sourced · 2 minutes
        </p>

        <div className="fact">
          <span className="stat">29.1%</span>
          <h3>The more degrees, the more unemployment.</h3>
          <p>29.1% of Indian graduates are unemployed. Among those who never went to school: 3.4%.</p>
          <p className="src mono">India Employment Report 2024 · ILO + Institute for Human Development</p>
          <p className="means">The exam ladder gets more crowded at every rung, and the top rung doesn't pay.</p>
        </div>

        <div className="fact">
          <span className="stat">−13%</span>
          <h3>AI is pulling up the ladder's bottom rung.</h3>
          <p>
            Stanford economists tracked millions of payroll records: employment for 22-25 year olds in AI-exposed jobs fell 13% after generative AI arrived. Older workers in the same jobs held steady.
          </p>
          <p className="src mono">"Canaries in the Coal Mine" · Brynjolfsson, Chandar, Chen · Stanford, 2025</p>
          <p className="means">The entry-level job you're preparing for may not exist by the time you're done preparing.</p>
        </div>

        <div className="fact">
          <span className="stat">6.3 Cr+</span>
          <h3>India already runs on dhandha. Untrained dhandha.</h3>
          <p>
            India has over 6.3 crore MSMEs; Udyam registrations crossed 7.8 crore in Feb 2026. Almost all are first-generation owners with zero formal business training.
          </p>
          <p className="src mono">Ministry of MSME · PIB · Feb 2026</p>
          <p className="means">That's not a statistic. That's a customer list.</p>
        </div>

        <div className="fact">
          <span className="stat">58.4%</span>
          <h3>The salaried job is the exception, not the rule.</h3>
          <p>58.4% of working Indians are self-employed. Only 21.7% earn a regular salary.</p>
          <p className="src mono">Periodic Labour Force Survey 2023-24 · MoSPI</p>
          <p className="means">Most of India already works for itself. Nobody teaches how to do it well.</p>
        </div>

        <div className="exam-math mono">
          The exam math &nbsp;·&nbsp; JEE: ~15,00,000 candidates → 18,951 IIT seats &nbsp;·&nbsp; CAT: ~3,50,000 → ~8,400 seats &nbsp;·&nbsp; UPSC: ~10,00,000 → ~1,000 posts
        </div>

        <div className="cta-center" style={{ marginTop: '20px' }}>
          <a 
            className="btn" 
            href="/apply"
            onClick={(e) => {
              e.preventDefault();
              navigate('/apply');
            }}
          >
            Convinced? Apply for Cohort 1
          </a>
        </div>
      </div>
    </>
  );
}
