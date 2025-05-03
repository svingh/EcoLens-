import React, { useState, useEffect } from 'react';
import { fetchSewageData } from '../services/waterAPIService';
import { SewageData } from '../services/types';

const ContaminationLevelDisplay: React.FC = () => {
  const [data, setData] = useState<SewageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lowestEmissions, setLowestEmissions] = useState<SewageData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSewageData();  // Use the service function here
        setData(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sort the data and get the top 3 areas with the lowest emissions
  useEffect(() => {
    if (data.length > 0) {
      const sortedData = [...data].sort((a, b) => {
        const aRatio = a.contaminantMaxRecord / a.contaminantLimit;
        const bRatio = b.contaminantMaxRecord / b.contaminantLimit;
        return aRatio - bRatio;
      });
      setLowestEmissions(sortedData.slice(0, 3)); // Top 3 areas with the lowest emissions
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Top 3 Areas with Lowest Emissions */}
      <h2 className="pitch">Top 3 Areas with Lowest Sewage Contamination Levels</h2>
      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Site Address</th>
              <th>Site Municipality</th>
              <th>Sector</th>
              <th>District</th>
              <th>Contaminant</th>
              <th>Type of Exceedance</th>
              <th>Exceedance Start Date</th>
              <th>Exceedance End Date</th>
              <th>Contaminant Limit</th>
              <th>Max Contamination (mg/L)</th>
            </tr>
          </thead>
          <tbody>
            {lowestEmissions.map((area, index) => (
              <tr key={index}>
                <td>{area.siteAddress}</td>
                <td>{area.siteMunicipality}</td>
                <td>{area.sector}</td>
                <td>{area.district}</td>
                <td>{area.contaminant}</td>
                <td>{area.exceedanceType}</td>
                <td>{area.exceedanceStart}</td>
                <td>{area.exceedanceEnd}</td>
                <td>{area.contaminantLimit}</td>
                <td>{area.contaminantMaxRecord}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContaminationLevelDisplay;
