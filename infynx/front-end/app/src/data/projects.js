/**
 * Case-study data, shared by the Portfolio page and the industry pages.
 *
 * `industryKey` has to match a slug in ../data/industries.js — that link is
 * what lets an industry page list its own proof and deep-link into the
 * filtered portfolio view.
 */

export const PROJECT_CATEGORIES = [
  'All',
  'Web',
  'Mobile',
  'AI & Automation',
  'Network & Infra'
];

export const PROJECTS = [
  {
    id: 1,
    title: 'DinePOS – Smart POS & Inventory Automation',
    category: 'Web',
    industryKey: 'hospitality',
    industry: 'Hospitality / Restaurants',
    problem:
      'Local restaurants struggled with manual billing, inaccurate inventory, and no visibility on daily sales performance.',
    solution:
      'We built a cloud-based POS with real-time KOT printing, table management, recipe-level inventory deduction, and multi-outlet support.',
    impact: [
      '30% reduction in pilferage and wastage',
      'Real-time sales dashboard for owners across outlets',
      'Integrated GST-compliant invoicing and reports'
    ],
    techStack: 'React, Node.js, PostgreSQL, Redis, AWS, Thermal Printer APIs',
    tag: 'Product Engineering'
  },
  {
    id: 2,
    title: 'Ease Yatrika – School Transport & Booking Platform',
    category: 'Mobile',
    industryKey: 'education',
    industry: 'EdTech / Transportation',
    problem:
      'Parents had no transparency on school cabs location, safety, and billing. Operators managed everything on Excel and WhatsApp.',
    solution:
      'A mobile-first platform for route planning, live GPS tracking, parent notifications, and automated fee collection with reporting.',
    impact: [
      '90% reduction in manual coordination between parents and drivers',
      'Live ETA tracking improved parent satisfaction',
      'Central dashboard for school administrators'
    ],
    techStack: 'Flutter, Firebase, Node.js, Google Maps APIs, Razorpay',
    tag: 'Mobility & Safety'
  },
  {
    id: 3,
    title: 'StockPilot – Multi-Location Inventory Intelligence',
    category: 'AI & Automation',
    industryKey: 'retail',
    industry: 'Retail / Distribution',
    problem:
      'Retailers had multiple warehouses and stores, but no unified, intelligent view of inventory, reorder levels, and dead stock.',
    solution:
      'We developed an AI-driven inventory engine that predicts reorder points, highlights slow-moving SKUs, and optimizes procurement.',
    impact: [
      'Up to 25% reduction in overstocking',
      'Improved fill-rate and on-shelf availability',
      'Unified stock visibility across warehouses and stores'
    ],
    techStack: 'React, Python, ML models (time series), MongoDB, Kafka',
    tag: 'AI & Analytics'
  },
  {
    id: 4,
    title: 'InfraNet360 – PAN India Active & Passive Rollout',
    category: 'Network & Infra',
    industryKey: 'telecom',
    industry: 'Telecom / Enterprise',
    problem:
      'A leading SI required a single partner to execute PAN India network rollouts – including fiber, L2/L3 setup, DC passive work, and audits.',
    solution:
      'DNISPL provided end-to-end implementation: inside-building fiber, Cat-6, electrical, DC passive, L2/L3 configuration, and regulatory audits.',
    impact: [
      'On-time delivery across 50+ cities',
      'Standardized documentation and TRAI-compliant audits',
      'Single-window execution partner for the SI'
    ],
    techStack:
      'Cisco / Juniper switches & routers, Fiber & Cat-6, UPS, DG, DC passive components',
    tag: 'Network Rollout'
  },
  {
    id: 5,
    title: 'LeadSync – B2B Sales & Marketing Automation Suite',
    category: 'Web',
    industryKey: 'enterprise',
    industry: 'B2B SaaS',
    problem:
      'The client’s sales team used spreadsheets and manual follow-ups, causing lost leads and poor tracking.',
    solution:
      'We built a web-based lead management and automation suite with email workflows, lead scoring, task reminders, and dashboards.',
    impact: [
      '2x increase in qualified follow-ups',
      'Single source of truth for leads and activities',
      'Team performance tracking made transparent'
    ],
    techStack: 'Next.js, Node.js, MySQL, Redis, SendGrid, Chart.js',
    tag: 'SaaS Platform'
  },
  {
    id: 6,
    title: 'Core Banking Network & Branch SD-WAN Estate',
    category: 'Network & Infra',
    industryKey: 'finance',
    industry: 'Banking & Financial Services',
    problem:
      'Branch connectivity ran on ageing MPLS links with no application-level visibility, and every outage became a manual, branch-by-branch investigation.',
    solution:
      'We re-architected the branch edge onto SD-WAN with dual-transport failover, application-aware path selection, centralised policy, and a monitored NOC handover.',
    impact: [
      '400+ branch sites migrated with no unplanned core downtime',
      'Link failover measured in seconds instead of manual re-routes',
      'Single monitoring plane across every branch and the data centre'
    ],
    techStack:
      'Cisco SD-WAN (vManage), ISR routers, Fortinet NGFW, dual-ISP transport, NOC tooling',
    tag: 'Network Transformation'
  },
  {
    id: 7,
    title: 'Plant Network Modernisation & Shop-Floor Connectivity',
    category: 'Network & Infra',
    industryKey: 'manufacturing',
    industry: 'Manufacturing',
    problem:
      'Production lines shared a flat network with office traffic, so a single broadcast storm could stall the shop floor, and industrial zones had no segmentation.',
    solution:
      'We segmented OT from IT with policy-enforced VLANs, deployed ruggedised switching across production zones, and rebuilt the fibre backbone between plant blocks.',
    impact: [
      'Production and corporate traffic fully isolated',
      'Redundant ring topology removed the single points of failure',
      'Documented, labelled cable plant with Fluke certification'
    ],
    techStack:
      'Industrial Ethernet switches, fibre ring backbone, VLAN segmentation, Cisco ISE',
    tag: 'OT / IT Convergence'
  },
  {
    id: 8,
    title: 'Hospital Infrastructure & Clinical System Uptime',
    category: 'Network & Infra',
    industryKey: 'healthcare',
    industry: 'Healthcare',
    problem:
      'Clinical applications and imaging transfers competed with guest Wi-Fi on the same infrastructure, and there was no redundancy on the paths carrying patient data.',
    solution:
      'We designed a tiered network separating clinical, administrative, and guest traffic, with redundant uplinks, prioritised imaging transfer, and 24/7 monitored support.',
    impact: [
      'Clinical traffic prioritised and isolated from guest load',
      'Redundant paths on every critical ward and imaging link',
      '24/7 NOC coverage with a defined clinical escalation matrix'
    ],
    techStack:
      'Layer 3 switching, QoS policy, controller-based Wi-Fi, redundant uplinks, NOC monitoring',
    tag: 'Mission-Critical Infra'
  },
  {
    id: 9,
    title: 'Warehouse & Fleet Connectivity Rollout',
    category: 'Network & Infra',
    industryKey: 'logistics',
    industry: 'Logistics & Warehousing',
    problem:
      'Scanner coverage dropped in high-rack aisles and cold zones, forcing manual stock reconciliation at the end of every shift.',
    solution:
      'We ran predictive and on-site RF surveys, redesigned access-point placement for rack-aisle propagation, and deployed hardened APs across cold and dock zones.',
    impact: [
      'Continuous scanner coverage through high-rack aisles',
      'End-of-shift manual reconciliation effectively eliminated',
      'Repeatable site template rolled out across the warehouse network'
    ],
    techStack:
      'Predictive RF survey tooling, industrial-grade APs, wireless controllers, PoE switching',
    tag: 'Wireless Engineering'
  },
  {
    id: 10,
    title: 'Secure Routing & Compliance Audit Programme',
    category: 'Network & Infra',
    industryKey: 'government',
    industry: 'Government & Public Sector',
    problem:
      'A nationwide department ran regional offices on inconsistent configurations, so every audit cycle turned into a fresh discovery exercise with no baseline to compare against.',
    solution:
      'We standardised routing and hardening baselines across regions, ran vulnerability and configuration audits per site, and delivered a compliance register that survives audit handover.',
    impact: [
      'One hardening baseline applied across every regional office',
      'Audit findings tracked to closure with owner and date',
      'Documentation pack accepted without rework at audit review'
    ],
    techStack:
      'Standardised routing baselines, config compliance tooling, vulnerability scanning, secure remote access',
    tag: 'Compliance & Audit'
  },
  {
    id: 11,
    title: 'Campus Wi-Fi Redesign for High-Density Lecture Halls',
    category: 'Network & Infra',
    industryKey: 'education',
    industry: 'Higher Education',
    problem:
      'Lecture halls dropped hundreds of concurrent devices the moment a class started, and the existing AP layout had been placed by floor plan rather than by RF behaviour.',
    solution:
      'We re-surveyed the campus for high-density behaviour, moved to controller-managed APs with band steering and per-room capacity planning, and separated student, staff, and IoT SSIDs.',
    impact: [
      'Full-capacity lecture halls served without client drops',
      'Student, staff, and IoT traffic separated by policy',
      'Repeatable per-room capacity model for future blocks'
    ],
    techStack:
      'Controller-based Wi-Fi, high-density AP design, band steering, RADIUS, VLAN per SSID',
    tag: 'Wireless Engineering'
  },
  {
    id: 12,
    title: 'Multi-Store Retail Network & POS Backhaul',
    category: 'Network & Infra',
    industryKey: 'retail',
    industry: 'Retail Chain',
    problem:
      'Every new store was cabled and configured slightly differently, so POS issues could not be triaged remotely and each opening needed a specialist on site.',
    solution:
      'We built a standard store template — cabling, switching, firewall, and VPN backhaul — and rolled it out as a repeatable kit with pre-staged configuration.',
    impact: [
      'Store bring-up time cut to a predictable, planned window',
      'POS incidents triaged remotely against a known baseline',
      'One documented template across the whole store estate'
    ],
    techStack:
      'Pre-staged switching, NGFW with VPN backhaul, standardised cable plant, remote management',
    tag: 'Network Rollout'
  }
];

/** Case studies for one industry slug, most relevant first. */
export const projectsForIndustry = (slug) =>
  PROJECTS.filter((project) => project.industryKey === slug);
