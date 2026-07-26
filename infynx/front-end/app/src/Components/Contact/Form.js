import React, { useState } from "react";
import "./Form.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Form = () => {
  const [status, setStatus] = useState(""); 
  const [loading, setLoading] = useState(false);

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
      const res = await fetch("http://localhost:5000/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Your message has been sent successfully.");
        e.target.reset();
      } else {
        setStatus(
          data?.message || "❌ Something went wrong. Please try again later."
        );
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Unable to send message. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="contact-page">
        <section className="contact-info-section">
          <div className="contact-info-inner">
            <span className="contact-kicker">LET'S BUILD / TOGETHER</span>
            <h2 className="contact-title">Contact Us</h2>
            <p className="contact-subtitle">
              Feel free to connect with us anytime — we are here to help.
            </p>

            <div className="contact-details-box">
              <a href="https://maps.google.com/?q=WorldMark+Sector+65+Gurugram" target="_blank" rel="noreferrer">
                <MapPin size={20} /><span><strong>Visit our NCR hub</strong>WorldMark, Sector 65, Gurugram</span>
              </a>
              <a href="tel:+911244234805">
                <Phone size={20} /><span><strong>Speak with our team</strong>+91 124 423 4805</span>
              </a>
              <a href="mailto:info@dnispl.com">
                <Mail size={20} /><span><strong>Send an email</strong>info@dnispl.com</span>
              </a>
            </div>
          </div>
        </section>

        {/* 2️⃣ MAP (LEFT) + FORM (RIGHT) SECTION */}
        <div className="contact-two-column">
          {/* LEFT: MAP */}
          <div className="contact-left">
            <section className="map-section">
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
            </section>
          </div>

          {/* RIGHT: FORM */}
          <div className="contact-right">
            <section className="contact-form-section">
              <h3 className="form-title">Send Us a Message</h3>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Your Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                 <label>Phone Number</label>
                   <input
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Service</label>
                  <select name="service" id="service" required>
                    <option value="">Select Service</option>
                    <option>Software Development</option>
                    <option>Network Implementation</option>
                    <option>Business Solutions</option>
                    <option>Regulatory Compliance</option>
                    <option>Workforce Outsourcing</option>
                    <option>Data Center</option>
                    <option>Other</option>
                 </select>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="Type your message..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="contact-btn" disabled={loading}>
                  {loading ? "Sending..." : <><span>Send Message</span><Send size={17} /></>}
                </button>

                {status && <p className="form-status">{status}</p>}
              </form>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Form;
