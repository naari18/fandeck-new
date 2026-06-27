export default function FamilyTabs({ families, selectedFamily, onFamilyChange, showMore, setShowMore }) {
  const TOP = families.slice(0, 7);
  const MORE = families.slice(7);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <nav className="filter-bar">
      {TOP.map((fam) => {
        const isActive = selectedFamily === fam.name;
        return (
          <button
            key={fam.name}
            className={`filter-chip ${isActive ? 'active' : ''}`}
            onClick={() => onFamilyChange(fam.name)}
          >
            {!isActive && <span className="chip-dot" style={{ background: fam.swatches[0] }} />}
            {cap(fam.name)}
            {isActive && <span className="chip-count-badge">{fam.count}</span>}
          </button>
        );
      })}

      {MORE.length > 0 && (
        <div className="filter-more-wrap">
          <button
            className={`filter-chip ${MORE.some((f) => f.name === selectedFamily) ? 'active' : ''}`}
            onClick={() => setShowMore((v) => !v)}
          >
            {MORE.some((f) => f.name === selectedFamily) ? cap(selectedFamily) : 'More ▾'}
          </button>
          {showMore && (
            <div className="more-dropdown">
              {MORE.map((fam) => (
                <button
                  key={fam.name}
                  className={`dropdown-item ${selectedFamily === fam.name ? 'active' : ''}`}
                  onClick={() => onFamilyChange(fam.name)}
                >
                  <span className="chip-dot" style={{ background: fam.swatches[0] }} />
                  {cap(fam.name)}
                  <span className="dropdown-count">{fam.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
