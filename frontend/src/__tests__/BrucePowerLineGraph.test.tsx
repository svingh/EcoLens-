import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import { fetchWastewaterData } from '../services/waterAPIService';
import BrucePowerLineGraph from '../components/BrucePowerLineGraph';

// Mock the service call
jest.mock('../services/waterAPIService', () => ({
    fetchWastewaterData: jest.fn(),
  }));
  
// Sample data to test with
const mockData = [
  {
    id: 1,
    lastUpdated: '2024-11-01T10:00:00',
    sector: 'Electric Power Generation',
    facility: 'BRUCE POWER INC. - MAIN PLANT',
    facilityMunicipality: 'Kincardine',
    companyCode: '0001840101',
    sampleDate: '2018-01-15',
    sampleCollectionFrequency: 'Monthly',
    controlPointName: 'Effluent Discharge',
    controlPointId: '1001',
    parameter: 'IRON',
    parameterValue: 3.5,
    parameterUnit: 'KG/D',
    reportedParameter: 'Iron (Total)',
    resultStructure: 'Average',
    componentType: 'MISA Monthly Reporting',
    regulation: 'EPA Compliance',
  },
];

// fixes ResizeObserver not defined error
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('ExceedanceByMunicipality Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading message while data is being fetched', () => {
    // Mock the fetch function to return a promise (simulating loading state)
    fetchWastewaterData.mockResolvedValueOnce([]);

    render(<BrucePowerLineGraph />);

    // Ensure that the loading message is displayed
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays an error message when data fetching fails', async () => {
    // Mock the fetch function to simulate a failure
    fetchWastewaterData.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(<BrucePowerLineGraph />);

    // Wait for the error message to appear
    await waitFor(() => 
      expect(screen.getByText(/Error: Failed to fetch data/i))
        .toBeInTheDocument()
    );
  });

  it('renders the chart with correct data when fetch succeeds', async () => {
    // Mock fetchSewageData to return sample data
    fetchWastewaterData.mockResolvedValueOnce(mockData);


    render(<BrucePowerLineGraph />);

    // Wait for the chart to be rendered
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    // Check if the chart contains the municipality names and exceedance counts
    expect(screen.getByText(
        'Bruce Power Iron Contaminant Data by Most Recent Exceedance Start')).toBeInTheDocument();
  });
});