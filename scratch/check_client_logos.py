import os, re

with open(r'c:\INVICTUSDESIGN\Invictus-frontend\src\pageComponent\ClientsIndustriesPage\index.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'"(/client_logo/[^"]+)"', text)
unique_logos = sorted(list(set(matches)))
print(f'Total unique logos referenced in ClientsIndustriesPage: {len(unique_logos)}')
total_size = 0
for logo_rel in unique_logos:
    fs_path = os.path.join(r'c:\INVICTUSDESIGN\Invictus-frontend\public', logo_rel.lstrip('/').replace('/', os.sep))
    if os.path.exists(fs_path):
        sz = os.path.getsize(fs_path)
        total_size += sz
        print(f'{sz/1024:7.1f} KB - {logo_rel}')
    else:
        print(f'MISSING FILE: {logo_rel}')

print(f'\nTOTAL SIZE OF REFERENCED CLIENT LOGOS: {total_size / (1024*1024):.2f} MB')

