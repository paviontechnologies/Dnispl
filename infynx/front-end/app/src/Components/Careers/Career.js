import React, { useState, useEffect } from 'react';
import './Career.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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

const Career = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [showForm, setShowForm] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [status, setStatus] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/jobs');
                if (!response.ok) throw new Error('Failed to fetch job listings');
                const data = await response.json();
                setJobs(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
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
            const res = await fetch("http://localhost:5000/apply-job", {
                method: "POST",
                body: formData, 
            });
            const data = await res.json();
            if (res.ok) {
                setStatus("✅ Application submitted successfully!");
                e.target.reset();
                setTimeout(() => setShowForm(false), 2000);
            } else {
                setStatus(data?.message || "❌ Submission failed.");
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
                    <ContentWrapper>
                        <h1 className="career-title">Build the Future with <span className="dnispl-blue">DNISPL</span></h1>
                        <p className="career-subtitle">Join a team that crafts dependable software solutions across Bharat.</p>
                    </ContentWrapper>
                </section>

                <section className="job-listings-section">
                    <ContentWrapper>
                        <div className="job-grid">
                            {loading && <p className="loading-text">Finding opportunities for you...</p>}
                            {error && <p className="error-text">Error: {error}</p>}
                            {!loading && jobs.map((job) => (
                                <div key={job._id} className="job-card">
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
                            ))}
                        </div>
                    </ContentWrapper>
                </section>
            </div>

            {showForm && (
                <div className="form-modal-overlay">
                    <div className="form-modal-content">
                        <button className="close-modal-btn" onClick={() => setShowForm(false)}>&times;</button>
                        
                        <div className="modal-inner-scroll">
                            <div className="form-header">
                                <h2>Applying for: <span className="highlight-text">{selectedJob?.title}</span></h2>
                                
                                <div className="job-details-container">
    <h4>Job Overview & Responsibilities:</h4>
    <div className="job-details-content">
        {selectedJob?.fullDescription?.split('\n').map((paragraph, pIndex) => (
            <div key={pIndex} className="description-section">
                {/* Agar line mein ":" hai toh use heading treat karein */}
                {paragraph.includes(':') ? (
                    <>
                        <strong className="desc-heading">{paragraph.split(':')[0]}:</strong>
                        <p className="desc-text">{paragraph.split(':')[1]}</p>
                    </>
                ) : (
                    <p className="desc-text">{paragraph}</p>
                )}
            </div>
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

                                <button type="submit" className="modal-submit-btn" disabled={formLoading}>
                                    {formLoading ? "Sending..." : "Submit Application"}
                                </button>

                                {status && <p className={`status-msg ${status.includes('✅') ? 'success' : 'error'}`}>{status}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Career;