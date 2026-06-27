import type { SiteSettings } from '../types'

/** Content translated & enriched from Doc/a4.pdf — Sri Anjaneya Realtor */
export const defaultSiteSettings: SiteSettings = {
  companyName: 'Sri Anjaneya Realtor',
  companyNameTelugu: 'శ్రీ ఆంజనేయ రియల్టర్',
  tagline: 'Your One-Stop Solution for Land & Buildings',
  taglineTelugu: 'భూమి మరియు భవనాల అవసరాలకు ఒకే పరిష్కార వేదిక',
  phone: '+91 93903 91534',
  email: 'srianjaneyarealtor@gmail.com',
  whatsappNumber: '919390391534',
  address: 'Andhra Pradesh & Telangana, India',
  serviceAreas: ['Andhra Pradesh', 'Telangana'],
  heroBadge: 'Trusted Across AP & Telangana',
  heroTitle: 'Your Dream Land & Home Awaits',
  heroSubtitle:
    'From fertile agricultural fields to premium vacant plots, beautiful homes to thriving commercial spaces — Sri Anjaneya Realtor brings every property dream within your reach.',
  aboutTitle: 'Building Trust, One Property at a Time',
  aboutIntro:
    'At Sri Anjaneya Realtor, we believe every family deserves a place to call their own — whether it is a patch of farmland, a plot to build on, or a home filled with memories.',
  aboutContent:
    'We are your trusted one-stop destination for all land and building needs across Andhra Pradesh and Telangana. Agricultural lands, vacant plots, residential homes, and commercial properties — carefully selected, legally verified, and offered with complete transparency. For over 15 years, families and investors have relied on us for safe investments and lifetime trust.',
  aboutStory:
    'What began as a passion to help people find the right land has grown into a full-service real estate platform serving buyers, sellers, and investors across two states. We understand the heart of Telugu land — totapadu gardens, magani fields, residential layouts in developing areas, and commercial hubs in growing cities. Every property we list carries our promise: honest guidance, clear documents, and unwavering support until you hold the keys — or the title deed — in your hands.',
  mission:
    'To guide every buyer and seller with honesty and warmth — connecting people to properties that build wealth, security, and happiness across Andhra Pradesh and Telangana.',
  vision:
    'To be the most loved and trusted realtor in South India, where every customer says: "My dream became reality with Sri Anjaneya Realtor."',
  yearsExperience: 15,
  propertiesSold: 850,
  happyClients: 2100,
  heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=90',
  ctaTitle: 'Why Wait? Your Property Journey Starts Today',
  ctaSubtitle:
    'Whether you want to buy fertile land, sell your property, or invest in a developing area — call us now. Safe investment. Lifetime trust. Your dream, our commitment.',
  trustPoints: [
    { title: 'Clear Title Properties', desc: 'Every listing verified for legal clarity — no surprises, no hidden issues.' },
    { title: 'Developed & Developing Areas', desc: 'Choose fully developed locations or invest early in tomorrow\'s hotspots.' },
    { title: 'Affordable Outskirts Options', desc: 'Premium land and buildings at prices that respect your budget.' },
    { title: 'Lifetime Trust Guarantee', desc: 'We stand by every deal — your satisfaction is our reputation.' },
  ],
  serviceCategories: [
    {
      title: 'Vacant Plots',
      items: ['Open plots in developing areas', 'Residential layout plots', 'Commercial plot sites', 'Affordable outskirts land'],
    },
    {
      title: 'Agricultural Lands',
      items: ['Totapadu (garden) lands', 'Magani lands', 'Metta (elevated) lands', 'Seed (Beedu) cultivation lands'],
    },
    {
      title: 'Residential',
      items: ['Individual houses & villas', 'Farmhouses in nature', 'Apartments & gated communities', 'Residential land parcels'],
    },
    {
      title: 'Commercial',
      items: ['Shops, malls & complexes', 'Factories, godowns & warehouses', 'Hotels, resorts & apartments', 'Banks & office spaces'],
    },
  ],
  startingPrices: [
    { category: 'Vacant Plots', price: '₹9,000', unit: 'per sq. yard onwards' },
    { category: 'Agricultural Land', price: '₹9 Lakhs', unit: 'per acre onwards' },
    { category: 'Residential Buildings', price: '₹36 Lakhs', unit: 'onwards' },
    { category: 'Commercial Buildings', price: '₹9,000', unit: 'per sq. ft onwards' },
  ],
  highlights: [
    'Developed areas with all modern facilities — roads, water, electricity ready',
    'Developing areas perfect for smart investors seeking future growth',
    'Affordable lands & buildings in peaceful outskirts',
    'Safe investment backed by clear legal documentation',
    'A lifetime of trust — because your dream home deserves nothing less',
    'Achieve your dreams with Sri Anjaneya Realtor — why delay?',
  ],
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  team: [
    {
      id: '1',
      name: 'Sri Anjaneya Realtor',
      role: 'Founder & Lead Agent',
      bio: 'Leading expert in agricultural land, vacant plots, and residential properties. Trusted by hundreds of families across AP & Telangana.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=90',
      phone: '+91 93903 91534',
      propertiesSold: 420,
    },
    {
      id: '2',
      name: 'Priya Reddy',
      role: 'Residential Specialist',
      bio: 'Passionate about matching families with their perfect home in Hyderabad, Vijayawada, and surrounding cities.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=90',
      phone: '+91 93903 91534',
      propertiesSold: 285,
    },
    {
      id: '3',
      name: 'Arjun Rao',
      role: 'Commercial & Land Expert',
      bio: 'Specialist in commercial buildings, godowns, factories, and large-scale land deals for investors.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=90',
      phone: '+91 93903 91534',
      propertiesSold: 145,
    },
  ],
}
