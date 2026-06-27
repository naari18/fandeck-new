export default function RoundView({ currentPair, roundNumber, totalRounds, onVote, onExit }) {
  const isFinal = roundNumber === totalRounds;
  const [s1, s2] = currentPair;

  return (
    <div className="round-view">
      <div className="round-header">
        <span className="round-brand">Family Decision</span>
        <button className="btn-exit" onClick={onExit}>Exit</button>
      </div>
      <div className="round-progress-section">
        <span className="round-label">
          {isFinal ? '🏆 Final Round' : `Round ${roundNumber} of ${totalRounds}`}
        </span>
        <div className="round-dots">
          {Array.from({ length: totalRounds }, (_, i) => (
            <span
              key={i}
              className={`round-dot ${
                i < roundNumber - 1 ? 'done' : i === roundNumber - 1 ? 'current' : ''
              }`}
            />
          ))}
        </div>
      </div>

      <div className="round-arena">
        <div className="candidate-card" onClick={() => onVote(s1)}>
          <div className="candidate-swatch" style={{ background: s1.shadeHexCode }} />
          <div className="candidate-info">
            <span className="candidate-name">{s1.entityName}</span>
            <span className="candidate-code">{s1.entityCode}</span>
          </div>
          <button className="btn-prefer" onClick={(e) => { e.stopPropagation(); onVote(s1); }}>
            👍 I prefer this
          </button>
        </div>
        <div className="vs-divider"><span className="vs-text">VS</span></div>
        <div className="candidate-card" onClick={() => onVote(s2)}>
          <div className="candidate-swatch" style={{ background: s2.shadeHexCode }} />
          <div className="candidate-info">
            <span className="candidate-name">{s2.entityName}</span>
            <span className="candidate-code">{s2.entityCode}</span>
          </div>
          <button className="btn-prefer" onClick={(e) => { e.stopPropagation(); onVote(s2); }}>
            👍 I prefer this
          </button>
        </div>
      </div>

      <button
        className="btn-skip"
        onClick={() => onVote(Math.random() > 0.5 ? s1 : s2)}
      >
        Skip this round &rsaquo;
      </button>
    </div>
  );
}
