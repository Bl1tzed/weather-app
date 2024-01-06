// SAAS, CSS Modules
// Error Boundary
// try catch для fetch

import { useState, useEffect } from "react";
import LocationInput from "./LocationInput";
import WeatherInformation from "./WeatherInformation";

export default function App() {
  //eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useState(null);
  //eslint-disable-next-line no-unused-vars
  const [fetchData, setFetchData] = useState(null);
  const url = "http://api.weatherapi.com/v1/forecast.json?";

  useEffect(() => {
    //eslint-disable-next-line no-undef
    const key = process.env.REACT_APP_API_KEY;
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
    //{fetchData.forecast.forecastday.day.avgtemp_c}
    <>
      <LocationInput className="inputBox" setLocation={setLocation} />

      <div id="content-box">
        <WeatherInformation fetchData={fetchData} />
      </div>
    </>
  );
}

// fetch(url + new URLSearchParams({
//   q: location,
//   key: key,
//   days: 1,
//   aqi: "no",
//   alerts: "no"
// }))
//   .then(response => response.json())
//   .then(data => setFetchData(data))
