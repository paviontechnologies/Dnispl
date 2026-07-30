import blogOne from '../Images/infynix/blog-1.webp';
import blogTwo from '../Images/infynix/blog-2.webp';
import blogThree from '../Images/infynix/blog-3.webp';

/**
 * Editorial fallback. The blog list and the article page both render from the
 * live `/api/blogs` collection when it answers, and fall back to these when the
 * backend is unreachable — so the marketing site never shows an empty section.
 *
 * Shape matches the Blog mongoose model (title, category, image, summary,
 * content, author) plus a `readTime` used only for display.
 */
export const fallbackBlogs = [
  {
    _id: 'network-resilience',
    image: blogOne,
    category: 'Infrastructure',
    author: 'DNISPL Engineering',
    readTime: '6 min read',
    title: 'Why resilient networks start before the first device',
    summary:
      'Architecture, operational ownership, and failure planning matter more than any single piece of hardware.',
    content: `A resilient network is designed around business continuity, not around a bill of materials. The most expensive chassis in the rack will not save an environment where nobody has agreed what happens at 3am when a link drops.

Resilience starts with failure domains. Before any device is chosen, the design should answer a plain question for every segment: what breaks when this fails, and who notices first. Drawing those boundaries early forces the redundancy conversation into the architecture phase, where it is cheap, rather than into the incident review, where it is not.

The second ingredient is tested recovery. A redundant path that has never been failed over is a theory. We schedule controlled failovers as part of handover, and again at defined intervals, because the gap between a documented recovery path and a working one only reveals itself under load.

The third is observability with ownership attached. Dashboards that nobody is accountable for become wallpaper. Every alert we ship has a named owner, an escalation path, and a defined action — otherwise it is noise that trains the team to ignore the console.

Finally, documentation is part of the network, not an afterthought to it. Diagrams, runbooks, address plans, and change history turn infrastructure from a collection of devices into a dependable operating system for the business. When those four things are in place, resilience stops being a property of the hardware and becomes a property of the operation.`,
  },
  {
    _id: 'managed-operations',
    image: blogTwo,
    category: 'Operations',
    author: 'DNISPL Managed Services',
    readTime: '5 min read',
    title: 'From reactive support to managed network operations',
    summary:
      'A practical model for moving teams from ticket queues to measurable service outcomes.',
    content: `Most support functions start reactive because reactive is what the first year demands. Something breaks, someone fixes it, a ticket closes. The model works until scale turns the queue into the job itself.

Managed operations work best when service levels connect to real user impact rather than device uptime. A switch that is technically online while a branch cannot process transactions is not a success, and any SLA that reports it as one is measuring the wrong thing. We define service levels against business processes first, then map the infrastructure that carries them.

Shared visibility comes next. When the client and the operations desk look at the same dashboard, arguments about whether an incident happened disappear and the conversation moves to why. That shift alone removes most of the friction from a support relationship.

Problem management is what separates the two models. In a reactive shop, every incident is closed and forgotten. In a managed operation, recurring incidents are escalated into problem records with root cause owners and a target date. Each incident is expected to improve the network rather than merely restore it.

Capacity review closes the loop. Reviewing utilisation, error rates, and change volume on a fixed cadence turns operations from a cost centre defending its ticket count into a function that can argue for investment with evidence.`,
  },
  {
    _id: 'secure-scale',
    image: blogThree,
    category: 'Security',
    author: 'DNISPL Security Practice',
    readTime: '7 min read',
    title: 'Scaling infrastructure without scaling exposure',
    summary:
      'How segmentation and policy-led deployment keep distributed environments manageable.',
    content: `Growth should not multiply security exceptions, yet in most estates it does. Each new site arrives with its own deadline, and the fastest way to hit a deadline is to copy the last site's configuration and add one more firewall rule. Repeat that fifty times and the policy set becomes something nobody is willing to touch.

Repeatable site templates are the antidote. When a location is deployed from a defined template rather than assembled by hand, the security posture of site fifty matches site one. Deviations become visible because they are deviations from something, instead of being invisible because there was never a standard.

Identity-aware access changes the question from where a device is plugged in to what it is allowed to reach. Combined with segmentation, it limits how far a compromise travels, which is the only realistic assumption to design around — perimeter breaches are a matter of when.

Automated compliance evidence is the piece most teams postpone. Audits arrive regardless, and the difference between a two-day exercise and a two-week one is whether configuration state and change history were being captured continuously or reconstructed afterwards.

Done together, these let an estate add locations without adding proportional risk. The goal is not a network that cannot be attacked; it is one where growth does not quietly widen the blast radius.`,
  },
];

/** Blogs land newest-first from the API; fallbacks keep their editorial order. */
export const resolveBlogs = (data) =>
  Array.isArray(data) && data.length ? data : fallbackBlogs;
