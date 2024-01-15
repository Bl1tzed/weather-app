import { useState, useEffect, createContext } from "react";

const FetchDataContext = createContext(null);

export function FetchDataProvider({ children, location }) {
  const [fetchData, setFetchData] = useState(null);
  const url = "http://api.weatherapi.com/v1/forecast.json?";

  useEffect(() => {
    const key = process.env.REACT_APP_API_KEY;
    const searchParams = new URLSearchParams(document.location.search);
    const queryLocation = searchParams.get("q");

    if (!key) return;

    const fetchingData = async (location) => {
      try {
        const response = await fetch(
          url +
            new URLSearchParams({
              q: location,
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
    if (queryLocation) fetchingData(queryLocation);
    if (location != null) fetchingData(location.value);
  }, [location]);

  return (
    <FetchDataContext.Provider value={fetchData}>
      {children}
    </FetchDataContext.Provider>
  );
}
