/**
 * Case-study data, shared by the Portfolio page and the industry pages.
 *
 * `industryKey` has to match a slug in ../data/industries.js — that link is
 * what lets an industry page list its own proof and deep-link into the
 * filtered portfolio view.
 */

export const PROJECT_CATEGORIES = [
  'All',
  'Network & Infra'
];

export const PROJECTS = [
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
