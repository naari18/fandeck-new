export default function FeatureCard({ open, onDismiss, onReopen, hasTray, shortlistCount, onStart }) {
  if (!open) {
    return (
      <button
        className={`feature-pill ${hasTray ? 'above-tray' : ''}`}
        onClick={onReopen}
        title="Family Decision Mode"
      >
        👨‍👩‍👧‍👦
        {shortlistCount >= 2 && <span className="pill-ready">Vote now!</span>}
        {shortlistCount === 1 && <span className="pill-progress">1/4</span>}
      </button>
    );
  }

  return (
    <div className={`feature-card ${hasTray ? 'above-tray' : ''}`}>
      <button className="feature-dismiss" onClick={onDismiss}>×</button>
      <div className="feature-header">
        <span className="feature-icon">👨‍👩‍👧‍👦</span>
        <div>
          <h4>Family Decision Mode</h4>
          <p>Pick shades together, vote &amp; reveal everyone's favourite</p>
        </div>
      </div>
      <div className="feature-steps">
        <div className="fstep"><span>🎨</span><span>Pick 2–4</span></div>
        <span className="fstep-arrow">›</span>
        <div className="fstep"><span>👍</span><span>Family votes</span></div>
        <span className="fstep-arrow">›</span>
        <div className="fstep"><span>🏆</span><span>Winner!</span></div>
      </div>
      {shortlistCount >= 2
        ? <button className="feature-start-btn" onClick={onStart}>Start Family Vote →</button>
        : <p className="feature-nudge">Tap any strip below to begin</p>}
    </div>
  );
}
