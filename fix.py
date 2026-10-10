import re

with open('frontend/src/screens/TodayScreen.tsx', 'r') as f:
    text = f.read()

pattern_top = r'\{!hasAgenda \? \([\s\S]*?\) : \(\s*<>\s*\{\/\* MIDDLE SECTION \*\/\}\s*<div className="dashboard-middle">\s*<div className="journeys-col today-journeys">'
replacement_top = '''{/* MIDDLE SECTION */}
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
          <>'''
text = re.sub(pattern_top, replacement_top, text, count=1)

pattern_mid = r'(<button className="primary large full" onClick=\{onAnalyze\} disabled=\{busy\}>[\s\S]*?<\/button>\s*<\/div>\s*\)\})\s*<\/div>\s*<div className="map-col">'
replacement_mid = r'\1\n            </>\n          )}\n        </div>\n            \n        <div className="map-col">'
text = re.sub(pattern_mid, replacement_mid, text, count=1)

pattern_bot = r'(\s*<\/div>\s*\)\}\s*)<\/>\s*\)\}\s*(<\/div>\s*);\s*\}'
replacement_bot = r'\1\2;\n}'
text = re.sub(pattern_bot, replacement_bot, text, count=1)

with open('frontend/src/screens/TodayScreen.tsx', 'w') as f:
    f.write(text)
