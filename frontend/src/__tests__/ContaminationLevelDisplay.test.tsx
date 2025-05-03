import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContaminationLevelDisplay from '../components/ContaminationLevelDisplay';
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
  // Add more mock data if needed
];

// Test suite
describe('DisplaySewageData Component', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    fetchSewageData.mockResolvedValueOnce([]); // mock an empty response
    render(<ContaminationLevelDisplay />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state if fetch fails', async () => {
    fetchSewageData.mockRejectedValueOnce(new Error('Failed to fetch data'));
    render(<ContaminationLevelDisplay />);

    await waitFor(() => {
      expect(screen.getByText(/error: failed to fetch data/i)).toBeInTheDocument();
    });
  });

  it('renders data correctly once fetched', async () => {
    fetchSewageData.mockResolvedValueOnce(mockData);
    render(<ContaminationLevelDisplay />);

    await waitFor(() => {
      expect(screen.getByText(mockData[0].siteAddress)).toBeInTheDocument();
    });
  });
});