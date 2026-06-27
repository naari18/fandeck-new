import { useState } from 'react';
import { MAX_SHORTLIST } from './utils/constants';
import BrowseView from './views/BrowseView';
import IntroModal from './components/decision/IntroModal';
import RoundView from './components/decision/RoundView';
import WinnerView from './components/decision/WinnerView';
import './styles.css';

export default function App() {
  // Shortlist — shared between browse and decision flow
  const [shortlist, setShortlist] = useState([]);

  // View routing
  const [view, setView] = useState('browse'); // 'browse' | 'intro' | 'round' | 'winner'

  // Decision flow state
  const [candidates, setCandidates] = useState([]);
  const [currentPair, setCurrentPair] = useState([null, null]);
  const [roundNumber, setRoundNumber] = useState(1);
  const [totalRounds, setTotalRounds] = useState(0);
  const [champion, setChampion] = useState(null);

  // ── Shortlist helpers ────────────────────────────────
  const isShortlisted = (shade) => shortlist.some((s) => s.entityCode === shade.entityCode);

  const toggleShortlist = (shade) => {
    if (isShortlisted(shade)) {
      setShortlist((p) => p.filter((s) => s.entityCode !== shade.entityCode));
    } else if (shortlist.length < MAX_SHORTLIST) {
      setShortlist((p) => [...p, shade]);
    }
  };

  const clearShortlist = () => setShortlist([]);

  // ── Decision flow ────────────────────────────────────
  const startDecision = () => {
    if (shortlist.length < 2) return;
    const shuffled = [...shortlist].sort(() => Math.random() - 0.5);
    setCandidates(shuffled);
    setCurrentPair([shuffled[0], shuffled[1]]);
    setRoundNumber(1);
    setTotalRounds(shuffled.length - 1);
    setChampion(null);
    setView('intro');
  };

  const vote = (preferred) => {
    const loserCode =
      preferred.entityCode === currentPair[0].entityCode
        ? currentPair[1].entityCode
        : currentPair[0].entityCode;
    const next = candidates.filter((s) => s.entityCode !== loserCode);
    if (next.length === 1) {
      setChampion(next[0]);
      setView('winner');
    } else {
      setCandidates(next);
      setCurrentPair([next[0], next[1]]);
      setRoundNumber((r) => r + 1);
    }
  };

  const exitDecision = () => {
    setView('browse');
    setCandidates([]);
    setCurrentPair([null, null]);
    setChampion(null);
  };

  const resetAll = () => { clearShortlist(); exitDecision(); };

  // ── View routing ─────────────────────────────────────
  if (view === 'intro') {
    return <IntroModal onStart={() => setView('round')} onCancel={exitDecision} />;
  }

  if (view === 'round' && currentPair[0] && currentPair[1]) {
    return (
      <RoundView
        currentPair={currentPair}
        roundNumber={roundNumber}
        totalRounds={totalRounds}
        onVote={vote}
        onExit={exitDecision}
      />
    );
  }

  if (view === 'winner' && champion) {
    return (
      <WinnerView
        champion={champion}
        totalRounds={totalRounds}
        onExit={exitDecision}
        onReset={resetAll}
      />
    );
  }

  return (
    <BrowseView
      shortlist={shortlist}
      toggleShortlist={toggleShortlist}
      clearShortlist={clearShortlist}
      startDecision={startDecision}
    />
  );
}
