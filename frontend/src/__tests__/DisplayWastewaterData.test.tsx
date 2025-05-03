import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import DisplayWastewaterData from '../components/DisplayWastewaterData';
import '@testing-library/jest-dom';

describe('DisplayWastewaterData Component', () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // Reset mocks before each test
  });

  test('renders loading state', () => {
    render(<DisplayWastewaterData />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error state', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch'))) as jest.Mock;
    render(<DisplayWastewaterData />);
    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
  });

  test('fetches and displays wastewater data', async () => {
    const mockData = [
      {
        id: 1,
        lastUpdated: '2024-10-20',
        sector: 'Manufacturing',
        facility: 'Facility A',
        facilityMunicipality: 'City X',
        companyCode: '12345',
        sampleDate: '2024-10-01',
        sampleCollectionFrequency: 'Monthly',
        controlPointName: 'Control 1',
        controlPointId: 'CP1',
        parameter: 'pH',
        parameterValue: 7.5,
        parameterUnit: 'pH units',
        reportedParameter: 'pH',
        resultStructure: 'Single',
        componentType: 'Water',
        regulation: 'Regulation A',
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
        headers: { get: () => 'application/json' },
      })
    ) as jest.Mock;

    render(<DisplayWastewaterData />);
    expect(await screen.findByText(/Facility A/i)).toBeInTheDocument();
    expect(screen.getByText(/Manufacturing/i)).toBeInTheDocument();
  });

  test('downloads CSV file', async () => {
    const mockData = [
      {
        id: 1,
        lastUpdated: '2024-10-20',
        sector: 'Manufacturing',
        facility: 'Facility A',
        facilityMunicipality: 'City X',
        companyCode: '12345',
        sampleDate: '2024-10-01',
        sampleCollectionFrequency: 'Monthly',
        controlPointName: 'Control 1',
        controlPointId: 'CP1',
        parameter: 'pH',
        parameterValue: 7.5,
        parameterUnit: 'pH units',
        reportedParameter: 'pH',
        resultStructure: 'Single',
        componentType: 'Water',
        regulation: 'Regulation A',
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
        headers: { get: () => 'application/json' },
      })
    ) as jest.Mock;

    render(<DisplayWastewaterData />);

    // Wait for data to load
    await waitFor(() => screen.getByText(/Facility A/i));

    // Mock URL.createObjectURL to simulate download
    const createObjectURLMock = jest.fn();
    global.URL.createObjectURL = createObjectURLMock;

    // Click download button
    fireEvent.click(screen.getByText(/Download as CSV/i));
    expect(createObjectURLMock).toHaveBeenCalled();
  });
});
