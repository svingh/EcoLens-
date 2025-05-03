import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import ExceedancePieChart from '../components/ExceedancePieChart'
import { fetchSewageData } from '../services/waterAPIService';

// Mock the service call
jest.mock('../services/waterAPIService', () => ({
    fetchSewageData: jest.fn(),
  }));
  
// Sample data to test with
const mockData = [
  {
    id: 1,
    lastUpdated: '2024-01-01',
    facilityOwner: 'Owner 1',
    siteAddress: '123 Street',
    siteMunicipality: 'Municipality 1',
    sector: 'Sector A',
    district: 'District 1',
    contaminant: 'Contaminant 1',
    contaminantLimit: '10',
    contaminantUnit: 'mg/L',
    contaminantMinRecord: '5',
    contaminantMaxRecord: '9',
    exceedanceType: 'None',
    exceedanceStart: '',
    exceedanceEnd: '',
    exceedanceCount: 0,
    limitFrequency: 'Annual',
    facilityAction: 'Action 1',
    ministryAction: 'Action 2',
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
    fetchSewageData.mockResolvedValueOnce([]);

    render(<ExceedancePieChart />);

    // Ensure that the loading message is displayed
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays an error message when data fetching fails', async () => {
    // Mock the fetch function to simulate a failure
    fetchSewageData.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(<ExceedancePieChart />);

    // Wait for the error message to appear
    await waitFor(() => 
      expect(screen.getByText(/Error: Failed to fetch data/i))
        .toBeInTheDocument()
    );
  });

  it('renders the chart with correct data when fetch succeeds', async () => {
    // Mock fetchSewageData to return sample data
    fetchSewageData.mockResolvedValueOnce(mockData);


    render(<ExceedancePieChart />);

    // Wait for the chart to be rendered
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    // Check if the chart contains the municipality names and exceedance counts
    expect(screen.getByText('Sewage Exceedances by Contaminant')).toBeInTheDocument();
    expect(screen.getByText('Total different contaiminants: 1')).toBeInTheDocument();
  });
});