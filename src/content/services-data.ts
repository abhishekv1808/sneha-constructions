import type { StaticImageData } from 'next/image'

import heroBg from '@/assets/hero/hero-bg.jpg'
import showcasePavilion from '@/assets/hero/showcase-pavilion.jpg'
import detailTimber from '@/assets/hero/detail-timber.jpg'
import service2Residential from '@/assets/services/service-2-residential.jpg'
import service3Turnkey from '@/assets/services/service-3-turnkey.jpg'
import service4Commercial from '@/assets/services/service-4-commercial.jpg'
import videoBg from '@/assets/video/video-band-bg.jpg'
import serviceResidential from '@/assets/placeholder/service-residential.jpg'
import serviceCommercial from '@/assets/placeholder/service-commercial.jpg'
import serviceTurnkey from '@/assets/placeholder/service-turnkey.jpg'

// Bespoke Hero Buildings & Authentic Indian Engineering Team
import residentialHeroVilla from '@/assets/services/bespoke/residential-hero-villa.jpg'
import commercialHeroBuilding from '@/assets/services/bespoke/commercial-hero-building.jpg'
import turnkeyHeroResidence from '@/assets/services/bespoke/turnkey-hero-residence.jpg'
import engineersPlanningSite from '@/assets/team/engineers-planning-site.jpg'
import architectInspectingSite from '@/assets/team/architect-inspecting-site.jpg'
import indianWorkersCraft from '@/assets/team/indian-workers-craft.jpg'
import engineerLookingUp from '@/assets/team/engineer-looking-up.jpg'

export interface SubServiceItem {
  title: string
  description: string
  features: string[]
}

export interface SpecItem {
  component: string
  brand: string
  specification: string
}

export interface ServiceProjectItem {
  title: string
  type: string
  location: string
  area: string
  image: StaticImageData
}

export interface ServiceFaq {
  question: string
  answer: string
}

export interface ServiceDetail {
  slug: 'residential' | 'commercial' | 'turnkey'
  canonicalSlug: string
  name: string
  shortName: string
  tagline: string
  metaTitle: string
  metaDescription: string
  heroImage: StaticImageData
  heroBuildingImage: StaticImageData
  teamImage: StaticImageData
  craftImage: StaticImageData
  emotionalTitle: string
  emotionalSubtitle: string
  clientFamilyStory: {
    name: string
    location: string
    quote: string
    year: string
  }
  trustBadges: {
    title: string
    subtitle: string
  }[]
  heroLead: string
  rateHighlight: string
  timelineHighlight: string
  experienceHighlight: string
  complianceHighlight: string
  overview: string[]
  subServices: SubServiceItem[]
  specs: SpecItem[]
  processSteps: { title: string; description: string }[]
  projects: ServiceProjectItem[]
  faqs: ServiceFaq[]
}

export const servicesData: Record<'residential' | 'commercial' | 'turnkey', ServiceDetail> = {
  residential: {
    slug: 'residential',
    canonicalSlug: 'residential',
    name: 'Luxury Residential Construction',
    shortName: 'Residential',
    tagline: 'Strong foundations. Elegant designs. Peaceful living spaces.',
    metaTitle: 'Residential Construction in Tumkur | Duplexes, Villas & Bungalows',
    metaDescription:
      'Expert residential home construction in Tumkur by Sneha Construction. Bespoke duplexes, modern villas, and vastu-compliant family homes with locked pricing.',
    heroImage: service2Residential,
    heroBuildingImage: residentialHeroVilla,
    teamImage: architectInspectingSite,
    craftImage: indianWorkersCraft,
    emotionalTitle: 'Building Not Just Houses, But Lifelong Family Sanctuaries in Tumkur',
    emotionalSubtitle:
      'From the sacred Bhoomi Pooja to the joy of Griha Pravesha with your elders, we craft every wall with engineering rigor, pure Vastu alignment, and heartfelt care.',
    clientFamilyStory: {
      name: 'Dr. Srinivas & Smt. Anupama',
      location: 'SS Puram, Tumkur',
      quote:
        'Building our dream home while managing our clinic was completely stress-free with Sneha Construction. From foundation curing to the final teak woodwork, their site engineers sent us updates every evening. Today, our family lives peacefully in a home built with pure love and engineering perfection.',
      year: 'Handed over 2025',
    },
    trustBadges: [
      { title: '250+ Tumkur Families', subtitle: 'Living happily in Sneha-built homes' },
      { title: '100% Vastu Compliant', subtitle: 'Scientifically verified space layouts' },
      { title: '10-Year Structural Guarantee', subtitle: 'Certified Tata Tiscon Fe550D TMT' },
    ],
    heroLead:
      'From custom duplexes and contemporary family bungalows to sprawling luxury villas, we engineer residences in Tumkur district that unite earthquake-resistant structural integrity with breathtaking architectural aesthetics.',
    rateHighlight: 'Starting from ₹1,875/sq ft',
    timelineHighlight: '6 – 9 Months Delivery',
    experienceHighlight: '250+ Homes Handed Over',
    complianceHighlight: '100% Vastu Compliant',
    overview: [
      'Building a home is a once-in-a-lifetime milestone. At Sneha Construction & Developers, we treat every residential plot in Tumkur with the personal care and scientific precision it deserves.',
      'Our in-house architects draft 100% Vastu-compliant 2D space plans and photorealistic 3D elevations before excavation starts. Our on-site civil engineers supervise daily concrete curing, rebar placement, and masonry tolerances to guarantee zero micro-cracks and leak-proof longevity.',
      'We operate with locked-rate contractual agreements: you receive an itemized Bill of Quantities (BOQ) covering every bag of cement and every foot of wiring so you never face cost escalation.',
    ],
    subServices: [
      {
        title: 'Modern Duplex Residences',
        description:
          'Spacious multi-level floor plans designed for contemporary urban living with double-height living halls and terrace lounges.',
        features: [
          'Double-height ceiling design',
          'Vastu-aligned master suites',
          'Internal teakwood staircase',
          'Covered car porch with pavers',
        ],
      },
      {
        title: 'Luxury Independent Villas',
        description:
          'Private, bespoke gated villas featuring landscaped courtyards, imported stone cladding, and generous natural daylighting.',
        features: [
          'Curved & parametric elevations',
          'Central skylit courtyards',
          'Sound-dampened acoustic glazing',
          'Solar water heating provision',
        ],
      },
      {
        title: 'Contemporary Bungalows',
        description:
          'Single or two-floor family bungalows prioritizing accessible horizontal layouts, wide verandahs, and peaceful gardens.',
        features: [
          'Senior-citizen friendly accessibility',
          'Expansive outdoor verandahs',
          'Pooja room as per directional Vastu',
          'Heavy teak main doors with brass fittings',
        ],
      },
      {
        title: 'Farmhouses & Weekend Retreats',
        description:
          'Scenic rural and semi-urban farmhouse structures designed with climate-responsive ventilation and rustic elegance.',
        features: [
          'Thermal insulation roofing',
          'Rainwater harvesting pits',
          'Perimeter fencing & compound walls',
          'Semi-outdoor barbecue pavilions',
        ],
      },
      {
        title: 'Multi-Family Apartments & Floors',
        description:
          'Independent residential floors and stilt-plus-three apartment blocks built for joint families or rental yields.',
        features: [
          'Independent electricity & water meters',
          'Stilt parking with RCC pillar grid',
          'Lift shaft and generator provision',
          'Borewell & overhead tank network',
        ],
      },
      {
        title: 'PGs & Student Hostels',
        description:
          'High-density, durable accommodation spaces optimized for colleges and working professionals in Tumkur city.',
        features: [
          'High-traffic vitrified flooring',
          'Attached bathrooms with solar hot water',
          'Commercial kitchen & dining hall layouts',
          'Robust fire-escape stairs & safety exits',
        ],
      },
    ],
    specs: [
      {
        component: 'Structural Steel',
        brand: 'Tata Tiscon / A1 Gold',
        specification: 'FE-550D Super Ductile high-tensile earthquake resistant TMT rebars',
      },
      {
        component: 'Cement',
        brand: 'UltraTech / ACC / Birla Super',
        specification: '53-grade OPC for RCC column casting, PPC for brickwork & plastering',
      },
      {
        component: 'Masonry & Bricks',
        brand: 'Local First-Class Red Kiln Bricks',
        specification: '9" thick exterior structural walls, 4.5" interior partitions with cement mortar',
      },
      {
        component: 'Plumbing & Drainage',
        brand: 'Astral / Ashirvad',
        specification: 'SDR-11 lead-free CPVC for hot/cold lines, heavy PVC for underground sewage',
      },
      {
        component: 'Electrical Wiring',
        brand: 'Polycab / Havells / Finolex',
        specification: 'FR-LSH flame-retardant copper conductors with modular switches & individual MCBs',
      },
      {
        component: 'Flooring',
        brand: 'Kajaria / Somany / Simpolo',
        specification: '4x2 ft double-charged vitrified tiles with anti-skid bathroom ceramic flooring',
      },
      {
        component: 'Wall Paints',
        brand: 'Asian Paints Royale',
        specification: 'Two coats Birla White putty, one coat primer, two coats luxury washable emulsion',
      },
      {
        component: 'Doors & Windows',
        brand: 'First Quality Honne / Teakwood',
        specification: '5x3 inch teak main frame with carved 38mm teak shutter; UPVC 3-track sliding windows',
      },
    ],
    processSteps: [
      {
        title: 'Site Inspection & Soil Analysis',
        description:
          'Our senior civil engineer visits your plot in Tumkur to evaluate soil bearing capacity, approach road width, water table, and local TUDA setbacks.',
      },
      {
        title: 'Vastu Space Planning & 3D Elevation',
        description:
          'We produce personalized 2D floor plans aligned with your lifestyle and directional Vastu, accompanied by 4K 3D exterior architectural renders.',
      },
      {
        title: 'Transparent Bill of Quantities (BOQ)',
        description:
          'Every material brand, wire gauge, and cement grade is locked in a comprehensive legal contract with milestone-linked payment schedules.',
      },
      {
        title: 'Excavation & RCC Foundation',
        description:
          'Engineered trenching, anti-termite treatment, and foundation footings poured using ready-mix or on-site mechanical batching with strict 21-day curing.',
      },
      {
        title: 'Superstructure, Masonry & Concealed Services',
        description:
          'RCC columns, roof slabs, 9-inch brick walls, concealed electrical conduits, and pressure-tested plumbing lines installed under civil supervision.',
      },
      {
        title: 'Premium Finishes & Handover',
        description:
          'Plastering, tile laying, interior paint coats, sanitary fixture fittings, final quality audit checklist, and Griha Pravesha key handover.',
      },
    ],
    projects: [
      {
        title: 'The Timber Wave Villa',
        type: '4BHK Luxury Villa',
        location: 'Vinobanagar, Tumkur',
        area: '4,800 sq ft',
        image: heroBg,
      },
      {
        title: 'Sculptural Pavilion Duplex',
        type: '3BHK Modern Duplex',
        location: 'Gubbi Main Road, Tumkur',
        area: '3,200 sq ft',
        image: showcasePavilion,
      },
      {
        title: 'Contemporary Family Bungalow',
        type: '5BHK Independent Bungalow',
        location: 'Kunigal Town, Tumkur',
        area: '3,800 sq ft',
        image: serviceResidential,
      },
      {
        title: 'Urban Serenity Duplex',
        type: '3BHK Turnkey Residence',
        location: 'Tiptur Extension, Tumkur',
        area: '2,950 sq ft',
        image: serviceTurnkey,
      },
    ],
    faqs: [
      {
        question: 'What is the average duration to construct a duplex house in Tumkur?',
        answer:
          'For a typical 2,500 to 3,500 sq ft residential duplex, the complete construction timeline is between 6 to 9 months from foundation excavation to final painting. We provide a milestone-linked timeline chart so you can track progress week by week.',
      },
      {
        question: 'How do you ensure Vastu compliance for my residential plot?',
        answer:
          'All our floor plans are drafted by certified architectural designers well-versed in traditional Vastu Shastra principles: placing the master bedroom in the South-West, kitchen in South-East (Agni), main entrance in positive Pada, and pooja room in North-East (Ishanya).',
      },
      {
        question: 'Do you provide architectural design approval and TUDA plan sanctions?',
        answer:
          'Yes. Our team handles complete blueprint drawings conforming strictly to Tumkur Urban Development Authority (TUDA) and local Gram Panchayat bylaws, handling documentation and submission for approvals.',
      },
      {
        question: 'Can we customize the flooring tiles, sanitaryware, and paint shades?',
        answer:
          'Absolutely. We accompany our clients to authorized brand showrooms so you can handpick tile textures, granite slabs, bath fittings, and Asian Paints color palettes within the allocated package allowances.',
      },
    ],
  },

  commercial: {
    slug: 'commercial',
    canonicalSlug: 'commercial',
    name: 'Commercial & Civil Construction',
    shortName: 'Commercial',
    tagline: 'Perfectly planned commercial spaces built for success.',
    metaTitle: 'Commercial Construction Company in Tumkur | Office, Retail & Institutional',
    metaDescription:
      'Premier commercial civil construction in Tumkur by Sneha Construction. High-load structural framing, office complexes, shopping hubs, schools, and hospitals.',
    heroImage: service4Commercial,
    heroBuildingImage: commercialHeroBuilding,
    teamImage: engineerLookingUp,
    craftImage: indianWorkersCraft,
    emotionalTitle: 'High-Performance Commercial Landmarks Built to Maximize Footfall & Rental Yield',
    emotionalSubtitle:
      'Engineered for Tumkur entrepreneurs, retail brands, and commercial landlords across B.H. Road, Kyathsandra & SS Puram. 100% By-Law Compliant, Built to Stand Tall for 50+ Years.',
    clientFamilyStory: {
      name: 'Sri M. Venkatesh (Investor & Landlord)',
      location: 'B.H. Road, Tumkur',
      quote:
        'Sneha Construction built our 18,500 sq.ft commercial plaza on B.H. Road ahead of schedule. Their understanding of Tumkur Town Planning by-laws, fire safety clearances, and column-free layouts allowed us to lease 100% of the space to prime retail tenants immediately.',
      year: 'Completed 2024',
    },
    trustBadges: [
      { title: '45+ Landmark Buildings', subtitle: 'Retail, offices & institutional hubs' },
      { title: '100% By-Law Compliant', subtitle: 'TUDA & Town Planning approved' },
      { title: 'High Rental Yield Design', subtitle: 'Maximum FAR & usable floor plates' },
    ],
    heroLead:
      'Engineered for maximum floor utilization, commercial durability, and regulatory safety compliance. We design and erect commercial landmarks in Tumkur that accelerate business growth and long-term asset value.',
    rateHighlight: 'Competitive Commercial BOQ Rates',
    timelineHighlight: 'Strict Milestone Pacing',
    experienceHighlight: '45+ Commercial Deliveries',
    complianceHighlight: 'Fire & Municipal Sanctioned',
    overview: [
      'Commercial buildings demand rigorous structural engineering: higher dead and live load allowances, vibration dampening, expansive column-free floor plates, fire-safety compliance, and heavy visitor traffic resilience.',
      'Sneha Construction & Developers provides complete commercial civil engineering across Tumkur, Gubbi, and Kunigal. Whether you are developing a multi-storey shopping plaza, a private school campus, a multi-speciality hospital, or a corporate office complex, our team delivers industrial-grade execution on time.',
      'We minimize idle capital by maintaining parallel execution workflows: structural framing, glass facade engineering, high-voltage electrical distribution, and HVAC provisions happen in synchrony.',
    ],
    subServices: [
      {
        title: 'Office Buildings & Corporate Hubs',
        description:
          'Modern column-spaced commercial structures with provision for high-speed lifts, modular server rooms, and acoustic glass facades.',
        features: [
          'High load-bearing post-tensioned RCC slabs',
          'Centralized electrical trunking & busbars',
          'DG power backup & transformer yards',
          'Underground multi-vehicle parking layouts',
        ],
      },
      {
        title: 'Shopping Plazas & Retail Complexes',
        description:
          'High-footfall commercial plazas with double-height showroom glass fronts, wide escalators/stairwells, and robust fire exits.',
        features: [
          'Frameless structural glass storefronts',
          'Heavy duty anti-skid granite corridors',
          'High ceiling clearances for MEP ducting',
          'Signage and facade LED illumination lines',
        ],
      },
      {
        title: 'Schools & Educational Campuses',
        description:
          'Institutional campus development engineered with natural cross-ventilation, spacious assembly halls, and sturdy playground civil works.',
        features: [
          'Wide 8-foot student safety corridors',
          'Acoustically insulated smart classrooms',
          'Dedicated physics, chemistry & computer lab layouts',
          'Ramp accessibility & child safety railing specs',
        ],
      },
      {
        title: 'Hospitals & Medical Clinics',
        description:
          'Healthcare infrastructure designed to medical compliance codes, including sterile OT flooring, heavy equipment shielding, and oxygen manifolds.',
        features: [
          'Medical gas pipeline conduit routing',
          'Lead-shielded X-Ray / CT scan room walls',
          'Stretcher-sized high-speed elevator shafts',
          'Antibacterial seamless vinyl & epoxy surfaces',
        ],
      },
      {
        title: 'Hotels, Banquet Halls & Restaurants',
        description:
          'Hospitality structures engineered for grand column-free gathering halls, heavy commercial kitchens, and guest acoustics.',
        features: [
          'Long-span RCC beams for pillar-free halls',
          'Heavy commercial kitchen drainage & grease traps',
          'Acoustic soundproofing between guest suites',
          'High-capacity overhead industrial water storage',
        ],
      },
      {
        title: 'Industrial Sheds & Warehouses',
        description:
          'PEB (Pre-Engineered Building) steel structures and heavy RCC industrial warehouses with heavy floor loading capacity.',
        features: [
          'VDF (Vacuum Dewatered Flooring) laser screed',
          'High eave height for multi-tier racking',
          'Heavy container truck loading bays & docks',
          'Turbo ventilator & natural skylight polycarbonate sheets',
        ],
      },
    ],
    specs: [
      {
        component: 'Primary Structural Steel',
        brand: 'JSW Steel / Tata Tiscon',
        specification: 'Heavy Fe-550D TMT rebars & structural steel I-beams for wide-span clear spaces',
      },
      {
        component: 'Commercial Concrete',
        brand: 'RMC (M25 to M40 Grade)',
        specification: 'Computerized ready-mix concrete with slump and cube strength test batch reports',
      },
      {
        component: 'Commercial Flooring',
        brand: 'Kajaria Heavy Duty / Sadarahalli Granite',
        specification: 'High-traffic commercial full-body vitrified tiles and flamed granite steps',
      },
      {
        component: 'Facade & Glazing',
        brand: 'Saint-Gobain / Jindal Aluminum',
        specification: 'Structural silicone curtain wall glazing with toughened DGU acoustic & solar glass',
      },
      {
        component: 'Electrical Infrastructure',
        brand: 'Schneider / L&T Switchgear',
        specification: 'Three-phase busbar trunking, panel boards, and dual source automatic changeover',
      },
      {
        component: 'Fire Protection Civil Works',
        brand: 'National Building Code (NBC) compliant',
        specification: 'Sprinkler line conduits, wet riser shafts, fire-resistant doors, external hydrants',
      },
    ],
    processSteps: [
      {
        title: 'Feasibility & Commercial Bylaw Review',
        description:
          'We review site FAR (Floor Area Ratio), commercial road setbacks, parking ratios, and municipal zoning clearances in Tumkur.',
      },
      {
        title: 'Structural Drafting & Load Calculations',
        description:
          'Our licensed structural engineers design the RCC frame using STAAD.Pro software to handle dynamic commercial live loads and seismic safety.',
      },
      {
        title: 'Sanction Drawings & Liaison Assistance',
        description:
          'Preparation of multi-storey sanction drawings, fire NOC documentation, and coordination with local planning authorities.',
      },
      {
        title: 'Heavy Foundation & Pillar Grid Casting',
        description:
          'Raft or pile foundation excavation, heavy reinforcement steel cage binding, and precision column alignment with mechanical vibrators.',
      },
      {
        title: 'Rapid Slab Decking & MEP Integration',
        description:
          'Systematic formwork shuttering with integrated electrical conduits, plumbing shafts, lift core walls, and fire-escape stairwells.',
      },
      {
        title: 'Facade Glazing, Finishing & Handover',
        description:
          'Exterior weather-shield painting, structural glass facade mounting, commercial flooring, and final handover with built drawings.',
      },
    ],
    projects: [
      {
        title: 'Zenith Commercial Complex',
        type: 'Retail & Corporate Hub',
        location: 'BG Patya Circle, Tumkur',
        area: '12,500 sq ft',
        image: serviceCommercial,
      },
      {
        title: 'Apex Business Center',
        type: 'Commercial Office Tower',
        location: 'SS Temple Main Road, Tumkur',
        area: '16,000 sq ft',
        image: service4Commercial,
      },
      {
        title: 'Sira Road Commercial Plaza',
        type: 'Showroom & Retail Center',
        location: 'Sira Road, Tumkur',
        area: '9,800 sq ft',
        image: videoBg,
      },
    ],
    faqs: [
      {
        question: 'Do you assist with commercial plan approvals and Fire NOC in Tumkur?',
        answer:
          'Yes. Our architectural and liaison team prepares drawings strictly compliant with the National Building Code (NBC) and Tumkur Urban Development Authority guidelines to streamline plan sanctions, Fire NOC, and occupancy certificates.',
      },
      {
        question: 'How do you handle clear span areas for banquet halls and supermarkets?',
        answer:
          'We use post-tensioned RCC beams or structural steel girder trusses to eliminate intermediate columns, creating wide open floor spaces up to 40+ feet without structural sagging.',
      },
      {
        question: 'Can construction proceed while neighboring retail spaces remain operational?',
        answer:
          'Yes. We enforce strict perimeter debris netting, noise-controlled working windows, and safe pedestrian barricades to minimize disruption to nearby commercial properties.',
      },
    ],
  },

  turnkey: {
    slug: 'turnkey',
    canonicalSlug: 'turnkey',
    name: 'Turnkey Construction Solutions',
    shortName: 'Turnkey',
    tagline: 'You dream it — we plan, build, and deliver it flawlessly.',
    metaTitle: 'Turnkey House Construction in Tumkur @ ₹1,875/sq ft | Sneha Construction',
    metaDescription:
      'Complete turnkey house construction in Tumkur at just ₹1,875/sq ft. 100% transparent pricing, zero cost escalation, 3D design, materials, and handover.',
    heroImage: service3Turnkey,
    heroBuildingImage: turnkeyHeroResidence,
    teamImage: engineersPlanningSite,
    craftImage: indianWorkersCraft,
    emotionalTitle: 'From Bare Soil to Key Handover: Zero Stress, Fixed Price & Total Peace of Mind',
    emotionalSubtitle:
      'Ideal for busy professionals, doctors, and NRI families with plots in Tumkur. Architectural blueprints, municipal sanctions, branded materials, daily WhatsApp logs & designer interiors under one locked contract.',
    clientFamilyStory: {
      name: 'Sri Rajesh Gowda (NRI Family - UAE)',
      location: 'SIT Extension, Tumkur',
      quote:
        'Being in Dubai, building a villa on my parents’ plot in Tumkur felt daunting. Sneha Construction’s turnkey service gave me absolute peace of mind. Every week, their civil engineers shared drone footage, concrete cube test certificates, and WhatsApp CCTV updates. We walked into a finished, sparkling home ready for Griha Pravesha.',
      year: 'Handed over 2025',
    },
    trustBadges: [
      { title: 'Locked ₹1,875/sq.ft', subtitle: 'Zero cost escalation guarantee' },
      { title: 'Daily WhatsApp Progress', subtitle: 'CCTV & milestone updates for owners' },
      { title: 'Single Point of Contact', subtitle: 'Soil testing to Griha Pravesha keys' },
    ],
    heroLead:
      'Our signature turnkey package: one transparent contract covering soil testing, 3D Vastu architecture, certified branded materials, on-site civil engineers, and key handover at just ₹1,875 per square foot with locked pricing.',
    rateHighlight: 'Locked ₹1,875 / sq ft Base Rate',
    timelineHighlight: 'Milestone-Linked Handover',
    experienceHighlight: '100% In-House Supervision',
    complianceHighlight: 'Zero Price Escalation Guarantee',
    overview: [
      'Managing independent mason contractors, purchasing steel and cement yourself, and arguing over hidden expenses can make building a house an exhausting nightmare. Turnkey construction changes everything.',
      'With Sneha Construction’s Turnkey Service, you sign ONE clear agreement with ONE responsible company. From raw plot boundary marking to the moment you turn the brass key in the front door, we manage every craftsman, every delivery truck, and every inspection.',
      'Our base turnkey package starts at an advertised ₹1,875 per square foot — the most competitive, uncompromising rate in Tumkur. Everything is clearly listed in a transparent Bill of Quantities so you know exactly what is included from day one.',
    ],
    subServices: [
      {
        title: '3D Vastu Architecture & Soil Testing',
        description:
          'Scientific soil bearing tests, 100% Vastu-compliant 2D space planning, and photorealistic 3D elevations before concrete is ordered.',
        features: [
          'Digital plot boundary survey',
          'Soil sample laboratory load report',
          'Vastu-compliant room orientations',
          'Multiple 3D elevation color concepts',
        ],
      },
      {
        title: 'Government Sanction Assistance',
        description:
          'We prepare architectural blueprint sets formatted to TUDA and Gram Panchayat norms to fast-track municipal plan approval.',
        features: [
          'TUDA bylaw compliance check',
          'Water & borewell sanction liaison',
          'Gram Panchayat submission prints',
          'Temporary electrical meter coordination',
        ],
      },
      {
        title: 'Complete Civil RCC Structure',
        description:
          'Heavy reinforcement foundation, earthquake-resistant column grid, red kiln brick walls, and concrete roof casting with curing supervision.',
        features: [
          'Anti-termite foundation chemical barrier',
          'Tata Tiscon / A1 Gold 550D TMT steel',
          'UltraTech / ACC 53-grade cement',
          '21-day regulated structural water curing',
        ],
      },
      {
        title: 'Plumbing & Concealed Electricals',
        description:
          'Complete pipeline routing for hot/cold water, underground septic/drainage connections, and fire-resistant copper wiring with modular plates.',
        features: [
          'Astral CPVC SDR-11 piping',
          'Pressure testing before wall plastering',
          'Polycab FR-LSH concealed wiring',
          'Independent circuit breakers for heavy appliances',
        ],
      },
      {
        title: 'Premium Flooring, Woodwork & Painting',
        description:
          'Double-charged vitrified tiles, granite kitchen counters, solid teakwood main door frame, and Asian Paints Royale washable interior emulsions.',
        features: [
          '4x2 ft vitrified flooring with custom choices',
          'Jet-black granite kitchen counter with SS sink',
          'Teakwood main door with brass hardware',
          'Two coats Birla White putty with Royale emulsion',
        ],
      },
      {
        title: 'Final Audit & Griha Pravesha Handover',
        description:
          'Comprehensive 120-point quality inspection check covering water pressure, electrical loads, tile leveling, and deep site cleaning.',
        features: [
          '120-point civil inspection audit',
          'Deep chemical cleaning of tiles & glass',
          'Full set of as-built electrical & plumbing blueprints',
          'Official key handover ceremony',
        ],
      },
    ],
    specs: [
      {
        component: 'Base Construction Rate',
        brand: 'Turnkey Contract Guarantee',
        specification: '₹1,875 per square foot built-up area (Zero cost creep guarantee)',
      },
      {
        component: 'Cement',
        brand: 'UltraTech / ACC / Birla Super',
        specification: '53-grade OPC for structural casting; high-grade PPC for masonry and internal/external plastering',
      },
      {
        component: 'Steel Rebars',
        brand: 'Tata Tiscon / A1 Gold Fe-550D',
        specification: 'Certified high ductile earthquake-resistant TMT steel from authorized primary distributors',
      },
      {
        component: 'Aggregate & Sand',
        brand: 'Certified Quarry M-Sand & 20mm Jelly',
        specification: 'Double-washed manufactured sand conforming to IS 383 standards for concrete and plastering',
      },
      {
        component: 'Sanitaryware & C.P. Fittings',
        brand: 'Parryware / Cera / Jaquar',
        specification: 'Wall-hung or floor-mounted EWCs with dual flush tanks, chrome brass basin mixers & overhead shower',
      },
      {
        component: 'Kitchen Platform',
        brand: 'Jet Black Granite & Nirali Sink',
        specification: '20mm polished granite counter with chamfered edges, 24x18 inch SS 304 sink, and 2-ft dado tiles',
      },
      {
        component: 'Doors & Windows',
        brand: 'Teakwood & 3-Track UPVC',
        specification: '5x3 inch teak main frame with decorative shutter; internal flush doors with laminate; UPVC windows with mosquito mesh',
      },
      {
        component: 'Painting & Waterproofing',
        brand: 'Asian Paints / Dr. Fixit',
        specification: 'Dr. Fixit chemical waterproofing in all sunken slabs and terrace; Asian Paints Apex exterior & Royale interior',
      },
    ],
    processSteps: [
      {
        title: 'Initial Consultation & Site Visit',
        description:
          'We inspect your plot in Tumkur, discuss your family’s room requirements, and calculate an exact square-foot estimate based on your budget.',
      },
      {
        title: 'Agreement & Transparent BOQ Signing',
        description:
          'We sign a formal legal contract specifying the ₹1,875/sq ft rate, locked brand specifications, and clear stage-wise payment milestones.',
      },
      {
        title: 'Architectural 2D Space Plans & 3D Visuals',
        description:
          'Our architects deliver Vastu-compliant floor layouts and 3D elevations. Once approved, we submit for municipal sanctions.',
      },
      {
        title: 'Foundation, Plinth & Structure',
        description:
          'Anti-termite treatment, plinth beam, column grid, brick masonry, and roof slab casting executed by our dedicated civil team.',
      },
      {
        title: 'Finishing, Electrical, Plumbing & Painting',
        description:
          'Concealed piping, wiring, plastering, flooring tile installation, bathroom fixtures, teakwood doors, and multi-coat paint application.',
      },
      {
        title: '120-Point Quality Audit & Key Handover',
        description:
          'A thorough audit of every switch, faucet, and window latch followed by site cleaning and key handover for your Griha Pravesha.',
      },
    ],
    projects: [
      {
        title: 'Acoustic Curve Residence',
        type: 'Turnkey Luxury Villa',
        location: 'Sira Road, Tumkur',
        area: '2,600 sq ft',
        image: detailTimber,
      },
      {
        title: 'Urban Serenity Duplex',
        type: 'Turnkey Family Home',
        location: 'Tiptur Extension, Tumkur',
        area: '2,950 sq ft',
        image: serviceTurnkey,
      },
      {
        title: 'The Timber Wave Residence',
        type: 'Turnkey Contemporary Home',
        location: 'Vinobanagar, Tumkur',
        area: '4,800 sq ft',
        image: heroBg,
      },
    ],
    faqs: [
      {
        question: 'What does "Turnkey" mean, and what is included in the ₹1,875/sq ft rate?',
        answer:
          'Turnkey means complete end-to-end delivery where we hand over the keys to a finished, move-in-ready home. The ₹1,875/sq ft rate covers: complete architectural 2D & 3D plans, soil testing, foundation, structural RCC columns with Tata Tiscon steel, UltraTech cement, brickwork, plastering, premium electrical wiring, CPVC plumbing, vitrified tile flooring, painting, and sanitary fixture fittings.',
      },
      {
        question: 'Are there any hidden costs or surprise price increases during the build?',
        answer:
          'No. Our contract includes a Zero Cost Escalation Guarantee. As long as the agreed structural dimensions and material specifications remain unchanged, the total square-foot rate agreed on day one is 100% fixed through project handover.',
      },
      {
        question: 'How are payments structured throughout the construction stages?',
        answer:
          'Payments are milestone-linked: a small booking advance, followed by installments released only after you inspect and approve each completed stage (e.g. Plinth level, Ground floor slab, Brickwork, Plastering, Flooring, and Final Handover).',
      },
      {
        question: 'Can I visit the construction site during execution?',
        answer:
          'We actively encourage you to visit! Our full-time site engineer will walk you through the concrete curing, rebar binding, and plumbing tests at every stage. We also send regular photo and video progress updates via WhatsApp.',
      },
    ],
  },
}

// Aliases mapping for hyphenated paths
export const serviceAliases: Record<string, string> = {
  residential: 'residential',
  'residential-construction': 'residential',
  commercial: 'commercial',
  'commercial-construction': 'commercial',
  turnkey: 'turnkey',
  'turnkey-construction': 'turnkey',
}

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  const canonical = serviceAliases[slug.toLowerCase()] as
    | 'residential'
    | 'commercial'
    | 'turnkey'
    | undefined
  if (!canonical) return undefined
  return servicesData[canonical]
}

export function getAllServices(): ServiceDetail[] {
  return [servicesData.residential, servicesData.commercial, servicesData.turnkey]
}
