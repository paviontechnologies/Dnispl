import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowLeft, Compass, ChevronRight, ShieldCheck } from 'lucide-react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import IndiaMapData from '@svg-maps/india';
import './ActiveLocations.css';

// Cleaned up, professionally named Active Locations (100 total)
const ACTIVE_LOCATIONS = [
  { id: 1, code: '01AHMNV', name: 'Nature View Enterprise Hub', address: 'Nature View Building, B/h H.K. House, Ashram Road, Ahmedabad, Gujarat - 380009', zone: 'West', region: 'Ahmedabad', city: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
  { id: 2, code: '01BRDAB', name: 'Aayakar Bhawan Support Centre', address: 'Aayakar Bhawan, Race Course Circle, Vadodara, Gujarat - 390007', zone: 'West', region: 'Ahmedabad', city: 'Vadodara', lat: 22.3072, lon: 73.1812 },
  { id: 3, code: '01RAKAB', name: 'M.G. Road Network Hub', address: 'Aayakar Bhawan, Amruta Estate, 1st Floor, M.G. Road, Rajkot, Gujarat - 360001', zone: 'West', region: 'Ahmedabad', city: 'Rajkot', lat: 22.3039, lon: 70.8022 },
  { id: 4, code: '01SURAB', name: 'Majura Gate Infrastructure Node', address: 'Aayakar Bhawan, Majura Gate, Opp. New Civil Hospital, Surat, Gujarat - 395001', zone: 'West', region: 'Ahmedabad', city: 'Surat', lat: 21.1702, lon: 72.8311 },
  { id: 5, code: '01JUNBN', name: 'Junagadh Gateway Station', address: 'Income Tax Office, Bhootnath Chamber, Opp. Bahuddin College, Junagadh, Gujarat - 362001', zone: 'West', region: 'Ahmedabad', city: 'Junagadh', lat: 21.5222, lon: 70.4579 },
  { id: 6, code: '01VALAB', name: 'Valsad Palak Arcade Point', address: 'Palak Arcade, Shanti Nagar, Tithal Road, Valsad, Gujarat - 396001', zone: 'West', region: 'Ahmedabad', city: 'Valsad', lat: 20.5992, lon: 72.9342 },
  { id: 7, code: '02HUBCR', name: 'Hubballi Transit Hub', address: 'CR Building, PB Highway, Navanagar, Hubballi, Karnataka - 580025', zone: 'South', region: 'Bengaluru', city: 'Hubballi', lat: 15.3647, lon: 75.1376 },
  { id: 8, code: '02BNGCR', name: 'Queen\'s Road Core Exchange', address: 'CR Building, Queen\'s Road, Bengaluru, Karnataka - 560001', zone: 'South', region: 'Bengaluru', city: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
  { id: 9, code: '02PNJIT', name: 'EDC Complex Edge Site', address: 'Aayakar Bhavan, Plot No. 5, EDC Complex, Patto, Panaji, Goa - 403001', zone: 'South', region: 'Bengaluru', city: 'Panaji', lat: 15.4909, lon: 73.8278 },
  { id: 10, code: '02BELKC', name: 'Belagavi Support Facility', address: 'Feroj Khimjibhai Commercial Complex, Opp. District Civil Line Hospital, Dr. Ambedkar Road, Belagavi, Karnataka - 590001', zone: 'South', region: 'Bengaluru', city: 'Belagavi', lat: 15.8497, lon: 74.5089 },
  { id: 11, code: '02GULAB', name: 'Kalaburagi Operations Base', address: 'Aayakar Bhavan, Sedam Road, Kalaburagi, Karnataka - 585105', zone: 'South', region: 'Bengaluru', city: 'Kalaburagi', lat: 17.3297, lon: 76.8343 },
  { id: 12, code: '02MYSNB', name: 'Mysuru Residency Rd Station', address: 'Aayakar Bhavan, No. 21/16, Residency Road, Nazarabad, Mysuru, Karnataka - 570010', zone: 'South', region: 'Bengaluru', city: 'Mysuru', lat: 12.2958, lon: 76.6394 },
  { id: 13, code: '03RPRCR', name: 'Raipur Civil Lines Gateway', address: 'Income Tax Office, New Central Revenue Building, Civil Lines, Raipur, Chhattisgarh - 492001', zone: 'West', region: 'Bhopal', city: 'Raipur', lat: 21.2514, lon: 81.6296 },
  { id: 14, code: '03INDAB', name: 'Indore Central Hub', address: 'Income Tax Office, Opp. White Church, Indore, Madhya Pradesh - 452001', zone: 'West', region: 'Bhopal', city: 'Indore', lat: 22.7196, lon: 75.8577 },
  { id: 15, code: '03BHOAB', name: 'Bhopal Regional Exchange', address: 'Aayakar Bhavan, Infront of Maida Mill, Hoshangabad Road, Bhopal, Madhya Pradesh - 462015', zone: 'West', region: 'Bhopal', city: 'Bhopal', lat: 23.2599, lon: 77.4126 },
  { id: 16, code: '03GWAAB', name: 'Gwalior City Centre Gateway', address: 'Aayakar Bhawan, City Centre, Gwalior, Madhya Pradesh - 474011', zone: 'West', region: 'Bhopal', city: 'Gwalior', lat: 26.2183, lon: 78.1784 },
  { id: 17, code: '03JABCR', name: 'Jabalpur Telecom Facility', address: 'Income Tax Office, CR Building, N.T. Jabalpur, Madhya Pradesh - 482002', zone: 'West', region: 'Bhopal', city: 'Jabalpur', lat: 23.1815, lon: 79.9864 },
  { id: 18, code: '03BILSP', name: 'Bilaspur Vyapar Vihar Node', address: 'New Building at Shriram Plaza, Near Swami Vivekanand Hospital, Vyapar Vihar, Bilaspur, Chhattisgarh', zone: 'West', region: 'Bhopal', city: 'Bilaspur', lat: 22.0790, lon: 82.1391 },
  { id: 19, code: '04BHUCR', name: 'Bhubaneswar Main Gateway', address: 'Aayakar Bhawan, CR Building, Bhubaneswar, Odisha - 751007', zone: 'East', region: 'Bhubaneswar', city: 'Bhubaneswar', lat: 20.2961, lon: 85.8245 },
  { id: 20, code: '04CUTSC', name: 'Cuttack Tulsipur Exchange', address: 'Aayakar Bhawan, Near Shelter Chhak, Tulsipur, Cuttack, Odisha - 753008', zone: 'East', region: 'Bhubaneswar', city: 'Cuttack', lat: 20.4625, lon: 85.8792 },
  { id: 21, code: '04SMBAB', name: 'Sambalpur Infrastructure Site', address: 'Aayakar Bhawan, Ainthapali, Sambalpur, Odisha - 768004', zone: 'East', region: 'Bhubaneswar', city: 'Sambalpur', lat: 21.4669, lon: 83.9878 },
  { id: 22, code: '04ROUAB', name: 'Rourkela Udit Nagar Gateway', address: 'Aayakar Bhawan, Udit Nagar, Rourkela, Odisha - 769012', zone: 'East', region: 'Bhubaneswar', city: 'Rourkela', lat: 22.2604, lon: 84.8519 },
  { id: 23, code: '04JHACO', name: 'Jharsuguda Core Node', address: 'New Building of ITD, Beheramal, New Collector Office, Jharsuguda, Odisha - 768211', zone: 'East', region: 'Bhubaneswar', city: 'Jharsuguda', lat: 21.8554, lon: 84.0040 },
  { id: 24, code: '04BOLCP', name: 'Bolangir Support Edge', address: 'Income Tax Office, Infront of Children Park, Titlagarh Road, Bolangir, Odisha', zone: 'East', region: 'Bhubaneswar', city: 'Bolangir', lat: 20.7181, lon: 83.4862 },
  { id: 25, code: '05CHAIT', name: 'Chandigarh Central Hub', address: 'Aayakar Bhawan, Sector 17-E, Chandigarh - 160017', zone: 'North', region: 'Chandigarh', city: 'Chandigarh', lat: 30.7333, lon: 76.7794 },
  { id: 26, code: '05AMTCR', name: 'Amritsar Maqbool Rd Facility', address: 'Aayakar Bhawan, New CR Building, 6-A, Maqbool Road, Amritsar, Punjab - 143002', zone: 'North', region: 'Chandigarh', city: 'Amritsar', lat: 31.6340, lon: 74.8723 },
  { id: 27, code: '05PNHAB', name: 'Panchkula Sector-2 Station', address: 'Aayakar Bhawan, B-43 to 48, Sector-2, Panchkula, Haryana - 134112', zone: 'North', region: 'Chandigarh', city: 'Panchkula', lat: 30.6975, lon: 76.8606 },
  { id: 28, code: '05LUDAB', name: 'Ludhiana Regional Edge', address: 'Aayakar Bhawan, Rishi Balmiki Nagar, Ludhiana, Punjab - 141001', zone: 'North', region: 'Chandigarh', city: 'Ludhiana', lat: 30.9010, lon: 75.8573 },
  { id: 29, code: '05FARNC', name: 'Faridabad CGO Exchange', address: 'Aayakar Bhawan, New CGO Building, Faridabad, Haryana - 121001', zone: 'North', region: 'Chandigarh', city: 'Faridabad', lat: 28.4089, lon: 77.3178 },
  { id: 30, code: '05GURIT', name: 'Gurugram Udyog Vihar Node', address: 'DIT HSIDC Building, Udyog Vihar Phase 5, 6th Floor, Vanijya Nikunj, Gurugram, Haryana - 122001', zone: 'North', region: 'Chandigarh', city: 'Gurugram', lat: 28.4595, lon: 77.0266 },
  { id: 31, code: '06CHEMG', name: 'Chennai Central Backbone', address: 'Directorate of Income Tax (Investigation), 108, M.G. Road, Nungambakkam, Chennai, Tamil Nadu - 600034', zone: 'South', region: 'Chennai', city: 'Chennai', lat: 13.0827, lon: 80.2707 },
  { id: 32, code: '06COIAA', name: 'Coimbatore Annexe Gateway', address: 'Annexe Building, 63, Race Course Road, Coimbatore, Tamil Nadu - 641018', zone: 'South', region: 'Chennai', city: 'Coimbatore', lat: 11.0168, lon: 76.9558 },
  { id: 33, code: '06MADMB', name: 'Madurai Regional Node', address: 'Main Building 2, V.P. Rathinasamy Nadar Road, CR Building, Bibikulam, Madurai, Tamil Nadu - 625002', zone: 'South', region: 'Chennai', city: 'Madurai', lat: 9.9252, lon: 78.1198 },
  { id: 34, code: '06TRHWR', name: 'Tiruchirappalli Cantonment Site', address: 'New Building, No. 4, Williams Road, Cantonment, Tiruchirappalli, Tamil Nadu - 620015', zone: 'South', region: 'Chennai', city: 'Tiruchirappalli', lat: 10.7905, lon: 78.6856 },
  { id: 35, code: '06CUDIT', name: 'Cuddalore Local Centre', address: 'Income Tax Office, Soorappa Naicken Chavadi, Cuddalore, Tamil Nadu - 607002', zone: 'South', region: 'Chennai', city: 'Cuddalore', lat: 11.7480, lon: 79.7656 },
  { id: 36, code: '06KRKIT', name: 'Karaikudi Telecom Hub', address: 'Income Tax Office, Sekkalai Street, Karaikudi, Tamil Nadu - 630002', zone: 'South', region: 'Chennai', city: 'Karaikudi', lat: 10.0734, lon: 78.7772 },
  { id: 37, code: '07TRIAB', name: 'Trivandrum Kowdiar Gateway', address: 'Aayakar Bhavan, Kowdiar, Thiruvananthapuram, Kerala - 695003', zone: 'South', region: 'Kochi', city: 'Thiruvananthapuram', lat: 8.5241, lon: 76.9366 },
  { id: 38, code: '07KOCCR', name: 'Kochi Backbone Hub', address: 'C.R. Building, I.S. Press Road, Kochi, Kerala - 682018', zone: 'South', region: 'Kochi', city: 'Kochi', lat: 9.9312, lon: 76.2673 },
  { id: 39, code: '07KOZAB', name: 'Kozhikode Mananchira Station', address: 'Aayakar Bhavan, North Block, New Annexe Building, Mananchira, Calicut, Kerala - 673001', zone: 'South', region: 'Kochi', city: 'Kozhikode', lat: 11.2588, lon: 75.7804 },
  { id: 40, code: '07THRAB', name: 'Thrissur Regional Hub', address: 'Aayakar Bhavan, Sakthan Thampuran Nagar, Thrissur, Kerala - 680101', zone: 'South', region: 'Kochi', city: 'Thrissur', lat: 10.5276, lon: 76.2144 },
  { id: 41, code: '07KOYPL', name: 'Kottayam Local Station', address: 'Income Tax Office, Public Library Building, Lal Bahadur Sastri Road, Kottayam, Kerala - 686001', zone: 'South', region: 'Kochi', city: 'Kottayam', lat: 9.5916, lon: 76.5220 },
  { id: 42, code: '07ALABR', name: 'Alappuzha Beach Road Node', address: 'New Building at Aayakar Bhawan, Beach Road, Alappuzha, Kerala - 688001', zone: 'South', region: 'Kochi', city: 'Alappuzha', lat: 9.4981, lon: 76.3264 },
  { id: 43, code: '08DELCC', name: 'Delhi Civic Centre Exchange', address: 'MCD Civic Centre, Minto Road, New Delhi, Delhi - 110002', zone: 'North', region: 'Delhi', city: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { id: 44, code: '08DELJE', name: 'Jhandewalan Tech Node', address: 'NCC DIT(S), ARA Centre, E2, Jhandewalan Extension, New Delhi - 110055', zone: 'North', region: 'Delhi', city: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { id: 45, code: '08DELCR', name: 'IP Estate Exchange Site', address: 'CR Building, IP Estate, New Delhi - 110002', zone: 'North', region: 'Delhi', city: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { id: 46, code: '08DELVB', name: 'Vikas Bhawan Backbone Point', address: 'Vikas Bhawan, IP Estate, New Delhi - 110002', zone: 'North', region: 'Delhi', city: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { id: 47, code: '08DELRK', name: 'R.K. Puram Switch Node', address: 'East Block - 2, R.K. Puram, New Delhi - 110066', zone: 'North', region: 'Delhi', city: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { id: 48, code: '08DELJL', name: 'Jawaharlal Nehru Stadium Site', address: 'Jawaharlal Nehru Stadium Complex, Lodhi Road, New Delhi - 110003', zone: 'North', region: 'Delhi', city: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { id: 49, code: '09GUWAB', name: 'Guwahati Regional Backbone', address: 'Aayakar Bhawan, New Building, Christian Basti, G.S. Road, Guwahati, Assam - 781005', zone: 'East', region: 'Guwahati', city: 'Guwahati', lat: 26.1445, lon: 91.7362 },
  { id: 50, code: '09SHIAB', name: 'Shillong Telecom Gateway', address: 'Aayakar Bhawan, M.G. Road, P.B. No. 20, Shillong, Meghalaya - 793001', zone: 'East', region: 'Guwahati', city: 'Shillong', lat: 25.5788, lon: 91.8833 },
  { id: 51, code: '09AGAMR', name: 'Agartala Border Exchange', address: 'Income Tax Office, Netaji Chowmuhani, Mantribari Road, Agartala, Tripura - 799001', zone: 'East', region: 'Guwahati', city: 'Agartala', lat: 23.8315, lon: 91.2868 },
  { id: 52, code: '09DIBMN', name: 'Dibrugarh Operations Station', address: 'Aayakar Bhawan, CR Building, Milan Nagar, Dibrugarh, Assam - 786003', zone: 'East', region: 'Guwahati', city: 'Dibrugarh', lat: 27.4728, lon: 94.9125 },
  { id: 53, code: '09JORPR', name: 'Jorhat Switch Facility', address: 'Income Tax Office, T.R. Phukan Road, Jorhat, Assam - 785001', zone: 'East', region: 'Guwahati', city: 'Jorhat', lat: 26.7509, lon: 94.2037 },
  { id: 54, code: '09BONBB', name: 'Bongaigaon Support Site', address: 'Income Tax Office, Shakuntala Complex, Bongaigaon, Assam - 783380', zone: 'East', region: 'Guwahati', city: 'Bongaigaon', lat: 26.4718, lon: 90.5581 },
  { id: 55, code: '10HYDMT', name: 'Hyderabad Masab Tank Core', address: 'Income Tax Towers, 10-2-3, AC Guards, Masab Tank, Hyderabad, Telangana - 500004', zone: 'South', region: 'Hyderabad', city: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
  { id: 56, code: '10GUUBB', name: 'Guntur Nagarampalem Exchange', address: 'Income Tax Office, BTC Building, Nagarampalem, Guntur, Andhra Pradesh - 522004', zone: 'South', region: 'Hyderabad', city: 'Guntur', lat: 16.3067, lon: 80.4365 },
  { id: 57, code: '10GUUCR', name: 'Guntur Central Core', address: 'Central Revenue Building, Kannavari Thota, Guntur, Andhra Pradesh - 522004', zone: 'South', region: 'Hyderabad', city: 'Guntur', lat: 16.3067, lon: 80.4365 },
  { id: 58, code: '10VISMV', name: 'Visakhapatnam MVP Point', address: 'Pratyakshakar Bhavan, MVP Colony, Visakhapatnam, Andhra Pradesh - 530020', zone: 'South', region: 'Hyderabad', city: 'Visakhapatnam', lat: 17.6868, lon: 83.2185 },
  { id: 59, code: '10KAKBC', name: 'Kakinada Main Switch', address: 'Office of the Addl. Commissioner of Income Tax, Seshasai Street, Rama Rao Pet, Deepthi Towers, Kakinada, Andhra Pradesh - 533004', zone: 'South', region: 'Hyderabad', city: 'Kakinada', lat: 16.9890, lon: 82.2475 },
  { id: 60, code: '10KRMAB', name: 'Karimnagar Network Facility', address: 'Aayakar Bhavan, Karimnagar, Telangana - 505001', zone: 'South', region: 'Hyderabad', city: 'Karimnagar', lat: 18.4386, lon: 79.1328 },
  { id: 61, code: '11JAICR', name: 'Jaipur Statue Circle Core', address: 'CR Building, Statue Circle, Bhagwandas Road, Jaipur, Rajasthan - 302001', zone: 'West', region: 'Jaipur', city: 'Jaipur', lat: 26.9124, lon: 75.7873 },
  { id: 62, code: '11JODIT', name: 'Jodhpur Paota Hub', address: 'Income Tax Office, Lal Madan, Paota C Road, Jodhpur, Rajasthan - 342010', zone: 'West', region: 'Jaipur', city: 'Jodhpur', lat: 26.2389, lon: 73.0243 },
  { id: 63, code: '11AJMCR', name: 'Ajmer Regional Exchange', address: 'CR Building, Opp. Session Court, Jaipur Road, Ajmer, Rajasthan - 305001', zone: 'West', region: 'Jaipur', city: 'Ajmer', lat: 26.4498, lon: 74.6399 },
  { id: 64, code: '11ALWCR', name: 'Alwar Backbone Station', address: 'CR Building, Moti Dungri Road, Alwar, Rajasthan - 301001', zone: 'West', region: 'Jaipur', city: 'Alwar', lat: 27.5530, lon: 76.6083 },
  { id: 65, code: '11BIKAB', name: 'Bikaner Switch Terminal', address: 'Aayakar Bhawan, Rani Bazar, Bikaner, Rajasthan - 334002', zone: 'West', region: 'Jaipur', city: 'Bikaner', lat: 28.0229, lon: 73.3119 },
  { id: 66, code: '11UDACC', name: 'Udaipur Sub City Node', address: 'Income Tax Office, Plot No. 2, Block L, Sub City Center, Udaipur, Rajasthan - 313001', zone: 'West', region: 'Jaipur', city: 'Udaipur', lat: 24.5854, lon: 73.7125 },
  { id: 67, code: '12KANAB', name: 'Kanpur Main Gateway', address: 'Aayakar Bhawan, 16/69, Civil Lines, Kanpur, Uttar Pradesh - 208001', zone: 'North', region: 'Kanpur', city: 'Kanpur', lat: 26.4499, lon: 80.3319 },
  { id: 68, code: '12GAZC1', name: 'Ghaziabad CGO Exchange', address: 'Income Tax Office, Near Hapur Chungi, CGO Complex 1, Ghaziabad, Uttar Pradesh - 201001', zone: 'North', region: 'Kanpur', city: 'Ghaziabad', lat: 28.6692, lon: 77.4538 },
  { id: 69, code: '12MEEAB', name: 'Meerut Backbone Point', address: 'Aayakar Bhawan, Bhainsali Ground, Meerut, Uttar Pradesh - 250001', zone: 'North', region: 'Kanpur', city: 'Meerut', lat: 28.9845, lon: 77.7064 },
  { id: 70, code: '12MUZAB', name: 'Muzaffarnagar Local Site', address: 'Aayakar Bhawan, Near Company Bagh, Muzaffarnagar, Uttar Pradesh - 251002', zone: 'North', region: 'Kanpur', city: 'Muzaffarnagar', lat: 29.4727, lon: 77.7006 },
  { id: 71, code: '12BULAB', name: 'Bulandshahr Edge Hub', address: 'Income Tax Office, Lala Babu Chowk, Teacher Colony, Bulandshahr, Uttar Pradesh - 203001', zone: 'North', region: 'Kanpur', city: 'Bulandshahr', lat: 28.4070, lon: 77.8512 },
  { id: 72, code: '12FIRDA', name: 'Firozabad Switch Point', address: 'Aayakar Karyalaya, Kotla Road, Near Ramlila Maidan, Firozabad, Uttar Pradesh - 283005', zone: 'North', region: 'Kanpur', city: 'Firozabad', lat: 27.1513, lon: 78.0076 },
  { id: 73, code: '13JAPCR', name: 'Jalpaiguri CR Gateway', address: 'Income Tax Office, Central Revenue Building, Race Course Road, Jalpaiguri, West Bengal - 735101', zone: 'East', region: 'Kolkata', city: 'Jalpaiguri', lat: 26.5211, lon: 88.7193 },
  { id: 74, code: '13KOLAB', name: 'Kolkata Chowringhee Backbone', address: 'Aayakar Bhawan, P-7, Chowringhee Square, Kolkata, West Bengal - 700069', zone: 'East', region: 'Kolkata', city: 'Kolkata', lat: 22.5726, lon: 88.3639 },
  { id: 75, code: '13ASAKR', name: 'Asansol Links Facility', address: 'Income Tax Office Building, Kanyapur Link Road, Mouza-Govindapur, Asansol, West Bengal - 713305', zone: 'East', region: 'Kolkata', city: 'Asansol', lat: 23.6740, lon: 86.9730 },
  { id: 76, code: '13BURAB', name: 'Burdwan Court Rd Node', address: 'Aayakar Bhawan, Court Compound, Kachari Road, Burdwan, West Bengal - 713101', zone: 'East', region: 'Kolkata', city: 'Burdwan', lat: 23.2428, lon: 87.8615 },
  { id: 77, code: '13CHSKM', name: 'Hooghly Khadina More Switch', address: 'Aayakar Bhawan, G.T. Road, Khadina More, Chinsurah, Hooghly, West Bengal - 712101', zone: 'East', region: 'Kolkata', city: 'Chinsurah', lat: 22.9028, lon: 88.3968 },
  { id: 78, code: '13DURAA', name: 'Durgapur City Centre Gateway', address: 'Aayakar Bhawan, Aayakar Bithi, City Centre, Durgapur, West Bengal - 713216', zone: 'East', region: 'Kolkata', city: 'Durgapur', lat: 23.5204, lon: 87.3119 },
  { id: 79, code: '14ALLAB', name: 'Allahabad Civil Lines Hub', address: 'Aayakar Bhawan, 38 M.G. Marg, Civil Lines, Prayagraj, Uttar Pradesh - 211001', zone: 'North', region: 'Lucknow', city: 'Prayagraj', lat: 25.4358, lon: 81.8463 },
  { id: 80, code: '14BAECR', name: 'Bareilly Regional Node', address: 'Central Revenue Building, Kamla Nehru Marg, Civil Lines, Bareilly, Uttar Pradesh - 243001', zone: 'North', region: 'Lucknow', city: 'Bareilly', lat: 28.3670, lon: 79.4304 },
  { id: 81, code: '14LUCRT', name: 'Lucknow Naveen Core Hub', address: 'Naveen Aayakar Bhawan, 57, Ram Teerth Marg, Lucknow, Uttar Pradesh - 226001', zone: 'North', region: 'Lucknow', city: 'Lucknow', lat: 26.8467, lon: 80.9462 },
  { id: 82, code: '14GORIT', name: 'Gorakhpur Telecom Gateway', address: 'Income Tax Office, Near Civil Lines, Gorakhpur, Uttar Pradesh - 273001', zone: 'North', region: 'Lucknow', city: 'Gorakhpur', lat: 26.7606, lon: 83.3732 },
  { id: 83, code: '14VARAB', name: 'Varanasi M.A. Road Station', address: 'Aayakar Bhawan, M.A. Road, Varanasi, Uttar Pradesh - 221002', zone: 'North', region: 'Lucknow', city: 'Varanasi', lat: 25.3176, lon: 82.9739 },
  { id: 84, code: '15MUMKB', name: 'Mumbai BKC Kautilya Core', address: 'Kautilya Bhawan, Near Videsh Bhawan, Bandra Kurla Complex, Mumbai, Maharashtra - 400051', zone: 'West', region: 'Mumbai', city: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { id: 85, code: '15MUMAB', name: 'Mumbai Karve Rd Backbone', address: 'Aayakar Bhawan, Maharishi Karve Road, Mumbai, Maharashtra - 400020', zone: 'West', region: 'Mumbai', city: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { id: 86, code: '15MUMCG', name: 'Mumbai CGO Core Exchange', address: 'CGO, Old Central Govt. Office Building, M.K. Road, Mumbai, Maharashtra - 400020', zone: 'West', region: 'Mumbai', city: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { id: 87, code: '15MUMEH', name: 'Mumbai Nariman Point Edge', address: 'Earnest House, Nariman Point, Mumbai, Maharashtra - 400021', zone: 'West', region: 'Mumbai', city: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { id: 88, code: '15MUMIT', name: 'Mumbai Ballard Estate Terminal', address: 'Income Tax Office, Scindia House, Ballard Estate, Mumbai, Maharashtra - 400038', zone: 'West', region: 'Mumbai', city: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { id: 89, code: '16NAGAT', name: 'Nagpur NADT Exchange Point', address: 'ATC Building, NADT, Chhindwara Road, Nagpur, Maharashtra - 440030', zone: 'West', region: 'Nagpur', city: 'Nagpur', lat: 21.1458, lon: 79.0882 },
  { id: 90, code: '16AKOAK', name: 'Akola Switch Terminal', address: 'Aayakar Bhavan, Murtijapur Road, Akola, Maharashtra - 444001', zone: 'West', region: 'Nagpur', city: 'Akola', lat: 20.7002, lon: 77.0082 },
  { id: 91, code: '16AMRNB', name: 'Amravati Kranti Colony Node', address: 'New Building, Aayakar Bhavan, Kranti Colony, Akoli Road, Saturna MIDC, Amravati, Maharashtra - 444607', zone: 'West', region: 'Nagpur', city: 'Amravati', lat: 20.9320, lon: 77.7524 },
  { id: 92, code: '16WARCL', name: 'Wardha Connection Point', address: 'Income Tax Office, Sewagram Road, Wardha, Maharashtra - 442001', zone: 'West', region: 'Nagpur', city: 'Wardha', lat: 20.7453, lon: 78.6022 },
  { id: 93, code: '17RANCA', name: 'Ranchi Main Exchange', address: 'Income Tax Office, Central Annexe Building, 5 Main Road, Ranchi, Jharkhand - 834001', zone: 'East', region: 'Patna', city: 'Ranchi', lat: 23.3441, lon: 85.3096 },
  { id: 94, code: '17MUPSS', name: 'Muzaffarpur Stadium Rd Node', address: 'Income Tax Office, Sikandarpur Stadium Road, Muzaffarpur, Bihar - 842001', zone: 'East', region: 'Patna', city: 'Muzaffarpur', lat: 26.1209, lon: 85.3906 },
  { id: 95, code: '17HAZB1', name: 'Hazaribagh Support Terminal', address: 'Income Tax Office, Aayakar Bhawan, Rabindra Path, Hazaribagh, Jharkhand - 825301', zone: 'East', region: 'Patna', city: 'Hazaribagh', lat: 23.9925, lon: 85.3622 },
  { id: 96, code: '17BEGMC', name: 'Begusarai Local Hub', address: 'Income Tax Office, Har Har Mahadev Chowk, Begusarai, Bihar - 851101', zone: 'East', region: 'Patna', city: 'Begusarai', lat: 25.4168, lon: 86.1274 },
  { id: 97, code: '18PAVKC', name: 'Panvel Sector-17 Support Center', address: 'Income Tax Office, Plots 2 & 2A, Sector 17, New Panvel, Raigad, Maharashtra - 410206', zone: 'West', region: 'Pune', city: 'Panvel', lat: 18.9894, lon: 73.1166 },
  { id: 98, code: '18KLYRM', name: 'Kalyan Support Site', address: 'Rani Mansion, Kalyan, Maharashtra - 421301', zone: 'West', region: 'Pune', city: 'Kalyan', lat: 19.2403, lon: 73.1350 },
  { id: 99, code: '18SNGBB', name: 'Sangli Local Terminal', address: 'Bhinge Building, South Shivaji Nagar, Near Appasaheb Birnale College, Sangli, Maharashtra - 416416', zone: 'West', region: 'Pune', city: 'Sangli', lat: 16.8524, lon: 74.5815 },
  { id: 100, code: '18SATAB', name: 'Satara Exchange Node', address: 'Income Tax Office, Manjunath Tower, Near Yashwantrao Chavan College, Satara, Maharashtra - 415001', zone: 'West', region: 'Pune', city: 'Satara', lat: 17.6849, lon: 73.9978 }
];

// Principal Hub Interconnect Grid coordinates
const HUB_CONNECTIONS = [
  { from: { name: 'Delhi', lon: 77.2090, lat: 28.6139 }, to: { name: 'Mumbai', lon: 72.8777, lat: 19.0760 } },
  { from: { name: 'Mumbai', lon: 72.8777, lat: 19.0760 }, to: { name: 'Bengaluru', lon: 77.5946, lat: 12.9716 } },
  { from: { name: 'Bengaluru', lon: 77.5946, lat: 12.9716 }, to: { name: 'Chennai', lon: 80.2707, lat: 13.0827 } },
  { from: { name: 'Chennai', lon: 80.2707, lat: 13.0827 }, to: { name: 'Kolkata', lon: 88.3639, lat: 22.5726 } },
  { from: { name: 'Kolkata', lon: 88.3639, lat: 22.5726 }, to: { name: 'Delhi', lon: 77.2090, lat: 28.6139 } },
  { from: { name: 'Delhi', lon: 77.2090, lat: 28.6139 }, to: { name: 'Guwahati', lon: 91.7362, lat: 26.1445 } },
  { from: { name: 'Guwahati', lon: 91.7362, lat: 26.1445 }, to: { name: 'Kolkata', lon: 88.3639, lat: 22.5726 } },
  { from: { name: 'Delhi', lon: 77.2090, lat: 28.6139 }, to: { name: 'Hyderabad', lon: 78.4867, lat: 17.3850 } },
  { from: { name: 'Hyderabad', lon: 78.4867, lat: 17.3850 }, to: { name: 'Bengaluru', lon: 77.5946, lat: 12.9716 } },
];

export default function ActiveLocations() {
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedId, setSelectedId] = useState(1);
  const [hoveredStateName, setHoveredStateName] = useState(null);

  // Exact projection model for @svg-maps/india (viewBox 0 0 612 696)
  const project = (lon, lat) => {
    const x = 20.1185 * lon - 1369.5072;
    const y = 919.0174 - 24.9485 * lat;
    return { x, y };
  };

  const filtered = useMemo(() => {
    return ACTIVE_LOCATIONS.filter(loc => {
      const query = search.toLowerCase();
      const matchesSearch = 
        loc.code.toLowerCase().includes(query) ||
        loc.name.toLowerCase().includes(query) ||
        loc.city.toLowerCase().includes(query) ||
        loc.region.toLowerCase().includes(query) ||
        loc.address.toLowerCase().includes(query);
      
      const matchesZone = selectedZone === 'All' || loc.zone === selectedZone;
      return matchesSearch && matchesZone;
    });
  }, [search, selectedZone]);

  const selectedLoc = useMemo(() => {
    return ACTIVE_LOCATIONS.find(loc => loc.id === selectedId);
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
      <div className="loc-page-container">
        {/* Glow overlay */}
        <div className="loc-bg-mesh">
          <div className="mesh-gradient-1"></div>
          <div className="mesh-gradient-2"></div>
        </div>

        <div className="loc-content-inner">
          {/* Back button */}
          <div className="loc-nav-top">
            <Link to="/" className="btn-back-home">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Title Area */}
          <div className="loc-hero-title">
            <div className="loc-tag">
              <ShieldCheck size={14} className="tag-icon" />
              <span>NOC & Infrastructure Sparing</span>
            </div>
            <h1 className="loc-main-headline">Enterprise Presence Network</h1>
            <p className="loc-description">
              DNISPL maintains operational presence across 100+ active locations in India, delivering carrier-grade network architecture, active infrastructure swaps, and low-latency SD-WAN deployments.
            </p>
          </div>

          {/* Main Workspace Layout */}
          <div className="loc-workspace-grid">
            {/* Sidebar list & search */}
            <div className="loc-card-sidebar glass-card-base">
              <div className="search-wrap">
                <Search size={18} className="search-decor" />
                <input
                  type="text"
                  placeholder="Search by city, code, hub..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Zone selectors */}
              <div className="filter-chips-row">
                {['All', 'North', 'South', 'East', 'West'].map(zone => (
                  <button
                    key={zone}
                    className={`filter-btn ${selectedZone === zone ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedZone(zone);
                      const matches = ACTIVE_LOCATIONS.filter(l => zone === 'All' || l.zone === zone);
                      if (matches.length > 0) setSelectedId(matches[0].id);
                    }}
                  >
                    {zone}
                  </button>
                ))}
              </div>

              {/* Scrollable list */}
              <div className="sidebar-items-scroll">
                {filtered.map(loc => (
                  <div
                    key={loc.id}
                    ref={el => itemRefs.current[loc.id] = el}
                    className={`scroll-item-card ${selectedId === loc.id ? 'active' : ''}`}
                    onClick={() => setSelectedId(loc.id)}
                  >
                    <div className="item-meta">
                      <span className="code-text">{loc.code}</span>
                      <span className="badge-zone" data-zone={loc.zone}>{loc.zone}</span>
                    </div>
                    <h3 className="city-title">{loc.city}</h3>
                    <p className="facility-name">{loc.name}</p>
                    <p className="address-snippet">{loc.address}</p>
                    <div className="active-arrow">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="empty-search-fallback">
                    <p>No network location matched the search criteria.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Map panel */}
            <div className="loc-card-map-view glass-card-base">
              {/* Header stats bar */}
              <div className="map-view-header">
                <div className="map-live-status">
                  <span className="status-pulse-dot"></span>
                  <span>Active Network Monitor</span>
                </div>
                {hoveredStateName && (
                  <div className="state-name-overlay">
                    <span>{hoveredStateName}</span>
                  </div>
                )}
                {selectedLoc && (
                  <div className="coordinates-display">
                    <Compass size={14} className="compass-icon" />
                    <span>Lon {selectedLoc.lon.toFixed(4)} | Lat {selectedLoc.lat.toFixed(4)}</span>
                  </div>
                )}
              </div>

              {/* Main SVG Vector map of India */}
              <div className="vector-map-frame">
                <svg viewBox="0 0 612 696" className="india-vector-svg">
                  {/* Detailed State Boundaries */}
                  <g className="india-states-group">
                    {IndiaMapData.locations.map(loc => (
                      <path
                        key={loc.id}
                        d={loc.path}
                        className="india-state-path"
                        onMouseEnter={() => setHoveredStateName(loc.name)}
                        onMouseLeave={() => setHoveredStateName(null)}
                      />
                    ))}
                  </g>

                  {/* Network Backbone Topology Interconnect Lines */}
                  {HUB_CONNECTIONS.map((conn, idx) => {
                    const pt1 = project(conn.from.lon, conn.from.lat);
                    const pt2 = project(conn.to.lon, conn.to.lat);
                    return (
                      <g key={idx}>
                        <line
                          x1={pt1.x}
                          y1={pt1.y}
                          x2={pt2.x}
                          y2={pt2.y}
                          className="backbone-mesh-line-bg"
                        />
                        <line
                          x1={pt1.x}
                          y1={pt1.y}
                          x2={pt2.x}
                          y2={pt2.y}
                          className="backbone-mesh-line"
                        />
                      </g>
                    );
                  })}

                  {/* Location Node Pins */}
                  {ACTIVE_LOCATIONS.map(loc => {
                    const pt = project(loc.lon, loc.lat);
                    const isSelected = selectedId === loc.id;
                    if (isSelected) return null; // Render selected on top
                    return (
                      <circle
                        key={loc.id}
                        cx={pt.x}
                        cy={pt.y}
                        r="3.5"
                        className="map-node-pin"
                        onClick={() => setSelectedId(loc.id)}
                      >
                        <title>{loc.code} - {loc.city} ({loc.name})</title>
                      </circle>
                    );
                  })}

                  {/* Selected Node Highlight and pulse rings */}
                  {selectedLoc && (() => {
                    const pt = project(selectedLoc.lon, selectedLoc.lat);
                    return (
                      <g className="selected-pin-group">
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="16"
                          className="selected-pin-pulse"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="6"
                          className="selected-pin-core"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="2.5"
                          fill="#ffffff"
                        />
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Selected location detail panel */}
              <AnimatePresence mode="wait">
                {selectedLoc && (
                  <motion.div
                    key={selectedLoc.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="location-meta-panel"
                  >
                    <div className="panel-header-row">
                      <div className="code-pill-wrap">
                        <span className="code-block-badge">{selectedLoc.code}</span>
                        <span className="zone-indicator-pill" data-zone={selectedLoc.zone}>{selectedLoc.zone} Operations</span>
                      </div>
                      <div className="icon-map-wrapper">
                        <MapPin size={18} />
                      </div>
                    </div>

                    <h2 className="meta-site-title">{selectedLoc.name}</h2>
                    <p className="meta-site-city-region">{selectedLoc.city} &bull; {selectedLoc.region} Hub</p>
                    <p className="meta-site-address">{selectedLoc.address}</p>

                    <div className="meta-spec-grid">
                      <div className="spec-card">
                        <span className="spec-label">Network Tier</span>
                        <span className="spec-value">Standard Enterprise Hub</span>
                      </div>
                      <div className="spec-card">
                        <span className="spec-label">Site Operations SLA</span>
                        <span className="spec-value flex-align-row">
                          <ShieldCheck size={14} className="val-decor" /> 24/7/365 Available
                        </span>
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
