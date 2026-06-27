import type { SiteSettings } from '../types'

/** Content translated from Doc/a4.pdf — Sri Anjaneya Realtor company brochure */
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
  aboutTitle: 'Trusted Real Estate Partner in AP & Telangana',
  aboutContent:
    'Sri Anjaneya Realtor is your trusted one-stop destination for all land and building needs across Andhra Pradesh and Telangana. We offer agricultural lands, vacant plots, residential buildings, and commercial properties — all verified and ready for you. Whether you are buying your dream home, investing in farmland, or listing your property for sale, we guide you with transparency and lifetime trust.',
  mission:
    'To connect buyers and sellers with the right property through honest guidance, safe investments, and personalized service across Andhra Pradesh and Telangana.',
  vision:
    'To be the most trusted realtor brand in South India — where every family achieves their dream of owning land or a home.',
  yearsExperience: 15,
  propertiesSold: 850,
  happyClients: 2100,
  heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=90',
  heroTitle: 'Find Land, Homes & Commercial Property',
  heroSubtitle: 'Vacant plots, agricultural land, residential & commercial buildings across AP and Telangana.',
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
      items: ['Individual houses', 'Villas & farmhouses', 'Apartments & gated communities', 'Residential land parcels'],
    },
    {
      title: 'Commercial',
      items: ['Shops & showrooms', 'Malls & complexes', 'Factories & godowns', 'Hotels, resorts & apartments', 'Banks & office spaces'],
    },
  ],
  startingPrices: [
    { category: 'Vacant Plots', price: '₹9,000', unit: 'per sq. yard onwards' },
    { category: 'Agricultural Land', price: '₹9 Lakhs', unit: 'per acre onwards' },
    { category: 'Residential Buildings', price: '₹36 Lakhs', unit: 'onwards' },
    { category: 'Commercial Buildings', price: '₹9,000', unit: 'per sq. ft onwards' },
  ],
  highlights: [
    'Developed areas with all modern facilities',
    'Developing areas ideal for future investment',
    'Affordable lands & buildings in outskirts',
    'Safe investment with lifetime trust',
    'Achieve your dreams with Sri Anjaneya Realtor',
  ],
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  team: [
    {
      id: '1',
      name: 'Sri Anjaneya Realtor',
      role: 'Founder & Lead Agent',
      bio: 'Expert in agricultural land, vacant plots, and residential properties across AP & Telangana.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=90',
      phone: '+91 93903 91534',
      propertiesSold: 420,
    },
    {
      id: '2',
      name: 'Priya Reddy',
      role: 'Residential Specialist',
      bio: 'Specialist in houses, villas, and gated community properties in Hyderabad & Vijayawada.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=90',
      phone: '+91 93903 91534',
      propertiesSold: 285,
    },
    {
      id: '3',
      name: 'Arjun Rao',
      role: 'Commercial & Land Expert',
      bio: 'Handles commercial buildings, godowns, factories, and large land parcels.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=90',
      phone: '+91 93903 91534',
      propertiesSold: 145,
    },
  ],
}
