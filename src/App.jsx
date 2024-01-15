// Error Boundary
import { useState } from "react";
import LocationInput from "./components/LocationInput";
import WeatherInformation from "./components/WeatherInformation";
import { FetchDataProvider } from "context/FetchDataContext";

export default function App() {
  const [location, setLocation] = useState(null);
  return (
    <>
      <LocationInput setLocation={setLocation} />
      <FetchDataProvider location={location}>
        <WeatherInformation key={location} />
      </FetchDataProvider>
    </>
  );
}
