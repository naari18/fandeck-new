import { MAX_SHORTLIST } from '../../utils/constants';

export default function BottomTray({ shortlist, toggleShortlist, clearShortlist, startDecision }) {
  const nudge =
    shortlist.length === 1
      ? 'Add 1 more shade to unlock 👨‍👩‍👧‍👦 Family Decision'
      : shortlist.length < MAX_SHORTLIST
      ? `${shortlist.length}/${MAX_SHORTLIST} shades — ready to vote or add more`
      : null;

  return (
    <div className="bottom-tray">
      <div className="tray-top">
        <span className="tray-heading">Shortlist · {shortlist.length}/{MAX_SHORTLIST}</span>
        <button className="tray-clear" onClick={clearShortlist}>Clear All</button>
      </div>
      {nudge && <p className="tray-nudge">{nudge}</p>}
      <div className="tray-body">
        <div className="tray-chips">
          {shortlist.map((shade) => (
            <div key={shade.entityCode} className="tray-chip">
              <span className="tray-chip-swatch" style={{ background: shade.shadeHexCode }} />
              <div className="tray-chip-text">
                <span className="tray-chip-name">{shade.entityName}</span>
                <span className="tray-chip-code">{shade.entityCode}</span>
              </div>
              <button className="tray-chip-remove" onClick={() => toggleShortlist(shade)}>×</button>
            </div>
          ))}
        </div>
        <div className="tray-actions">
          <button className="btn-compare">Compare</button>
          <button className="btn-decision" onClick={startDecision} disabled={shortlist.length < 2}>
            <span>👨‍👩‍👧‍👦</span> Family Decision
          </button>
        </div>
      </div>
    </div>
  );
}
