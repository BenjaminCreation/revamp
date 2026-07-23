import React from 'react';

export default function Beliefs() {
  return (
    <div className="frame">
      <span className="tag">Home · 03 · What we believe</span>
      <h2 style={{ fontSize: '28px' }}>Four things we hold to be true.</h2>
      <div className="grid2">
        <div className="card">
          <span className="num mono">01</span>
          <h3>Wealth comes from ownership.</h3>
          <p>Nobody gets truly rich on a salary. Look at any rich list: it's people who built and owned businesses. A job pays your bills. Ownership buys your freedom.</p>
        </div>
        <div className="card">
          <span className="num mono">02</span>
          <h3>There is no right age.</h3>
          <p>16 or 45, the market doesn't check your birth certificate. It checks whether someone will pay for what you made. You can start today.</p>
        </div>
        <div className="card">
          <span className="num mono">03</span>
          <h3>You don't need a degree. You need the basics.</h3>
          <p>Marketing, strategy, finance: enough to get moving. That takes weeks, not years. The rest you learn on the business, while running it.</p>
        </div>
        <div className="card">
          <span className="num mono">04</span>
          <h3>Your network is the moat.</h3>
          <p>Survival depends most on the people around your business: customers who trust you, founders who've seen your problem, one senior who picks up your call. AI can write your ads. It cannot build your relationships.</p>
        </div>
      </div>
    </div>
  );
}
