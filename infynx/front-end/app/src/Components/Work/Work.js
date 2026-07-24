import React from 'react';
import './Work.css';
import { motion } from 'framer-motion';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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
            icon: "🚀", 
            description: "We utilize modern frameworks like **Agile Scrum** and **Kanban** to ensure iterative development, continuous feedback, and rapid deployment. This allows us to adapt quickly to changing requirements and deliver value early and often." 
        },
        { 
            title: "Configuration & Implementation (Networking)", 
            icon: "⚙️", 
            description: "Our networking team handles the complete lifecycle of switch and router configuration. This includes initial setup, VLAN segmentation, security policy implementation, and optimizing network performance for maximum throughput." 
        },
        { 
            title: "Installation: WiFi & Access Points", 
            icon: "📶", 
            description: "We provide professional installation services for Wi-Fi switches and routers, ensuring optimal placement for seamless coverage. This includes detailed site surveys and post-installation tuning to minimize dead zones." 
        },
    ];

    const infrastructureServices = [
        { 
            title: "Active Networking", 
            icon: "⚡", 
            description: "This encompasses all components that actively manage, route, and distribute data, such as **Routers**, **Switches**, **Firewalls**, and **Servers**. We manage and optimize these for high availability and security." 
        },
        { 
            title: "Passive Networking", 
            icon: "🔌", 
            description: "This includes the foundational physical infrastructure: **Cabling (Fiber/Copper)**, patch panels, racks, and conduits. A robust passive network is essential for the reliability of all active components." 
        },
        { 
            title: "Employee Provisioning & Support", 
            icon: "👨‍💻", 
            description: "We equip your employees with the necessary hardware, software, and secure access (VPNs, specific configurations) required for their roles, ensuring they are productive from day one." 
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
                                <span className="card-icon">{item.icon}</span>
                                <h3 className="card-title">{item.title}</h3>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="delivery-flow-chart">
                        {/* Add a placeholder for a diagram showing the process */}
                        
                        <p>Our standard flow: Planning → Development → Testing → Review → Deployment.</p>
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
                                <span className="card-icon">{item.icon}</span>
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
                        {/* Animating list items */}
                        {["Robust, Scalable Software", "Optimized Network Topology", "Secure Environment", "Comprehensive Documentation"].map((text, index) => (
                            <motion.li 
                                key={index}
                                variants={listItemVariants}
                                transition={{ delay: index * 0.15 }}
                            >
                                {index === 1 ? `✅ **${text}:** Low latency and high availability across your entire infrastructure. 

[Image of a network topology diagram]
` : `✅ **${text}:** ${text.includes('Software') ? 'Code delivered with clean architecture and comprehensive testing.' : text.includes('Environment') ? 'Implementation of the latest security protocols for both software and network.' : 'Full handover with detailed technical documentation and support guides.'}`}
                            </motion.li>
                        ))}
                    </ul>
                </motion.section>
            </div>
            <Footer/>
        </>
    );
};

export default Work;