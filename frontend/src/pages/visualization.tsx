import React from 'react';
import '../styling/visualization.css'
import ExceedancesByLocation from '../components/ExceedancesByLocation';
import SewageExceedenceGraph from '../components/SewageExceedenceGraph'
import ExceedancesByMunicipality from '../components/ExceedanceByMunicipality';
import AverageExceedance from '../components/AverageExceedance';
import BrucePowerLineGraph from '../components/BrucePowerLineGraph';
import ExceedancePieChart from '../components/ExceedancePieChart';

const App: React.FC = () => {
  return (
    <div>
        <div className="visualize-data">
          <ExceedancesByLocation />
          <ExceedancesByMunicipality />
          <SewageExceedenceGraph />
          <AverageExceedance />
          <BrucePowerLineGraph />
          <ExceedancePieChart />
      </div>
    </div>
  );
};

export default App;
