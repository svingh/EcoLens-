import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    ResponsiveContainer, ReferenceLine } from 'recharts';

interface SewageData {
  id: number;
  lastUpdated: string;
  facilityOwner: string;
  siteAddress: string;
  siteMunicipality: string;
  sector: string;
  district: string;
  contaminant: string;
  contaminantLimit: number;
  contaminantUnit: string;
  contaminantMinRecord: number;
  contaminantMaxRecord: number;
  exceedanceType: string;
  exceedanceStart: string;
  exceedanceEnd: string;
  exceedanceCount: number;
  limitFrequency: string;
  facilityAction: string;
  ministryAction: string;
}

const AverageExceedanceGraph: React.FC = () => {
  const [data, setData] = useState<SewageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sewage');
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid content type. Expected application/json.');
        }

        const result = await response.json();
        setData(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          //Check if an unknown error occured
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Prepare data for the chart with sewage contaminant exceedances
  //and calculate
  const averageExceedanceData = Object.values(
    data.reduce((acc, record) => {
      if (!acc[record.contaminant]) {
        acc[record.contaminant] = { contaminant: record.contaminant, 
          totalExceedances: 0, count: 0 };
      }
      acc[record.contaminant].totalExceedances += record.exceedanceCount;
      acc[record.contaminant].count += 1;
      return acc;
    }, {} as Record<string, { contaminant: string; totalExceedances: number; 
      count: number }>)
  ).map((entry) => ({
    contaminant: entry.contaminant,
    averageExceedance: entry.totalExceedances / entry.count,
  }));

  //Sort by average exceedance by top 10
  averageExceedanceData.sort((a, b) => b.averageExceedance - a.averageExceedance);
  const top10AverageExceedanceData = averageExceedanceData.slice(0, 10);

  return (
    <div>
        {/* Bar Chart with Actual Values */}
      <h2 className="pitch">Top 10 Average Sewage Exceedances per Contaminant Type</h2>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart data={top10AverageExceedanceData} margin={{ top: 20, right: 30, 
          left: 20, bottom: 220 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="contaminant" 
            label={{ value: "Contaminant Type", position: "bottom", offset: 160}} 
            interval={0} 
            angle={-45} //Manually rotated it so all the font can fit together
            tick={{ fontSize: 10 }}
            textAnchor="end" 
          />
          <YAxis label={{ value: "Average Exceedance", angle: -90, 
            position: 'insideLeft', dy: 75 }} />
          <ReferenceLine y={0} stroke="#000" />
          {/* Changed bar graph colour */}
          <Bar dataKey="averageExceedance" fill="#006884" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageExceedanceGraph;