import { fetchSewageData, fetchWastewaterData } from '../services/waterAPIService';

global.fetch = jest.fn();

describe('dataService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchSewageData', () => {
    it('should return data when the fetch is successful', async () => {
      const mockSewageData = [
        { id: '1', contaminant: 'Nitrogen', value: 12 },
        { id: '2', contaminant: 'Phosphorus', value: 8 },
      ];
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSewageData),
      });

      const result = await fetchSewageData();
      expect(result).toEqual(mockSewageData);
      expect(fetch).toHaveBeenCalledWith('/api/sewage');
    });

    it('should return an empty array if the fetch fails with non-OK status', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const result = await fetchSewageData();
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalledWith('/api/sewage');
    });

    it('should return an empty array if an error is thrown', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

      const result = await fetchSewageData();
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalledWith('/api/sewage');
    });
  });

  describe('fetchWastewaterData', () => {
    it('should return data when the fetch is successful', async () => {
      const mockWastewaterData = [
        { id: '1', location: 'Site A', measurement: 45 },
        { id: '2', location: 'Site B', measurement: 30 },
      ];
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: jest.fn().mockReturnValue('application/json'),
        },
        json: jest.fn().mockResolvedValue(mockWastewaterData),
      });

      const result = await fetchWastewaterData();
      expect(result).toEqual(mockWastewaterData);
      expect(fetch).toHaveBeenCalledWith('/api/wastewater');
    });

    it('should throw an error if the response is not OK', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      const result = await fetchWastewaterData();
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalledWith('/api/wastewater');
    });

    it('should throw an error if content type is invalid', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        headers: {
          get: jest.fn().mockReturnValue('text/plain'),
        },
        json: jest.fn(),
      });

      const result = await fetchWastewaterData();
      expect(result).toEqual(undefined);
      expect(fetch).toHaveBeenCalledWith('/api/wastewater');
    });

    it('should throw an error if an unexpected error occurs', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

      const result = await fetchWastewaterData();
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalledWith('/api/wastewater');
    });
  });
});
