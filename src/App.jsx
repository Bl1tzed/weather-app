// SAAS, CSS Modules
// Error Boundary

import { useState, useEffect } from "react";
import LocationInput from "./LocationInput";
import WeatherInformation from "./WeatherInformation";

export default function App() {
  const [location, setLocation] = useState(null);
  const [fetchData, setFetchData] = useState(null);
  const url = "http://api.weatherapi.com/v1/forecast.json?";

  useEffect(() => {
    const key = process.env.REACT_APP_API_KEY;

    if (!key) return;

    const fetchingData = async (location) => {
      try {
        const response = await fetch(
          url +
            new URLSearchParams({
              q: location.value,
              key: key,
              days: 7,
              aqi: "no",
              alerts: "no",
            })
        );
        const result = await response.json();
        setFetchData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (location != null) {
      fetchingData(location);
    }
  }, [location]);

  return (
    <>
      <LocationInput className="inputBox" setLocation={setLocation} />
      <WeatherInformation fetchData={fetchData} />
    </>
  );
}
