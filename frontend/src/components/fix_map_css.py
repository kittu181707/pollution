import re

with open('Map.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Shadows
css = css.replace('box-shadow: 0 5px 18px rgba(28,42,33,.12)', 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)')
css = css.replace('box-shadow: 0 5px 16px rgba(15,55,37,.18)', 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)')
css = css.replace('box-shadow: 0 5px 16px rgba(28,42,33,.12)', 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)')

# Font weights
css = re.sub(r'font-weight:\s*850', 'font-weight: 600', css)
css = re.sub(r'font-weight:\s*750', 'font-weight: 500', css)
css = re.sub(r'font-weight:\s*720', 'font-weight: 500', css)

with open('Map.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Map.css fixed.')
