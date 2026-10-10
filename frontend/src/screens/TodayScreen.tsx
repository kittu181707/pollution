import { Search, ArrowRight, Calendar, AlertTriangle, ArrowDown, Clock3, Sun, Wind, HelpCircle, Leaf, Users } from 'lucide-react';
import { LiveEnvironmentSnapshot } from '../components/LiveEnvironmentSnapshot';
import type { AgendaPayload, JourneyInput, DayAnalysis, TripAnalysis, Coordinates } from '../types';
import { shortTime } from '../utils';

export function TodayScreen({
  agenda,
  journeys,
  analysis,
  busy,
  isDemo,
  liveLocation,
  onImport,
  onManual,
  onDemo,
  onAnalyze,
  error,
  mapComponent,
  whyText,
  whyTrip,
  onWhy
}: {
  agenda: AgendaPayload;
  journeys: JourneyInput[];
  analysis?: DayAnalysis | null;
  busy: boolean;
  isDemo: boolean;
  liveLocation?: Coordinates | null;
  onImport: () => void;
  onManual: () => void;
  onDemo: () => void;
  onAnalyze: () => void;
  error?: string;
  mapComponent?: React.ReactNode;
  whyText?: string;
  whyTrip?: TripAnalysis | null;
  onWhy?: (trip: TripAnalysis) => void;
}) {
  const hasAgenda = agenda && agenda.events.length > 0;
  const m = analysis?.metrics;

  return (
    <div className="dashboard-container">
      {/* HEADER SECTION */}
      <header className="dashboard-header">
        <div className="screen-title">
          <h1>Good morning.<br/>Here's your environmental plan for today.</h1>
        </div>
        <div className="chips">
          <LiveEnvironmentSnapshot homeLocation={agenda?.homeLocation || 'Home'} liveLocation={liveLocation} isDemo={isDemo} chipMode={true} />
        </div>
      </header>

      {error && <div className="error-banner"><AlertTriangle size={16}/> {error}</div>}

      {/* MIDDLE SECTION */}
      <div className="dashboard-middle">
        <div className="journeys-col today-journeys">
          {!hasAgenda ? (
            <div className="empty-agenda" style={{ padding: '0', border: 'none', background: 'transparent' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Plan your route</h3>
              <p style={{ margin: '0 0 24px 0' }}>Where are you going today?</p>
              <div className="actions" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <button className="primary" onClick={onManual} disabled={busy}>Enter Origin & Destination</button>
                <button className="secondary" onClick={onDemo} disabled={busy}>Load Demo Route</button>
                <button className="text-button" onClick={onImport} disabled={busy}><Calendar size={18}/> Import Agenda</button>
              </div>
            </div>
          ) : (
          <>
              <h3>Today's journeys</h3>
              <div className="timeline">
                {journeys.map((journey) => (
                  <div key={journey.tripId} className="timeline-row">
                    <div className="time">{journey.departureTime}</div>
                    <div className="timeline-dot"></div>
                    <div className="journey-summary">
                      <div className="journey-route">
                        <strong>{journey.origin}</strong> <ArrowRight size={14}/> <strong>{journey.destination}</strong>
                      </div>
                      <div className="journey-meta"><span>{journey.mode}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              {!analysis && (
                <div style={{ marginTop: '24px' }}>
                  <button className="primary large full" onClick={onAnalyze} disabled={busy}>
                    {busy ? <Search className="spin" size={20}/> : <Search size={20}/>}
                    <span>Optimize my day</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

          {/* BOTTOM SECTION */}
          {analysis && m && (
            <div className="dashboard-bottom">
              <div className="dashboard-card analysis-card">
                <h3>Journey analysis</h3>
                <section className="exposure-hero" style={{ padding: '12px', marginBottom: '16px' }}>
                  <div><span>Original</span><strong>{m.originalExposureIndex}</strong></div>
                  <ArrowRight/>
                  <div className="optimized"><span>Optimized</span><strong>{m.optimizedExposureIndex}</strong></div>
                  <div className="delta" style={{ position: 'static', marginTop: '8px', padding: '4px 8px', fontSize: '12px', alignSelf: 'flex-start' }}>
                    <ArrowDown size={14} style={{verticalAlign:'middle'}}/> {m.exposureReductionPct}% <small>less exposure</small>
                  </div>
                </section>
                <div className="metric-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div><Clock3 size={16}/><span>Extra travel</span><strong>+{m.extraTravelMinutes} min</strong></div>
                  <div><Sun size={16}/><span>High-UV time</span><strong>{m.originalHighUvMinutes ? `-${Math.max(0, Math.round((1 - m.optimizedHighUvMinutes / m.originalHighUvMinutes) * 100))}%` : '0 min'}</strong></div>
                </div>
              </div>

              <div className="dashboard-card comparison-card">
                <h3>Route comparison</h3>
                {analysis.changes.length > 0 ? (
                  <div className="change-list" style={{ margin: 0 }}>
                    {analysis.changes.slice(0, 1).map((trip) => (
                      <div key={trip.tripId} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="change-heading">
                          <div>
                            <h2>{shortTime(trip.recommended.departureTime)} · {trip.origin} → {trip.destination}</h2>
                          </div>
                          <button className="text-button" onClick={() => onWhy?.(trip)} style={{ padding: 0 }}><HelpCircle size={16}/></button>
                        </div>
                        <div className="compare-grid" style={{ margin: 0, gap: '8px' }}>
                          <div style={{ padding: '8px' }}>
                            <p style={{fontSize: '10px', margin: 0}}>ORIGINAL</p>
                            <strong style={{fontSize: '12px'}}>{trip.original.label}</strong>
                          </div>
                          <ArrowRight size={14}/>
                          <div className="recommended" style={{ padding: '8px' }}>
                            <p style={{fontSize: '10px', margin: 0}}>RECOMMENDED</p>
                            <strong style={{fontSize: '12px'}}>{trip.recommended.label}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                    {analysis.changes.length > 1 && <div style={{fontSize: '12px', color: 'var(--muted)'}}>+ {analysis.changes.length - 1} more changes</div>}
                  </div>
                ) : (
                  <div className="snapshot-empty" style={{ minHeight: '80px' }}>No changes recommended for your routes.</div>
                )}
              </div>

              <div className="dashboard-card why-card">
                <h3>Why this change?</h3>
                {whyText ? (
                  <div className="why-copy" style={{ fontSize: '13px', lineHeight: 1.5 }}>
                    {whyText}
                  </div>
                ) : analysis.changes.length > 0 ? (
                  <div className="snapshot-empty" style={{ minHeight: '80px' }}>Select 'Help' on a route comparison to see why it was changed.</div>
                ) : (
                  <div className="snapshot-empty" style={{ minHeight: '80px' }}>Your original plan is already optimal!</div>
                )}
              </div>
            </div>
          )}

          {/* FOOTER SECTION */}
          {analysis && m && (
            <div className="dashboard-footer">
              <div className="dashboard-card impact-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                <Leaf size={32} color="var(--green)" />
                <div>
                  <h3 style={{ margin: '0 0 4px' }}>Today's estimated impact</h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                    <span><strong>-{m.exposureReductionPct}%</strong> exposure</span>
                    <span><strong>{(m.estimatedCo2eChangeKg ? Math.max(0, -m.estimatedCo2eChangeKg) : 0).toFixed(1)} kg</strong> CO₂e saved</span>
                  </div>
                </div>
              </div>
              <div className="dashboard-card impact-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                <Users size={32} color="var(--green)" />
                <div>
                  <h3 style={{ margin: '0 0 4px' }}>Community impact</h3>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--muted)' }}>
                    <span>Together we've saved over <strong>2,450 kg</strong> of CO₂e this week.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}
