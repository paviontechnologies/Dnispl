import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { AuroraBackdrop, Reveal, RevealGroup, SplitHeading, useScrollReveal } from '../../motion/MotionKit';
import { publicFetch } from '../../config/api';
import { fallbackBlogs, resolveBlogs } from './blogData';
import './BlogPost.css';

const TINT = { from: '#B325F7', to: '#00E2F5', glow: 'rgba(179, 37, 247, 0.3)' };

/** ~200 wpm, rounded up — only used when the record carries no readTime. */
const estimateReadTime = (content = '') =>
  `${Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200))} min read`;

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [state, setState] = useState('loading'); // loading | ready | missing
  useScrollReveal();

  // Reading progress bar across the top of the article
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    let cancelled = false;
    setState('loading');

    /* The list and the article share one collection, so we resolve against the
       full set: that gives us the "related stories" rail for free, and lets
       fallback slugs (which have no database id) resolve the same way. */
    publicFetch('/api/blogs')
      .catch(() => fallbackBlogs)
      .then((data) => {
        if (cancelled) return;
        const all = resolveBlogs(data);
        const match = all.find((item) => String(item._id) === String(id));

        if (!match) {
          setState('missing');
          return;
        }

        setPost(match);
        setRelated(all.filter((item) => item._id !== match._id).slice(0, 3));
        setState('ready');
      });

    return () => { cancelled = true; };
  }, [id]);

  if (state === 'loading') {
    return (
      <>
        <Header />
        <div className="post-page">
          <div className="post-loading">
            <span className="post-spinner" aria-hidden="true" />
            <p>Loading story…</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (state === 'missing') {
    return (
      <>
        <Header />
        <div className="post-page">
          <section className="post-missing">
            <AuroraBackdrop tint={TINT} cubes={false} />
            <h1>That story isn’t filed here.</h1>
            <p>It may have been unpublished, or the link may be out of date.</p>
            <Link to="/blog" className="post-back-link"><ArrowLeft size={18} /> All field notes</Link>
          </section>
        </div>
        <Footer />
      </>
    );
  }

  const paragraphs = String(post.content || post.summary || '')
    .split(/\n{2,}|\r\n\r\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  const published = formatDate(post.createdAt);

  return (
    <>
      <Header />

      <motion.div className="post-progress" style={{ scaleX: progress }} aria-hidden="true" />

      <div className="post-page">
        <section className="post-hero">
          <AuroraBackdrop tint={TINT} />

          <div className="post-hero-inner">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="post-breadcrumb"
            >
              <Link to="/blog"><ArrowLeft size={15} /> Field notes</Link>
              <span className="post-category">{post.category}</span>
            </motion.div>

            <SplitHeading lines={[post.title]} className="post-title" />

            <motion.p
              className="post-standfirst"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {post.summary}
            </motion.p>

            <motion.div
              className="post-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.68 }}
            >
              <span><User size={15} /> {post.author || 'DNISPL'}</span>
              {published && <span><CalendarDays size={15} /> {published}</span>}
              <span><Clock size={15} /> {post.readTime || estimateReadTime(post.content)}</span>
            </motion.div>
          </div>
        </section>

        {post.image && (
          <Reveal dir="scale" className="post-cover">
            <img src={post.image} alt={post.title} />
          </Reveal>
        )}

        <RevealGroup as="article" className="post-body">
          {paragraphs.map((block, index) => (
            <Reveal as="p" key={index} dir="up">{block}</Reveal>
          ))}
        </RevealGroup>

        <Reveal dir="scale" className="post-cta">
          <h2>Facing this in your own estate?</h2>
          <p>Our architects will walk your environment and tell you where the risk actually sits.</p>
          <Link to="/form" className="post-cta-btn">Request an architecture audit <ArrowRight size={17} /></Link>
        </Reveal>

        {related.length > 0 && (
          <section className="post-related">
            <h3>More field notes</h3>
            <RevealGroup className="post-related-grid">
              {related.map((item) => (
                <Reveal as="article" dir="up" className="post-related-card" key={item._id}>
                  <Link to={`/blog/${item._id}`}>
                    <span className="tag">{item.category}</span>
                    <h4>{item.title}</h4>
                    <p>{item.summary}</p>
                    <span className="post-related-cue">Read story <ArrowRight size={15} /></span>
                  </Link>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
};

export default BlogPost;
