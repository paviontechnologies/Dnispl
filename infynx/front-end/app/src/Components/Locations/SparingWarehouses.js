import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, Phone, Compass, Package, User } from 'lucide-react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import IndiaMapData from '@svg-maps/india';
import './SparingWarehouses.css';

// 18 Sparing Warehouses with cleaned up, professional names
const SPARE_WAREHOUSES = [
  { id: 1, name: 'East Region Spares Depot', region: 'East', city: 'Patna', contact: 'Dilnawaz', phone: '91100 71273', address: 'CSC Fiber Broadband, Sohraul, Benipatti, Madhubani, Bihar - 847223', lat: 26.13, lon: 86.08 },
  { id: 2, name: 'North Punjab Logistics Hub', region: 'North', city: 'Zirakpur', contact: 'Anil', phone: '98722 83250 / 70158 67918', address: '#305, Block-M, Spangle Condos, Old Ambala Road, Dhakoli, Zirakpur, Punjab - 160104', lat: 30.68, lon: 76.82 },
  { id: 3, name: 'Kashmir Sparing Point', region: 'Upper North', city: 'Srinagar', contact: 'Gulbaz', phone: '95962 44818', address: 'Nowhatta, Srinagar, Jammu & Kashmir - 190003', lat: 34.09, lon: 74.81 },
  { id: 4, name: 'Madhya Malwa Spares Hub', region: 'North', city: 'Ujjain', contact: 'Deepak', phone: '90740 97621', address: 'Income Tax Office, Bharatpuri, Dewas Road, Ujjain, Madhya Pradesh - 456006', lat: 23.18, lon: 75.80 },
  { id: 5, name: 'Lucknow Main Depot', region: 'North', city: 'Lucknow', contact: 'Vikram', phone: '9044590879', address: '5th Floor, Pratyaksh Kar Bhawan, 57, Ram Theerth Marg, Lucknow, Uttar Pradesh - 226001', lat: 26.85, lon: 80.95 },
  { id: 6, name: 'Odisha Coastal Spares Base', region: 'East', city: 'Ganjam', contact: 'Sibaram Padhy', phone: '9090433724', address: 'Pradhan Street, Saru, Via Kanchuru, Hinjilicut, Ganjam, Odisha - 761101', lat: 19.48, lon: 84.79 },
  { id: 7, name: 'Kolkata Metropolitan Spares Facility', region: 'East', city: 'Howrah', contact: 'Prakash', phone: '9804392183', address: '46, 5th Floor, Fakir Bagan Lane, near Kumharpatti, Howrah, West Bengal - 711101', lat: 22.58, lon: 88.26 },
  { id: 8, name: 'Pune Logistics Node', region: 'West', city: 'Pune', contact: 'Harish', phone: '99757 40606', address: 'Plot No. 992/993, 6B, Rajendra Nagar, Navi Peth, Near Sonali Mutton Shop, Pune, Maharashtra - 411030', lat: 18.51, lon: 73.84 },
  { id: 9, name: 'Gujarat Regional Spares Facility', region: 'West', city: 'Vadodara', contact: 'Anurag', phone: '7016318145', address: 'J 403, Aarya Empire, Nr. Akshar Paradise, Atladara, Vadodara, Gujarat - 390012', lat: 22.31, lon: 73.18 },
  { id: 10, name: 'Bhopal Spares Depot', region: 'West', city: 'Bhopal', contact: 'Mahender', phone: '88270 56969', address: 'DK2/391, Danish Kunj, Kolar Road, Bhopal, Madhya Pradesh - 462042', lat: 23.18, lon: 77.42 },
  { id: 11, name: 'Mumbai Western Spares Hub', region: 'West', city: 'Mumbai', contact: 'Bhawesh Makati', phone: '98209 95990', address: 'Shree Computronics, 2/2 Ground Floor, (Old) Kesar Baug, L.T. Road, Borivali West, Mumbai, Maharashtra - 400092', lat: 19.23, lon: 72.84 },
  { id: 12, name: 'Nagpur Central Logistics Node', region: 'West', city: 'Nagpur', contact: 'Nilesh', phone: '9372544610', address: '30, Sharda Nagar, Hudkeshwar Road, Behind Domino\'s, Nagpur, Maharashtra - 440034', lat: 21.10, lon: 79.12 },
  { id: 13, name: 'Chennai Southern Spares Depot', region: 'South', city: 'Chennai', contact: 'Pushparaj', phone: '95001 77552', address: 'No. 4/1, Shiva Padam Flat, East Mada Street, Villivakkam, Chennai, Tamil Nadu - 600049', lat: 13.11, lon: 80.20 },
  { id: 14, name: 'Kochi Sparing Centre', region: 'South', city: 'Kochi', contact: 'On-Call Operations', phone: 'sales@dnispl.com', address: 'DNISPL Spares Logistics Base, Kochi, Kerala - 682018', lat: 9.93, lon: 76.27 },
  { id: 15, name: 'Hyderabad Sparing Base', region: 'South', city: 'Hyderabad', contact: 'On-Call Operations', phone: 'sales@dnispl.com', address: 'DNISPL Sparing Centre, Masab Tank, Hyderabad, Telangana - 500004', lat: 17.38, lon: 78.48 },
  { id: 16, name: 'Bengaluru Tech Sparing Center', region: 'South', city: 'Bengaluru', contact: 'On-Call Operations', phone: 'sales@dnispl.com', address: 'DNISPL Logistics Hub, Queen\'s Road, Bengaluru, Karnataka - 560001', lat: 12.97, lon: 77.59 },
  { id: 17, name: 'Guwahati East Gateway Depot', region: 'East', city: 'Guwahati', contact: 'On-Call Operations', phone: 'sales@dnispl.com', address: 'DNISPL Regional Spares Base, G.S. Road, Guwahati, Assam - 781005', lat: 26.14, lon: 91.73 },
  { id: 18, name: 'Delhi Core Sparing Hub', region: 'North', city: 'Delhi', contact: 'On-Call Operations', phone: 'sales@dnispl.com', address: 'DNISPL National Spares Hub, IP Estate, New Delhi - 110002', lat: 28.61, lon: 77.20 }
];

export default function SparingWarehouses() {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedId, setSelectedId] = useState(1);
  const [hoveredStateName, setHoveredStateName] = useState(null);

  const TINT = { from: '#F59E0B', to: '#EF4444', glow: 'rgba(245, 158, 11, 0.25)' };

  // Project lat/lon coordinates into svg viewBox 0 0 612 696
  const project = (lon, lat) => {
    const x = 20.1185 * lon - 1369.5072;
    const y = 919.0174 - 24.9485 * lat;
    return { x, y };
  };

  const filtered = useMemo(() => {
    return SPARE_WAREHOUSES.filter(wh => {
      const query = search.toLowerCase();
      const matchesSearch = 
        wh.name.toLowerCase().includes(query) ||
        wh.city.toLowerCase().includes(query) ||
        wh.contact.toLowerCase().includes(query) ||
        wh.address.toLowerCase().includes(query);
      
      const matchesRegion = selectedRegion === 'All' || wh.region.includes(selectedRegion);
      return matchesSearch && matchesRegion;
    });
  }, [search, selectedRegion]);

  const selectedWh = useMemo(() => {
    return SPARE_WAREHOUSES.find(wh => wh.id === selectedId);
  }, [selectedId]);

  const itemRefs = useRef({});
  useEffect(() => {
    if (selectedId && itemRefs.current[selectedId]) {
      itemRefs.current[selectedId].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedId]);

  return (
    <>
      <Header />
      <div className="wh-page-container">
        {/* Background Mesh */}
        <div className="wh-bg-mesh">
          <div className="wh-mesh-gradient-1" style={{ background: `radial-gradient(circle, ${TINT.glow} 0%, transparent 70%)` }}></div>
          <div className="wh-mesh-gradient-2" style={{ background: `radial-gradient(circle, ${TINT.glow} 0%, transparent 70%)` }}></div>
        </div>

        <div className="wh-content-inner">
          {/* Back button */}
          <div className="wh-nav-top">
            <Link to="/" className="btn-back-wh">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Title Area */}
          <div className="wh-hero-title">
            <div className="wh-tag" style={{ color: TINT.from, borderColor: `${TINT.from}33`, background: `${TINT.from}11` }}>
              <Package size={14} className="tag-icon" />
              <span>Sparing Logistics Grid</span>
            </div>
            <h1 className="wh-main-headline">Sparing &amp; Spares Warehouses</h1>
            <p className="wh-description">
              To guarantee zero-downtime SLA compliance, DNISPL manages 18 strategic spares depots across major state capitals and logistics junctions, holding critical replacement network assets.
            </p>
          </div>

          {/* Main workspace */}
          <div className="wh-workspace-grid">
            {/* Sidebar search list */}
            <div className="wh-card-sidebar glass-card-wh">
              <div className="wh-search-wrap">
                <Search size={18} className="search-decor" />
                <input
                  type="text"
                  placeholder="Search by location, custodian..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Region chips */}
              <div className="wh-chips-row">
                {['All', 'North', 'South', 'East', 'West'].map(region => (
                  <button
                    key={region}
                    className={`wh-filter-btn ${selectedRegion === region ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedRegion(region);
                      const matches = SPARE_WAREHOUSES.filter(w => region === 'All' || w.region.includes(region));
                      if (matches.length > 0) setSelectedId(matches[0].id);
                    }}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Scrollable List */}
              <div className="wh-items-scroll">
                {filtered.map(wh => (
                  <div
                    key={wh.id}
                    ref={el => itemRefs.current[wh.id] = el}
                    className={`wh-item-card ${selectedId === wh.id ? 'active' : ''}`}
                    onClick={() => setSelectedId(wh.id)}
                  >
                    <div className="wh-item-meta">
                      <span className="wh-code-text">WH-0{wh.id}</span>
                      <span className="wh-badge-region">{wh.region}</span>
                    </div>
                    <h3 className="wh-city-title">{wh.city}</h3>
                    <p className="wh-depot-name">{wh.name}</p>
                    <p className="wh-address-snippet">{wh.address}</p>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="wh-empty-fallback">
                    <p>No spares warehouse matched the filter criteria.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Map panel */}
            <div className="wh-card-map-view glass-card-wh">
              <div className="wh-map-header">
                <div className="wh-live-status">
                  <span className="wh-pulse-dot" style={{ backgroundColor: TINT.from }}></span>
                  <span>Sparing Backbone Grid</span>
                </div>
                {hoveredStateName && (
                  <div className="wh-state-overlay">
                    <span>{hoveredStateName}</span>
                  </div>
                )}
                {selectedWh && (
                  <div className="wh-coords-display">
                    <Compass size={14} />
                    <span>Lon {selectedWh.lon.toFixed(2)} | Lat {selectedWh.lat.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* SVG India Map */}
              <div className="wh-vector-map-frame">
                <svg viewBox="0 0 612 696" className="wh-india-vector-svg">
                  {/* Detailed State Boundaries */}
                  <g className="wh-states-group">
                    {IndiaMapData.locations.map(loc => (
                      <path
                        key={loc.id}
                        d={loc.path}
                        className="wh-state-path"
                        onMouseEnter={() => setHoveredStateName(loc.name)}
                        onMouseLeave={() => setHoveredStateName(null)}
                      />
                    ))}
                  </g>

                  {/* Draw connection lines between major cities as routing pathways */}
                  <line x1="186.3" y1="210.3" x2="96.7" y2="443.1" stroke="rgba(245, 158, 11, 0.12)" strokeDasharray="3 3" />
                  <line x1="96.7" y1="443.1" x2="187.9" y2="677.2" stroke="rgba(245, 158, 11, 0.12)" strokeDasharray="3 3" />
                  <line x1="187.9" y1="677.2" x2="476.1" y2="266.8" stroke="rgba(245, 158, 11, 0.12)" strokeDasharray="3 3" />
                  <line x1="476.1" y1="266.8" x2="186.3" y2="210.3" stroke="rgba(245, 158, 11, 0.12)" strokeDasharray="3 3" />

                  {/* Inactive Warehouse Nodes */}
                  {SPARE_WAREHOUSES.map(wh => {
                    const pt = project(wh.lon, wh.lat);
                    if (wh.id === selectedId) return null;
                    return (
                      <circle
                        key={wh.id}
                        cx={pt.x}
                        cy={pt.y}
                        r="5.5"
                        className="wh-map-node"
                        onClick={() => setSelectedId(wh.id)}
                      />
                    );
                  })}

                  {/* Active Selected Node */}
                  {selectedWh && (() => {
                    const pt = project(selectedWh.lon, selectedWh.lat);
                    return (
                      <g>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="18"
                          fill="url(#wh-node-glow-grad)"
                          className="wh-selected-pulse"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="6.5"
                          className="wh-selected-core"
                          fill={TINT.from}
                          stroke="#ffffff"
                          strokeWidth="2.5"
                        />
                      </g>
                    );
                  })()}

                  <defs>
                    <radialGradient id="wh-node-glow-grad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={TINT.from} stopOpacity="1" />
                      <stop offset="100%" stopColor={TINT.to} stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Selected details card */}
              <AnimatePresence mode="wait">
                {selectedWh && (
                  <motion.div
                    key={selectedWh.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="wh-detail-panel"
                    style={{ borderLeft: `4px solid ${TINT.from}` }}
                  >
                    <div className="wh-panel-header">
                      <span className="wh-depot-badge">DEPOT FACILITY</span>
                      <span className="wh-region-tag-display">{selectedWh.region} Hub</span>
                    </div>

                    <h2 className="wh-meta-depot-name">{selectedWh.name}</h2>
                    <p className="wh-meta-city">{selectedWh.city} Base</p>
                    <p className="wh-meta-address">{selectedWh.address}</p>

                    <div className="wh-custodian-grid">
                      <div className="wh-custodian-card">
                        <div className="wh-icon-wrap">
                          <User size={15} style={{ color: TINT.from }} />
                        </div>
                        <div>
                          <span className="wh-meta-label">Depot Custodian</span>
                          <span className="wh-meta-value">{selectedWh.contact}</span>
                        </div>
                      </div>

                      <div className="wh-custodian-card">
                        <div className="wh-icon-wrap">
                          <Phone size={15} style={{ color: TINT.from }} />
                        </div>
                        <div>
                          <span className="wh-meta-label">Custodian Contact</span>
                          {selectedWh.phone !== 'N/A' && selectedWh.phone !== 'sales@dnispl.com' ? (
                            <a href={`tel:${selectedWh.phone.split('/')[0].trim()}`} className="wh-call-link">
                              {selectedWh.phone}
                            </a>
                          ) : selectedWh.phone === 'sales@dnispl.com' ? (
                            <a href="mailto:sales@dnispl.com" className="wh-call-link">
                              sales@dnispl.com
                            </a>
                          ) : (
                            <span className="wh-meta-value">NOC Dispatch Support</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
