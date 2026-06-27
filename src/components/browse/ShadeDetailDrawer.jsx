export default function ShadeDetailDrawer({ shade, onClose, isShortlisted, toggleShortlist, shortlistFull }) {
  const added = isShortlisted(shade);
  const disabled = shortlistFull && !added;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="detail-drawer">
        <button className="drawer-close" onClick={onClose}>×</button>
        <div className="drawer-swatch" style={{ background: shade.shadeHexCode }} />
        <div className="drawer-body">
          <div className="drawer-meta">
            <h3 className="drawer-name">{shade.entityName}</h3>
            <p className="drawer-code">{shade.entityCode} · {shade.shadeHexCode}</p>
            <p className="drawer-family">{shade.shadeFamily}</p>
            <div className="drawer-tags">
              {shade.featureTag && <span className="dtag featured">{shade.featureTag}</span>}
              {(shade.filterTitle?.tonality || []).map((t) => (
                <span key={t} className="dtag">{t}</span>
              ))}
              {(shade.filterTitle?.['color temperature'] || []).map((t) => (
                <span key={t} className="dtag">{t}</span>
              ))}
              {(shade.filterTitle?.room || [])
                .filter((r) => r !== 'all rooms')
                .map((r) => <span key={r} className="dtag room">{r}</span>)}
            </div>
          </div>
          <div className="drawer-actions">
            <button
              className={`btn-add-shortlist ${added ? 'added' : disabled ? 'maxed' : ''}`}
              onClick={() => toggleShortlist(shade)}
              disabled={disabled}
            >
              {added ? '✓ Added' : disabled ? 'List full' : '+ Shortlist'}
            </button>
            <a href={shade.pageUrl} target="_blank" rel="noreferrer" className="btn-view-ap">
              View on AP →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
