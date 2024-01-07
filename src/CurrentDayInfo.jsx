import SmallWeatherCard from "SmallWeatherCard";

export default function CurrentDayInfo({ fetchData, getWeatherIconURL }) {
  const FD = fetchData.current;

  const date = new Date(FD.last_updated);
  const dateTime = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;

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
