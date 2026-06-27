import catalogueData from '../../apcatalogue.json';

export const ALL_SHADES = catalogueData.shade || [];
export const MAX_SHORTLIST = 4;
export const FAN_SIZE = 13;
export const SPREAD = 120;

export const FAMILY_STATS = (() => {
  const map = new Map();
  ALL_SHADES.forEach((s) => {
    const fam = s.shadeFamily || 'Other';
    if (!map.has(fam)) map.set(fam, { name: fam, count: 0, swatches: [], minPage: Infinity });
    const g = map.get(fam);
    g.count++;
    if (g.swatches.length < 5) g.swatches.push(s.shadeHexCode);
    const page = parseInt(s.pageNumber, 10) || 9999;
    if (page < g.minPage) g.minPage = page;
  });
  return [...map.values()].sort((a, b) => a.minPage - b.minPage);
})();

export const CONFETTI = Array.from({ length: 24 }, (_, i) => ({
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  bg: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#F9A825'][i % 7],
  size: `${7 + (i % 5) * 2}px`,
  shape: i % 3 === 0 ? '50%' : i % 3 === 1 ? '2px' : '0',
}));
