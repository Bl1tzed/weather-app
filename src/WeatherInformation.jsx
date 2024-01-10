import ForecastByDay from "./ForecastByDay";
import CurrentDayInfo from "./CurrentDayInfo";
import MiscComponent from "./MiscComponent";
import ForecastByHour from "./ForecastByHour";

export default function WeatherInformation({ fetchData }) {
  if (!fetchData) return null;
  if (!fetchData.location) return "Incorrect city";

  return (
    <div className="content-box">
      <ForecastByDay
        fetchData={fetchData}
        getWeatherIconURL={getWeatherIconURL}
      />
      <CurrentDayInfo
        fetchData={fetchData}
        getWeatherIconURL={getWeatherIconURL}
      />
      <MiscComponent
        fetchData={fetchData}
        getWeatherIconURL={getWeatherIconURL}
      />
      <ForecastByHour
        fetchData={fetchData}
        getWeatherIconURL={getWeatherIconURL}
      />
    </div>
  );
}

function getWeatherIconURL(FD) {
  const urlBase = "/svg/";
  const extension = ".svg";
  let fetchDataTime = FD.is_day;
  if (!fetchDataTime) fetchDataTime = null;

  function fn(night, day, fallback) {
    let result = fallback;
    if (fetchDataTime == 0 && night) result = night;
    if (fetchDataTime == 1 && day) result = day;
    return urlBase + result + extension;
  }

  const iconUrl = {
    1000: fn("clear-night", null, "clear-day"),
    1003: fn("partly-cloudy-night", null, "partly-cloudy-day"),
    1006: fn("partly-cloudy-night", null, "partly-cloudy-day"),
    1009: fn("overcast-night", "overcast-day", "overcast"),
    1030: fn(null, null, "mist"),
    1063: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1066: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1069: fn("partly-cloudy-night-sleet", "partly-cloudy-day-sleet", "sleet"),
    1072: fn("partly-cloudy-night-hail", "partly-cloudy-day-hail", "hail"),
    1087: fn("thunderstorms-night", "thunderstorms-day", "thunderstorms"),
    1114: fn(null, null, "wind-snow"),
    1117: fn(null, null, "wind-snow"),
    1135: fn("fog-night", "fog-day", "fog"),
    1147: fn("fog-night", "fog-day", "fog"),
    1150: fn(
      "partly-cloudy-night-drizzle",
      "partly-cloudy-day-drizzle",
      "drizzle"
    ),
    1153: fn(
      "partly-cloudy-night-drizzle",
      "partly-cloudy-day-drizzle",
      "drizzle"
    ),
    1168: fn("partly-cloudy-night-hail", "partly-cloudy-day-hail", "hail"),
    1171: fn("partly-cloudy-night-hail", "partly-cloudy-day-hail", "hail"),
    1180: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1183: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1186: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1189: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1192: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1195: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1198: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1201: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1204: fn("partly-cloudy-night-sleet", "partly-cloudy-day-sleet", "sleet"),
    1207: fn("partly-cloudy-night-sleet", "partly-cloudy-day-sleet", "sleet"),
    1210: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1213: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1216: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1219: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1222: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1225: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1237: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1240: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1243: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1246: fn("partly-cloudy-night-rain", "partly-cloudy-day-rain", "rain"),
    1249: fn("partly-cloudy-night-sleet", "partly-cloudy-day-sleet", "sleet"),
    1252: fn("partly-cloudy-night-sleet", "partly-cloudy-day-sleet", "sleet"),
    1255: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1258: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1261: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1264: fn("partly-cloudy-night-snow", "partly-cloudy-day-snow", "snow"),
    1273: fn(
      "thunderstorms-night-rain",
      "thunderstorms-day-rain",
      "thunderstorms-rain"
    ),
    1276: fn(
      "thunderstorms-night-rain",
      "thunderstorms-day-rain",
      "thunderstorms-rain"
    ),
    1279: fn(
      "thunderstorms-night-snow",
      "thunderstorms-day-snow",
      "thunderstorms-snow"
    ),
    1282: fn(
      "thunderstorms-night-snow",
      "thunderstorms-day-snow",
      "thunderstorms-snow"
    ),
  };

  return iconUrl[FD.condition.code];
}
