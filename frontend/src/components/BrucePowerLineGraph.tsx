import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer } from 'recharts';
import { WastewaterData } from '../services/types';
import { fetchWastewaterData } from '../services/waterAPIService';

const BrucePowerIronLineGraph: React.FC = () => {
  const [data, setData] = useState<WastewaterData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await fetch('/api/wastewater');
        //if (!response.ok) throw new Error(`Failed to fetch data. Status: ${response.status}`);

        const result = await fetchWastewaterData();

        // Filter for Bruce Power facility and iron parameter, then sort by date descending
        const sortedData = result
          .filter((entry: WastewaterData) => 
            entry.facility.includes('BRUCE POWER') && 
            entry.parameter === 'IRON'
          )
          .sort((a: WastewaterData, b: WastewaterData) => 
            new Date(b.sampleDate).getTime() - new Date(a.sampleDate).getTime()
          );

        // Get only entries from the most recent year in the dataset
        const latestYear = new Date(sortedData[0].sampleDate).getFullYear();
        const latestData = sortedData.filter((entry: WastewaterData) => 
          new Date(entry.sampleDate).getFullYear() === latestYear
        );

        setData(latestData);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
       <h2 className="pitch">Bruce Power Iron Contaminant Data by Most Recent Exceedance Start</h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 150 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="sampleDate"
            label={{ value: "Sample Date", position: "bottom", offset: 90 }}
            // Increased offset to lower the label
            angle={-45} 
            textAnchor="end" 
          />
          <YAxis 
            label={{ value: "Iron (KG/D)", angle: -90, position: 'insideLeft', dy: -10 }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="parameterValue" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BrucePowerIronLineGraph;
