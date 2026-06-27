import { CONFETTI } from '../../utils/constants';
import { downloadShareCard } from '../../utils/shareCard';

export default function WinnerView({ champion, totalRounds, onExit, onReset }) {
  return (
    <div className="winner-view">
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className="confetti"
          style={{ left: c.left, top: c.top, background: c.bg, width: c.size, height: c.size, borderRadius: c.shape }}
        />
      ))}

      <div className="round-header">
        <div className="round-header-left">
          <span className="round-brand">Family Decision</span>
          <span className="winner-title-badge">🏆 Winner</span>
        </div>
        <button className="btn-exit" onClick={onExit}>Exit</button>
      </div>

      <div className="winner-content">
        <div className="winner-swatch-wrap">
          <div className="winner-swatch" style={{ background: champion.shadeHexCode }} />
        </div>
        <h2 className="winner-shade-name">{champion.entityName}</h2>
        <p className="winner-shade-code">{champion.entityCode} · {champion.shadeHexCode}</p>
        <div className="winner-rounds-badge">
          Winner of {totalRounds} {totalRounds === 1 ? 'round' : 'rounds'}
        </div>
        <div className="winner-ctas">
          <a
            href={champion.pageUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-cta outlined"
          >
            🎨 View on AP
          </a>
          <button className="btn-cta outlined" onClick={() => downloadShareCard(champion)}>
            📤 Share card
          </button>
          <button className="btn-cta filled" onClick={onReset}>
            ↩ Start over
          </button>
        </div>
      </div>
    </div>
  );
}
