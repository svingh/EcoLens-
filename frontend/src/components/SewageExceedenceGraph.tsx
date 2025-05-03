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

const ContaminationLevelDisplay: React.FC = () => {
  const [data, setData] = useState<SewageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Prepare data for the chart with actual limit and max record values
  const chartData = data.map((record) => ({
    id: record.id,
    exceedanceCount: record.exceedanceCount,
  }));

  return (
    <div>
      <h2 className="pitch">Num of exceedances per site</h2>
      {/* Bar Chart with Actual Values */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis label={{value: "id", position: "bottom", offset: 10}} dataKey="id" />
          <YAxis label={{value: "num exceedence", angle: -90, position: 'insideLeft', dy: 75}} />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="exceedanceCount" fill="#82ca9d" />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContaminationLevelDisplay;

