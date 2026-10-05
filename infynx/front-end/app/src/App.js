import React, { lazy } from 'react';
import './App.css';
import Home from './Components/home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SiteExperience from './Components/SiteExperience/SiteExperience';
import ProtectedRoute from './Components/Admin/ProtectedRoute/ProtectedRoute';

/**
 * Every route but the landing page is loaded on demand.
 *
 * Importing all of them eagerly produced one 1.5 MB main chunk: opening any
 * page — the portfolio in particular — meant first downloading, parsing, and
 * evaluating three.js, framer-motion, the admin console, the India map data,
 * and the module records for all 26 media assets, none of which that page
 * renders. Splitting per route means a visitor pays only for the page they
 * asked for, and the shared vendor code is factored out once by the bundler.
 *
 * Home stays eager: it is the most common entry point, and code-splitting the
 * landing route would trade the bundle cost for a blank frame on first paint.
 */
// Resilient dynamic importer to automatically handle ChunkLoadErrors from new builds/deployments
const lazyWithRetry = (componentImport) =>
  lazy(() =>
    componentImport().catch((error) => {
      console.error('--- DEBUG: lazyWithRetry caught import error ---', error);
      const isChunkLoadError =
        error.name === 'ChunkLoadError' ||
        /loading\s+chunk/i.test(error.message);
      
      if (isChunkLoadError && typeof window !== 'undefined') {
        const hasReloaded = window.sessionStorage.getItem('chunk-load-retry');
        if (!hasReloaded) {
          window.sessionStorage.setItem('chunk-load-retry', 'true');
          window.location.reload();
          return new Promise(() => {}); // Keep pending to prevent React crashing
        }
      }
      throw error;
    })
  );

const Career = lazyWithRetry(() => import('./Components/Careers/Career'));
const About = lazyWithRetry(() => import('./Components/About/About'));
const Leadership = lazyWithRetry(() => import('./Components/Leadership/Leadership'));
const Work = lazyWithRetry(() => import('./Components/Work/Work'));
const ManagedServices = lazyWithRetry(() => import('./Components/Services/ManagedServices/ManagedServices'));
const ProfessionalServices = lazyWithRetry(() => import('./Components/Services/ProfessionalServices/ProfessionalServices'));
const TechnicalSupport = lazyWithRetry(() => import('./Components/Services/TechnicalSupport/TechnicalSupport'));
const WorkforceSolutions = lazyWithRetry(() => import('./Components/Services/WorkforceSolutions/WorkforceSolutions'));
const AP = lazyWithRetry(() => import('./Components/Services/AP'));
const RC = lazyWithRetry(() => import('./Components/Services/RC'));
const WO = lazyWithRetry(() => import('./Components/Services/WO'));
const DC = lazyWithRetry(() => import('./Components/Services/DC'));
const CyberSecurity = lazyWithRetry(() => import('./Components/Services/CyberSecurity/CyberSecurity'));
const UnifiedConferencing = lazyWithRetry(() => import('./Components/Services/UnifiedConferencing/UnifiedConferencing'));
const Portfolio = lazyWithRetry(() => import('./Components/Portfolio/Portfolio'));
const Industries = lazyWithRetry(() => import('./Components/Industries/Industries'));
const IndustryDetail = lazyWithRetry(() => import('./Components/Industries/IndustryDetail'));
const IndustryPage = lazyWithRetry(() => import('./Components/Industries/IndustryPage'));
const Form = lazyWithRetry(() => import('./Components/Contact/Form'));
const BlogPage = lazyWithRetry(() => import('./Components/Blog/Blog'));
const BlogPost = lazyWithRetry(() => import('./Components/Blog/BlogPost'));
const ActiveLocations = lazyWithRetry(() => import('./Components/Locations/ActiveLocations'));
const SparingWarehouses = lazyWithRetry(() => import('./Components/Locations/SparingWarehouses'));
const InfoPage = lazyWithRetry(() =>
  import('./Components/InfoPage/InfoPage').then((m) => ({ default: m.InfoPage }))
);
const NotFound = lazyWithRetry(() =>
  import('./Components/InfoPage/InfoPage').then((m) => ({ default: m.NotFound }))
);

const Login = lazyWithRetry(() => import('./Components/Admin/Login/Login'));
const Dashboard = lazyWithRetry(() => import('./Components/Admin/Dashboard/Dashboard'));
const Contacts = lazyWithRetry(() => import('./Components/Admin/Contacts/Contacts'));
const Jobs = lazyWithRetry(() => import('./Components/Admin/Jobs/Jobs'));
const Applications = lazyWithRetry(() => import('./Components/Admin/Applications/Application'));
const Blogs = lazyWithRetry(() => import('./Components/Admin/Blogs/Blogs'));


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
         
          <Route path="/unified-communications" element={<UnifiedConferencing />} />
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
