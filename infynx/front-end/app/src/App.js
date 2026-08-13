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
import AP from './Components/Services/AP';
import HPD from './Components/Services/HPD';
import RC from './Components/Services/RC';
import WO from './Components/Services/WO';
import DC from './Components/Services/DC';
import CyberSecurity from './Components/Services/CyberSecurity/CyberSecurity';
import Portfolio from './Components/Portfolio/Portfolio';
import Industries from './Components/Industries/Industries';
import IndustryDetail from './Components/Industries/IndustryDetail';
import Form from './Components/Contact/Form';
import BlogPage from './Components/Blog/Blog';
import BlogPost from './Components/Blog/BlogPost';
import Login from './Components/Admin/Login/Login';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import Contacts from './Components/Admin/Contacts/Contacts';
import Jobs from './Components/Admin/Jobs/Jobs';
import Applications from './Components/Admin/Applications/Application';
import Blogs from './Components/Admin/Blogs/Blogs';
import ProtectedRoute from './Components/Admin/ProtectedRoute/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SiteExperience from './Components/SiteExperience/SiteExperience';
import { InfoPage, NotFound } from './Components/InfoPage/InfoPage';
import IndustryPage from './Components/Industries/IndustryPage';
import ActiveLocations from './Components/Locations/ActiveLocations';
import SparingWarehouses from './Components/Locations/SparingWarehouses';

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
          <Route path="/network-implementation" element={<AP />} />
          <Route path="/cyber-security" element={<CyberSecurity />} />
          <Route path="/hardware-procurement" element={<HPD />} />
          <Route path="/workforce-outsourcing" element={<WO />} />
          <Route path="/business-solutions" element={<CyberSecurity />} />
          <Route path="/regulatory-compliance" element={<RC />} />
          <Route path="/dc-passive-work" element={<DC />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/form" element={<Form />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:industryKey" element={<IndustryPage />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/privacy" element={<InfoPage type="privacy" />} />
          <Route path="/terms" element={<InfoPage type="terms" />} />
          <Route path="/cookies" element={<InfoPage type="cookies" />} />
          <Route path="/active-locations" element={<ActiveLocations />} />
          <Route path="/sparing-warehouses" element={<SparingWarehouses />} />

          <Route path="/admin/login" element={<Login />} />
          {/* Bare /admin used to 404 even though the sidebar linked to it */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route path="/admin/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
          <Route path="/admin/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SiteExperience>
    </Router>
  );
}

export default App;
