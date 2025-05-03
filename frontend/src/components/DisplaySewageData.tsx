// src/components/DisplaySewageData.tsx
import React, { useEffect, useState } from 'react';
import { fetchSewageData } from '../services/waterAPIService';
import { SewageData } from '../services/types';

const DisplaySewageData: React.FC = () => {
  const [data, setData] = useState<SewageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState<number>(1);  
  const itemsPerPage = 10;  

  // Fetch data using the service function
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Convert the data to CSV format
  const convertToCSV = (data: SewageData[]) => {
    const headers = [
      'id', 'Last Updated', 'Facility Owner', 'Site Address', 'Site Municipality', 'Sector',
      'District', 'Contaminant', 'Contaminant Limit', 'Contaminant Unit',
      'Contaminant Min Record', 'Contaminant Max Record', 'Exceedance Type',
      'Exceedance Start', 'Exceedance End', 'Exceedance Count', 'Limit Frequency',
      'Facility Action', 'Ministry Action'
    ];
    
    const rows = data.map(entry => [
      entry.id, entry.lastUpdated, entry.facilityOwner, entry.siteAddress,
      entry.siteMunicipality, entry.sector, entry.district, entry.contaminant,
      entry.contaminantLimit, entry.contaminantUnit, entry.contaminantMinRecord,
      entry.contaminantMaxRecord, entry.exceedanceType, entry.exceedanceStart,
      entry.exceedanceEnd, entry.exceedanceCount, entry.limitFrequency,
      entry.facilityAction, entry.ministryAction
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    return csvContent;
  };

  // Trigger download of CSV file
  const downloadCSV = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sewage_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate the number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the current page's data
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Pagination Controls
  const PaginationControls = () => (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </button>
      <span> Page {currentPage} of {totalPages} </span>
      <button disabled={currentPage === totalPages} 
        onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  );

  return (
    <div>
      <h2 className='pitch'>Current Sewage Data</h2>

      {/* Button to download CSV */}
      <button onClick={downloadCSV} style={{ marginBottom: '10px' }}>
        Download as CSV
      </button>

      {/* Top pagination controls */}
      <PaginationControls />

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Last Updated</th>
              <th>Facility Owner</th>
              <th>Site Address</th>
              <th>Site Municipality</th>
              <th>Sector</th>
              <th>District</th>
              <th>Contaminant</th>
              <th>Contaminant Limit</th>
              <th>Contaminant Unit</th>
              <th>Contaminant Min Record</th>
              <th>Contaminant Max Record</th>
              <th>Exceedance Type</th>
              <th>Exceedance Start</th>
              <th>Exceedance End</th>
              <th>Exceedance Count</th>
              <th>Limit Frequency</th>
              <th>Facility Action</th>
              <th>Ministry Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.id}</td>
                <td>{entry.lastUpdated}</td>
                <td>{entry.facilityOwner}</td>
                <td>{entry.siteAddress}</td>
                <td>{entry.siteMunicipality}</td>
                <td>{entry.sector}</td>
                <td>{entry.district}</td>
                <td>{entry.contaminant}</td>
                <td>{entry.contaminantLimit}</td>
                <td>{entry.contaminantUnit}</td>
                <td>{entry.contaminantMinRecord}</td>
                <td>{entry.contaminantMaxRecord}</td>
                <td>{entry.exceedanceType}</td>
                <td>{entry.exceedanceStart}</td>
                <td>{entry.exceedanceEnd}</td>
                <td>{entry.exceedanceCount}</td>
                <td>{entry.limitFrequency}</td>
                <td>{entry.facilityAction}</td>
                <td>{entry.ministryAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom pagination controls */}
      <PaginationControls />
    </div>
  );
};

export default DisplaySewageData;
