import React, { useState, useEffect } from 'react';
import { BarChart, 
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

import { fetchSewageData } from '../services/waterAPIService';
import { SewageData } from '../services/types';

const ExceedanceByMunicipality: React.FC = () => {
  const [data, setData] = useState<SewageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchSewageData();  // Use the service function here
        if (Array.isArray(result)) {
          setData(result);
        } else {
          setError('Failed to fetch data');
        }
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Prepare data for the chart with actual limit and max record values
  const municipalityData = data.reduce((acc: Record<string, number>, record) => {
    if (acc[record.siteMunicipality]) {
      acc[record.siteMunicipality] += record.exceedanceCount;
    } else {
      acc[record.siteMunicipality] = record.exceedanceCount;
    }
    return acc;
  }, {});

  const chartData = Object.entries(municipalityData).map(([municipality, exceedanceCount]) => ({
    siteMunicipality: municipality,
    exceedanceCount,
  }));

  return (
    <div>
      <h2 className="pitch">Num of exceedances by Municipality</h2>
      {/* Bar Chart with Actual Values */}
      <ResponsiveContainer width="100%" height={800}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 200 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            label={{value: "Municipality", position: "bottom", offset: 150}}
            dataKey="siteMunicipality"
            angle={-90}
            textAnchor="end"
            dy={10}
            interval={0}
            style={{ fontSize: '12px' }}
          />
          <YAxis label={{value: "num exceedence", angle: -90, position: 'insideLeft', dy: 75}} />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="exceedanceCount" fill="#82ca9d" />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExceedanceByMunicipality;

