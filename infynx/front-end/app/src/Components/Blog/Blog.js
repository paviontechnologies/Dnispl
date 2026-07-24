import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Step 1: Import hook
import './Blog.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate(); // 👈 Step 2: Initialize

    useEffect(() => {
        fetch('http://localhost:5000/api/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.error("Error:", err));
    }, []);

    return (
        <div className="blog-wrapper">
            {/* 👈 Step 3: Back Button UI */}
            <div className="top-nav">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Back
                </button>
            </div>

            <div className="blog-hero">
                <h1>Our <span>Insights</span></h1>
                <p>Latest news, tech trends, and company updates.</p>
            </div>

            <div className="blog-container">
                {blogs.map((item) => (
                    <div className="blog-card" key={item._id}>
                        <div className="card-header">
                            <img src={item.image} alt={item.title} />
                            <span className="tag">{item.category}</span>
                        </div>
                        <div className="card-body">
                            <h3>{item.title}</h3>
                            <p>{item.summary}</p>
                            <button className="btn-read">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;