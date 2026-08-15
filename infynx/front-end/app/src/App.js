import React, { Suspense, lazy } from 'react';
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
const Career = lazy(() => import('./Components/Careers/Career'));
const About = lazy(() => import('./Components/About/About'));
const Leadership = lazy(() => import('./Components/Leadership/Leadership'));
const Work = lazy(() => import('./Components/Work/Work'));
const ManagedServices = lazy(() => import('./Components/Services/ManagedServices/ManagedServices'));
const ProfessionalServices = lazy(() => import('./Components/Services/ProfessionalServices/ProfessionalServices'));
const TechnicalSupport = lazy(() => import('./Components/Services/TechnicalSupport/TechnicalSupport'));
const WorkforceSolutions = lazy(() => import('./Components/Services/WorkforceSolutions/WorkforceSolutions'));
const AP = lazy(() => import('./Components/Services/AP'));
const RC = lazy(() => import('./Components/Services/RC'));
const WO = lazy(() => import('./Components/Services/WO'));
const DC = lazy(() => import('./Components/Services/DC'));
const CyberSecurity = lazy(() => import('./Components/Services/CyberSecurity/CyberSecurity'));
const UnifiedConferencing = lazy(() => import('./Components/Services/UnifiedConferencing/UnifiedConferencing'));
const Portfolio = lazy(() => import('./Components/Portfolio/Portfolio'));
const Industries = lazy(() => import('./Components/Industries/Industries'));
const IndustryDetail = lazy(() => import('./Components/Industries/IndustryDetail'));
const IndustryPage = lazy(() => import('./Components/Industries/IndustryPage'));
const Form = lazy(() => import('./Components/Contact/Form'));
const BlogPage = lazy(() => import('./Components/Blog/Blog'));
const BlogPost = lazy(() => import('./Components/Blog/BlogPost'));
const ActiveLocations = lazy(() => import('./Components/Locations/ActiveLocations'));
const SparingWarehouses = lazy(() => import('./Components/Locations/SparingWarehouses'));
const InfoPage = lazy(() =>
  import('./Components/InfoPage/InfoPage').then((m) => ({ default: m.InfoPage }))
);
const NotFound = lazy(() =>
  import('./Components/InfoPage/InfoPage').then((m) => ({ default: m.NotFound }))
);

const Login = lazy(() => import('./Components/Admin/Login/Login'));
const Dashboard = lazy(() => import('./Components/Admin/Dashboard/Dashboard'));
const Contacts = lazy(() => import('./Components/Admin/Contacts/Contacts'));
const Jobs = lazy(() => import('./Components/Admin/Jobs/Jobs'));
const Applications = lazy(() => import('./Components/Admin/Applications/Application'));
const Blogs = lazy(() => import('./Components/Admin/Blogs/Blogs'));

/* The shared scene stays painted behind this, so a route swap reads as a beat
   in the same page rather than as a blank screen. */
const RouteFallback = () => <div className="route-fallback" aria-busy="true" />;

function App() {
  return (
    <Router>
      <SiteExperience>
        <Suspense fallback={<RouteFallback />}>
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
        </Suspense>
      </SiteExperience>
    </Router>
  );
}

export default App;
