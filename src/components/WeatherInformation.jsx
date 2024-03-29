import ForecastByDay from "./ForecastByDay";
import CurrentDayInfo from "./CurrentDayInfo";
import MiscWeatherInfo from "./MiscWeatherInfo";
import ForecastByHour from "./ForecastByHour";
import { useContext, useState } from "react";
import FetchDataContext from "context/FetchDataContext";

export default function WeatherInformation() {
  const [dayRef, setDayRef] = useState(0);
  const FD = useContext(FetchDataContext);

  if (!FD) return null;
  if (!FD.location) return "Incorrect city";

  return (
    <div className="content-box">
      <ForecastByDay setDayRef={setDayRef} />
      <CurrentDayInfo />
      <MiscWeatherInfo />
      <ForecastByHour dayRef={dayRef} />
    </div>
  );
}
