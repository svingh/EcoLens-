// src/services/dataService.ts
import { SewageData, WastewaterData } from './types'

export const fetchSewageData = async (): Promise<SewageData[]> => {
    try {
        const response = await fetch('/api/sewage');
        if (!response.ok) {
            throw new Error(`Failed to fetch sewage data. Status: ${response.status}`);
        }
        const data: SewageData[] = await response.json();
        console.log('API response:', data); // Log the response data
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

export const fetchWastewaterData = async (): Promise<WastewaterData[]> => {
    try {
        const response = await fetch('/api/wastewater');
        if (!response.ok) {
            throw new Error(`Failed to fetch sewage data. Status: ${response.status}`);
        }
        const data: WastewaterData[] = await response.json();
        console.log('API response:', data); // Log the response data
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
