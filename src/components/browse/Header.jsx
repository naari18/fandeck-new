export default function Header({ search, setSearch }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-logo"><span>ap</span></div>
        <div className="brand-text">
          <span className="brand-name">asianpaints</span>
          <span className="brand-sub">digital fandeck</span>
        </div>
      </div>
      <div className="search-wrap">
        <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search shade name or code"
        />
        {search && <button className="search-clear" onClick={() => setSearch('')}>×</button>}
      </div>
      <button className="header-icon-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </header>
  );
}
