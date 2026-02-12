"use client";

import { useEffect, useState } from "react";

interface Vehicle {
  id: string;
  attributes: {
    current_status: string;
    latitude: number;
    longitude: number;
  };
}

export default function Home() {
  const [data, setData] = useState<Vehicle[]>([]);
  const [refreshInterval, setRefreshInterval] = useState(10000);
  const [updatedTime, setUpdateTime] = useState<Date | null>(null)

  const handleChangeInterval = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRefreshInterval(Number(e.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api-v3.mbta.com/vehicles?filter[route]=Red'
        )
          .then((r) => r.json())
          .then((r) => r.data);
        console.log(response);
        setData(response);
        setUpdateTime(new Date())
      } catch (error) {
        console.error("fetch failed", error);
      }
    };

    fetchData();
    const intervalID = setInterval(() => {
      fetchData();
    }, refreshInterval);
    return () => {
      clearInterval(intervalID);
    };
  }, [refreshInterval]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-6xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {data.length > 0 ? (
            data.map((vehicle) => (
              <div key={vehicle.id} className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-2">{vehicle.attributes.current_status}</h3>
                <p className="text-sm text-gray-600">ID: {vehicle.id}</p>
                <p className="text-sm text-gray-600">Latitude: {vehicle.attributes.latitude}</p>
                <p className="text-sm text-gray-600">Longitude: {vehicle.attributes.longitude}</p>
              </div>
            ))
          ) : (
            <p>Loading stops...</p>
          )}
        </div>
        {updatedTime &&
          <div>Update at: {updatedTime.toLocaleString()}</div>
}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label
            htmlFor="refresh-interval"
            style={{ color: "#666", fontSize: "14px" }}
          >
            Refresh every:
          </label>
          <select
            id="refresh-interval"
            value={refreshInterval}
            onChange={(e) => handleChangeInterval(e)}
            style={{
              padding: "4px 8px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          >
            <option value={10000}>10 seconds</option>
            <option value={30000}>30 seconds</option>
            <option value={60000}>1 minute</option>
            <option value={120000}>2 minutes</option>
          </select>
        </div>
      </main>
    </div>
  );
}