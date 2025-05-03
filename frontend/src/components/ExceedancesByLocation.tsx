import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

interface ExceedanceData {
  facilityOwner: string;
  exceedanceCount: number;
  siteAddress: string;
  siteMunicipality: string;
  district: string;
}

interface LocationData extends ExceedanceData {
  latitude: number;
  longitude: number;
}

const opencage_API = 'c100f1fbf6284e01b3eecf51ca53e196'
//const opencage_API = '37813eb47fd446eaa689706ce23d229c'

const ExceedancesByLocation: React.FC = () => {
  const [data, setData] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoordinates = async (location: ExceedanceData): Promise<LocationData | null> => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${location.siteAddress},` +
            `${location.siteMunicipality},Canada&key=${opencage_API}`;

  
    try {
      const response = await fetch(url);
      const results = await response.json();
  
      // Check if there are results
      if (!results.results || results.results.length === 0) {
        throw new Error('No results found for location');
      }
  
      // Access latitude and longitude from the geometry property
      const { lat, lng } = results.results[0].geometry;
      console.log(lat, lng, location.siteAddress, location.district);
  
      // Return the updated location with coordinates
      return { ...location, latitude: lat, longitude: lng };
    } catch (error) {
      console.error(
        'Failed to fetch coordinates for ' + 
        `${location.siteAddress}, ${location.district}`, 
        error
      );      
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sewage');
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid content type. Expected application/json.');
        }
        
        const results: ExceedanceData[] = await response.json();
        
        // Fetch coordinates for each entry
        const locationsWithCoordinates = await Promise.all(
          results.map(async (entry) => await fetchCoordinates(entry))
        );

        // Filter out any locations where coordinates couldn't be fetched
        const filteredLocations = locationsWithCoordinates.filter(
          (location): location is LocationData => location !== null
        );
        
        setData(filteredLocations);        
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

  // Define a function to calculate the circle radius based on exceedance count
  const calculateRadius = (count: number) => {
    const baseRadius = 100; // base radius in meters
    return baseRadius + count * 100; // Increase radius based on exceedance count
  };

  // Toronto center as default
  const center: LatLngExpression = [43.651070, -79.347015];

  return (
    <div>
      <h2 className="pitch">Sewage Exceedances by Location</h2>
      <MapContainer center={center} zoom={6} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {data.map((entry, index) => (
          <Circle
            key={index}
            center={[entry.latitude, entry.longitude] as LatLngExpression}
            radius={calculateRadius(entry.exceedanceCount)}
            color="red"
            fillOpacity={0.6}
          >
            <Tooltip>
              <div>
                <strong>Facility Name: {entry.facilityOwner}</strong>
                <br />
                Exceedance Count: {entry.exceedanceCount}
              </div>
            </Tooltip>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default ExceedancesByLocation;
