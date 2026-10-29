import os, re

def apply_phase3():
    print("=== APPLYING PHASE 3 OPTIMIZATIONS ===")

    # 1. Update src/pageComponent/ClientsIndustriesPage/index.jsx (clientList .png -> .webp)
    p_clients = r'c:\INVICTUSDESIGN\Invictus-frontend\src\pageComponent\ClientsIndustriesPage\index.jsx'
    with open(p_clients, 'r', encoding='utf-8') as f:
        c_clients = f.read()

    # Replace .png with .webp inside clientList array
    # Find clientList block
    cl_start = c_clients.find('const clientList = [')
    cl_end = c_clients.find('];', cl_start)
    if cl_start != -1 and cl_end != -1:
        old_cl = c_clients[cl_start:cl_end+2]
        new_cl = old_cl.replace('.png"', '.webp"')
        c_clients = c_clients[:cl_start] + new_cl + c_clients[cl_end+2:]
        with open(p_clients, 'w', encoding='utf-8') as f:
            f.write(c_clients)
        print("SUCCESS: Updated clientList in ClientsIndustriesPage/index.jsx to .webp")
    else:
        print("FAILED: Could not find clientList in ClientsIndustriesPage/index.jsx")

    # 2. Update src/pageComponent/Aboutus/index.jsx (decorative arrow image dimensions & alt)
    p_about = r'c:\INVICTUSDESIGN\Invictus-frontend\src\pageComponent\Aboutus\index.jsx'
    with open(p_about, 'r', encoding='utf-8') as f:
        c_about = f.read()

    old_arrow = '''              <img
                src={theme === "light" ? "/assets/arrowblack.png" : "/assets/arrow1.png"}
                alt="arrow"
                className="w-full max-w-[420px] mx-auto lg:mx-0 mt-2"
                style={{ height: "auto", maxHeight: "35px", objectFit: "contain" }}
              />'''

    new_arrow = '''              <img
                src={theme === "light" ? "/assets/arrowblack.png" : "/assets/arrow1.png"}
                alt=""
                aria-hidden="true"
                width={420}
                height={35}
                loading="lazy"
                decoding="async"
                className="w-full max-w-[420px] mx-auto lg:mx-0 mt-2"
                style={{ height: "auto", maxHeight: "35px", objectFit: "contain" }}
              />'''

    if old_arrow in c_about:
        c_about = c_about.replace(old_arrow, new_arrow, 1)
        with open(p_about, 'w', encoding='utf-8') as f:
            f.write(c_about)
        print("SUCCESS: Updated arrow image dimensions and alt in Aboutus/index.jsx")
    else:
        print("FAILED: Arrow image target not found in Aboutus/index.jsx")

    # 3. Update src/components/careers/CareersInteractiveSequence.jsx (Fix duplicate H1)
    p_seq = r'c:\INVICTUSDESIGN\Invictus-frontend\src\components\careers\CareersInteractiveSequence.jsx'
    with open(p_seq, 'r', encoding='utf-8') as f:
        c_seq = f.read()

    old_h1_mobile = '''            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-tight uppercase text-[var(--text-primary,#E0E0E0)] mb-8">
              BUILD WORK THAT <br />{" "}
              <span className="text-[#2AB182]">MOVES BUSINESSES</span> <br />{" "}
              FORWARD.
            </h1>'''

    new_h1_mobile = '''            <p role="heading" aria-level="1" className="font-display font-bold text-4xl sm:text-5xl leading-tight uppercase text-[var(--text-primary,#E0E0E0)] mb-8">
              BUILD WORK THAT <br />{" "}
              <span className="text-[#2AB182]">MOVES BUSINESSES</span> <br />{" "}
              FORWARD.
            </p>'''

    if old_h1_mobile in c_seq:
        c_seq = c_seq.replace(old_h1_mobile, new_h1_mobile, 1)
        with open(p_seq, 'w', encoding='utf-8') as f:
            f.write(c_seq)
        print("SUCCESS: Fixed duplicate H1 in CareersInteractiveSequence.jsx (now exactly 1 H1)")
    else:
        print("FAILED: Mobile H1 target not found in CareersInteractiveSequence.jsx")

    # 4. Update public/sitemap.xml (remove closed telecalling-executive noindex URL)
    p_sitemap = r'c:\INVICTUSDESIGN\Invictus-frontend\public\sitemap.xml'
    with open(p_sitemap, 'r', encoding='utf-8') as f:
        c_sitemap = f.read()

    telecalling_entry = '''  <url>
    <loc>https://www.invictusglobaltech.com/careers/telecalling-executive</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n'''

    if telecalling_entry in c_sitemap:
        c_sitemap = c_sitemap.replace(telecalling_entry, '', 1)
        with open(p_sitemap, 'w', encoding='utf-8') as f:
            f.write(c_sitemap)
        print("SUCCESS: Removed closed telecalling-executive URL from sitemap.xml")
    else:
        print("FAILED: telecalling-executive entry not found in sitemap.xml")

    # 5. Update src/styles/globals.css (Add global focus-visible indicator)
    p_css = r'c:\INVICTUSDESIGN\Invictus-frontend\src\styles\globals.css'
    with open(p_css, 'r', encoding='utf-8') as f:
        c_css = f.read()

    focus_rule = '''
/* Global Accessibility Focus Ring */
:focus-visible {
  outline: 2px solid #2AB182 !important;
  outline-offset: 2px !important;
}
'''
    if ':focus-visible' not in c_css:
        c_css += focus_rule
        with open(p_css, 'w', encoding='utf-8') as f:
            f.write(c_css)
        print("SUCCESS: Added global :focus-visible accessibility ring in globals.css")
    else:
        print("NOTICE: :focus-visible already present in globals.css")

    # 6. Update src/pages/_app.jsx (Add viewport meta tag and default OpenGraph/Twitter card metadata)
    p_app = r'c:\INVICTUSDESIGN\Invictus-frontend\src\pages\_app.jsx'
    with open(p_app, 'r', encoding='utf-8') as f:
        c_app = f.read()

    old_head = '''      <Head>
        <script
          type="application/ld+json"
          key="organization-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>'''

    new_head = '''      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="Invictus Global Tech" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.invictusglobaltech.com/assets/logo_6.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.invictusglobaltech.com/assets/logo_6.webp" />
        <script
          type="application/ld+json"
          key="organization-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>'''

    if old_head in c_app:
        c_app = c_app.replace(old_head, new_head, 1)
        with open(p_app, 'w', encoding='utf-8') as f:
            f.write(c_app)
        print("SUCCESS: Added viewport and global OpenGraph/Twitter card tags in _app.jsx")
    else:
        print("FAILED: Head target not found in _app.jsx")

    # 7. Update OpenGraph on core pages (index, about, services, clients, global, contact, careers)
    pages_og = [
        (
            r'c:\INVICTUSDESIGN\Invictus-frontend\src\pages\index.jsx',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/" />''',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/" />
        <meta property="og:title" content="Performance Marketing Agency in Chennai &amp; India | Invictus Global Tech" />
        <meta property="og:description" content="Invictus Global Tech is an ROI-driven performance marketing agency in Chennai, India. We scale brands with Meta Ads, Google Ads, AI web development, and data-backed growth systems." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/" />
        <meta name="twitter:title" content="Performance Marketing Agency in Chennai &amp; India | Invictus Global Tech" />
        <meta name="twitter:description" content="Invictus Global Tech is an ROI-driven performance marketing agency in Chennai, India. We scale brands with Meta Ads, Google Ads, AI web development, and data-backed growth systems." />'''
        ),
        (
            r'c:\INVICTUSDESIGN\Invictus-frontend\src\pages\about.jsx',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/about" />''',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/about" />
        <meta property="og:title" content="About Us | Performance Marketing &amp; Growth Partner | Invictus Global Tech" />
        <meta property="og:description" content="Learn about Invictus Global Tech, an ROI-obsessed performance marketing team and growth partner based in Chennai, delivering measurable business outcomes." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/about" />
        <meta name="twitter:title" content="About Us | Performance Marketing &amp; Growth Partner | Invictus Global Tech" />
        <meta name="twitter:description" content="Learn about Invictus Global Tech, an ROI-obsessed performance marketing team and growth partner based in Chennai, delivering measurable business outcomes." />'''
        ),
        (
            r'c:\INVICTUSDESIGN\Invictus-frontend\src\pages\services.jsx',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/services" />''',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/services" />
        <meta property="og:title" content="Performance Marketing, Meta Ads &amp; AI Web Services | Invictus Global Tech" />
        <meta property="og:description" content="Explore Invictus Global Tech services: Meta &amp; Google Ads performance marketing, conversational AI search strategy, lead automation, and conversion web engineering." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/services" />
        <meta name="twitter:title" content="Performance Marketing, Meta Ads &amp; AI Web Services | Invictus Global Tech" />
        <meta name="twitter:description" content="Explore Invictus Global Tech services: Meta &amp; Google Ads performance marketing, conversational AI search strategy, lead automation, and conversion web engineering." />'''
        ),
        (
            r'c:\INVICTUSDESIGN\Invictus-frontend\src\pages\clients.jsx',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/clients" />''',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/clients" />
        <meta property="og:title" content="Client Case Studies &amp; Industry Results | Invictus Global Tech" />
        <meta property="og:description" content="Explore verified case studies and industry growth results across Healthcare, EdTech, E-commerce, Real Estate, and B2B sectors by Invictus Global Tech." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/clients" />
        <meta name="twitter:title" content="Client Case Studies &amp; Industry Results | Invictus Global Tech" />
        <meta name="twitter:description" content="Explore verified case studies and industry growth results across Healthcare, EdTech, E-commerce, Real Estate, and B2B sectors by Invictus Global Tech." />'''
        ),
        (
            r'c:\INVICTUSDESIGN\Invictus-frontend\src\pages\global.jsx',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/global" />''',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/global" />
        <meta property="og:title" content="Global Footprint &amp; Locations | Invictus Global Tech" />
        <meta property="og:description" content="Discover Invictus Global Tech international footprint and Chennai headquarters, delivering enterprise growth and performance marketing globally." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/global" />
        <meta name="twitter:title" content="Global Footprint &amp; Locations | Invictus Global Tech" />
        <meta name="twitter:description" content="Discover Invictus Global Tech international footprint and Chennai headquarters, delivering enterprise growth and performance marketing globally." />'''
        ),
        (
            r'c:\INVICTUSDESIGN\Invictus-frontend\src\pages\contact.jsx',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/contact" />''',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/contact" />
        <meta property="og:title" content="Contact Invictus Global Tech | Performance Marketing Agency Chennai" />
        <meta property="og:description" content="Get in touch with Invictus Global Tech headquarters in Chennai, India. Contact our team for performance marketing consultations and growth audits." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/contact" />
        <meta name="twitter:title" content="Contact Invictus Global Tech | Performance Marketing Agency Chennai" />
        <meta name="twitter:description" content="Get in touch with Invictus Global Tech headquarters in Chennai, India. Contact our team for performance marketing consultations and growth audits." />'''
        ),
        (
            r'c:\INVICTUSDESIGN\Invictus-frontend\src\pages\careers\index.jsx',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/careers" />''',
            '''        <link rel="canonical" href="https://www.invictusglobaltech.com/careers" />
        <meta property="og:title" content="Careers at Invictus Global Tech | Performance Marketing &amp; Tech Jobs" />
        <meta property="og:description" content="Explore high-growth careers at Invictus Global Tech Chennai. Open roles in performance marketing, Google &amp; Meta Ads, design, video editing, and HR." />
        <meta property="og:url" content="https://www.invictusglobaltech.com/careers" />
        <meta name="twitter:title" content="Careers at Invictus Global Tech | Performance Marketing &amp; Tech Jobs" />
        <meta name="twitter:description" content="Explore high-growth careers at Invictus Global Tech Chennai. Open roles in performance marketing, Google &amp; Meta Ads, design, video editing, and HR." />'''
        )
    ]

    for path, target, rep in pages_og:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        if target in content:
            content = content.replace(target, rep, 1)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"SUCCESS: Added OpenGraph & Twitter tags to {os.path.basename(path)}")
        else:
            print(f"FAILED: Target canonical not found in {os.path.basename(path)}")

    print("\nALL PHASE 3 TECHNICAL & PERFORMANCE OPTIMIZATIONS APPLIED!")

apply_phase3()

