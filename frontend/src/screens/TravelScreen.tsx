import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { JourneyInput, TransportMode } from '../types';
import { modes, shortTime } from '../utils';

export function TravelScreen({ journeys, setJourneys, maxExtra, setMaxExtra, onBack, onAnalyze, isDemo, busy = false, error }: {
  journeys: JourneyInput[]; setJourneys: (value: JourneyInput[]) => void; maxExtra: number; setMaxExtra: (value: number) => void; onBack: () => void; onAnalyze: () => void; isDemo: boolean; busy?: boolean; error?: string;
}) {
  const update = (id: string, patch: Partial<JourneyInput>) => setJourneys(journeys.map((j) => j.tripId === id ? { ...j, ...patch } : j));
  
  return <div className="screen">
    <button className="back" onClick={onBack} style={{ marginBottom: '24px' }}><ArrowLeft/>Back</button>
    <div className="screen-title" style={{ marginBottom: '24px' }}>
      <h1 style={{ fontSize: '24px' }}>Route options</h1>
    </div>
    
    <div className="journey-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {journeys.map((journey, index) => (
        <div key={journey.tripId} style={{ background: 'var(--surface-active)', padding: '16px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px', fontWeight: 500 }}>
            <span>{journey.origin}</span>
            <ArrowRight size={14} color="var(--muted)"/>
            <span>{journey.destination}</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '12px', color: 'var(--muted)' }}>
            <span>Leave at:</span>
            <input type="time" style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--ink)' }} value={journey.departureTime} onChange={(e) => update(journey.tripId, { departureTime: e.target.value })}/>
          </div>
          
          <div className="mode-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
            {modes.map((mode) => { 
              const disabled = mode.value === 'bike' && !isDemo; 
              return <button className={journey.mode === mode.value ? 'selected' : ''} key={mode.value} disabled={disabled} style={{ padding: '8px 4px', fontSize: '12px', borderRadius: '8px' }} onClick={() => update(journey.tripId, { mode: mode.value as TransportMode })}>{mode.label}</button>; 
            })}
          </div>
        </div>
      ))}
    </div>
    
    <div style={{ marginTop: '32px' }}>
      {error && <div className="error-banner" role="alert">{error}</div>}
      <button className="primary large full" onClick={onAnalyze} disabled={busy}>{busy ? 'Analyzing your day…' : 'Analyze & optimize my day'}</button>
    </div>
  </div>;
}
