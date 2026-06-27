import { SPREAD } from '../../utils/constants';

export default function FanStage({
  fanShades,
  spreadMult,
  isShortlisted,
  onCardClick,
  onCardHover,
  onCardLeave,
  hoveredShade,
  mousePos,
  fanPage,
  setFanPage,
  totalPages,
}) {
  return (
    <main className="fan-main">
      <button
        className="fan-nav-btn"
        onClick={() => setFanPage((p) => Math.max(0, p - 1))}
        disabled={fanPage === 0}
      >
        ‹
      </button>

      <div className="fan-stage-wrap">
        <div className="fan-pivot">
          {fanShades.map((shade, i) => {
            const total = fanShades.length;
            const angle = total > 1
              ? ((i - (total - 1) / 2) / ((total - 1) / 2)) * (SPREAD / 2)
              : 0;
            const zIndex = Math.round(total - Math.abs(i - (total - 1) / 2));
            const added = isShortlisted(shade);
            return (
              <button
                key={shade.entityCode}
                className={`fan-card ${added ? 'selected' : ''}`}
                style={{
                  background: shade.shadeHexCode,
                  transform: `rotate(${angle * spreadMult}deg)`,
                  transition: 'transform 0.24s cubic-bezier(0.4,0,0.2,1)',
                  zIndex,
                }}
                onClick={() => onCardClick(shade)}
                onMouseEnter={() => onCardHover(shade)}
                onMouseLeave={onCardLeave}
              >
                <span className="fan-card-text">{shade.entityName}</span>
                {added && <span className="fan-card-check">✓</span>}
              </button>
            );
          })}
        </div>

        <div className="fan-pivot-dot" />
        <p className="fan-hint">
          {hoveredShade
            ? <><strong>{hoveredShade.entityName}</strong> · {hoveredShade.entityCode}</>
            : fanShades.length === 0
            ? 'No shades match these filters'
            : 'Tap any shade to view details'}
        </p>
        {totalPages > 1 && (
          <div className="fan-page-dots">
            {Array.from({ length: Math.min(totalPages, 12) }, (_, i) => (
              <button
                key={i}
                className={`fan-page-dot ${i === fanPage ? 'active' : ''}`}
                onClick={() => setFanPage(i)}
              />
            ))}
          </div>
        )}
      </div>

      <button
        className="fan-nav-btn"
        onClick={() => setFanPage((p) => Math.min(totalPages - 1, p + 1))}
        disabled={fanPage === totalPages - 1}
      >
        ›
      </button>

      {hoveredShade && (
        <div className="fan-tooltip" style={{ left: mousePos.x, top: mousePos.y - 56 }}>
          <span className="tt-name">{hoveredShade.entityName}</span>
          <span className="tt-sep">·</span>
          <span className="tt-code">{hoveredShade.entityCode}</span>
          {hoveredShade.featureTag && <span className="tt-tag">{hoveredShade.featureTag}</span>}
        </div>
      )}
    </main>
  );
}
