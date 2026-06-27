const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default function SecondaryFilters({ tonalityFilter, setTonalityFilter, tempFilter, setTempFilter, shadeCount }) {
  return (
    <div className="secondary-filters">
      <div className="sf-group">
        {['all', 'light', 'medium', 'dark'].map((t) => (
          <button
            key={t}
            className={`sf-chip ${tonalityFilter === t ? 'active' : ''}`}
            onClick={() => setTonalityFilter(t)}
          >
            {t === 'all' ? 'All tones' : cap(t)}
          </button>
        ))}
      </div>
      <div className="sf-divider" />
      <div className="sf-group">
        {['all', 'warm', 'cool'].map((t) => (
          <button
            key={t}
            className={`sf-chip ${tempFilter === t ? 'active' : ''}`}
            onClick={() => setTempFilter(t)}
          >
            {t === 'all' ? 'Warm & Cool' : cap(t)}
          </button>
        ))}
      </div>
      <span className="sf-result">{shadeCount} shades</span>
    </div>
  );
}
