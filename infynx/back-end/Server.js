const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("./Models/Admin");
const Contact = require("./Models/Contact");
const Blog = require('./Models/Blog');
const Application = require("./Models/Application");
const Job = require("./Models/Job");
require('dotenv').config();   
const multer = require("multer");
const path = require("path");
const Auth = require("./Middleware/Auth");
const Otp = require("./Models/Otp");

console.log('SMTP_PASS length:', process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 'NOT SET');
console.log('SMTP_PASS masked:', process.env.SMTP_PASS ? '*'.repeat(process.env.SMTP_PASS.length) : 'NOT SET');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Resume files ko browser se access karne ke liye
app.use("/uploads",express.static("uploads"));

// 🔍 Debug: check env load (password ko mat log karna)
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_USER:', process.env.SMTP_USER);

// ------------------- MONGODB CONNECTION -------------------
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dnispl_careers';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// ------------------- Storage ------------------

    const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,"uploads/");
    },

    filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname);
    }
    });

    const upload = multer({
    storage
    });

// ------------------- JOBS API -------------------
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
       console.log("--- MONGODB FETCH ERROR ---");
    console.error(err); 
    
    res.status(500).json({ 
      message: 'Error retrieving jobs', 
      error: err.message // 👈 Ab browser mein text dikhega
    });
  }
});

// Save Job
app.post('/api/jobs', Auth, async (req, res) => {
  const newJob = new Job(req.body);

  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({
      message: 'Error creating job listing',
      error: err.message
    });
  }
});

// Create Job
app.post("/api/jobs", Auth, async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json(job);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// Update Job
app.put("/api/jobs/:id", Auth, async (req, res) => {
  try {

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(job);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// Delete Job
app.delete("/api/jobs/:id", Auth, async (req, res) => {
  try {

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job Deleted",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ------------------- CONTACT FORM EMAIL ROUTE -------------------
app.get("/api/contacts", Auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/send-mail', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  console.log("📩 /send-mail hit with body:", req.body);

  if (!name || !email || !phone || !service || !message) {
    return res.status(400).json({
      message: 'All fields (name, email, phone, service, message) are required.',
    });
  }

  try {

    await Contact.create({
      name,
      email,
      phone,
      service,
      message,
    });
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,   // smtp.office365.com
      port: 587,
      secure: false,                 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
      logger: true,
      debug: true,
    });

    console.log("✅ Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified. Sending mail...");

    await transporter.sendMail({
      from: `"DNISPL Website" <${process.env.SMTP_USER}>`,
      to: 'info@dnispl.com, accounts@dnispl.com',
      subject: `New Contact Form: ${service} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    console.log("✅ Email sent successfully.");
    return res.json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('❌ Email Error (full):', err);
    return res.status(500).json({
      message: 'Failed to send message. Please try again later.',
      debug: err.message,      
    });
  }
});

app.put("/api/contacts/:id", Auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(contact);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.delete("/api/contacts/:id", Auth, async (req, res) => {
  try {

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
});

// ------------------- BLOGS API -------------------

// Get all blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blogs', error: err.message });
    }
});

// Post a new blog (Use this for your Admin/Dashboard)
app.post('/api/blogs', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(400).json({ message: 'Error saving blog', error: err.message });
    }
});

// -------------------- JOB APPLICATION ROUTE -------------------

app.post("/apply-job", upload.single("resume"), async (req, res) => {
  try {
    const application = await Application.create({
      name: req.body.name,
      email: req.body.email,
      state: req.body.state,
      city: req.body.city,
      jobProfile: req.body.jobProfile,
      resume: req.file.filename,
    });

    res.status(201).json({
      message: "Application Submitted Successfully",
      application,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
});

// -------------------- GET APPLICATIONS -------------------

app.get("/api/applications", Auth, async (req, res) => {
  try {
    const data = await Application.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/applications/:id", Auth, async (req, res) => {
  try {
    const data = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/applications/:id", Auth, async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------- DASHBOARD --------------------

app.get("/api/dashboard", Auth, async (req, res) => {
  try {
    const contacts = await Contact.countDocuments();
    const jobs = await Job.countDocuments();
    const applications = await Application.countDocuments();
    const blogs = await Blog.countDocuments();

    res.json({
      contacts,
      jobs,
      applications,
      blogs,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// -------------------- ADMIN LOGIN --------------------

app.post("/api/admin/login", async (req,res)=>{

    const {username,password}=req.body;
    try{
        const admin=await Admin.findOne({username});
        if(!admin){
        return res.status(400).json({
        message:"Invalid Username"
        });
      }

    const match=await bcrypt.compare(password,admin.password);
    if(!match){
    return res.status(400).json({
    message:"Invalid Password"
    });
    }

    const token=jwt.sign(
    {
    id:admin._id
    },
    process.env.JWT_SECRET,
    {
    expiresIn:"1d"
    }
    );
    res.json({
    message:"Login Success",
    token
    });
    }

 catch (err) {
  console.error("LOGIN ERROR:", err);

  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

    });

// -------------------- HR OTP LOGIN --------------------

// Send OTP
app.post("/api/hr/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Generate 6-digit OTP
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Save/Update OTP in DB
    await Otp.findOneAndUpdate(
      { email },
      { otp: otpCode, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // Send via email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    await transporter.sendMail({
      from: `"DNISPL HR System" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your HR Verification OTP: ${otpCode}`,
      html: `
        <h2>DNISPL HR Login OTP</h2>
        <p>Dear HR User,</p>
        <p>Your one-time password (OTP) to log in and manage job listings is:</p>
        <h1 style="color: #3b82f6; font-size: 32px; letter-spacing: 2px;">${otpCode}</h1>
        <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
        <br>
        <p>Regards,</p>
        <p>DNISPL Team</p>
      `,
    });

    res.json({ message: "OTP sent successfully to " + email });
  } catch (err) {
    console.error("OTP SEND ERROR:", err);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
});

// Verify OTP
app.post("/api/hr/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const record = await Otp.findOne({ email });
    if (!record || record.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP matches, delete it
    await Otp.deleteOne({ email });

    // Generate JWT token
    const token = jwt.sign(
      { id: "hr_user", email, role: "hr" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Success",
      token,
    });
  } catch (err) {
    console.error("OTP VERIFY ERROR:", err);
    res.status(500).json({ message: "Verification failed", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});