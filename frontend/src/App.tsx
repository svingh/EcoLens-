import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import DisplayWastewaterData from './components/DisplayWastewaterData';
import DisplaySewageData from './components/DisplaySewageData';
import ContaminationLevelDisplay from './components/ContaminationLevelDisplay';
import HighContaminationLevel from './components/HighContaminationLevel';
import Visualization from './pages/visualization';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header className="title">ECOLENS DASHBOARD WELCOMES YOU</header>
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <span className="separator">|</span>
          <Link to="/new-page" className="nav-link">Visualization</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="pitch">
              {/* Replace <body> with <div> */}
              Introducing Apaline EcoLens — a powerful compliance
               tracking dashboard designed to monitor regions 
              where sewage and industrial wastewater emissions
               exceed environmental standards.
              This tool empowers users, including environmental
               regulators, policymakers, and industry stakeholders, 
              to stay informed about areas of noncompliance, helping
               them assess the combined pressures on local 
              water systems and environmental health.
              By integrating datasets on sewage emissions and industrial
               wastewater, the platform offers real-time 
              insights into how these factors impact regional water quality.
              With its intuitive dashboard, users can visualize 
              noncompliant areas, track trends, and prioritize 
              corrective actions to protect vital water resources.
              
                <DisplayWastewaterData />
                <DisplaySewageData />
                <ContaminationLevelDisplay />
                <HighContaminationLevel />
              </div>
            }
          />
          <Route path="/new-page" element={<Visualization />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
