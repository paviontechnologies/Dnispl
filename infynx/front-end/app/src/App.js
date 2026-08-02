import React from 'react';
import './App.css';
import Home from './Components/home/Home';
import Career from './Components/Careers/Career';
import About from './Components/About/About'; 
import Leadership from './Components/Leadership/Leadership';
import Work from './Components/Work/Work';
import ManagedServices from './Components/Services/ManagedServices/ManagedServices';
import ProfessionalServices from './Components/Services/ProfessionalServices/ProfessionalServices';
import TechnicalSupport from './Components/Services/TechnicalSupport/TechnicalSupport';
import WorkforceSolutions from './Components/Services/WorkforceSolutions/WorkforceSolutions';
import Portfolio from './Components/Portfolio/Portfolio';
import Form from "./Components/Contact/Form";
import BlogPage from './Components/Blog/Blog';
import Login from "./Components/Admin/Login/Login";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import Contacts from "./Components/Admin/Contacts/Contacts";
import Jobs from "./Components/Admin/Jobs/Jobs";
import Applications from "./Components/Admin/Applications/Application";
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
        <Route path="/services/managed" element={<ManagedServices />} />
        <Route path="/services/professional" element={<ProfessionalServices />} />
        <Route path="/services/technical" element={<TechnicalSupport />} />

        <Route path="/services/workforce-solutions" element={<WorkforceSolutions />} />
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