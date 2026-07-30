import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Blog.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { motion } from 'framer-motion';
import {
    AuroraBackdrop,
    Reveal,
    RevealGroup,
    SplitHeading,
    useScrollReveal
} from '../../motion/MotionKit';
import { publicFetch } from '../../config/api';
import { fallbackBlogs, resolveBlogs } from './blogData';

const TINT = { from: '#00E2F5', to: '#B325F7', glow: 'rgba(0, 226, 245, 0.3)' };

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    useScrollReveal();

    useEffect(() => {
        let cancelled = false;

        publicFetch('/api/blogs')
            .then((data) => { if (!cancelled) setBlogs(resolveBlogs(data)); })
            .catch(() => { if (!cancelled) setBlogs(fallbackBlogs); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, []);

    const categories = ['All', ...Array.from(new Set(blogs.map((item) => item.category).filter(Boolean)))];
    const visibleBlogs =
        activeCategory === 'All' ? blogs : blogs.filter((item) => item.category === activeCategory);

    const [lead, ...rest] = visibleBlogs;

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

            {loading ? (
                /* Skeletons hold the grid's shape so the page doesn't jump on load */
                <div className="blog-container">
                    {[0, 1, 2].map((key) => (
                        <div className="blog-card blog-card-skeleton" key={key}>
                            <div className="skeleton-media" />
                            <div className="card-body">
                                <span className="skeleton-line skeleton-line-lg" />
                                <span className="skeleton-line" />
                                <span className="skeleton-line skeleton-line-sm" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {categories.length > 2 && (
                        <div className="blog-filter-row">
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    type="button"
                                    className={`blog-chip ${activeCategory === category ? 'active' : ''}`}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {/* Newest story runs full width as the lead, the rest tile beneath it */}
                    {lead && (
                        <Reveal as="article" dir="scale" className="blog-lead">
                            <Link to={`/blog/${lead._id}`} className="blog-lead-inner">
                                <div className="blog-lead-media">
                                    {lead.image
                                        ? <img src={lead.image} alt={lead.title} />
                                        : <span className="blog-media-fallback">{lead.category}</span>}
                                </div>
                                <div className="blog-lead-copy">
                                    <span className="tag">{lead.category}</span>
                                    <h2>{lead.title}</h2>
                                    <p>{lead.summary}</p>
                                    <span className="blog-lead-meta">
                                        {lead.author || 'DNISPL'}
                                        {lead.readTime ? ` · ${lead.readTime}` : ''}
                                    </span>
                                    <span className="btn-read">Read story <ArrowRight size={16} /></span>
                                </div>
                            </Link>
                        </Reveal>
                    )}

                    <RevealGroup className="blog-container">
                        {rest.map((item) => (
                            <Reveal as="article" dir="scale" className="blog-card" key={item._id}>
                                <Link to={`/blog/${item._id}`} className="blog-card-link">
                                    <div className="card-header">
                                        {item.image
                                            ? <img src={item.image} alt={item.title} />
                                            : <span className="blog-media-fallback">{item.category}</span>}
                                        <span className="tag">{item.category}</span>
                                    </div>
                                    <div className="card-body">
                                        <h3>{item.title}</h3>
                                        <p>{item.summary}</p>
                                        <span className="btn-read">Read story <ArrowRight size={16} /></span>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </RevealGroup>

                    {!visibleBlogs.length && (
                        <p className="blog-empty">No stories filed under {activeCategory} yet.</p>
                    )}
                </>
            )}
          </div>
          <Footer />
        </>
    );
};

export default Blog;
