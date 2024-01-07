import SmallWeatherCard from "SmallWeatherCard";

export default function MiscComponent({ fetchData, getWeatherIconURL }) {
  const FD = fetchData.forecast.forecastday[0];

  return (
    <SmallWeatherCard
      header={fetchData.location.name}
      subHeader={`${FD.day.maxwind_kph} km/h`}
      icon={getWeatherIconURL(FD.day)}
      title={`Precipitation ${FD.day.daily_chance_of_rain}%`}
      bottomLeft={`Rise ${timeConversion(FD.astro.sunrise)}`}
      bottomRight={`Set ${timeConversion(FD.astro.sunset)}`}
    />
  );
}

const timeConversion = (time) => {
  const [timeWithoutPeriod, period] = time.split(" ");
  let [hours, minutes] = timeWithoutPeriod.split(":");
  if (period === "PM" && hours !== "12") {
    hours = String(Number(hours) + 12);
  }
  if (period === "AM" && hours === "12") {
    hours = "00";
  }
  return `${hours}:${minutes}`;
};
