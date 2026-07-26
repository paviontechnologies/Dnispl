import React from 'react';
import './App.css';
import Home from './Components/home/Home';
import Career from './Components/Careers/Career';
import About from './Components/About/About'; 
import Leadership from './Components/Leadership/Leadership';
import Work from "./Components/Work/Work";
// import SD from "./Components/Services/SD";
import AP from "./Components/Services/AP";
import HPD from "./Components/Services/HPD";
import RC from "./Components/Services/RC";
import WO from "./Components/Services/WO";
import DC from "./Components/Services/DC";
import Portfolio from './Components/Portfolio/Portfolio';
import Form from "./Components/Contact/Form";
import BlogPage from './Components/Blog/Blog';
import Login from "./Components/Admin/Login/Login";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import Contacts from "./Components/Admin/Contacts/Contacts";
import Jobs from "./Components/Admin/Jobs/Jobs";
import Applications from "./Components/Admin/Applications/Application";
// import Blogs from "./Components/Admin/Blogs/Blogs";
import ProtectedRoute from "./Components/Admin/ProtectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteExperience from './Components/SiteExperience/SiteExperience';
import { InfoPage, NotFound } from './Components/InfoPage/InfoPage';

function App() {
  return (
    <Router>
      <SiteExperience>
        <Routes>
        {/* Route 1: Home Page (loaded by default at the root) */}
        <Route path="/" element={<Home />} />
             
        <Route path="/careers" element={<Career />} />
        
        <Route path="/about" element={<About />} /> 
        
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/work" element={<Work />} />
        {/* <Route path="/software-development" element={<SD />} /> */}
        <Route path="/network-implementation" element={<AP />} />
        <Route path="/workforce-outsourcing" element={<WO />} />
        <Route path="/business-solutions" element={<HPD />} />
        <Route path="/regulatory-compliance" element={<RC />} />
        <Route path="/dc-passive-work" element={<DC />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/form" element={<Form />} />
        <Route path="/portfolio" element={<Portfolio />} /> 
        <Route path="/privacy" element={<InfoPage type="privacy" />} />
        <Route path="/terms" element={<InfoPage type="terms" />} />
        <Route path="/cookies" element={<InfoPage type="cookies" />} />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
        <Route path="/admin/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/admin/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </SiteExperience>
    </Router>
  );
}

export default App;