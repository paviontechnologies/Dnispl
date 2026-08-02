/**
 * Industry pages — one entry per sector DNISPL sells into.
 *
 * The header's Industries menu, the /industries index, and every
 * /industries/:slug detail page all read from this file, so a sector can only
 * be advertised in the nav if the content to back it exists here. That was the
 * bug this replaced: the menu linked to a filtered portfolio view, which left
 * every industry looking like the same page with a different pill on it.
 *
 * `icon` is a lucide-react component. `tint` drives the whole page's palette:
 * the aurora field, the 3D lattice, the headings, and the CTA.
 */
import {
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Landmark as GovIcon,
  RadioTower,
  ShoppingBag,
  Truck
} from 'lucide-react';

export const INDUSTRIES = [
  /* ---------------------------------------------------------------- finance */
  {
    slug: 'finance',
    name: 'Banking & Finance',
    short: 'Banking & Finance',
    icon: Landmark,
    eyebrow: 'Regulated / Zero-tolerance uptime',
    tint: { from: '#22D3EE', to: '#2563EB', glow: 'rgba(37, 99, 235, 0.32)' },
    tagline: 'Branch connectivity and SD-WAN',
    blurb: 'Branch connectivity, core banking networks, and SD-WAN estates.',
    headline: ['Branch networks that clear', 'every transaction, every time.'],
    summary:
      'A bank’s network is its counter. When a branch link degrades, tellers stop, ATMs queue, and the incident becomes a regulatory conversation. We design branch estates for measured failover, not best-effort recovery — and we operate them afterwards.',
    stats: [
      { value: '400+', label: 'Branch sites migrated' },
      { value: '99.99%', label: 'Continuity target' },
      { value: '24/7', label: 'Monitored NOC' },
      { value: '2', label: 'Independent transports' }
    ],
    pressures: [
      {
        title: 'Ageing MPLS with no application visibility',
        desc: 'Single-transport branches fail as a unit, and without per-application telemetry every slowdown becomes a branch-by-branch phone investigation.'
      },
      {
        title: 'Audit exposure across a wide estate',
        desc: 'Hundreds of branches configured by different hands means no baseline — and no baseline means every audit cycle restarts from discovery.'
      },
      {
        title: 'Change windows measured in hours',
        desc: 'Core banking cannot absorb an overrun. Migrations need pre-staged configuration and a tested rollback, not an on-site improvisation.'
      },
      {
        title: 'Branch openings gated on specialists',
        desc: 'When each site needs a senior engineer physically present, expansion moves at the speed of the travel calendar.'
      }
    ],
    capabilities: [
      { title: 'Branch SD-WAN estates', desc: 'Dual-transport edges with application-aware path selection and centralised policy through vManage.' },
      { title: 'Core & DC networking', desc: 'Nexus spine-leaf, Cisco ACI fabric, and redundant DC interconnects behind the branch layer.' },
      { title: 'Perimeter & segmentation', desc: 'FortiGate NGFW, Cisco ISE posture control, and segmentation that keeps card data in its own zone.' },
      { title: 'Monitored operations', desc: '24/7 NOC with a defined escalation matrix, RCA discipline, and penalty-backed SLA reporting.' },
      { title: 'Migration execution', desc: 'Pre-staged kit, tested rollback per site, and a cutover plan that fits inside the approved window.' },
      { title: 'Compliance documentation', desc: 'As-built drawings, Fluke and OTDR certification, configuration baselines, and an audit register per site.' }
    ],
    stack: ['Cisco SD-WAN (vManage)', 'Cisco ACI', 'Nexus spine-leaf', 'Fortinet NGFW', 'Cisco ISE', 'FortiNAC', 'ISR / ASR routing', 'Dual-ISP transport'],
    outcomes: [
      { metric: '400+', label: 'branches migrated', note: 'with no unplanned core downtime' },
      { metric: 'Seconds', label: 'link failover', note: 'replacing manual re-routes' },
      { metric: 'One', label: 'monitoring plane', note: 'across branches and the DC' }
    ],
    proof: { client: 'IDBI Bank', note: 'Core banking network infrastructure and security operations.' },
    compliance: ['RBI-aligned change control', 'Segmentation for card data zones', 'Configuration baseline per site', 'Vulnerability audit and closure register'],
    faqs: [
      {
        q: 'Can you migrate branches without a core outage?',
        a: 'Yes — that is the normal shape of the work. Each branch is pre-staged and cut over inside its own approved window with a tested rollback, so the core is never the thing being changed. On the 400+ site estate we migrated, none of the cutovers produced unplanned core downtime.'
      },
      {
        q: 'Do you take over monitoring after the rollout?',
        a: 'We do. Most banking engagements hand over into our 24/7 NOC with an agreed escalation matrix, SLA reporting, and RCA on every P1. The alternative — build-and-leave — is what usually creates the next audit finding.'
      },
      {
        q: 'How do you handle the documentation an audit will ask for?',
        a: 'As-built drawings, Fluke and OTDR test reports, configuration baselines, and a per-site register of findings tracked to closure with an owner and a date. It is produced during the work, not reconstructed afterwards.'
      }
    ]
  },

  /* ---------------------------------------------------------------- telecom */
  {
    slug: 'telecom',
    name: 'Telecom',
    short: 'Telecom',
    icon: RadioTower,
    eyebrow: 'Rollout velocity at national scale',
    tint: { from: '#A855F7', to: '#EC4899', glow: 'rgba(168, 85, 247, 0.32)' },
    tagline: 'NOC, rollouts and fiber operations',
    blurb: 'NOC operations, nationwide rollouts, and fiber execution.',
    headline: ['Nationwide rollouts that land', 'on the date you promised.'],
    summary:
      'Telecom programmes fail on coordination, not on technology. We act as the single-window execution partner across fiber, active configuration, DC passive work, and audits — so one accountable team owns the site from survey to sign-off.',
    stats: [
      { value: '50+', label: 'Cities delivered' },
      { value: '100+', label: 'Active locations' },
      { value: '18', label: 'Sparing hubs' },
      { value: '2000+', label: 'Managed devices' }
    ],
    pressures: [
      {
        title: 'Fragmented vendors, diffused accountability',
        desc: 'Separate partners for fiber, active, power, and audit means every delay ends in a call where nobody owns the date.'
      },
      {
        title: 'Site readiness discovered too late',
        desc: 'Crews mobilised against an unsurveyed site burn the window on power, access, and civil surprises that a survey would have caught.'
      },
      {
        title: 'Documentation that fails the audit',
        desc: 'Rollouts signed off on informal notes cannot produce TRAI-compliant evidence months later when the audit actually arrives.'
      },
      {
        title: 'Sparing and RMA transit times',
        desc: 'Without regional stock, a failed component turns a two-hour fix into a multi-day outage in a tier-3 location.'
      }
    ],
    capabilities: [
      { title: 'Single-window rollouts', desc: 'Inside-building fiber, Cat-6, electrical, DC passive, and L2/L3 configuration under one accountable programme.' },
      { title: 'Fiber execution', desc: 'Single-mode and multimode splicing, link-loss certification, OTDR testing, and FTTH build-out.' },
      { title: 'NOC operations', desc: '24/7 monitored desks, order-entry and managed-service desks, and L1/L2/L3 escalation tiers.' },
      { title: 'Regulatory audits', desc: 'TRAI-compliant site audits with standardised documentation and a findings register per location.' },
      { title: 'Pan-India field force', desc: 'Skilled crews for multi-site programmes, coordinated from HQ against uniform SLA standards.' },
      { title: 'Sparing logistics', desc: '18 warehouse hubs positioned to keep RMA transit off the critical path.' }
    ],
    stack: ['Cisco / Juniper routing & switching', 'OFC & Cat-6 cable plant', 'OTDR & Fluke certification', 'DC passive components', 'UPS & DG integration', 'NOC monitoring tooling'],
    outcomes: [
      { metric: '50+', label: 'cities on time', note: 'single-window delivery' },
      { metric: 'TRAI', label: 'compliant audits', note: 'standardised documentation' },
      { metric: '1', label: 'accountable partner', note: 'across every trade' }
    ],
    proof: { client: 'Airtel', note: 'Managed order-entry desk with 100+ dedicated resources on SLA-driven processing.' },
    compliance: ['TRAI-compliant site audits', 'TIA/EIA & ISO/IEC cabling standards', 'BICSI design adherence', 'OTDR and Fluke test records'],
    faqs: [
      {
        q: 'Do you work as a subcontractor to system integrators?',
        a: 'Frequently. A large part of our telecom work is executing PAN-India scope on behalf of an SI who needs one partner covering fiber, active configuration, DC passive, and audits rather than four.'
      },
      {
        q: 'How far outside the metros can you actually deploy?',
        a: 'We run active locations in tier-2 and tier-3 cities alongside the metro hubs, backed by 18 sparing warehouses so replacement parts are not travelling from NCR every time.'
      },
      {
        q: 'What does your audit deliverable contain?',
        a: 'Standardised per-site documentation: as-built drawings, cable plant certification with OTDR and Fluke reports, configuration records, and a findings register tracked to closure.'
      }
    ]
  },

  /* ---------------------------------------------------------- manufacturing */
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    short: 'Manufacturing',
    icon: Factory,
    eyebrow: 'OT / IT convergence',
    tint: { from: '#F59E0B', to: '#EF4444', glow: 'rgba(245, 158, 11, 0.30)' },
    tagline: 'Plant networks and connectivity',
    blurb: 'Plant networks, shop-floor connectivity, and campus links.',
    headline: ['Shop floors that keep running', 'when the office network doesn’t.'],
    summary:
      'On a flat plant network, one broadcast storm from an office printer can stall a production line. We separate OT from IT with enforced policy, ruggedise the switching that lives in the heat and dust, and build a fibre backbone with no single point of failure.',
    stats: [
      { value: '100%', label: 'OT / IT isolation' },
      { value: 'Ring', label: 'Redundant topology' },
      { value: 'Fluke', label: 'Certified cable plant' },
      { value: '24/7', label: 'Escalation cover' }
    ],
    pressures: [
      {
        title: 'Production and corporate traffic on one flat network',
        desc: 'A single broadcast storm reaches the line. There is no policy boundary between a spreadsheet and a PLC.'
      },
      {
        title: 'No segmentation across industrial zones',
        desc: 'Once anything on the plant network is compromised, lateral movement into control systems is unobstructed.'
      },
      {
        title: 'Commodity switching in hostile environments',
        desc: 'Office-grade hardware in heat, vibration, and dust fails early — and it fails during the shift, not during maintenance.'
      },
      {
        title: 'Undocumented cable plant',
        desc: 'When nothing is labelled or certified, every fault becomes an excavation and every change carries unknown risk.'
      }
    ],
    capabilities: [
      { title: 'OT / IT segmentation', desc: 'Policy-enforced VLANs and zone design that puts a real boundary between production and corporate traffic.' },
      { title: 'Ruggedised switching', desc: 'Industrial Ethernet deployed across production zones for temperature, vibration, and dust tolerance.' },
      { title: 'Fibre ring backbone', desc: 'Redundant ring topology between plant blocks so a single break does not isolate a zone.' },
      { title: 'Access control', desc: 'Cisco ISE and FortiNAC posture enforcement on everything that joins the plant network.' },
      { title: 'Certified cable plant', desc: 'Structured cabling to TIA/EIA and ISO/IEC standards with Fluke certification and labelled documentation.' },
      { title: 'Campus interconnects', desc: 'Plant-to-office and plant-to-plant links with the redundancy the production schedule assumes.' }
    ],
    stack: ['Industrial Ethernet switching', 'Fibre ring backbone', 'VLAN & zone segmentation', 'Cisco ISE', 'FortiNAC', 'Fluke certification', 'Cat-6 / Cat-6A cable plant'],
    outcomes: [
      { metric: 'Full', label: 'traffic isolation', note: 'production separated from corporate' },
      { metric: 'Zero', label: 'single points of failure', note: 'redundant ring topology' },
      { metric: '100%', label: 'labelled cable plant', note: 'Fluke certified and documented' }
    ],
    proof: { client: 'Samsung', note: 'Active routing and switching connectivity across manufacturing facilities and corporate campuses.' },
    compliance: ['TIA/EIA & ISO/IEC cabling standards', 'BICSI design adherence', 'Zone-based segmentation model', 'Fluke certification per run'],
    faqs: [
      {
        q: 'Can you segment OT from IT without stopping production?',
        a: 'Yes. Segmentation is staged zone by zone against planned maintenance windows, with the policy applied in monitor mode first so we can see what would have been blocked before anything actually is.'
      },
      {
        q: 'Do you handle the civil and electrical work as well?',
        a: 'We do — trays, raceway, trunking, DB installation, earthing, and surge protection are part of the same scope. It avoids the gap where a cabling partner and an electrical partner each wait for the other.'
      },
      {
        q: 'What happens to the plant network after handover?',
        a: 'Most plants move onto an SLA-backed AMC or FMS arrangement with L1/L2/L3 cover and an agreed escalation matrix, because a line stoppage cannot wait for a purchase order.'
      }
    ]
  },

  /* ------------------------------------------------------------- healthcare */
  {
    slug: 'healthcare',
    name: 'Healthcare',
    short: 'Healthcare',
    icon: HeartPulse,
    eyebrow: 'Clinically critical infrastructure',
    tint: { from: '#34D399', to: '#22D3EE', glow: 'rgba(52, 211, 153, 0.30)' },
    tagline: 'Reliable hospital infrastructure',
    blurb: 'Always-on hospital infrastructure and clinical system uptime.',
    headline: ['Clinical systems that never', 'wait behind guest Wi-Fi.'],
    summary:
      'In a hospital, network priority is a clinical decision. We tier the infrastructure so imaging transfers and clinical applications are isolated from administrative and guest load, put redundancy on every path that carries patient data, and monitor it around the clock.',
    stats: [
      { value: '3', label: 'Isolated traffic tiers' },
      { value: '24/7', label: 'Monitored support' },
      { value: '100%', label: 'Redundant critical paths' },
      { value: 'QoS', label: 'Prioritised imaging' }
    ],
    pressures: [
      {
        title: 'Clinical traffic competing with guest Wi-Fi',
        desc: 'Imaging transfers and EMR calls share bandwidth with visitor streaming, so clinical performance depends on who is in the waiting room.'
      },
      {
        title: 'No redundancy on patient-data paths',
        desc: 'A single uplink to a ward or imaging suite means one fibre break takes clinical systems offline in that wing.'
      },
      {
        title: 'Coverage gaps in shielded areas',
        desc: 'Imaging rooms, basements, and lead-lined walls defeat AP layouts that were planned from a floor plan rather than an RF survey.'
      },
      {
        title: 'No clinical escalation path',
        desc: 'A generic IT helpdesk queue is the wrong instrument for an outage that is affecting patient care right now.'
      }
    ],
    capabilities: [
      { title: 'Tiered network design', desc: 'Clinical, administrative, and guest traffic separated by policy, not by convention.' },
      { title: 'Redundant critical paths', desc: 'Dual uplinks on every ward, theatre, and imaging link that carries patient data.' },
      { title: 'Prioritised imaging transfer', desc: 'QoS policy that puts PACS and modality traffic ahead of everything discretionary.' },
      { title: 'Controller-based Wi-Fi', desc: 'Surveyed coverage through shielded and basement areas with seamless roaming for mobile clinical carts.' },
      { title: '24/7 clinical escalation', desc: 'Monitored NOC with an escalation matrix written around clinical impact rather than ticket age.' },
      { title: 'Guest network isolation', desc: 'Visitor access delivered without any adjacency to clinical or administrative systems.' }
    ],
    stack: ['Layer 3 switching', 'QoS policy design', 'Controller-based Wi-Fi', 'Redundant uplinks', 'NGFW segmentation', 'NOC monitoring'],
    outcomes: [
      { metric: 'Isolated', label: 'clinical traffic', note: 'prioritised over guest load' },
      { metric: 'Dual', label: 'paths per critical link', note: 'wards and imaging' },
      { metric: '24/7', label: 'NOC coverage', note: 'clinical escalation matrix' }
    ],
    proof: null,
    compliance: ['Patient-data path segregation', 'Guest network isolation', 'Documented escalation matrix', 'As-built drawings per wing'],
    faqs: [
      {
        q: 'Can this be done in a live hospital?',
        a: 'It has to be, and that shapes the method: wing by wing, in agreed windows, with the new path proven before the old one is retired. Nothing is cut over on the assumption it will come back.'
      },
      {
        q: 'How do you handle imaging traffic specifically?',
        a: 'Modality and PACS traffic gets its own QoS class and, where volumes justify it, its own path — so a large study transfer does not contend with administrative or guest load.'
      },
      {
        q: 'What does 24/7 cover actually mean here?',
        a: 'A monitored NOC with an escalation matrix defined by clinical impact, named on-call escalation, and RCA on every incident that touched a clinical system.'
      }
    ]
  },

  /* -------------------------------------------------------------- education */
  {
    slug: 'education',
    name: 'Education',
    short: 'Education',
    icon: GraduationCap,
    eyebrow: 'High-density campus networks',
    tint: { from: '#60A5FA', to: '#A855F7', glow: 'rgba(96, 165, 250, 0.30)' },
    tagline: 'Campus Wi-Fi architectures',
    blurb: 'Campus Wi-Fi architectures and high-density coverage.',
    headline: ['Campus Wi-Fi that survives', 'the moment class begins.'],
    summary:
      'A lecture hall is the hardest wireless environment most campuses own: hundreds of clients associating in the same minute, in the same room. We design for that density explicitly, then separate student, staff, and IoT traffic so one does not degrade the other.',
    stats: [
      { value: 'High', label: 'Density per room' },
      { value: '3', label: 'Separated SSID policies' },
      { value: 'RF', label: 'Survey-led design' },
      { value: 'Repeatable', label: 'Per-block template' }
    ],
    pressures: [
      {
        title: 'AP layouts planned from floor plans',
        desc: 'Placement by drawing rather than by RF behaviour produces dead zones in exactly the rooms that need capacity most.'
      },
      {
        title: 'Hundreds of clients associating at once',
        desc: 'Coverage-based designs collapse under simultaneous association at the start of a lecture, even where signal strength looks fine.'
      },
      {
        title: 'Student, staff, and IoT traffic on one policy',
        desc: 'Without separation, an unmanaged device on the student network is adjacent to administrative systems.'
      },
      {
        title: 'Every new block designed from scratch',
        desc: 'With no capacity model to reuse, each expansion repeats the same survey, the same debate, and the same mistakes.'
      }
    ],
    capabilities: [
      { title: 'High-density RF design', desc: 'Predictive and on-site surveys with per-room capacity planning for full-occupancy behaviour.' },
      { title: 'Controller-managed Wi-Fi', desc: 'Band steering, seamless roaming, and central policy across every block on campus.' },
      { title: 'Network access control', desc: 'RADIUS-backed authentication with VLAN-per-SSID separation for student, staff, and IoT.' },
      { title: 'Campus backbone', desc: 'Fibre interconnects between blocks with the redundancy a single-campus outage would otherwise expose.' },
      { title: 'Structured cabling', desc: 'Cat-6 / Cat-6A and OFC to standard, Fluke certified, labelled, and documented per block.' },
      { title: 'Reusable templates', desc: 'A per-room capacity model that future blocks inherit instead of re-deriving.' }
    ],
    stack: ['Controller-based Wi-Fi', 'High-density AP design', 'Band steering', 'RADIUS / 802.1X', 'VLAN per SSID', 'OFC campus backbone'],
    outcomes: [
      { metric: 'Full', label: 'lecture halls served', note: 'no client drops at capacity' },
      { metric: '3-way', label: 'traffic separation', note: 'student, staff, and IoT' },
      { metric: 'Reusable', label: 'capacity model', note: 'inherited by future blocks' }
    ],
    proof: null,
    compliance: ['TIA/EIA cabling standards', 'Per-SSID policy documentation', 'RF survey records', 'As-built drawings per block'],
    faqs: [
      {
        q: 'Do you survey before quoting a campus?',
        a: 'For high-density work, yes — a predictive survey at minimum, and an on-site survey for the rooms that will carry peak load. Quoting a lecture hall from a floor plan is how coverage-based designs get built by accident.'
      },
      {
        q: 'Can this be phased across an academic year?',
        a: 'That is usually the right approach: block by block in vacation windows, with each phase inheriting the same template so the design does not drift between blocks.'
      },
      {
        q: 'Do you cover the transport and campus systems side too?',
        a: 'We have built platforms in this sector beyond the network — including a school transport tracking and fee-collection platform — so both the infrastructure and the application layer are in scope.'
      }
    ]
  },

  /* ----------------------------------------------------------------- retail */
  {
    slug: 'retail',
    name: 'Retail',
    short: 'Retail',
    icon: ShoppingBag,
    eyebrow: 'Repeatable multi-site estates',
    tint: { from: '#F472B6', to: '#F59E0B', glow: 'rgba(244, 114, 182, 0.30)' },
    tagline: 'Multi-store networks and VPNs',
    blurb: 'Multi-store networks, VPN backhaul, and POS reliability.',
    headline: ['One store template,', 'rolled out a hundred times.'],
    summary:
      'Retail networks fail on inconsistency. When every store is cabled and configured slightly differently, nothing can be triaged remotely and every opening needs a specialist on a plane. We build one store template and make it repeatable.',
    stats: [
      { value: '1', label: 'Standard store template' },
      { value: 'Remote', label: 'POS triage' },
      { value: '25%', label: 'Less overstocking' },
      { value: 'Planned', label: 'Bring-up window' }
    ],
    pressures: [
      {
        title: 'Every store built slightly differently',
        desc: 'Without a template there is no baseline, so a POS fault cannot be diagnosed against anything and remote triage is guesswork.'
      },
      {
        title: 'Openings gated on specialist travel',
        desc: 'When bring-up needs a senior engineer physically present, the expansion plan is limited by the travel calendar.'
      },
      {
        title: 'POS downtime hits revenue directly',
        desc: 'A store that cannot take payment is closed, whatever the shutters say — and the outage is measured in lost baskets.'
      },
      {
        title: 'No unified view across stores and warehouses',
        desc: 'Split inventory across sites with no single view produces simultaneous overstocking and stock-outs of the same catalogue.'
      }
    ],
    capabilities: [
      { title: 'Standard store kit', desc: 'Cabling, switching, firewall, and VPN backhaul as one pre-staged, repeatable template.' },
      { title: 'Pre-staged configuration', desc: 'Kit configured and tested before it ships, so bring-up is an install rather than a build.' },
      { title: 'Secure backhaul', desc: 'NGFW with VPN backhaul to the DC and segmentation that keeps payment traffic in its own zone.' },
      { title: 'Remote manageability', desc: 'Central management so a POS incident is triaged against a known baseline instead of a site visit.' },
      { title: 'In-store wireless', desc: 'Surveyed coverage for handhelds, scanners, and customer access without contention.' },
      { title: 'Inventory intelligence', desc: 'Software-side work too — reorder-point prediction, dead-stock detection, and unified multi-site stock visibility.' }
    ],
    stack: ['Pre-staged switching', 'NGFW with VPN backhaul', 'Standardised cable plant', 'Controller-based Wi-Fi', 'Central remote management', 'Payment-zone segmentation'],
    outcomes: [
      { metric: 'Predictable', label: 'store bring-up', note: 'planned window, no specialist travel' },
      { metric: 'Remote', label: 'POS triage', note: 'against a known baseline' },
      { metric: '25%', label: 'less overstocking', note: 'with unified stock visibility' }
    ],
    proof: null,
    compliance: ['Payment-zone segmentation', 'Per-store configuration baseline', 'Standardised as-built pack', 'Fluke certified cable plant'],
    faqs: [
      {
        q: 'How quickly can a new store be brought up?',
        a: 'Once the template exists, bring-up becomes a planned install against pre-staged kit rather than an on-site build. The constraint moves from engineering availability to the store handover date.'
      },
      {
        q: 'Can you retrofit stores that were built inconsistently?',
        a: 'Yes — usually as a normalisation programme that brings existing stores onto the template in batches, starting with the ones generating the most support load.'
      },
      {
        q: 'Do you also build the retail software?',
        a: 'We do. Alongside the network estate we have delivered POS with recipe-level inventory deduction and an AI-driven multi-location inventory engine.'
      }
    ]
  },

  /* ------------------------------------------------------------- enterprise */
  {
    slug: 'enterprise',
    name: 'Enterprise',
    short: 'Enterprise',
    icon: Building2,
    eyebrow: 'End-to-end IT infrastructure',
    tint: { from: '#00E2F5', to: '#B325F7', glow: 'rgba(0, 226, 245, 0.30)' },
    tagline: 'End-to-end IT infrastructure',
    blurb: 'End-to-end IT infrastructure across distributed offices.',
    headline: ['One partner for the whole', 'infrastructure lifecycle.'],
    summary:
      'Most enterprise infrastructure problems are accountability problems. Five vendors across cabling, active, security, support, and software means five people whose scope ends just before the fault. We take the lifecycle — build, operate, optimise — as one engagement.',
    stats: [
      { value: '100+', label: 'Active locations' },
      { value: '2000+', label: 'Managed devices' },
      { value: '18', label: 'Sparing hubs' },
      { value: '24/7', label: 'NOC support desk' }
    ],
    pressures: [
      {
        title: 'Fragmented vendors and diffused accountability',
        desc: 'Different partners for each network segment produce finger-pointing during exactly the outages that matter most.'
      },
      {
        title: 'Built for scale, not resilience',
        desc: 'Architectures that grew by expansion rather than design accumulate single points of failure nobody has mapped.'
      },
      {
        title: 'Operational skill gaps at L2, L3, and SME level',
        desc: 'Senior expertise is hard to retain in-house, so troubleshooting stretches and OEM dependency grows.'
      },
      {
        title: 'High CapEx with low outcome visibility',
        desc: 'Significant hardware spend with no line of sight from the invoice to a measurable continuity improvement.'
      }
    ],
    capabilities: [
      { title: 'Architecture first', desc: 'Design drives the OEM choice, not the reverse — so the solution is not shaped by a reseller’s stock position.' },
      { title: 'LAN / WAN / SD-WAN', desc: 'Routing, switching, SDN, and SD-WAN across distributed offices with central policy.' },
      { title: 'Cybersecurity & NAC', desc: 'FortiGate NGFW, Cisco ISE, FortiNAC, segmentation, and endpoint posture control.' },
      { title: 'Data centre infrastructure', desc: 'Cisco ACI fabric, Nexus spine-leaf, DC passive work, and structured cabling to standard.' },
      { title: 'Managed services', desc: 'SLA-driven AMC and FMS with L1/L2/L3 field cover, NOC setup, and compliance management.' },
      { title: 'Collaboration & voice', desc: 'Webex, MS Teams, VC rollouts, and IP telephony as part of the same estate.' }
    ],
    stack: ['Cisco', 'Fortinet', 'HPE / Aruba', 'Juniper Networks', 'Lenovo Enterprise', 'Cato Networks', 'Cisco ACI & Nexus', 'SD-WAN & SDN'],
    outcomes: [
      { metric: '2000+', label: 'devices under AMC', note: 'including 1500+ hands & feet assets' },
      { metric: '100+', label: 'active locations', note: 'metro and tier-2/3' },
      { metric: 'One', label: 'accountable owner', note: 'across every layer' }
    ],
    proof: { client: 'Aditya Birla Group', note: 'Strategic network and SD-WAN transformation across 400+ deployments.' },
    compliance: ['SoW and SLA governance', 'RCA and TAT metrics per incident', 'Risk register per programme', 'Fluke and OTDR reporting'],
    faqs: [
      {
        q: 'Are you tied to a single OEM?',
        a: 'No. We hold certified capability across Cisco, Fortinet, HPE, Juniper, Lenovo, and Cato, and we design before we specify — architecture first, OEM second.'
      },
      {
        q: 'Can you take over an estate somebody else built?',
        a: 'Yes, and it is common. It starts with an audit to establish what is actually deployed, then a remediation plan against a documented baseline before we take on SLA responsibility for it.'
      },
      {
        q: 'What does the managed-services engagement look like?',
        a: 'SLA-driven AMC or FMS with L1/L2/L3 cover, a NOC desk, an agreed escalation matrix, and monthly reporting on RCA and TAT. Sparing sits in our 18 regional hubs to keep RMA transit off the critical path.'
      }
    ]
  },

  /* -------------------------------------------------------------- logistics */
  {
    slug: 'logistics',
    name: 'Logistics',
    short: 'Logistics',
    icon: Truck,
    eyebrow: 'Warehouse & fleet connectivity',
    tint: { from: '#FBBF24', to: '#84CC16', glow: 'rgba(251, 191, 36, 0.30)' },
    tagline: 'Warehouse and fleet connectivity',
    blurb: 'Warehouse and fleet connectivity across sites in motion.',
    headline: ['Scanner coverage that holds', 'down every rack aisle.'],
    summary:
      'A warehouse is an RF problem disguised as a network problem. High racking, metal, and cold zones absorb signal in ways a floor-plan design never predicts — and every coverage gap converts directly into manual reconciliation at the end of the shift.',
    stats: [
      { value: 'Continuous', label: 'Aisle coverage' },
      { value: 'Hardened', label: 'Cold-zone APs' },
      { value: 'Survey', label: 'Led placement' },
      { value: 'Repeatable', label: 'Site template' }
    ],
    pressures: [
      {
        title: 'Coverage drops in high-rack aisles',
        desc: 'Stock height changes the RF environment daily. A design validated against empty racking fails once the warehouse is full.'
      },
      {
        title: 'Cold and dock zones defeat standard APs',
        desc: 'Condensation, temperature range, and physical exposure kill commodity hardware in exactly the zones that need it.'
      },
      {
        title: 'Manual reconciliation every shift',
        desc: 'Every scan that fails to reach the WMS becomes a discrepancy someone has to walk down and resolve at shift end.'
      },
      {
        title: 'No template across the site network',
        desc: 'Each new warehouse is surveyed and argued from scratch instead of inheriting a proven design.'
      }
    ],
    capabilities: [
      { title: 'Predictive & on-site RF survey', desc: 'Surveys run against loaded racking, not empty aisles, so the design matches operating conditions.' },
      { title: 'Rack-aisle AP placement', desc: 'Placement designed for propagation down the aisle rather than coverage across the floor plan.' },
      { title: 'Hardened deployment', desc: 'Industrial-grade APs and enclosures rated for cold storage, dock exposure, and dust.' },
      { title: 'PoE switching & cable plant', desc: 'Certified structured cabling and PoE infrastructure sized for the AP density the design needs.' },
      { title: 'Fleet & yard connectivity', desc: 'Coverage extended across yards and loading areas so handover scans do not wait for the building.' },
      { title: 'Repeatable site template', desc: 'One documented design rolled out across the warehouse network rather than re-derived per site.' }
    ],
    stack: ['Predictive RF survey tooling', 'Industrial-grade APs', 'Wireless controllers', 'PoE switching', 'Hardened enclosures', 'Certified cable plant'],
    outcomes: [
      { metric: 'Continuous', label: 'scanner coverage', note: 'through high-rack aisles' },
      { metric: 'Eliminated', label: 'shift-end reconciliation', note: 'effectively removed' },
      { metric: '1', label: 'site template', note: 'rolled across the network' }
    ],
    proof: null,
    compliance: ['RF survey records per site', 'Cable plant certification', 'AP placement as-built drawings', 'Environmental rating documentation'],
    faqs: [
      {
        q: 'Do you survey with the racking loaded?',
        a: 'Where we can, yes — and it matters. A survey against empty racking produces a design that degrades as soon as stock arrives, which is why so many warehouse deployments look fine at handover and fail in week three.'
      },
      {
        q: 'Can you cover cold storage?',
        a: 'Yes, with hardened APs and enclosures rated for the temperature range and condensation. Standard hardware in a cold zone is a scheduled failure.'
      },
      {
        q: 'Do you extend coverage into the yard?',
        a: 'Where handover scans happen outside the building, that has to be in scope — otherwise the gap simply moves from the aisle to the dock.'
      }
    ]
  },

  /* ------------------------------------------------------------ hospitality */
  {
    slug: 'hospitality',
    name: 'Hospitality',
    short: 'Hospitality',
    icon: Hotel,
    eyebrow: 'Guest experience infrastructure',
    tint: { from: '#C084FC', to: '#22D3EE', glow: 'rgba(192, 132, 252, 0.30)' },
    tagline: 'Guest networks, POS and coverage',
    blurb: 'Guest networks, POS, and property-wide coverage.',
    headline: ['Property-wide coverage guests', 'never have to think about.'],
    summary:
      'In hospitality the network is part of the product. Guests judge a property on whether the Wi-Fi works in their room, while the operation depends on the same infrastructure for POS, kitchen orders, and property management.',
    stats: [
      { value: 'Property', label: 'Wide coverage' },
      { value: 'Isolated', label: 'Guest network' },
      { value: '30%', label: 'Less wastage' },
      { value: 'Real-time', label: 'Kitchen orders' }
    ],
    pressures: [
      {
        title: 'Guest and operational traffic on one network',
        desc: 'When a full house saturates the uplink, POS and property systems slow down with it.'
      },
      {
        title: 'Dead spots guests report as a review',
        desc: 'Coverage gaps in rooms, corridors, and back-of-house become a rating problem rather than an IT ticket.'
      },
      {
        title: 'Manual billing and inventory',
        desc: 'Paper-driven billing and stock control produce inaccurate inventory and no visibility on daily performance.'
      },
      {
        title: 'Multi-outlet operations with no central view',
        desc: 'Owners running several properties or outlets have no consolidated picture of sales, stock, or wastage.'
      }
    ],
    capabilities: [
      { title: 'Property-wide Wi-Fi', desc: 'Surveyed in-room, corridor, and back-of-house coverage with seamless roaming.' },
      { title: 'Guest network isolation', desc: 'Guest access with no adjacency to POS, property management, or administrative systems.' },
      { title: 'POS & KOT platforms', desc: 'Cloud POS with real-time kitchen order printing, table management, and multi-outlet support.' },
      { title: 'Recipe-level inventory', desc: 'Stock deduction at recipe level so wastage and pilferage become visible rather than assumed.' },
      { title: 'Structured cabling', desc: 'Certified cable plant and rack build-out sized for the property rather than retrofitted.' },
      { title: 'GST-compliant reporting', desc: 'Invoicing and reporting that satisfies compliance without a parallel manual process.' }
    ],
    stack: ['Controller-based Wi-Fi', 'Guest VLAN isolation', 'React & Node.js POS', 'PostgreSQL & Redis', 'Thermal printer APIs', 'Certified cable plant'],
    outcomes: [
      { metric: '30%', label: 'less pilferage & wastage', note: 'recipe-level deduction' },
      { metric: 'Real-time', label: 'owner dashboard', note: 'across every outlet' },
      { metric: 'Isolated', label: 'guest access', note: 'no adjacency to POS' }
    ],
    proof: null,
    compliance: ['Guest network isolation', 'GST-compliant invoicing', 'Payment-zone segmentation', 'As-built cable documentation'],
    faqs: [
      {
        q: 'Do you handle both the network and the POS software?',
        a: 'Yes — that combination is why properties come to us. We have built cloud POS with KOT printing and recipe-level inventory, and we build the network it runs on.'
      },
      {
        q: 'Can guest Wi-Fi be upgraded without closing rooms?',
        a: 'Normally yes, floor by floor against occupancy, with coverage proven per floor before the next one starts.'
      },
      {
        q: 'Does this work for a single outlet as well as a chain?',
        a: 'It does. The POS platform supports multi-outlet operation, but a single property gets the same real-time sales and inventory visibility.'
      }
    ]
  },

  /* ------------------------------------------------------------- government */
  {
    slug: 'government',
    name: 'Government & PSU',
    short: 'Government',
    icon: GovIcon,
    eyebrow: 'Compliance-led programmes',
    tint: { from: '#38BDF8', to: '#6366F1', glow: 'rgba(56, 189, 248, 0.30)' },
    tagline: 'Secure routing and audit compliance',
    blurb: 'Secure nationwide routing, compliance architecture, and audit closure.',
    headline: ['Secure estates that pass', 'the audit the first time.'],
    summary:
      'Public-sector infrastructure is judged on evidence. We standardise routing and hardening baselines across regions, audit each site against them, and hand over a compliance register that survives review — rather than a report that has to be rebuilt every cycle.',
    stats: [
      { value: 'One', label: 'Hardening baseline' },
      { value: 'Per-site', label: 'Audit register' },
      { value: '24/7', label: 'Support desk' },
      { value: 'SME', label: 'Level expertise' }
    ],
    pressures: [
      {
        title: 'Regional offices on inconsistent configurations',
        desc: 'With no baseline, every audit cycle restarts from discovery instead of comparing against a known-good state.'
      },
      {
        title: 'Audit findings with no closure trail',
        desc: 'Findings recorded without an owner or a date reappear unchanged at the next review.'
      },
      {
        title: 'Expanding perimeter, rising exposure',
        desc: 'Hybrid access and more connected sites widen the attack surface faster than the compliance process adapts.'
      },
      {
        title: 'Specialist expertise hard to retain',
        desc: 'SME-level skills are difficult to hold in-house, which lengthens troubleshooting and deepens OEM dependency.'
      }
    ],
    capabilities: [
      { title: 'Standardised baselines', desc: 'One routing and hardening standard applied across every regional office, documented and version-controlled.' },
      { title: 'Vulnerability & config audit', desc: 'Per-site scanning and configuration compliance checks against the agreed baseline.' },
      { title: 'Secure nationwide routing', desc: 'Segmented, policy-controlled routing between regions with secure remote access.' },
      { title: 'Compliance register', desc: 'Findings tracked to closure with an owner and a date, in a form that survives audit handover.' },
      { title: 'SME & L3 resourcing', desc: 'Dedicated subject-matter experts and L1/L2/L3 desks against SLA, as deployed on CPCL and CBDT programmes.' },
      { title: 'Site audits & documentation', desc: 'Regulatory site audits with standardised as-built documentation per location.' }
    ],
    stack: ['Standardised routing baselines', 'Config compliance tooling', 'Vulnerability scanning', 'Secure remote access', 'NGFW segmentation', 'Audit documentation packs'],
    outcomes: [
      { metric: 'One', label: 'baseline across regions', note: 'documented and enforced' },
      { metric: 'Tracked', label: 'audit closure', note: 'owner and date per finding' },
      { metric: '7 SME', label: 'and 20 L1 on CPCL', note: 'specialised support desk' }
    ],
    proof: { client: 'CBDT', note: 'Nationwide secure routing, compliance architecture, and vulnerability auditing.' },
    compliance: ['Configuration baseline per site', 'Vulnerability audit and closure register', 'Regulatory site audits', 'Documented risk register'],
    faqs: [
      {
        q: 'Have you delivered at national scale in the public sector?',
        a: 'Yes — including nationwide secure routing, compliance architecture, and vulnerability auditing for CBDT, and a specialised support desk for CPCL staffed with SME and L1 engineers.'
      },
      {
        q: 'What does the compliance deliverable look like?',
        a: 'A per-site register of findings with severity, owner, and closure date, sitting on top of a documented configuration baseline — so the next audit compares rather than rediscovers.'
      },
      {
        q: 'Can you provide SME-level resources on an ongoing basis?',
        a: 'We do this today. Dedicated SME, L3, L2, and L1 desks are staffed against SLA with a defined escalation matrix and monthly reporting.'
      }
    ]
  }
];

/** Slug → industry, for route params. */
export const INDUSTRY_BY_SLUG = INDUSTRIES.reduce((map, industry) => {
  map[industry.slug] = industry;
  return map;
}, {});

export const getIndustry = (slug) => INDUSTRY_BY_SLUG[String(slug || '').toLowerCase()];

/**
 * Compact map the Portfolio page uses for its ?industry= lens, derived from the
 * same source so the two views can never disagree about a sector's name.
 */
export const INDUSTRY_LENS = INDUSTRIES.reduce((map, industry) => {
  map[industry.slug] = {
    label: industry.name,
    blurb: industry.blurb,
    slug: industry.slug
  };
  return map;
}, {});
