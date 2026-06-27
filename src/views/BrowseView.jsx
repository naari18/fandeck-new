import { useEffect, useMemo, useState } from 'react';
import { ALL_SHADES, FAMILY_STATS, FAN_SIZE, MAX_SHORTLIST } from '../utils/constants';
import Header from '../components/browse/Header';
import FamilyTabs from '../components/browse/FamilyTabs';
import SecondaryFilters from '../components/browse/SecondaryFilters';
import FanStage from '../components/browse/FanStage';
import BottomTray from '../components/browse/BottomTray';
import ShadeDetailDrawer from '../components/browse/ShadeDetailDrawer';
import FeatureCard from '../components/browse/FeatureCard';

export default function BrowseView({ shortlist, toggleShortlist, clearShortlist, startDecision }) {
  // Filter state
  const [selectedFamily, setSelectedFamily] = useState(FAMILY_STATS[0]?.name || '');
  const [search, setSearch] = useState('');
  const [tonalityFilter, setTonalityFilter] = useState('all');
  const [tempFilter, setTempFilter] = useState('all');

  // Fan state
  const [fanPage, setFanPage] = useState(0);
  const [hoveredShade, setHoveredShade] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showMoreFamilies, setShowMoreFamilies] = useState(false);
  const [spreadMult, setSpreadMult] = useState(1);

  // UI state
  const [detailShade, setDetailShade] = useState(null);
  const [featureCardOpen, setFeatureCardOpen] = useState(
    () => !localStorage.getItem('ap-feature-seen')
  );

  // Reset fan page when filters change
  useEffect(() => {
    setFanPage(0);
    setHoveredShade(null);
  }, [selectedFamily, search, tonalityFilter, tempFilter]);

  // Global mousemove for accurate tooltip tracking over rotated strips
  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const familyPool = useMemo(() => {
    const q = search.toLowerCase().trim();
    return ALL_SHADES.filter((s) => {
      if (selectedFamily !== 'all' && s.shadeFamily !== selectedFamily) return false;
      if (q && !`${s.entityName} ${s.entityCode}`.toLowerCase().includes(q)) return false;
      if (tonalityFilter !== 'all' && !(s.filterTitle?.tonality || []).includes(tonalityFilter)) return false;
      if (tempFilter !== 'all' && !(s.filterTitle?.['color temperature'] || []).includes(tempFilter)) return false;
      return true;
    });
  }, [selectedFamily, search, tonalityFilter, tempFilter]);

  const totalPages = Math.max(1, Math.ceil(familyPool.length / FAN_SIZE));
  const fanShades = useMemo(
    () => familyPool.slice(fanPage * FAN_SIZE, (fanPage + 1) * FAN_SIZE),
    [familyPool, fanPage]
  );

  const isShortlisted = (shade) => shortlist.some((s) => s.entityCode === shade.entityCode);

  const handleFamilyChange = (fam) => {
    if (fam === selectedFamily) return;
    setSpreadMult(0);
    setTimeout(() => {
      setSelectedFamily(fam);
      setFanPage(0);
      setShowMoreFamilies(false);
      setHoveredShade(null);
    }, 220);
    setTimeout(() => setSpreadMult(1), 260);
  };

  const dismissFeatureCard = () => {
    setFeatureCardOpen(false);
    localStorage.setItem('ap-feature-seen', '1');
  };

  const handleStart = () => {
    dismissFeatureCard();
    startDecision();
  };

  const hasTray = shortlist.length > 0;

  return (
    <div className={`app ${hasTray ? 'has-tray' : ''}`}>
      <Header search={search} setSearch={setSearch} />

      <FamilyTabs
        families={FAMILY_STATS}
        selectedFamily={selectedFamily}
        onFamilyChange={handleFamilyChange}
        showMore={showMoreFamilies}
        setShowMore={setShowMoreFamilies}
      />

      <SecondaryFilters
        tonalityFilter={tonalityFilter}
        setTonalityFilter={setTonalityFilter}
        tempFilter={tempFilter}
        setTempFilter={setTempFilter}
        shadeCount={familyPool.length}
      />

      <FanStage
        fanShades={fanShades}
        spreadMult={spreadMult}
        isShortlisted={isShortlisted}
        onCardClick={setDetailShade}
        onCardHover={setHoveredShade}
        onCardLeave={() => setHoveredShade(null)}
        hoveredShade={hoveredShade}
        mousePos={mousePos}
        fanPage={fanPage}
        setFanPage={setFanPage}
        totalPages={totalPages}
      />

      {hasTray && (
        <BottomTray
          shortlist={shortlist}
          toggleShortlist={toggleShortlist}
          clearShortlist={clearShortlist}
          startDecision={startDecision}
        />
      )}

      {detailShade && (
        <ShadeDetailDrawer
          shade={detailShade}
          onClose={() => setDetailShade(null)}
          isShortlisted={isShortlisted}
          toggleShortlist={toggleShortlist}
          shortlistFull={shortlist.length >= MAX_SHORTLIST}
        />
      )}

      <FeatureCard
        open={featureCardOpen}
        onDismiss={dismissFeatureCard}
        onReopen={() => setFeatureCardOpen(true)}
        hasTray={hasTray}
        shortlistCount={shortlist.length}
        onStart={handleStart}
      />
    </div>
  );
}
