import SmallWeatherCard from "components/SmallWeatherCard";
import getWeatherIconURL from "utils/getWeatherIconURL.jsx";
import { useContext } from "react";
import { FetchDataContext } from "App";
import { getCorrectTime } from "utils/helpers";

export default function CurrentDayInfo() {
  const fetchData = useContext(FetchDataContext);
  const FD = fetchData.current;

  const dateTime = getCorrectTime(FD.last_updated);

  return (
    <SmallWeatherCard
      header={fetchData.location.name}
      subHeader={dateTime}
      icon={getWeatherIconURL(FD)}
      title={FD.condition.text}
      bottomLeft={`HMD ${FD.humidity}%`}
      bottomRight={`${Math.round(FD.temp_c)}°C`}
    />
  );
}
