import React, { useState } from 'react';

// In production → absolute URL to the API worker
// In local dev  → Vite proxies /api/* to localhost:8787 (see vite.config.js)
const API_URL =
  import.meta.env.PROD
    ? 'https://dhandha-api.gauravkalal134.workers.dev/api/apply'
    : '/api/apply';

// ─── Constants ───────────────────────────────────────────────────────────────

const TRACKS = [
  {
    id: 'karkhana',
    label: 'KARKHANA',
    sub: 'Maker Track',
    desc: 'Build a physical or digital product. Validate fast, pre-sell before you produce.',
  },
  {
    id: 'sevadaata',
    label: 'SEVADAATA',
    sub: 'Skills Track',
    desc: 'Sell a skill or service. Zero capital needed. Start from what you already know.',
  },
];

const HOW_FOUND_OPTIONS = [
  'Twitter / X',
  'Instagram',
  'LinkedIn',
  'YouTube',
  'Friend / Word of mouth',
  'WhatsApp group',
  'College / University',
  'Google Search',
  'Podcast',
  'Other',
];

const TOTAL_STEPS = 3;

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, id, hint, required, error, children }) {
  return (
    <div className="apply-field">
      {label && (
        <label htmlFor={id} className="apply-label">
          {label}
          {required && <span className="apply-required" aria-hidden="true"> *</span>}
        </label>
      )}
      {hint && <p className="apply-field-hint">{hint}</p>}
      {children}
      {error && (
        <span className="apply-field-error" role="alert">{error}</span>
      )}
    </div>
  );
}

// ─── Step 1 · Who You Are ─────────────────────────────────────────────────────

function Step1({ data, onChange, errors }) {
  return (
    <div className="apply-step-body">
      <div className="apply-step-intro">
        <span className="apply-step-eyebrow">Step 1 of 3</span>
        <h3 className="apply-step-title">Who You Are</h3>
        <p className="apply-step-desc">
          Name, age, city, WhatsApp, email, what you do right now.
        </p>
      </div>

      <div className="apply-grid-2">
        <Field label="Full Name" id="full_name" required error={errors.full_name}>
          <input
            id="full_name"
            className={`apply-input ${errors.full_name ? 'is-error' : ''}`}
            type="text"
            placeholder="e.g. Arjun Sharma"
            value={data.full_name}
            onChange={e => onChange('full_name', e.target.value)}
            autoComplete="name"
          />
        </Field>

        <Field label="Age" id="age" required error={errors.age}>
          <input
            id="age"
            className={`apply-input ${errors.age ? 'is-error' : ''}`}
            type="number"
            min="13"
            max="60"
            placeholder="e.g. 21"
            value={data.age}
            onChange={e => onChange('age', e.target.value)}
          />
        </Field>
      </div>

      <div className="apply-grid-2">
        <Field label="Email Address" id="email" required error={errors.email}>
          <input
            id="email"
            className={`apply-input ${errors.email ? 'is-error' : ''}`}
            type="email"
            placeholder="name@example.com"
            value={data.email}
            onChange={e => onChange('email', e.target.value)}
            autoComplete="email"
          />
        </Field>

        <Field label="WhatsApp Number" id="whatsapp" required error={errors.whatsapp}>
          <input
            id="whatsapp"
            className={`apply-input ${errors.whatsapp ? 'is-error' : ''}`}
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={data.whatsapp}
            onChange={e => onChange('whatsapp', e.target.value)}
            autoComplete="tel"
          />
        </Field>
      </div>

      <div className="apply-grid-2">
        <Field label="City / Town" id="city" required error={errors.city}>
          <input
            id="city"
            className={`apply-input ${errors.city ? 'is-error' : ''}`}
            type="text"
            placeholder="e.g. Bangalore"
            value={data.city}
            onChange={e => onChange('city', e.target.value)}
          />
        </Field>

        <Field label="What do you do right now?" id="current_role" required error={errors.current_role}>
          <input
            id="current_role"
            className={`apply-input ${errors.current_role ? 'is-error' : ''}`}
            type="text"
            placeholder="e.g. Student / Working"
            value={data.current_role}
            onChange={e => onChange('current_role', e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}

// ─── Step 2 · Your Mindset ────────────────────────────────────────────────────

function Step2({ data, onChange, errors }) {
  return (
    <div className="apply-step-body">
      <div className="apply-step-intro">
        <span className="apply-step-eyebrow">Step 2 of 3</span>
        <h3 className="apply-step-title">Your Mindset</h3>
        <p className="apply-step-desc">
          Track choice + &ldquo;sell us something you&rsquo;ve sold&rdquo; + &ldquo;what will you cut to make 10 hrs/week&rdquo;.
        </p>
      </div>

      {/* Track selection */}
      <Field label="Choose your track" id="track" required error={errors.track}>
        <div className="apply-track-cards" role="radiogroup" aria-label="Track selection">
          {TRACKS.map(t => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={data.track === t.id}
              id={`track-${t.id}`}
              className={`apply-track-card ${data.track === t.id ? 'is-selected' : ''}`}
              onClick={() => onChange('track', t.id)}
            >
              <strong className="apply-track-name">{t.label}</strong>
              <span className="apply-track-sub">{t.sub}</span>
              <span className="apply-track-desc">{t.desc}</span>
            </button>
          ))}
        </div>
      </Field>

      <Field
        label="Sell us something you've sold in the past (or explain how you would sell it)"
        id="sold_story"
        required
        hint="Be honest and specific. What did you sell, to whom, and for how much?"
        error={errors.sold_story}
      >
        <textarea
          id="sold_story"
          className={`apply-textarea ${errors.sold_story ? 'is-error' : ''}`}
          rows={4}
          placeholder="Be honest and specific. What did you sell, to whom, and for how much?"
          value={data.sold_story}
          onChange={e => onChange('sold_story', e.target.value)}
        />
      </Field>

      <Field
        label="What will you cut from your routine to make 10 hours/week?"
        id="time_commitment"
        required
        error={errors.time_commitment}
      >
        <textarea
          id="time_commitment"
          className={`apply-textarea ${errors.time_commitment ? 'is-error' : ''}`}
          rows={3}
          placeholder="e.g. Reduce social media / skip college clubs / adjust weekend schedules..."
          value={data.time_commitment}
          onChange={e => onChange('time_commitment', e.target.value)}
        />
      </Field>

      <Field
        label="Tell us about your background, your life story. You can be as brief or as detailed as you want."
        id="background_story"
        required
        error={errors.background_story}
      >
        <textarea
          id="background_story"
          className={`apply-textarea ${errors.background_story ? 'is-error' : ''}`}
          rows={4}
          placeholder="Your story..."
          value={data.background_story}
          onChange={e => onChange('background_story', e.target.value)}
        />
      </Field>

      <Field
        label="Why should you be part of the founding cohort of Dhandha School?"
        id="why_apply"
        required
        error={errors.why_apply}
      >
        <textarea
          id="why_apply"
          className={`apply-textarea ${errors.why_apply ? 'is-error' : ''}`}
          rows={4}
          placeholder="Why you?"
          value={data.why_apply}
          onChange={e => onChange('why_apply', e.target.value)}
        />
      </Field>
    </div>
  );
}

// ─── Step 3 · The Handshake ───────────────────────────────────────────────────

function Step3({ data, onChange, errors }) {
  const toggleHowFound = (option) => {
    const current = data.how_found;
    const updated = current.includes(option)
      ? current.filter(o => o !== option)
      : [...current, option];
    onChange('how_found', updated);
  };

  return (
    <div className="apply-step-body">
      <div className="apply-step-intro">
        <span className="apply-step-eyebrow">Step 3 of 3</span>
        <h3 className="apply-step-title">The Handshake</h3>
        <p className="apply-step-desc">
          How you found us + live-attendance and checkpoint commitments. Fee shown, payable only if selected.
        </p>
      </div>

      {/* How found — multi-select pills */}
      <Field
        label="Where did you hear about Dhandha School?"
        id="how_found"
        hint="(tick all that apply)"
        required
        error={errors.how_found}
      >
        <div className="apply-pills" role="group" aria-label="How did you find us">
          {HOW_FOUND_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              id={`how-found-${opt.replace(/\W+/g, '-').toLowerCase()}`}
              className={`apply-pill ${data.how_found.includes(opt) ? 'is-selected' : ''}`}
              aria-pressed={data.how_found.includes(opt)}
              onClick={() => toggleHowFound(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </Field>

      {/* Commitments */}
      <div className="apply-commitments">
        <p className="apply-commit-title">Commitments</p>

        <label className={`apply-check-row ${errors.attend_commit ? 'is-error' : ''}`}>
          <input
            id="attend_commit"
            type="checkbox"
            className="apply-checkbox"
            checked={data.attend_commit}
            onChange={e => onChange('attend_commit', e.target.checked)}
          />
          <span>
            I commit to <strong>attending live sessions</strong> and collaborating with cohort members.
          </span>
        </label>
        {errors.attend_commit && (
          <span className="apply-field-error" role="alert">{errors.attend_commit}</span>
        )}

        <label className={`apply-check-row ${errors.checkpoint_commit ? 'is-error' : ''}`}>
          <input
            id="checkpoint_commit"
            type="checkbox"
            className="apply-checkbox"
            checked={data.checkpoint_commit}
            onChange={e => onChange('checkpoint_commit', e.target.checked)}
          />
          <span>
            I commit to <strong>completing weekly checkpoints</strong> for my selected track alone.
          </span>
        </label>
        {errors.checkpoint_commit && (
          <span className="apply-field-error" role="alert">{errors.checkpoint_commit}</span>
        )}
      </div>

      {/* Fee box */}
      <div className="apply-fee-note">
        <div className="apply-fee-inner">
          <p className="apply-fee-label">Program Fee</p>
          <div className="apply-fee-price">
            <span className="apply-fee-struck">&#8377;14,999</span>
            <span className="apply-fee-badge">Free to Apply</span>
          </div>
          <p className="apply-fee-sub">First Cohort is Completely Free.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen({ submissionId }) {
  return (
    <div className="apply-success">
      <div className="apply-success-icon" aria-hidden="true">&#10003;</div>
      <h3 className="apply-success-title">Application received.</h3>
      <p className="apply-success-body">
        We read every application personally. If you&rsquo;re a fit, we&rsquo;ll reach out on WhatsApp within 5&ndash;7 days.
      </p>
      <p className="apply-success-id">
        Reference: <code>{submissionId}</code>
      </p>
    </div>
  );
}

// ─── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ step }) {
  return (
    <div className="apply-progress" aria-label={`Step ${step} of ${TOTAL_STEPS}`}>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <div
          key={i}
          className={`apply-progress-seg ${i < step ? 'is-done' : ''}`}
        />
      ))}
    </div>
  );
}

// ─── Initial state ─────────────────────────────────────────────────────────────

const INITIAL_DATA = {
  // Step 1
  full_name: '', age: '', email: '', whatsapp: '', city: '', current_role: '',
  // Step 2
  track: '', sold_story: '', time_commitment: '', background_story: '', why_apply: '',
  // Step 3
  how_found: [], attend_commit: false, checkpoint_commit: false,
};

// ─── Main component ────────────────────────────────────────────────────────────

export default function Apply() {
  const [step, setStep]             = useState(1);
  const [data, setData]             = useState(INITIAL_DATA);
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError]     = useState('');
  const [submissionId, setSubmissionId] = useState(null);

  const onChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // ── Per-step validation ────────────────────────────────────────────────────

  function validateStep(s) {
    const e = {};
    if (s === 1) {
      if (!data.full_name.trim())    e.full_name    = 'Please enter your name.';
      const age = Number(data.age);
      if (!data.age)                 e.age          = 'Please enter your age.';
      else if (age < 13 || age > 60) e.age          = 'Age must be between 13 and 60.';
      if (!data.email.trim())        e.email        = 'Please enter your email.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
                                     e.email        = 'Please enter a valid email.';
      if (!data.whatsapp.trim())     e.whatsapp     = 'Please enter your WhatsApp number.';
      if (!data.city.trim())         e.city         = 'Please enter your city.';
      if (!data.current_role.trim()) e.current_role = 'Please describe what you do.';
    }
    if (s === 2) {
      if (!data.track)               e.track            = 'Please choose a track.';
      if (!data.sold_story.trim())   e.sold_story       = 'Please answer this question.';
      if (!data.time_commitment.trim()) e.time_commitment = 'Please answer this question.';
      if (!data.background_story.trim()) e.background_story = 'Please tell us your story.';
      if (!data.why_apply.trim())    e.why_apply        = 'Please answer this question.';
    }
    if (s === 3) {
      if (data.how_found.length === 0) e.how_found    = 'Please select at least one option.';
      if (!data.attend_commit)          e.attend_commit = 'Please confirm this commitment.';
      if (!data.checkpoint_commit)      e.checkpoint_commit = 'Please confirm this commitment.';
    }
    return e;
  }

  const next = () => {
    const errs = validateStep(step);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const back = () => {
    setErrors({});
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async () => {
    const errs = validateStep(3);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setApiError('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          age: Number(data.age),
          // how_found is already an array — pass as-is
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(
          result.error ||
          (Array.isArray(result.errors) ? result.errors.join(', ') : 'Something went wrong.'),
        );
      }

      setSubmissionId(result.submission_id);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <p className="pagebreak-label">Separate page &middot; /apply</p>
      <div className="frame pagebreak" style={{ marginTop: '12px' }}>
        <span className="tag">/apply &middot; Application</span>

        <h2 style={{ fontSize: '28px' }}>Apply for Cohort 1</h2>
        <p className="sub" style={{ marginTop: '10px' }}>
          This is an application, not a checkout. We read every answer personally. About 5 minutes.
          Honest and specific beats polished and vague.
        </p>

        {submissionId ? (
          <SuccessScreen submissionId={submissionId} />
        ) : (
          <div className="apply-form">
            <ProgressBar step={step} />

            <form onSubmit={e => e.preventDefault()} noValidate aria-label="Cohort 1 application form">
              {step === 1 && <Step1 data={data} onChange={onChange} errors={errors} />}
              {step === 2 && <Step2 data={data} onChange={onChange} errors={errors} />}
              {step === 3 && <Step3 data={data} onChange={onChange} errors={errors} />}

              {apiError && (
                <div className="apply-api-error" role="alert">{apiError}</div>
              )}

              <div className="apply-nav">
                {step > 1 && (
                  <button
                    type="button"
                    id="apply-back-btn"
                    className="apply-btn-back"
                    onClick={back}
                    disabled={submitting}
                  >
                    Back
                  </button>
                )}

                {step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    id="apply-next-btn"
                    className="apply-btn-next"
                    onClick={next}
                  >
                    Next Step &rarr;
                  </button>
                ) : (
                  <button
                    type="button"
                    id="apply-submit-btn"
                    className="apply-btn-submit"
                    onClick={submit}
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting\u2026' : 'Submit Application'}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <span className="note">
          <b>NOTE</b> Multi-step form &middot; no payment on this page.
        </span>
      </div>
    </>
  );
}
