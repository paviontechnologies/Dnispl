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
const fs = require("fs");
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

// Resume files ko browser se access karne ke liye.
// __dirname se resolve karte hain taki Linux (case-sensitive) par bhi chale.
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
app.use("/uploads", express.static(UPLOAD_DIR));

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
    cb(null,UPLOAD_DIR);
    },

    filename:(req,file,cb)=>{
    // Original name sanitize karte hain — path traversal aur weird chars se bachne ke liye
    const safe = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null,Date.now()+"-"+safe);
    }
    });

    // Resume hi accept karna hai: sirf PDF/DOC, max 5 MB.
    const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const ok = [".pdf", ".doc", ".docx"].includes(
        path.extname(file.originalname).toLowerCase()
      );
      cb(ok ? null : new Error("Only PDF or Word documents are allowed"), ok);
    }
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

// Get one blog by id — blog detail page ke liye
app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(400).json({ message: 'Invalid blog id', error: err.message });
    }
});

// Post a new blog — sirf logged-in admin (pehle ye khula hua tha)
app.post('/api/blogs', Auth, async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(400).json({ message: 'Error saving blog', error: err.message });
    }
});

// Update blog
app.put('/api/blogs/:id', Auth, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(400).json({ message: 'Error updating blog', error: err.message });
    }
});

// Delete blog
app.delete('/api/blogs/:id', Auth, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json({ message: 'Blog Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// -------------------- JOB APPLICATION ROUTE -------------------

// Multer ke errors (size limit, wrong type) ko 400 mein badalte hain, warna
// unhandled hokar 500 "Internal error" chala jaata tha.
const uploadResume = (req, res, next) =>
  upload.single("resume")(req, res, (err) => {
    if (!err) return next();
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Resume must be smaller than 5 MB"
        : err.message || "Resume upload failed";
    return res.status(400).json({ message });
  });

app.post("/apply-job", uploadResume, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "A resume file is required" });
    }

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
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      contacts,
      jobs,
      applications,
      blogs,
      contactsThisWeek,
      applicationsThisWeek,
      pendingContacts,
      pendingApplications,
      recentContacts,
      recentApplications,
      serviceSplit,
    ] = await Promise.all([
      Contact.countDocuments(),
      Job.countDocuments(),
      Application.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments({ createdAt: { $gte: weekAgo } }),
      Application.countDocuments({ createdAt: { $gte: weekAgo } }),
      Contact.countDocuments({ status: "Pending" }),
      Application.countDocuments({ status: "Pending" }),
      Contact.find().sort({ createdAt: -1 }).limit(5).select("name service status createdAt"),
      Application.find().sort({ createdAt: -1 }).limit(5).select("name jobProfile status createdAt"),
      Contact.aggregate([
        { $group: { _id: "$service", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
    ]);

    res.json({
      contacts,
      jobs,
      applications,
      blogs,
      contactsThisWeek,
      applicationsThisWeek,
      pendingContacts,
      pendingApplications,
      recentContacts,
      recentApplications,
      serviceSplit: serviceSplit.map((entry) => ({
        service: entry._id || "Unspecified",
        count: entry.count,
      })),
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
    id:admin._id,
    role:"admin"
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

/**
 * Sirf approved HR mailboxes hi OTP maang sakte hain. Iske bina koi bhi apna
 * email daal kar khud ko OTP bhej sakta tha aur poora admin API access mil
 * jaata tha. Allowlist HR_EMAILS env var se aati hai (comma separated);
 * kuch set na ho to @dnispl.com domain default hai.
 */
const HR_EMAILS = (process.env.HR_EMAILS || "")
  .split(",")
  .map((entry) => entry.trim().toLowerCase())
  .filter(Boolean);

const HR_DOMAIN = (process.env.HR_DOMAIN || "dnispl.com").toLowerCase();

const isAuthorisedHr = (email) => {
  const normalised = String(email).trim().toLowerCase();
  if (HR_EMAILS.length) return HR_EMAILS.includes(normalised);
  return normalised.endsWith(`@${HR_DOMAIN}`);
};

const OTP_TTL_MS = 5 * 60 * 1000;

// Send OTP
app.post("/api/hr/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!isAuthorisedHr(email)) {
    // Deliberately vague — kis email ki access hai ye leak nahi karna chahiye
    return res.status(403).json({
      message: "This email is not authorised for HR portal access.",
    });
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

  if (!isAuthorisedHr(email)) {
    return res.status(403).json({
      message: "This email is not authorised for HR portal access.",
    });
  }

  try {
    const record = await Otp.findOne({ email });
    if (!record || record.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mongo ka TTL monitor ~60s par chalta hai, to expiry khud bhi check karte
    // hain — warna mail mein likha "5 minutes" enforce nahi hota.
    if (Date.now() - new Date(record.createdAt).getTime() > OTP_TTL_MS) {
      await Otp.deleteOne({ email });
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

// -------------------- HEALTH --------------------

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    uptime: Math.round(process.uptime()),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});