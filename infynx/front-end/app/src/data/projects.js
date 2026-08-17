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
    id: 1,
    title: 'Enterprise Video Conferencing & AV Infrastructure',
    category: 'Network & Infra',
    industryKey: 'enterprise',
    industry: 'Telecom / Enterprise',
    problem:
      'Aon Consulting required a comprehensive video-conferencing and collaboration environment combining large-format visual displays, presentation systems, audio, connectivity and supporting infrastructure at the Bengaluru site.',
    solution:
      'Delivered a multi-component AV and collaboration technology package spanning video-wall control, LED/display systems, projection, digital signage, audio processing, microphones, HDMI switching and signal extension.',
    impact: [
      'Integrated visual collaboration environment',
      'Professional AV signal distribution and processing',
      'High-quality audio capture and DSP',
      'Support for presentation and digital-signage use cases'
    ],
    techStack:
      'NovaStar VX1000 video-wall controllers, Absen Active LED / COB display systems, BrightSign digital signage players, Epson laser projector & motorised projection screen, Extron DSP, amplifiers, HDMI switchers and DTP transmitters, Sennheiser / Shure wireless microphones',
    tag: 'AV Infrastructure'
  },
  {
    id: 2,
    title: 'Enterprise Network & Infrastructure Deployment',
    category: 'Network & Infra',
    industryKey: 'government',
    industry: 'Government & PSU',
    problem:
      'The project required coordinated passive-network infrastructure, structured cabling, electrical support and associated site infrastructure across PDC, BCP and DR environments, with testing and documentation included in the scope.',
    solution:
      'Provided an integrated infrastructure scope covering passive cabling, connectors and I/O components, LAN cable testing, network diagrams and electrical cabling supporting VC, communication-room ACs and network racks.',
    impact: [
      'Passive cabling for 14 racks across PDC Delhi, BCP Mumbai and DR Chennai',
      '3,500-node capex scope for connectors, I/O and passive components',
      'Passive LAN cable testing (Penta Scan) and network diagrams',
      'UPS, VC and communication-room electrical cabling (135 VC, 782 AC, 782 racks)'
    ],
    techStack:
      '14-rack passive cabling, connectors, I/O components, Penta Scan testing, MCB upgrade/replacement',
    tag: 'Network Rollout'
  },
  {
    id: 3,
    title: 'Network Infrastructure & Passive Cabling',
    category: 'Network & Infra',
    industryKey: 'government',
    industry: 'Government & PSU',
    problem:
      'The requirement called for large-scale passive network infrastructure and electrical connectivity, with testing and network documentation to support new nodes and OFC deployment.',
    solution:
      'Executed a structured infrastructure package combining passive components, LAN testing, network documentation and electrical cabling for VC equipment, communication-room ACs and network racks.',
    impact: [
      'Large-scale structured cabling delivery (OM4 patch cords: 125x10m, 125x15m, 50x20m)',
      '3,500-node passive component / OFC scope with Penta Scan testing',
      'Integrated electrical connections: 135 UPS-to-VC, 782 AC, 782 network racks',
      'Detailed network diagrams for new nodes and OFC'
    ],
    techStack:
      'LC-LC OM4 multimode patch cords, passive LAN testing (Penta Scan), network diagrams',
    tag: 'Passive Cabling'
  },
  {
    id: 4,
    title: 'Managed SD-WAN Deployment & Support',
    category: 'Network & Infra',
    industryKey: 'finance',
    industry: 'Banking & Finance',
    problem:
      'The customer required implementation and operational support for a managed SD-WAN environment, combining deployment expertise with dedicated engineering and on-site assistance.',
    solution:
      'Provided installation and commissioning of FortiGate hardware for managed SD-WAN, backed by a resident engineer and on-call / on-site hands-and-feet support.',
    impact: [
      'Single delivery model from deployment to support',
      'Dedicated resident engineer for one year',
      'Faster on-site operational assistance (on-call/on-site support)',
      'Ongoing infrastructure support aligned to managed SD-WAN'
    ],
    techStack:
      'FortiGate managed SD-WAN hardware, resident engineer support, NOC & on-site support',
    tag: 'Managed SD-WAN'
  },
  {
    id: 5,
    title: 'End-to-End Project Execution for a Solar Power Facility',
    category: 'Network & Infra',
    industryKey: 'enterprise',
    industry: 'Renewable Energy',
    problem:
      'The project required an integrated execution model for a solar power facility, with engineering, equipment supply, quality control, logistics, installation, testing and commissioning coordinated under a single contractual framework.',
    solution:
      'We adopted an end-to-end project execution approach covering detailed design and engineering, equipment and auxiliary systems, manufacturing/fabrication and shop testing, technical documentation, packing and transportation, erection, testing, commissioning, operational support and customer training.',
    impact: [
      'Single-point accountability and integrated ownership across project activities',
      'Structured inspection, testing, and QA/QC inspection controls',
      'Schedule-focused delivery with milestones, reporting, and recovery mechanisms',
      'Ready for operations with commissioning, drawings, O&M documentation, and training'
    ],
    techStack:
      'Detailed design & engineering, equipment supply, QA/QC, O&M drawings & documentation',
    tag: 'Renewable Energy'
  },
  {
    id: 6,
    title: 'SD-WAN Proof of Concept & Router Rental',
    category: 'Network & Infra',
    industryKey: 'telecom',
    industry: 'Telecom / Enterprise',
    problem:
      'The engagement was designed to support an SD-WAN Proof of Concept (POC) for the Concentrix environment. The requirement called for network equipment to be made available on a rental basis over the POC period, enabling the customer to evaluate the SD-WAN solution without an upfront equipment purchase.',
    solution:
      'Diversified Network and Infra Solutions Private Limited supported the engagement through an SD-WAN POC rental model. The PO covered SD-WAN POC rental charges across multiple rental components for the period from April 2025 to April 2026, providing a flexible infrastructure model aligned to the evaluation requirement.',
    impact: [
      'Lower upfront investment for SD-WAN evaluation',
      'Flexible infrastructure for a POC environment',
      'Supports technology validation before wider deployment',
      'Simplified procurement through a single PO'
    ],
    techStack:
      'SD-WAN POC infrastructure, rental routing hardware, flexible procurement',
    tag: 'SD-WAN POC'
  }
];

/** Case studies for one industry slug, most relevant first. */
export const projectsForIndustry = (slug) =>
  PROJECTS.filter((project) => project.industryKey === slug);
