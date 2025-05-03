import React, { useEffect, useState } from 'react';

interface WastewaterData {
  id: number;
  lastUpdated: string;
  sector: string;
  facility: string;
  facilityMunicipality: string;
  companyCode: string;
  sampleDate: string; 
  sampleCollectionFrequency: string | null; 
  controlPointName: string;
  controlPointId: string; 
  parameter: string;  
  parameterValue: number;
  parameterUnit: string;
  reportedParameter: string;
  resultStructure: string;
  componentType: string;
  regulation: string;
}

const DisplayWastewaterData: React.FC = () => {
  const [data, setData] = useState<WastewaterData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState<number>(1);  
  const itemsPerPage = 10;

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/wastewater');
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

  // Convert data to CSV
  const convertToCSV = (data: WastewaterData[]) => {
    const headers = [
      'Last Updated', 'Sector', 'Facility', 'Company Code', 'Municipality',
      'Sample Date', 'Control Point Name', 'Control Point ID', 'Parameter',
      'Value', 'Unit', 'Reported As', 'Frequency',
      'Result Structure', 'Component Type', 'Regulation'
    ];
    
    const rows = data.map(entry => [
      entry.lastUpdated, entry.sector, entry.facility,
      entry.companyCode, entry.facilityMunicipality,
      entry.sampleDate, entry.controlPointName,
      entry.controlPointId, entry.parameter,
      entry.parameterValue, entry.parameterUnit, entry.reportedParameter,
      entry.sampleCollectionFrequency || 'N/A', entry.resultStructure,
      entry.componentType, entry.regulation
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    return csvContent;
  };

  // Download CSV file
  const downloadCSV = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wastewater_data.csv');
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
      <h2 className='pitch'>Current Industrial Wastewater Data</h2>

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
              <th>Last Updated</th>
              <th>Sector</th>
              <th>Facility</th>
              <th>Company Code</th>
              <th>Municipality</th>
              <th>Sample Date</th>
              <th>Control Point Name</th>
              <th>Control Point ID</th>
              <th>Parameter</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Reported As</th>
              <th>Frequency</th>
              <th>Result Structure</th>
              <th>Component Type</th>
              <th>Regulation</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.lastUpdated}</td>
                <td>{entry.sector}</td>
                <td>{entry.facility}</td>
                <td>{entry.companyCode}</td>
                <td>{entry.facilityMunicipality}</td>
                <td>{entry.sampleDate}</td>
                <td>{entry.controlPointName}</td>
                <td>{entry.controlPointId}</td>
                <td>{entry.parameter}</td>
                <td>{entry.parameterValue}</td>
                <td>{entry.parameterUnit}</td>
                <td>{entry.reportedParameter}</td>
                <td>{entry.sampleCollectionFrequency || 'N/A'}</td>
                <td>{entry.resultStructure}</td>
                <td>{entry.componentType}</td>
                <td>{entry.regulation}</td>
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

export default DisplayWastewaterData;
