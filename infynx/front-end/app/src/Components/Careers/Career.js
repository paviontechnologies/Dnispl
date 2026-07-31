import React, { useState, useEffect } from 'react';
import './Career.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AuroraBackdrop,
  CountUp,
  MagneticButton,
  NetworkLattice,
  Reveal,
  RevealGroup,
  ScrollDrift,
  SpotlightCard,
  SplitHeading,
  useScrollReveal
} from '../../motion/MotionKit';
import { api, publicFetch } from '../../config/api';

const TINT = { from: '#173FCF', to: '#00E2F5', glow: 'rgba(23, 63, 207, 0.32)' };

const CULTURE_STATS = [
  { value: '100+', label: 'Active sites to work across' },
  { value: '2000+', label: 'Devices under our care' },
  { value: '18', label: 'Regional hubs' },
  { value: '24/7', label: 'NOC you can rotate through' }
];

const WHY_US = [
  {
    title: 'Real estates, not sandboxes',
    desc: 'You work on branch networks, plant floors, and hospital wings that people depend on the same afternoon. The feedback loop is immediate and it is honest.'
  },
  {
    title: 'Multi-OEM by design',
    desc: 'Cisco, Fortinet, HPE, Juniper, Cato. You build transferable depth across vendors instead of becoming fluent in exactly one console.'
  },
  {
    title: 'Escalation you can climb',
    desc: 'L1 to L2 to L3 to SME is a defined path here, not a title change. Senior engineers sit in the same escalation chain you do.'
  },
  {
    title: 'Documentation is the job',
    desc: 'As-builts, RCAs, and test records are how we work, which means your work is visible and your reasoning is reviewable.'
  }
];

const ContentWrapper = ({ children, className }) => (
    <div className={`career-content-wrapper ${className || ''}`}>{children}</div>
);

const getTagClassName = (tag) => {
    switch (tag) {
        case 'GROWTH': return 'tag-growth';
        case 'DELIVERY': return 'tag-delivery';
        case 'ENGINEERING': return 'tag-engineering';
        default: return 'tag-other';
    }
};

const fallbackJobs = [
    {
        _id: 'network-engineer',
        title: 'Network Engineer - L2/L3',
        experience: 'ENGINEERING',
        location: 'Gurugram / PAN India',
        description: 'Design, configure, troubleshoot, and document resilient enterprise networks.',
        fullDescription: 'Role: Own switching, routing, wireless, and firewall implementation across client environments.\nExperience: 3+ years with enterprise networking and hands-on troubleshooting.\nWhat matters: Strong fundamentals, calm incident response, and clear documentation.'
    },
    {
        _id: 'project-coordinator',
        title: 'Infrastructure Project Coordinator',
        experience: 'DELIVERY',
        location: 'Gurugram',
        description: 'Coordinate multi-site deployment teams, timelines, reporting, and client communication.',
        fullDescription: 'Role: Track field execution, dependencies, material movement, and customer sign-offs.\nExperience: 2+ years in telecom or IT infrastructure delivery.\nWhat matters: Ownership, practical planning, and concise communication.'
    },
    {
        _id: 'business-development',
        title: 'Business Development Manager',
        experience: 'GROWTH',
        location: 'NCR / Hybrid',
        description: 'Build enterprise relationships and shape opportunities around measurable outcomes.',
        fullDescription: 'Role: Develop qualified enterprise opportunities across networking and managed services.\nExperience: 4+ years in B2B technology or infrastructure services.\nWhat matters: Consultative discovery, account discipline, and long-term thinking.'
    }
];

const Career = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [status, setStatus] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    useScrollReveal();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await publicFetch('/api/jobs');
                setJobs(Array.isArray(data) && data.length ? data : fallbackJobs);
            } catch (err) {
                setJobs(fallbackJobs);
                setError('Showing currently featured roles while live listings reconnect.');
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleViewApply = (job) => {
        setSelectedJob(job);
        setShowForm(true);
        setStatus("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
        setFormLoading(true);

        const formData = new FormData();
        formData.append("name", e.target.name.value);
        formData.append("email", e.target.email.value);
        formData.append("state", e.target.state.value);
        formData.append("city", e.target.city.value);
        formData.append("jobProfile", selectedJob.title);
        formData.append("resume", e.target.resume.files[0]);

        try {
            const res = await fetch(api("/apply-job"), {
                method: "POST",
                body: formData,
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                setStatus("✅ Application submitted successfully!");
                e.target.reset();
                setTimeout(() => setShowForm(false), 2000);
            } else {
                setStatus(`❌ ${data?.message || "Submission failed."}`);
            }
        } catch (err) {
            setStatus("❌ Connection error. Please try again.");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="career-page-root">
            <Header />

            <div className="career-container">
                <section className="career-hero-section">
                    <AuroraBackdrop tint={TINT} />

                    <ContentWrapper>
                        <SplitHeading
                            className="career-title"
                            lines={[
                                <span key="a">Build the Future with <span className="dnispl-blue">DNISPL</span></span>
                            ]}
                        />
                        <motion.p
                            className="career-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            Engineer the networks that hospitals, banks, and production lines
                            cannot afford to lose — across 100+ active sites nationwide.
                        </motion.p>

                        <RevealGroup className="career-stats">
                            {CULTURE_STATS.map((stat) => (
                                <Reveal key={stat.label} className="career-stat" dir="scale">
                                    <span className="career-stat-value">
                                        <CountUp value={stat.value} />
                                    </span>
                                    <span className="career-stat-label">{stat.label}</span>
                                </Reveal>
                            ))}
                        </RevealGroup>
                    </ContentWrapper>
                </section>

                <section className="job-listings-section">
                    <ContentWrapper>
                        <Reveal className="career-section-head">
                            <span className="career-tag">Open roles</span>
                            <h2>Where we need people right now</h2>
                        </Reveal>

                        {loading && <p className="loading-text">Finding opportunities for you...</p>}
                        {error && <p className="career-notice">{error}</p>}

                        {/* Roles slide in from alternating sides as the list scrolls through */}
                        {!loading && (
                            <ScrollDrift
                                className="job-grid"
                                items={jobs}
                                renderItem={(job) => (
                                    <div className="job-card">
                                        <div className="job-card-header">
                                            <span className={`job-tag ${getTagClassName(job.experience)}`}>{job.experience}</span>
                                            <span className="job-location-pin">📍 {job.location}</span>
                                        </div>
                                        <h3 className="job-title">{job.title}</h3>
                                        <p className="job-description-short">{job.description}</p>
                                        <button onClick={() => handleViewApply(job)} className="btn-view-apply">
                                            View & Apply
                                        </button>
                                    </div>
                                )}
                            />
                        )}
                    </ContentWrapper>
                </section>

                {/* --- WHY WORK HERE --- */}
                <section className="career-why-section">
                    <ContentWrapper className="career-why-inner">
                        <Reveal className="career-why-copy" dir="left">
                            <span className="career-tag">Why here</span>
                            <h2>Depth you can’t get from a lab</h2>
                            <p className="career-why-lead">
                                Most infrastructure careers stall because the work stays
                                theoretical. Ours doesn’t — you are on live estates from
                                early, with senior engineers in the same escalation chain.
                            </p>

                            <RevealGroup className="career-why-grid">
                                {WHY_US.map((item, index) => (
                                    <Reveal key={item.title} className="career-why-shell">
                                        <SpotlightCard className="career-why-card">
                                            <span className="career-why-num">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                        </SpotlightCard>
                                    </Reveal>
                                ))}
                            </RevealGroup>
                        </Reveal>

                        <Reveal className="career-why-visual" dir="right">
                            <NetworkLattice tint={TINT} density={92} />
                            <p className="career-why-caption">
                                Metro through tier-3. Wherever the estate is, that is where
                                the work is.
                            </p>
                        </Reveal>
                    </ContentWrapper>
                </section>

                {/* --- SPECULATIVE CTA --- */}
                <section className="career-cta-section">
                    <Reveal className="career-cta-box" dir="scale">
                        <h2>Nothing above fits you?</h2>
                        <p>
                            We hire ahead of requirements for strong network, delivery, and
                            software people. Send us what you have built and where you want
                            to go next.
                        </p>
                        <div className="career-cta-actions">
                            <MagneticButton
                                as="a"
                                href="mailto:info@dnispl.com?subject=Speculative%20application"
                                className="career-btn-primary"
                            >
                                Email us your profile
                            </MagneticButton>
                            <Link to="/about" className="career-btn-ghost">
                                How we work
                            </Link>
                        </div>
                    </Reveal>
                </section>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        className="form-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setShowForm(false)}
                    >
                        <motion.div
                            className="form-modal-content"
                            initial={{ opacity: 0, y: 40, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.96 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <button className="close-modal-btn" onClick={() => setShowForm(false)}>&times;</button>

                            <div className="modal-inner-scroll">
                                <div className="form-header">
                                    <h2>Applying for: <span className="highlight-text">{selectedJob?.title}</span></h2>

                                    <div className="job-details-container">
                                        <h4>Job Overview & Responsibilities:</h4>
                                        <div className="job-details-content">
                                            {selectedJob?.fullDescription?.split('\n').map((paragraph, pIndex) => (
                                                <motion.div
                                                    key={pIndex}
                                                    className="description-section"
                                                    initial={{ opacity: 0, x: -14 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.35, delay: 0.15 + pIndex * 0.08 }}
                                                >
                                                    {/* Agar line mein ":" hai toh use heading treat karein */}
                                                    {paragraph.includes(':') ? (
                                                        <>
                                                            <strong className="desc-heading">{paragraph.split(':')[0]}:</strong>
                                                            <p className="desc-text">{paragraph.split(':')[1]}</p>
                                                        </>
                                                    ) : (
                                                        <p className="desc-text">{paragraph}</p>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="form-instruction">Fill your details to apply</p>
                                </div>

                                <form className="career-modal-form" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input name="name" type="text" placeholder="Rahul Kumar" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input name="email" type="email" placeholder="rahul@example.com" required />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>State</label>
                                            <input name="state" type="text" placeholder="Haryana" required />
                                        </div>
                                        <div className="form-group">
                                            <label>City</label>
                                            <input name="city" type="text" placeholder="Gurugram" required />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Resume (PDF only)</label>
                                        <div className="file-upload-wrapper">
                                            <input name="resume" type="file" accept=".pdf" required className="file-input-field" />
                                        </div>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className="modal-submit-btn"
                                        disabled={formLoading}
                                        whileHover={formLoading ? undefined : { y: -2, scale: 1.015 }}
                                        whileTap={formLoading ? undefined : { scale: 0.98 }}
                                    >
                                        {formLoading ? "Sending..." : "Submit Application"}
                                    </motion.button>

                                    <AnimatePresence mode="wait">
                                        {status && (
                                            <motion.p
                                                key={status}
                                                className={`status-msg ${status.includes('✅') ? 'success' : 'error'}`}
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {status}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Career;
