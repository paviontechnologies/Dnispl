import React from 'react';
import './Work.css';
import { motion } from 'framer-motion';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Cable, CheckCircle2, Rocket, Settings, UserRoundCog, Wifi, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

// Note: Assuming Header and Footer components are defined elsewhere or passed in
// For this example, I'll define a simple placeholder for them.


// --- Animation Variants (Optional but recommended for cleaner code) ---
const cardVariants = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    }
};

const listItemVariants = {
    offscreen: {
        x: -50,
        opacity: 0
    },
    onscreen: {
        x: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.4
        }
    }
};
// --------------------------------------------------------------------


const Work = () => {
    // Data structure for the process steps (Same as before)
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

    return (
        <>
            <Header/>
            <div className="work-page-container">
                {/* Hero Section - Animate the whole header with a simple fade-in */}
                <motion.header 
                    className="work-hero-section"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>Our Process: Delivering Excellence</h1>
                    <p>A structured approach to ensure high-quality software and reliable infrastructure.</p>
                </motion.header>

                {/* Section I: Software Delivery */}
                <motion.section 
                    className="work-section"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }} // Animate once when 30% visible
                >
                    <h2>I. Software Delivery & Methodologies</h2>
                    <div className="card-grid">
                        {deliveryMethods.map((item, index) => (
                            // **HERE IS WHERE YOU ADD THE MOTION.DIV**
                            <motion.div 
                                key={index} 
                                className="process-card delivery-card"
                                variants={cardVariants}
                                transition={{ delay: index * 0.1 }} // Staggered delay for cards
                            >
                                <span className="card-icon"><item.icon size={23} /></span>
                                <h3 className="card-title">{item.title}</h3>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="delivery-flow-chart">
                        {['Plan', 'Build', 'Test', 'Review', 'Deploy'].map((step, index) => (
                            <React.Fragment key={step}>
                                <span className="flow-step"><small>0{index + 1}</small>{step}</span>
                                {index < 4 && <span className="flow-line" />}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.section>

                {/* Section II: Infrastructure & Networking Services */}
                <motion.section 
                    className="work-section networking-section"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2>II. Infrastructure & Networking Services</h2>
                    <div className="card-grid">
                        {infrastructureServices.map((item, index) => (
                            // **HERE IS WHERE YOU ADD THE MOTION.DIV**
                            <motion.div 
                                key={index} 
                                className="process-card networking-card"
                                variants={cardVariants}
                                transition={{ delay: index * 0.1 }} // Staggered delay for cards
                            >
                                <span className="card-icon"><item.icon size={23} /></span>
                                <h3 className="card-title">{item.title}</h3>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Section III: What We Deliver */}
                <motion.section 
                    className="work-section final-step"
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2>III. What We Deliver (The Outcome)</h2>
                    <ul>
                        {[
                            ['Robust, scalable systems', 'Clean architecture with testing and clear operational ownership.'],
                            ['Optimized network topology', 'Low latency and high availability across the infrastructure.'],
                            ['Secure environment', 'Current security controls across software and network layers.'],
                            ['Comprehensive documentation', 'A complete handover with diagrams, runbooks, and support guides.']
                        ].map(([title, description], index) => (
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
                    <div className="work-cta-row">
                        <p>Have a rollout or transformation in mind?</p>
                        <Link to="/form">Start a project</Link>
                    </div>
                </motion.section>
            </div>
            <Footer/>
        </>
    );
};

export default Work;