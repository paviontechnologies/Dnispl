import React, { useState, useEffect } from 'react';
import { ArrowRight, Minus } from 'lucide-react';
import './Blog.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import blogOne from '../Images/infynix/blog-1.webp';
import blogTwo from '../Images/infynix/blog-2.webp';
import blogThree from '../Images/infynix/blog-3.webp';
import { AnimatePresence, motion } from 'framer-motion';
import {
    AuroraBackdrop,
    Reveal,
    RevealGroup,
    SplitHeading,
    useScrollReveal
} from '../../motion/MotionKit';

const TINT = { from: '#00E2F5', to: '#B325F7', glow: 'rgba(0, 226, 245, 0.3)' };

const fallbackBlogs = [
    { _id: 'network-resilience', image: blogOne, category: 'Infrastructure', title: 'Why resilient networks start before the first device', summary: 'Architecture, operational ownership, and failure planning matter more than any single piece of hardware.', content: 'A resilient network is designed around business continuity. Clear failure domains, tested recovery paths, documented ownership, and observability turn infrastructure from a collection of devices into a dependable operating system for the business.' },
    { _id: 'managed-operations', image: blogTwo, category: 'Operations', title: 'From reactive support to managed network operations', summary: 'A practical model for moving teams from ticket queues to measurable service outcomes.', content: 'Managed operations work best when service levels connect to real user impact. Shared dashboards, escalation paths, capacity reviews, and problem management create a cycle where every incident improves the network instead of becoming another isolated ticket.' },
    { _id: 'secure-scale', image: blogThree, category: 'Security', title: 'Scaling infrastructure without scaling exposure', summary: 'How segmentation and policy-led deployment keep distributed environments manageable.', content: 'Growth should not multiply security exceptions. Repeatable site templates, identity-aware access, segmentation, and automated compliance evidence make it possible to add locations while keeping risk visible and policy consistent.' },
];

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    useScrollReveal();

    useEffect(() => {
        fetch('http://localhost:5000/api/blogs')
            .then(res => {
                if (!res.ok) throw new Error('Blog service unavailable');
                return res.json();
            })
            .then(data => setBlogs(Array.isArray(data) && data.length ? data : fallbackBlogs))
            .catch(() => setBlogs(fallbackBlogs))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
          <Header />
          <div className="blog-wrapper">

            <div className="blog-hero">
                <AuroraBackdrop tint={TINT} />

                <div className="blog-hero-inner">
                    <motion.span
                        className="blog-kicker"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        FIELD NOTES / 2026
                    </motion.span>

                    <SplitHeading
                        lines={[
                            'Ideas for infrastructure',
                            <span key="a">that <span className="blog-hero-accent">keeps moving.</span></span>
                        ]}
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.55 }}
                    >
                        Network strategy, operations, security, and practical lessons from complex rollouts.
                    </motion.p>
                </div>
            </div>

            <RevealGroup className="blog-container">
                {loading && <p className="blog-loading">Loading field notes...</p>}
                {blogs.map((item) => (
                    <Reveal
                        as="article"
                        dir="scale"
                        className={`blog-card ${selectedBlog === item._id ? 'expanded' : ''}`}
                        key={item._id}
                    >
                        <div className="card-header">
                            <img src={item.image} alt={item.title} />
                            <span className="tag">{item.category}</span>
                        </div>
                        <div className="card-body">
                            <h3>{item.title}</h3>
                            <p>{item.summary}</p>

                            <AnimatePresence initial={false}>
                                {selectedBlog === item._id && (
                                    <motion.p
                                        className="blog-full-copy"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        {item.content || item.summary}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            <motion.button
                                className="btn-read"
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setSelectedBlog(selectedBlog === item._id ? null : item._id)}
                            >
                                {selectedBlog === item._id
                                    ? <>Close story <Minus size={16} /></>
                                    : <>Read story <ArrowRight size={16} /></>}
                            </motion.button>
                        </div>
                    </Reveal>
                ))}
            </RevealGroup>
          </div>
          <Footer />
        </>
    );
};

export default Blog;
