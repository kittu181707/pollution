import re

with open('D:/projects/pollution/frontend/src/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Colors & Variables
css = re.sub(
    r':root\s*\{[^}]+\}',
    ':root{font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#111827;background:#f9fafb;--ink:#111827;--muted:#6b7280;--line:#e5e7eb;--surface:#ffffff;--green:#10b981;--green-dark:#059669;--green-soft:#d1fae5;--red:#ef4444;--radius:8px}',
    css
)

# 2. Shadows and Dark backgrounds
css = css.replace('box-shadow:0 12px 34px rgba(0,0,0,.5)', 'box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)')
css = css.replace('box-shadow:-20px 0 60px rgba(0,0,0,.5)', 'box-shadow:-4px 0 15px rgba(0,0,0,0.05)')
css = css.replace('box-shadow: -20px 0 60px rgba(0,0,0,.5)', 'box-shadow: -4px 0 15px rgba(0,0,0,0.05)')
css = css.replace('background:rgba(30,30,30,.94)', 'background:rgba(255,255,255,0.94)')
css = css.replace('background:linear-gradient(180deg,rgba(18,18,18,0),#121212 30%)', 'background:linear-gradient(180deg,rgba(249,250,251,0),#f9fafb 30%)')
css = css.replace('background:#1a1a1a', 'background:#f3f4f6')

# 3. Font weights
css = re.sub(r'font-weight:\s*850', 'font-weight:600', css)
css = re.sub(r'font-weight:\s*800', 'font-weight:600', css)
css = re.sub(r'font-weight:\s*780', 'font-weight:500', css)
css = re.sub(r'font-weight:\s*750', 'font-weight:500', css)
css = re.sub(r'font-weight:\s*700', 'font-weight:500', css)

# 4. Font sizes
css = css.replace('font-size:clamp(38px,7vw,66px)', 'font-size:32px')
css = css.replace('font-size:clamp(36px,6vw,56px)', 'font-size:28px')
css = css.replace('font-size:50px', 'font-size:32px')
css = css.replace('font-size:60px', 'font-size:36px')
css = css.replace('font-size:46px', 'font-size:32px')
css = css.replace('font-size:24px', 'font-size:20px')
css = css.replace('font-size:18px', 'font-size:16px')
css = css.replace('font-size:17px', 'font-size:15px')

# 5. Fix primary button color since text was #121212 but --ink is now dark, so text should be white
css = re.sub(r'\.primary\{([^}]+)color:#121212([^}]+)\}', r'.primary{\1color:#ffffff\2}', css)

# 6. Specific adjustments for .desktop-sidebar and other hover states
css = css.replace('rgba(255, 255, 255, 0.05)', 'rgba(0, 0, 0, 0.05)')
css = css.replace('rgba(255,255,255,.018)', 'rgba(0,0,0,.02)')

# 7. Update .exposure-hero .delta
css = css.replace('color:#121212', 'color:#ffffff')

# Save it back
with open('D:/projects/pollution/frontend/src/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Updated styles.css successfully.')
