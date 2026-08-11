import React, { useState } from "react";
import "./Form.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AuroraBackdrop,
  OrbitVisual,
  Reveal,
  RevealGroup,
  SplitHeading,
  useScrollReveal
} from "../../motion/MotionKit";
import { publicFetch } from "../../config/api";

const TINT = { from: "#00E2F5", to: "#B325F7", glow: "rgba(0, 226, 245, 0.35)" };

const CONTACT_POINTS = [
  {
    href: "https://maps.google.com/?q=WorldMark+Sector+65+Gurugram",
    external: true,
    icon: MapPin,
    label: "Visit our NCR hub",
    value: "WorldMark, Sector 65, Gurugram"
  },
  {
    href: "tel:+911244234805",
    icon: Phone,
    label: "Speak with our team",
    value: "+91 124 423 4805"
  },
  {
    href: "mailto:info@dnispl.com",
    icon: Mail,
    label: "Send an email",
    value: "info@dnispl.com"
  }
];

const FIELDS = [
  { name: "name", label: "Your Name", type: "text", placeholder: "Enter your name" },
  { name: "email", label: "Your Email", type: "email", placeholder: "Enter your email" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "Enter your phone number" }
];

const SERVICES = [
  "Network Implementation",
  "Business Solutions",
  "Regulatory Compliance",
  "Workforce Outsourcing",
  "Data Center",
  "Other"
];

const Form = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  useScrollReveal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      service: e.target.service.value,
      message: e.target.message.value,
    };

    try {
      await publicFetch("/send-mail", { method: "POST", body: formData });
      setStatus("✅ Your message has been sent successfully.");
      e.target.reset();
    } catch (err) {
      setStatus(`❌ ${err.message || "Unable to send message. Please check your connection."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="contact-page">
        <section className="contact-info-section">
          <AuroraBackdrop tint={TINT} />

          <div className="contact-info-inner">
            <motion.span
              className="contact-kicker"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              LET'S BUILD / TOGETHER
            </motion.span>

            <SplitHeading
              as="h2"
              className="contact-title"
              lines={["Contact Us"]}
            />

            <motion.p
              className="contact-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Feel free to connect with us anytime — we are here to help.
            </motion.p>

            <RevealGroup className="contact-details-box">
              {CONTACT_POINTS.map(({ href, external, icon: Icon, label, value }) => (
                <Reveal
                  as="a"
                  dir="scale"
                  key={href}
                  href={href}
                  className="fx-wobble-host"
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <span className="fx-wobble contact-point-icon"><Icon size={20} /></span>
                  <span><strong>{label}</strong>{value}</span>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* 2️⃣ MAP (LEFT) + FORM (RIGHT) SECTION */}
        <div className="contact-two-column">
          {/* LEFT: MAP */}
          <div className="contact-left">
            <Reveal as="section" dir="left" className="map-section">
              <h3 className="map-title">Find Us on Google Maps</h3>

              <div className="map-container">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.957439868973!2d77.09077467536482!3d28.419031795753343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d22438b0c1d35%3A0x872dbd566382b4d3!2sWorldMark%2C%20Sector%2065%2C%20Gurugram%2C%20Haryana%20122101!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Turning globe — the same orbit motion Home gives its phone visual */}
              <div className="contact-reach">
                <OrbitVisual tint={TINT} className="contact-globe" />
                <div className="contact-reach-copy">
                  <h4>We answer from wherever you are</h4>
                  <p>
                    NCR headquarters, execution teams across 100+ active locations, and a
                    24/7 desk that routes your enquiry to the right architect.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: FORM */}
          <div className="contact-right">
            <Reveal as="section" dir="right" className="contact-form-section">
              <h3 className="form-title">Send Us a Message</h3>

              <form className="contact-form" onSubmit={handleSubmit}>
                {FIELDS.map((field, i) => (
                  <motion.div
                    className="form-group"
                    key={field.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <label>{field.label}</label>
                    <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                    />
                  </motion.div>
                ))}

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 0.24 }}
                >
                  <label>Service</label>
                  <select name="service" id="service" required>
                    <option value="">Select Service</option>
                    {SERVICES.map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                </motion.div>

                <motion.div
                  className="form-group"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: 0.32 }}
                >
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="Type your message..."
                    required
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  className="contact-btn"
                  disabled={loading}
                  whileHover={loading ? undefined : { y: -2, scale: 1.015 }}
                  whileTap={loading ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  {loading ? (
                    <>
                      <span className="contact-btn-spinner" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={17} />
                    </>
                  )}
                </motion.button>

                <AnimatePresence mode="wait">
                  {status && (
                    <motion.p
                      key={status}
                      className="form-status"
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      {status}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </Reveal>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Form;
