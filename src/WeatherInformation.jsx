import { useState } from "react";

export default function WeatherInformation({ fetchData }) {
  const [showMax, setShowMax] = useState(3);

  if (!fetchData) return null;
  if (!fetchData.location) return "Incorrect city";

  const forecastDays = [showMax - 3, showMax - 2, showMax - 1, showMax].map(
    (index) => {
      return (
        <div key={index} className="forecast-day">
          <ForecastDayInfo index={index} fetchData={fetchData} />
        </div>
      );
    }
  );

  function handlePrevClick() {
    if (showMax > 3) {
      setShowMax(showMax - 1);
    }
  }

  function handleNextClick() {
    if (showMax < 6) {
      setShowMax(showMax + 1);
    }
  }

  return (
    <>
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
          {forecastDays}
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
    </>
  );
}

function ForecastDayInfo({ fetchData, index }) {
  const dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
  const dateWeekDay = dayArray[date.getDay()];
  const dateMonth = months[date.getMonth()];

  const humidity = FD.day.avghumidity;
  const dayTemp = FD.hour[16].temp_c;
  const nightTemp = FD.day.mintemp_c;
  const description = FD.day.condition.text;
  const icon = FD.day.condition.icon;

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
  const icon = FD.condition.icon;
  const description = FD.condition.text;

  const rep = /64x64/gi;
  const resizedIcon = icon.replace(rep, "128x128");
  return (
    <>
      <div className="current-location">{location}</div>
      <div className="current-time opacity-medium">{dateTime}</div>
      <div className="current-icon">
        <img className="icon-img glow" src={resizedIcon} alt="Weather Icon" />
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
  const icon = FD.day.condition.icon;

  const location = fetchData.location.name;

  const rep = /64x64/gi;
  const resizedIcon = icon.replace(rep, "128x128");
  return (
    <>
      <div className="current-location">{location}</div>
      <div className="wind-speed opacity-medium">{wind} km/h</div>
      <div className="current-icon">
        <img className="icon-img glow" src={resizedIcon} alt="Weather Icon" />
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
