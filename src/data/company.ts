import type { SiteSettings } from '../types'

/** Content translated from Doc/a4.pdf — Sri Anjaneya Realtor */
export const PDF_SETTINGS_VERSION = 2

export const defaultSiteSettings: SiteSettings = {
  companyName: 'Sri Anjaneya Realtor',
  companyNameTelugu: 'శ్రీ ఆంజనేయ రియల్టర్',
  tagline: 'Your One-Stop Solution for Land & Buildings',
  taglineTelugu: 'భూమి మరియు భవనాలు తదితర అన్ని అవసరాలకు ఒకే ఒక్క పరిష్కార వేదిక',
  phone: '+91 93903 91534',
  email: 'srianjaneyarealtor@gmail.com',
  whatsappNumber: '919390391534',
  address: 'Andhra Pradesh & Telangana, India',
  serviceAreas: ['Andhra Pradesh', 'Telangana'],
  heroBadge: 'Trusted Across AP & Telangana',
  heroTitle: 'Your Dream Land & Home Awaits',
  heroSubtitle:
    'Vacant plots, agricultural lands, residential homes, and commercial properties — our services are available across Andhra Pradesh and Telangana.',
  heroSubtitleTelugu:
    'ఆంధ్ర ప్రదేశ్ మరియు తెలంగాణ రాష్ట్రాలలో మా సేవలు అందుబాటులో ఉన్నాయి. మా వద్ద వ్యవసాయ భూములు, ఖాళీ స్థలాలు, నివాస భవనాలు మరియు వాణిజ్య భవనాలు అందుబాటులో ఉన్నాయి.',
  contactHeadingTelugu: 'మమ్మల్ని సంప్రదించండి',
  aboutTitle: 'Building Trust, One Property at a Time',
  aboutIntro:
    'Sri Anjaneya Realtor is your one-stop solution for land, buildings, and every related property need across Andhra Pradesh and Telangana.',
  aboutContent:
    'We offer vacant plots, agricultural lands, residential buildings, and commercial properties — carefully selected and backed by clear guidance. Whether you are buying your first plot, investing in farmland, or searching for a home or commercial space, we help you move forward with confidence.',
  aboutStory:
    'From totapadu garden lands and magani fields to residential layouts in developing areas and commercial hubs in growing cities — we understand Telugu land and local markets deeply. Every deal carries our promise: honest guidance, clear documents, and support until registration and handover.',
  mission:
    'To connect buyers and sellers with the right land and buildings — with transparency, fair pricing, and personal care in every transaction.',
  vision:
    'To be the most trusted name for land and buildings in Andhra Pradesh and Telangana — where every customer says their dream was fulfilled with Sri Anjaneya Realtor.',
  yearsExperience: 15,
  propertiesSold: 850,
  happyClients: 2100,
  heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=95&auto=format&fit=crop',
  ctaTitle: 'Why Delay? Achieve Your Dreams With Us',
  ctaSubtitle:
    'Contact us today — safe investment, lifetime trust. Call or WhatsApp now.',
  trustPoints: [
    {
      title: 'Developed Areas',
      desc: 'Lands and buildings in fully developed locations with roads, water, electricity, and modern facilities.',
    },
    {
      title: 'Developing Areas',
      desc: 'Smart options in growing locations — ideal for investors and buyers planning for the future.',
    },
    {
      title: 'Affordable Outskirts',
      desc: 'Quality lands and buildings in peaceful outskirts at prices that respect your budget.',
    },
    {
      title: 'Safe Investment & Lifetime Trust',
      desc: 'Clear documentation, verified listings, and a reputation built on lasting customer trust.',
    },
  ],
  serviceCategories: [
    {
      title: 'Vacant Plots',
      items: [
        'Open plots in developing areas',
        'Residential layout plots',
        'Commercial plot sites',
        'Residential & commercial land parcels',
      ],
    },
    {
      title: 'Agricultural Lands',
      items: [
        'Totapadu (garden) lands',
        'Magani lands',
        'Metta (elevated) lands',
        'Beedu (seed) cultivation lands',
      ],
    },
    {
      title: 'Residential',
      items: [
        'Individual houses & villas',
        'Farmhouses in nature',
        'Apartments & gated communities',
        'Residential land parcels',
      ],
    },
    {
      title: 'Commercial',
      items: [
        'Factories, godowns & warehouses',
        'Shops, malls & complexes',
        'Hotels, resorts & apartments',
        'Banks & office spaces',
      ],
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
    'Developing areas perfect for future needs — smart lands and buildings',
    'Affordable lands & buildings in peaceful outskirts',
    'Safe investment backed by clear legal documentation',
    'A lifetime of trust — because your dream property deserves nothing less',
    'Achieve your dreams with Sri Anjaneya Realtor — why delay?',
  ],
  facebook: '',
  instagram: '',
  team: [
    {
      id: '1',
      name: 'Sri Anjaneya Realtor',
      role: 'Founder & Lead Agent',
      bio: 'Expert in agricultural land, vacant plots, residential and commercial properties across Andhra Pradesh and Telangana.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=90',
      phone: '+91 93903 91534',
      propertiesSold: 420,
    },
    {
      id: '2',
      name: 'Priya Reddy',
      role: 'Residential Specialist',
      bio: 'Helping families find homes and residential plots in Hyderabad, Vijayawada, and surrounding cities.',
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

/** Brochure fields from Doc/a4.pdf — synced on load for existing visitors */
export function pdfBrochureFields(settings: SiteSettings): Partial<SiteSettings> {
  return {
    companyName: settings.companyName,
    companyNameTelugu: settings.companyNameTelugu,
    tagline: settings.tagline,
    taglineTelugu: settings.taglineTelugu,
    phone: settings.phone,
    email: settings.email,
    whatsappNumber: settings.whatsappNumber,
    address: settings.address,
    serviceAreas: settings.serviceAreas,
    heroBadge: settings.heroBadge,
    heroTitle: settings.heroTitle,
    heroSubtitle: settings.heroSubtitle,
    heroSubtitleTelugu: settings.heroSubtitleTelugu,
    contactHeadingTelugu: settings.contactHeadingTelugu,
    aboutTitle: settings.aboutTitle,
    aboutIntro: settings.aboutIntro,
    aboutContent: settings.aboutContent,
    aboutStory: settings.aboutStory,
    mission: settings.mission,
    vision: settings.vision,
    ctaTitle: settings.ctaTitle,
    ctaSubtitle: settings.ctaSubtitle,
    trustPoints: settings.trustPoints,
    serviceCategories: settings.serviceCategories,
    startingPrices: settings.startingPrices,
    highlights: settings.highlights,
  }
}
