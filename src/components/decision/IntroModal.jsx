export default function IntroModal({ onStart, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="intro-modal">
        <div className="intro-illustration">👨‍👩‍👧‍👦</div>
        <h2>Choose together, decide better <span className="heart">♡</span></h2>
        <p className="intro-sub">
          Start a family decision session and find the perfect shade everyone loves.
        </p>
        <ul className="intro-checks">
          <li><span className="check-icon">✓</span> No sign up required</li>
          <li><span className="check-icon">✓</span> Works offline on this device</li>
          <li><span className="check-icon">✓</span> Fun &amp; easy for everyone</li>
        </ul>
        <button className="btn-decision" onClick={onStart}>
          <span>👨‍👩‍👧‍👦</span> Start Family Decision
        </button>
        <button className="btn-text-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
