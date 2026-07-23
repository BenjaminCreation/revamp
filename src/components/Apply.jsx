import React from 'react';

export default function Apply() {
  return (
    <>
      <p className="pagebreak-label">Separate page · /apply</p>
      <div className="frame pagebreak" style={{ marginTop: '12px' }}>
        <span className="tag">/apply · Application</span>
        <h2 style={{ fontSize: '28px' }}>Apply for Cohort 1</h2>
        <p className="sub" style={{ marginTop: '10px' }}>
          This is an application, not a checkout. We read every answer personally. About 5 minutes. Honest and specific beats polished and vague.
        </p>
        <div className="steps">
          <div className="card">
            <span className="num mono">Step 1</span>
            <h3>Who you are</h3>
            <p>Name, age, city, WhatsApp, email, what you do right now.</p>
          </div>
          <div className="card">
            <span className="num mono">Step 2</span>
            <h3>The filter</h3>
            <p>Track choice + "sell us something you've sold" + "what will you cut to make 10 hrs/week".</p>
          </div>
          <div className="card">
            <span className="num mono">Step 3</span>
            <h3>The handshake</h3>
            <p>How you found us + live-attendance and checkpoint commitments. Fee shown, payable only if selected.</p>
          </div>
        </div>
        <span className="note">
          <b>NOTE</b> Full field-by-field spec unchanged from v1 playbook, section 4. Multi-step native form, autosave, no payment on this page.
        </span>
      </div>
    </>
  );
}
