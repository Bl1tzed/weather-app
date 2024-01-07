import { useState } from "react";

export default function WeatherInformation({ fetchData }) {
  const [lastCardIndex, setLastCardIndex] = useState(3);

  if (!fetchData) return null;
  if (!fetchData.location) return "Incorrect city";

  const forecastDays = [
    lastCardIndex - 3,
    lastCardIndex - 2,
    lastCardIndex - 1,
    lastCardIndex,
  ];

  function handlePrevClick() {
    if (lastCardIndex > 3) {
      setLastCardIndex(lastCardIndex - 1);
    }
  }

  function handleNextClick() {
    if (lastCardIndex < 6) {
      setLastCardIndex(lastCardIndex + 1);
    }
  }

  return (
    <div id="content-box">
      <div id="column1">
        <div id="column1-header">
          {fetchData.location.name}, {fetchData.location.country}
        </div>
        <div id="column1-content">
          <div className="button-wrapper">
            <button className="slide-button" onClick={handlePrevClick}>
              &lt;
            </button>
          </div>
          {forecastDays.map((index) => {
            return (
              <div key={index} className="forecast-day">
                <ForecastDayInfo index={index} fetchData={fetchData} />
              </div>
            );
          })}
          <div className="button-wrapper">
            <button className="slide-button" onClick={handleNextClick}>
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div id="column2">
        <CurrentDayInfo fetchData={fetchData} />
      </div>
      <div id="column3">
        <MiscComponent fetchData={fetchData} />
      </div>
    </div>
  );
}

function ForecastDayInfo({ fetchData, index }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const FD = fetchData.forecast.forecastday[index];

  const timestamp = FD.date;
  const date = new Date(timestamp);
  const dateDay = date.getDate();
  const dateWeekDay = date.toLocaleString("en-us", { weekday: "long" });
  const dateMonth = months[date.getMonth()];

  const humidity = FD.day.avghumidity;
  const dayTemp = FD.hour[16].temp_c;
  const nightTemp = FD.day.mintemp_c;
  const description = FD.day.condition.text;
  const icon = getWeatherIconURL(FD.day);

  return (
    <>
      <div className="forecast-info">{dateWeekDay}</div>
      <div className="forecast-info opacity-low">
        {dateDay} {dateMonth}
      </div>
      <div className="forecast-info">
        <img src={icon} alt="Weather Icon" />
      </div>
      <div className="forecast-info">{description}</div>
      <div className="forecast-info">
        <div className="mintemp opacity-medium">{Math.round(nightTemp)}°C</div>
        <div>{Math.round(dayTemp)}°C</div>
      </div>
      <div className="forecast-info opacity-medium"> HMD {humidity}%</div>
    </>
  );
}

function CurrentDayInfo({ fetchData }) {
  const FD = fetchData.current;

  const timestamp = FD.last_updated;
  const date = new Date(timestamp);
  const dateTime = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;

  const location = fetchData.location.name;
  const humidity = FD.humidity;
  const temp = FD.temp_c;
  const description = FD.condition.text;
  const icon = getWeatherIconURL(FD);

  return (
    <>
      <div className="current-location">{location}</div>
      <div className="current-time opacity-medium">{dateTime}</div>
      <div className="current-icon">
        <img className="icon-img glow" src={icon} alt="Weather Icon" />
      </div>
      <div className="current-description">{description}</div>
      <div className="current-humidity opacity-medium">HMD {humidity}%</div>
      <div className="current-temp opacity-medium">{Math.round(temp)}°C</div>
    </>
  );
}

function MiscComponent({ fetchData }) {
  const FD = fetchData.forecast.forecastday[0];

  const sunrise = timeConversion(FD.astro.sunrise);
  const sunset = timeConversion(FD.astro.sunset);

  const rainChance = FD.day.daily_chance_of_rain;
  const wind = FD.day.maxwind_kph;
  const icon = getWeatherIconURL(FD.day);

  const location = fetchData.location.name;

  return (
    <>
      <div className="current-location">{location}</div>
      <div className="wind-speed opacity-medium">{wind} km/h</div>
      <div className="current-icon">
        <img className="icon-img glow" src={icon} alt="Weather Icon" />
      </div>
      <div className="probability">Precipitation {rainChance}%</div>
      <div className="sunrise opacity-medium">Rise {sunrise}</div>
      <div className="sunset opacity-medium">Set {sunset}</div>
    </>
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
//eslint-disable-next-line no-unused-vars
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
