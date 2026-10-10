import { useRef } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import type { AgendaPayload, CalendarEvent } from '../types';
import { uid } from '../utils';

export function ImportScreen({ agenda, setAgenda, mode, onBack, onContinue, busy, error }: {
  agenda: AgendaPayload; setAgenda: (agenda: AgendaPayload) => void; mode: 'import'|'manual'; onBack: () => void; onContinue: () => void;
  onIcs?: (file: File) => void; busy: boolean; error?: string;
}) {
  const update = (id: string, patch: Partial<CalendarEvent>) => setAgenda({ ...agenda, events: agenda.events.map((event) => event.eventId === id ? { ...event, ...patch } : event) });
  const add = () => setAgenda({ ...agenda, events: [...agenda.events, { eventId: uid('event'), title: '', location: '', start: '09:00', end: '10:00', fixed: true }] });
  const remove = (id: string) => setAgenda({ ...agenda, events: agenda.events.filter((event) => event.eventId !== id) });
  
  return <div className="screen">
    <button className="back" onClick={onBack} style={{ marginBottom: '24px' }}><ArrowLeft/>Back</button>
    <div className="screen-title" style={{ marginBottom: '24px' }}>
      <h1 style={{ fontSize: '24px' }}>Where to?</h1>
    </div>
    
    <div className="toolbar-card" style={{ padding: '0', background: 'transparent', border: 'none', gap: '12px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--surface-active)', padding: '12px 16px', borderRadius: '12px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text)', flexShrink: 0 }} />
        <input style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '16px' }} value={agenda.homeLocation} onChange={(e) => setAgenda({ ...agenda, homeLocation: e.target.value })} placeholder="Pickup location" />
      </div>
      
      {agenda.events.map((event, index) => (
        <div key={event.eventId} style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'var(--surface-active)', padding: '12px 16px', borderRadius: '12px' }}>
          <div style={{ width: '8px', height: '8px', background: 'var(--ink)', flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <input style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '16px' }} value={event.location} placeholder="Destination" onChange={(e) => update(event.eventId, { location: e.target.value, title: e.target.value })}/>
             <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'var(--muted)' }}>
               <span>Arrival by:</span>
               <input type="time" style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--ink)' }} value={event.start} onChange={(e) => update(event.eventId, { start: e.target.value, end: e.target.value })}/>
             </div>
          </div>
          <button className="icon-button" style={{ background: 'transparent' }} onClick={() => remove(event.eventId)}><Trash2 size={18}/></button>
        </div>
      ))}
    </div>
    
    <button className="text-button" onClick={add} style={{ marginTop: '16px' }}><Plus size={18}/> Add stop</button>
    
    {error && <div className="error-banner" style={{ marginTop: '16px' }}>{error}</div>}
    
    <div style={{ marginTop: '32px' }}>
      <button className="primary large full" disabled={!agenda.events.length || agenda.events.some((e) => !e.location)} onClick={onContinue}>Review route</button>
    </div>
  </div>;
}
