with open('/Volumes/T7 Grey/solinvest/scripts/adders_compare.txt', 'r') as f:
    lines = f.readlines()
for i, line in enumerate(lines[100:], start=101):
    print(f'{i}: {line}', end='')
