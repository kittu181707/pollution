import { CalendarDays, Route, BarChart3, Map as MapIcon, History, Settings } from 'lucide-react';

export type NavTab = 'today' | 'optimize' | 'impact' | 'india' | 'history' | 'settings';

export function BottomNav({ active, onChange }: { active: NavTab; onChange: (tab: NavTab) => void }) {
  const items = [
    ['today', 'Today', CalendarDays], ['optimize', 'Optimize', Route], ['impact', 'Impact', BarChart3], ['india', 'India', MapIcon], ['history', 'History', History], ['settings', 'Settings', Settings],
  ] as const;
  return <nav className="bottom-nav" aria-label="Primary navigation">
    {items.map(([value, label, Icon]) => <button key={value} className={active === value ? 'active' : ''} onClick={() => onChange(value as NavTab)}><Icon size={18}/><span>{label}</span></button>)}
  </nav>;
}
