// Error Boundary
import { useState, createContext } from "react";
import LocationInput from "./components/LocationInput";
import WeatherInformation from "./components/WeatherInformation";
import { FetchDataProvider } from "context/FetchDataContext";

export const FetchDataContext = createContext(null);

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
