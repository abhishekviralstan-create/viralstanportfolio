// All copy below is sourced from viralstan.com

// Google review link opened by the review CTA. For the most reliable popup, replace
// with the "Ask for reviews" link from Google Business Profile (g.page/r/.../review)
// or https://search.google.com/local/writereview?placeid=<PLACE_ID>
export const reviewUrl =
  'https://www.google.com/search?q=viralstan&oq=viralstan&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIQCAQQLhivARjHARiABBiOBTIKCAUQABiABBi0BzIGCAYQRRhB0gEIMjUzNWowajeoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8#sv=CAESzQEKuQEStgEKd0FKaVQ0dEtKbkc0Y0VaekJaNE15cEE4VTJDOHVTNUZvLUpKR2hxVURHRWJ2RWZuTWNuTmNjOXF1bmZPYVNVYlJ4WUFKbkxCQjV1UDQ4YzVzbkRoSFhxOTdOWHFlTjc3YXdXMDlBY2ZfMjhRRWR0ZE56aGlPSXNjEhc2US0xYXNMakM1U1JuZXNQaXBERnVBURoiQURzcjlmUVhZdERfUU1fV29rSzRzaDNfbVhnQjdsM0JsURIEODA1MRoBMyoAMAA4AUAAGAAgtK_g1wxKAhAB'

export const story = [
  {
    year: '01',
    title: 'The beginning',
    text: 'Viralstan started with a simple goal: make effective digital marketing accessible to every ambitious business, not just large brands.',
  },
  {
    year: '02',
    title: 'One team, one roof',
    text: 'SEO experts, paid media strategists, designers and developers under one roof, so clients get one accountable team instead of scattered freelancers.',
  },
  {
    year: '03',
    title: 'From India to Global',
    text: 'What began in India now supports ambitious brands across markets, combining local insight with a global growth mindset.',
  },
  {
    year: '04',
    title: 'Growing every year',
    text: 'Today strategy, creativity and technology work together to deliver measurable, repeatable growth for ambitious brands.',
  },
]

export const pillars = [
  {
    label: 'Mission',
    text: 'To enable companies of all sizes with data-driven, innovatively fearless and financially imaginative digital marketing solutions.',
    grad: 'var(--g-pink)',
  },
  {
    label: 'Vision',
    text: 'To become one of the most trusted digital growth partners for businesses, delivering innovative, transparent and measurable marketing.',
    grad: 'var(--g-violet)',
  },
]

export const services = [
  {
    no: '01',
    title: 'Search Engine Optimisation',
    kicker: 'Organic visibility',
    text: 'Build lasting search visibility with technical SEO, intent-led content and authority strategies that attract qualified traffic.',
    tags: ['Technical SEO', 'Content Strategy', 'Authority', 'Local SEO'],
    icon: 'search',
    color: '#315eea',
  },
  {
    no: '02',
    title: 'Social Media Management',
    kicker: 'Always-on presence',
    text: 'Turn your social channels into an active brand community with thoughtful content, publishing, engagement and clear reporting.',
    tags: ['Strategy', 'Content', 'Community'],
    icon: 'social',
    color: '#df4da6',
  },
  {
    no: '03',
    title: 'Performance Marketing',
    kicker: 'Measurable acquisition',
    text: 'Scale leads and sales through data-led Google and Meta campaigns, creative testing and continuous conversion optimisation.',
    tags: ['Google Ads', 'Meta Ads', 'CRO', 'Analytics'],
    icon: 'chart',
    color: '#f4295e',
  },
  {
    no: '04',
    title: 'Influencer Marketing',
    kicker: 'Creator-led reach',
    text: 'Connect with the right creators through audience research, campaign planning, content coordination and transparent tracking.',
    tags: ['Creators', 'Campaigns', 'Reporting'],
    icon: 'star',
    color: '#7c3aed',
  },
  {
    no: '05',
    title: 'Website Development',
    kicker: 'Digital experiences',
    text: 'Launch fast, responsive and conversion-focused websites with intuitive UX, scalable development and reliable performance.',
    tags: ['UI/UX', 'Development', 'E-commerce'],
    icon: 'code',
    color: '#06b6d4',
  },
  {
    no: '06',
    title: 'Graphic Designing',
    kicker: 'Brand-consistent visuals',
    text: 'Branding, social creatives, brochures and marketing collateral designed to keep your brand consistent everywhere.',
    tags: ['Branding', 'Social Creatives', 'Collateral'],
    icon: 'pen',
    color: '#6366f1',
  },
  {
    no: '07',
    title: 'Video & Motion Graphics',
    kicker: 'Scroll-stopping stories',
    text: 'Reel editing, motion graphics and polished, platform-ready videos with sharp pacing, purposeful motion and a consistent brand language.',
    tags: ['Reels', 'Motion Graphics', 'Post-production'],
    icon: 'play',
    color: '#ec4899',
  },
  {
    no: '08',
    title: 'UGC Content',
    kicker: 'Content that feels real',
    text: 'Authentic creator-style videos that earn attention, build trust and give paid and organic campaigns stronger creative.',
    tags: ['Concepts', 'Creators', 'Ad Creative'],
    icon: 'camera',
    color: '#0ea5e9',
  },
]

// Case studies: each needs a full-page screenshot in public/work/<id>.webp
export const projects = [
  {
    id: 'revnorcm',
    name: 'RevnoRCM',
    logo: '/partners/Revnorcm.png',
    image: '/work/revnorcm.webp',
    industry: 'Healthcare · Medical Billing',
    services: ['Website Development', 'Social Media Management'],
    summary: 'Revenue cycle management for medical practices.',
    detail:
      'A professional healthcare billing presence built around clarity, trust and revenue-cycle expertise. The site walks practices through every part of their billing operation, from patient intake to payment. Alongside the website, we run their social media so the brand stays active and consistent.',
    highlights: [
      'Network-particle hero with animated brand mark',
      '“Six files” services explorer designed as interactive folders',
      'Clickable revenue cycle from intake to payment posting',
      '3D scrolling testimonial carousel',
    ],
    quote:
      'They created a modern, attractive and customer-friendly website that perfectly represents our brand and services. The team was professional, responsive and attentive to every detail.',
    colors: ['#1e5bb8', '#3fb950'],
  },
  {
    id: 'elitesbook',
    name: 'Elites Book',
    logo: '/partners/elitesbook.png',
    image: '/work/elitesbook.webp',
    industry: 'Finance · Bookkeeping',
    services: ['Website Development', 'Social Media Management'],
    summary: 'Virtual bookkeeping for small businesses, done right every month.',
    detail:
      'A clean, conversion-focused website for a virtual bookkeeping firm. It explains a complex service simply: industry-specific packages, a four-step monthly process and a free audit offer that turns visitors into consultations. We also manage their social media to keep new leads coming in.',
    highlights: [
      'Industry packages for e-commerce, trucking and shippers',
      'Four-step “Clean Books Every Month” process section',
      'Reviews, blog and FAQ built for trust and SEO',
      'Free-audit call to action on every key screen',
    ],
    quote:
      'Viralstan built our website exactly the way we needed it—professional, simple to navigate and credible from the first visit. Their team communicates well and always delivers on time.',
    colors: ['#f97316', '#1e3a8a'],
  },
  {
    id: 'tredixo',
    name: 'Tredixo',
    logo: '/partners/Tredixo.png',
    image: '/work/tredixo.webp',
    industry: 'Fintech · Trading',
    services: ['Website Development', 'Social Media Management', 'Video Ads', 'Performance Marketing'],
    summary: 'Trade smarter, grow faster, across every major market.',
    detail:
      'A bold, dark trading platform website with neon-green accents that feels fast and credible. It brings crypto, NSE, MCX, forex and commodities together in one place, with app downloads and local payment options front and centre. Beyond the website, we manage their social media, produce video ads and run their performance marketing campaigns.',
    highlights: [
      'Live-style market stats and trading dashboard hero',
      'Nine trading instruments in one clear grid',
      '“Start trading in seconds” app onboarding flow',
      'Local deposits via UPI, card, crypto and Binance Pay',
    ],
    quote:
      'Viralstan delivered a trading platform website that feels credible, fast and professional. Their responsiveness and attention to detail stood out throughout the project.',
    colors: ['#22c55e', '#052e16'],
  },
  {
    id: 'transvera',
    name: 'Transvera Logistics',
    logo: '/partners/Transvra.png',
    image: '/work/transvera.webp',
    industry: 'Freight · Logistics',
    services: ['Website Development', 'Social Media Management'],
    summary: 'Dispatch to delivery, with freight that moves reliably.',
    detail:
      'A credible digital experience for a freight company that makes shipment services easy to understand and a quote easy to request. Strong imagery, clear service cards and social proof carry prospects from first look to enquiry. We also handle their social media presence.',
    highlights: [
      'Inbound, road freight and cross-border service cards',
      'Client review wall and trust stats',
      'Built-in “Request a Quote” lead form',
      'Logistics insights blog for SEO',
    ],
    colors: ['#2563eb', '#0b1f5c'],
  },
  {
    id: 'ouransh',
    name: 'Ouransh',
    logo: '/partners/Ouransh.png',
    image: '/work/ouransh.webp',
    industry: 'Wellness · Diet & Skin Clinic',
    services: ['Website Development', 'Local SEO', 'Social Media Management', 'Performance Marketing'],
    summary: 'Diet, skin and hair care, brought together under one roof.',
    detail:
      'An elegant website for a diet and skin care clinic that combines personalised nutrition with advanced aesthetic treatments. The warm cream-and-gold design feels premium and calm, and every page leads to booking a consultation. We also drive patients to the clinic through local SEO, social media and performance marketing.',
    highlights: [
      'Skin, hair and diet & nutrition service pages',
      '“Why we look deeper” root-cause approach story',
      'Google reviews, FAQ and clinic map for local trust',
      'One-tap consultation booking and WhatsApp',
    ],
    colors: ['#b08d57', '#1f3b2d'],
  },
]

// Testimonials only from clients that have a case study above
export const testimonials = projects.filter((p) => p.quote).map((p) => ({ name: p.name, role: p.services.join(' · '), text: p.quote }))

// Video portfolio: web versions live in public/reels/<id>.mp4 (+ .jpg poster)
export const reelFilters = ['All', 'Real Estate', 'Brand Ads', 'Web Series', 'Fashion']

export const reels = [
  { id: 'agarwal-shoot-1', title: 'Property Campaign', client: 'Aggarwal Property', category: 'Real Estate' },
  { id: 'tredixo', title: 'Alag Trading', client: 'Tredixo', category: 'Brand Ads' },
  { id: 'Tulip', poster: 'episode-1', title: 'Episode 01', client: 'Tulip Finance', category: 'Web Series' },
  { id: 'agarwal-100-gaj', title: 'Luxury Property Campaign', client: 'Aggarwal Property', category: 'Real Estate' },
  { id: 'vitoxyz', title: 'Healthcare at Home', client: 'Vitoxyz', category: 'Brand Ads' },
  { id: 'tulip-episode-2', title: 'Episode 02', client: 'Tulip Finance', category: 'Web Series' },
  { id: 'agarwal-shoot-2', title: 'Property Shoot 02', client: 'Aggarwal Property', category: 'Real Estate' },
  { id: 'tulip-icl', title: 'Tulip Tiger × ICL', client: 'Tulip Finance', category: 'Web Series' },
  { id: 'agarwal-shoot-3', title: 'Property on a Budget', client: 'Aggarwal Property', category: 'Real Estate' },
  { id: 'property-shoot-5', title: 'Property Walkthrough', client: 'Property Shoots', category: 'Real Estate' },
]
