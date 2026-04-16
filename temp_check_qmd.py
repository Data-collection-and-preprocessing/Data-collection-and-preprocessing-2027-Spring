from pathlib import Path
import re

qmd_files = [str(f) for f in Path('.').rglob('*.qmd')
             if 'slides' not in str(f) and '_backup' not in str(f).lower()
             and not str(f).endswith('_BACKUP.qmd')]

issues = []

if Path('_quarto.yml').exists():
    q = Path('_quarto.yml').read_text(encoding='utf-8', errors='ignore')
    print('=== _quarto.yml execute settings ===')
    for line in q.split('\n'):
        if any(k in line.lower() for k in ['execute', 'eval', 'python', 'echo', 'freeze']):
            print(f'  {line.strip()}')
    print()

exec_issues = []
for f in sorted(qmd_files):
    content = Path(f).read_text(encoding='utf-8', errors='ignore')
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if re.search(r'(execute|eval)\s*:\s*(true|yes|1)', line, re.IGNORECASE):
            exec_issues.append(f'  {f}:{i+1}: {line.strip()[:100]}')

print('=== Files with execute: true or eval: true ===')
if exec_issues:
    for e in exec_issues:
        print(e)
else:
    print('  None found')
print(f'Total qmd files checked: {len(qmd_files)}')
