import os, re
from PIL import Image

with open(r'c:\INVICTUSDESIGN\Invictus-frontend\src\pageComponent\ClientsIndustriesPage\index.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'"(/client_logo/[^"]+\.png)"', text)
unique_logos = sorted(list(set(matches)))
print(f'Found {len(unique_logos)} PNG logos referenced.')

orig_total = 0
opt_total = 0

for logo_rel in unique_logos:
    png_path = os.path.join(r'c:\INVICTUSDESIGN\Invictus-frontend\public', logo_rel.lstrip('/').replace('/', os.sep))
    webp_rel = logo_rel.replace('.png', '.webp')
    webp_path = os.path.join(r'c:\INVICTUSDESIGN\Invictus-frontend\public', webp_rel.lstrip('/').replace('/', os.sep))
    
    if os.path.exists(png_path):
        sz_orig = os.path.getsize(png_path)
        orig_total += sz_orig
        
        with Image.open(png_path) as im:
            # preserve transparency (RGBA)
            if im.mode not in ('RGBA', 'RGB'):
                im = im.convert('RGBA')
            # Scale proportionally to max width 480 or height 200 (2x retina)
            im.thumbnail((480, 200), Image.Resampling.LANCZOS)
            im.save(webp_path, 'WEBP', quality=85, method=6)
        
        sz_opt = os.path.getsize(webp_path)
        opt_total += sz_opt
        print(f'{os.path.basename(png_path)}: {sz_orig/1024:.1f} KB -> {os.path.basename(webp_path)}: {sz_opt/1024:.1f} KB')

print(f'\nSUMMARY:')
print(f'Original total: {orig_total / (1024*1024):.2f} MB')
print(f'Optimized WebP total: {opt_total / 1024:.2f} KB ({opt_total / (1024*1024):.2f} MB)')
print(f'Savings: {((orig_total - opt_total) / orig_total) * 100:.1f}% reduction!')

