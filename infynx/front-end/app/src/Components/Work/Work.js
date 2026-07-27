import React from 'react';
import './Work.css';
import { motion } from 'framer-motion';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Cable, CheckCircle2, Rocket, Settings, UserRoundCog, Wifi, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    AuroraBackdrop,
    OrbitVisual,
    Reveal,
    RevealGroup,
    ScrollFan,
    SplitHeading,
    useScrollReveal
} from '../../motion/MotionKit';

const TINT = { from: '#B325F7', to: '#00E2F5', glow: 'rgba(179, 37, 247, 0.3)' };

/* Fan shades across the brand ramp */
const PALETTE = [
    { card: '#B325F7', badge: '#9B1DD8' },
    { card: '#173FCF', badge: '#12309E' },
    { card: '#2AC5DD', badge: '#22A3B6' }
];

const listItemVariants = {
    offscreen: { x: -50, opacity: 0 },
    onscreen: { x: 0, opacity: 1, transition: { type: 'tween', duration: 0.4 } }
};

const FLOW_STEPS = ['Plan', 'Build', 'Test', 'Review', 'Deploy'];

const OUTCOMES = [
    ['Robust, scalable systems', 'Clean architecture with testing and clear operational ownership.'],
    ['Optimized network topology', 'Low latency and high availability across the infrastructure.'],
    ['Secure environment', 'Current security controls across software and network layers.'],
    ['Comprehensive documentation', 'A complete handover with diagrams, runbooks, and support guides.']
];

const Work = () => {
    useScrollReveal();

    const deliveryMethods = [
        {
            title: "Software Delivery Methodologies",
            icon: Rocket,
            description: "Agile Scrum and Kanban create short feedback loops, predictable delivery, and room to adapt as requirements evolve."
        },
        {
            title: "Configuration & Implementation (Networking)",
            icon: Settings,
            description: "We own the switch and router lifecycle, including VLAN segmentation, security policy, resilience, and performance tuning."
        },
        {
            title: "Installation: WiFi & Access Points",
            icon: Wifi,
            description: "Site surveys, deliberate access-point placement, and post-installation tuning deliver reliable coverage without hidden dead zones."
        },
    ];

    const infrastructureServices = [
        {
            title: "Active Networking",
            icon: Zap,
            description: "Routers, switches, firewalls, and servers are configured and observed as one high-availability system."
        },
        {
            title: "Passive Networking",
            icon: Cable,
            description: "Fiber, copper, patch panels, racks, and conduits are documented, tested, and built as the network's dependable foundation."
        },
        {
            title: "Employee Provisioning & Support",
            icon: UserRoundCog,
            description: "Role-ready hardware, software, secure access, and support get employees productive from their first day."
        }
    ];

    const renderProcessCard = (item) => (
        <div className="fx-fan-card work-fan-card">
            <div className="fx-fan-badge"><item.icon size={34} /></div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
        </div>
    );

    return (
        <>
            <Header/>
            <div className="work-page-container">
                {/* Hero */}
                <header className="work-hero-section">
                    <AuroraBackdrop tint={TINT} />

                    <div className="work-hero-inner">
                        <SplitHeading lines={['Our Process: Delivering Excellence']} />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            A structured approach to ensure high-quality software and reliable infrastructure.
                        </motion.p>
                    </div>
                </header>

                {/* Section I: Software Delivery — cards fan in as you scroll */}
                <section className="work-section">
                    <Reveal as="h2">I. Software Delivery &amp; Methodologies</Reveal>

                    <ScrollFan
                        items={deliveryMethods}
                        palette={PALETTE}
                        renderCard={renderProcessCard}
                    />

                    {/* The flow chart draws itself in, step by step */}
                    <motion.div
                        className="delivery-flow-chart"
                        initial="hidden"
                        whileInView="shown"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ staggerChildren: 0.12 }}
                    >
                        {FLOW_STEPS.map((step, index) => (
                            <React.Fragment key={step}>
                                <motion.span
                                    className="flow-step"
                                    variants={{
                                        hidden: { opacity: 0, y: 16, scale: 0.9 },
                                        shown: { opacity: 1, y: 0, scale: 1 }
                                    }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <small>0{index + 1}</small>{step}
                                </motion.span>
                                {index < FLOW_STEPS.length - 1 && (
                                    <motion.span
                                        className="flow-line"
                                        variants={{
                                            hidden: { scaleX: 0 },
                                            shown: { scaleX: 1 }
                                        }}
                                        style={{ transformOrigin: 'left center' }}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </section>

                {/* Section II: Infrastructure & Networking Services */}
                <section className="work-section networking-section">
                    <Reveal as="h2">II. Infrastructure &amp; Networking Services</Reveal>

                    <ScrollFan
                        items={infrastructureServices}
                        palette={PALETTE}
                        renderCard={renderProcessCard}
                    />
                </section>

                {/* Section III: What We Deliver */}
                <motion.section
                    className="work-section final-step"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Reveal as="h2">III. What We Deliver (The Outcome)</Reveal>

                    <div className="work-outcome-layout">
                        <ul>
                            {OUTCOMES.map(([title, description], index) => (
                                <motion.li
                                    key={title}
                                    variants={listItemVariants}
                                    transition={{ delay: index * 0.15 }}
                                >
                                    <CheckCircle2 size={21} />
                                    <span><strong>{title}</strong>{description}</span>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Turning globe — delivery reach */}
                        <Reveal dir="right" className="work-outcome-visual">
                            <OrbitVisual tint={TINT} />
                        </Reveal>
                    </div>

                    <RevealGroup className="work-cta-row">
                        <p>Have a rollout or transformation in mind?</p>
                        <Link to="/form">Start a project</Link>
                    </RevealGroup>
                </motion.section>
            </div>
            <Footer/>
        </>
    );
};

export default Work;
