'use client';

import { useEffect, useState } from 'react';

interface Vehicle {
  id: string;
  label: string;
  current_status: string;
  current_stop_sequence: number;
  direction_id: number;
  latitude: number;
  longitude: number;
  speed: number;
  updated_at: string;
}

interface Stop {
  id: string;
  name: string;
}

// Configurable refresh interval in milliseconds (30 seconds default)
const REFRESH_INTERVAL = 30000;

export default function RedLineTracker() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [refreshInterval, setRefreshInterval] = useState(REFRESH_INTERVAL);

  // Fetch Red Line vehicle data
  const fetchVehicles = async () => {
    try {
      const response = await fetch(
        'https://api-v3.mbta.com/vehicles?filter[route]=Red'
      );
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const vehicleData = data.data.map((v: any) => ({
        id: v.id,
        label: v.attributes.label,
        current_status: v.attributes.current_status,
        current_stop_sequence: v.attributes.current_stop_sequence,
        direction_id: v.attributes.direction_id,
        latitude: v.attributes.latitude,
        longitude: v.attributes.longitude,
        speed: v.attributes.speed || 0,
        updated_at: v.attributes.updated_at,
      }));
      
      setVehicles(vehicleData);
      setLastUpdate(new Date());
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load vehicle data');
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch Red Line stops (one-time)
    const fetchStops = async () => {
      try {
        const response = await fetch(
          'https://api-v3.mbta.com/stops?filter[route]=Red'
        );
        const data = await response.json();
        const stopList = data.data.map((stop: any) => ({
          id: stop.id,
          name: stop.attributes.name,
        }));
        console.log(stopList)
        setStops(stopList);
      } catch (err) {
        console.error('Error fetching stops:', err);
      }
    };

    fetchStops();
    
    // Initial fetch
    fetchVehicles();

    // Set up polling interval
    const intervalId = setInterval(() => {
      fetchVehicles();
    }, refreshInterval);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [refreshInterval]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN_TRANSIT_TO':
        return '#4CAF50'; // Green
      case 'STOPPED_AT':
        return '#FF9800'; // Orange
      case 'INCOMING_AT':
        return '#2196F3'; // Blue
      default:
        return '#9E9E9E'; // Gray
    }
  };

  const getDirectionLabel = (directionId: number) => {
    return directionId === 0 ? 'Southbound (Ashmont/Braintree)' : 'Northbound (Alewife)';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px', borderBottom: '3px solid #DA291C', paddingBottom: '15px' }}>
        <h1 style={{ color: '#DA291C', margin: 0, fontSize: '32px' }}>
          🚇 MBTA Red Line Tracker
        </h1>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <span style={{ color: '#666', fontSize: '14px' }}>
            {vehicles.length} {vehicles.length === 1 ? 'train' : 'trains'} active
          </span>
          {lastUpdate && (
            <span style={{ color: '#666', fontSize: '14px' }}>
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label htmlFor="refresh-interval" style={{ color: '#666', fontSize: '14px' }}>
              Refresh every:
            </label>
            <select
              id="refresh-interval"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              style={{
                padding: '4px 8px',
                fontSize: '14px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            >
              <option value={10000}>10 seconds</option>
              <option value={30000}>30 seconds</option>
              <option value={60000}>1 minute</option>
              <option value={120000}>2 minutes</option>
            </select>
          </div>
        </div>
        {error && (
          <div style={{ color: '#f44336', marginTop: '10px', fontSize: '14px' }}>
            ⚠️ {error}
          </div>
        )}
      </header>

      {loading && vehicles.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>Loading train data...</p>
        </div>
      )}

      {!loading && vehicles.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>No trains currently running on the Red Line.</p>
        </div>
      )}

      <div style={{ display: 'grid', gap: '15px' }}>
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderLeft: `4px solid ${getStatusColor(vehicle.current_status)}`,
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: '#333' }}>
                  Train {vehicle.label || vehicle.id}
                </h3>
                <div style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                  <div>
                    <strong>Direction:</strong> {getDirectionLabel(vehicle.direction_id)}
                  </div>
                  <div>
                    <strong>Status:</strong>{' '}
                    <span
                      style={{
                        color: getStatusColor(vehicle.current_status),
                        fontWeight: 'bold',
                      }}
                    >
                      {vehicle.current_status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  {vehicle.speed > 0 && (
                    <div>
                      <strong>Speed:</strong> {Math.round(vehicle.speed * 2.237)} mph
                    </div>
                  )}
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
                    Last updated: {new Date(vehicle.updated_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: getStatusColor(vehicle.current_status),
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {vehicle.current_status === 'IN_TRANSIT_TO' && '🚆 MOVING'}
                {vehicle.current_status === 'STOPPED_AT' && '🛑 STOPPED'}
                {vehicle.current_status === 'INCOMING_AT' && '➡️ ARRIVING'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ddd', color: '#666', fontSize: '14px' }}>
        <p>
          Data provided by{' '}
          <a href="https://www.mbta.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#DA291C' }}>
            MBTA
          </a>{' '}
          via their public API. Updates automatically every {refreshInterval / 1000} seconds.
        </p>
      </footer>
    </div>
  );
}
