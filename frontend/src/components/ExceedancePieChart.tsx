import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { SewageData } from '../services/types';
import { fetchSewageData } from '../services/waterAPIService';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c'];

const ExceedancePieChart: React.FC = () => {
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

  const chartData = Object.values(
    data.reduce((acc, record) => {
      if (!acc[record.contaminant]) {
        acc[record.contaminant] = { name: record.contaminant, value: 0 };
      }
      acc[record.contaminant].value += record.exceedanceCount;
      return acc;
    }, {} as Record<string, { name: string; value: number }>)
  );
  
  // Calculate the total number of exceedances
  const totalExceedances = chartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div>
      <h2 className="pitch">Sewage Exceedances by Contaminant</h2>
      <p>Total different contaiminants: {chartData.length}</p>
      <p>Total number of exceedances: {totalExceedances}</p>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExceedancePieChart;