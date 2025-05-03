import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import React from 'react';
import ExceedanceByMunicipality from '../components/ExceedanceByMunicipality';
import { fetchSewageData } from '../services/waterAPIService';

// Mocking the global fetch function
jest.mock('../services/waterAPIService', () => ({
  fetchSewageData: jest.fn(),
}));

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

    render(<ExceedanceByMunicipality />);

    // Ensure that the loading message is displayed
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays an error message when data fetching fails', async () => {
    // Mock the fetch function to simulate a failure
    fetchSewageData.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(<ExceedanceByMunicipality />);

    // Wait for the error message to appear
    await waitFor(() => 
      expect(screen.getByText(/Error: Failed to fetch data/i))
        .toBeInTheDocument()
    );
  });

  it('renders the chart with correct data when fetch succeeds', async () => {
    // Mock fetchSewageData to return sample data
    const mockData = [
      { siteMunicipality: 'Municipality 1', exceedanceCount: 5 },
      { siteMunicipality: 'Municipality 2', exceedanceCount: 10 },
    ];
    (fetchSewageData as jest.Mock).mockResolvedValueOnce(mockData);

    render(<ExceedanceByMunicipality />);

    // Wait for the chart to be rendered
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    // Check if the chart contains the municipality names and exceedance counts
    expect(screen.getByText('Num of exceedances by Municipality')).toBeInTheDocument();
  });
});