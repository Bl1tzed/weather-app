import styles from "scss/ForeastByHour.module.scss";
import { useState, useEffect } from "react";
export default function ForecastByHour({
  fetchData,
  getWeatherIconURL,
  dayRef,
}) {
  const [dayIndex, setDayIndex] = useState(dayRef);
  const [weatherMode, setWeatherMode] = useState("temp");

  const hourIndex = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
  const FD = fetchData.forecast.forecastday[dayIndex];
  const date = new Date(FD.date);
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

  useEffect(() => {
    setDayIndex(dayRef);
  }, [dayRef]);

  function handlePrevClick() {
    if (dayIndex > 0) {
      setDayIndex(dayIndex - 1);
    }
  }

  function handleNextClick() {
    if (dayIndex < 6) {
      setDayIndex(dayIndex + 1);
    }
  }

  return (
    <div className={styles.main + " column"}>
      <header>
        <div className={styles.headerLabel}>
          <div className={styles.btnWrap}>
            <button className={styles.btn} onClick={handlePrevClick}>
              <img src="svg/lt.svg" className="btnIcon"></img>
            </button>
          </div>
          <div className={styles.headerText} key={date}>
            {date.getDate()} {months[date.getMonth()]}
          </div>
          <div className={styles.btnWrap}>
            <button className={styles.btn} onClick={handleNextClick}>
              <img src="svg/gt.svg" className="btnIcon"></img>
            </button>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        {hourIndex.map((index) => {
          return (
            <div key={index + date} className={styles.hour}>
              <ForecastHourInfo
                fetchData={fetchData.forecast.forecastday[dayIndex].hour[index]}
                getWeatherIconURL={getWeatherIconURL}
                weatherMode={weatherMode}
                index={index}
              />
            </div>
          );
        })}
        <div className={styles.weatherMode}>
          <button
            className={
              styles.weatherModeBtn +
              " " +
              (weatherMode === "temp" && styles.active)
            }
            onClick={() => setWeatherMode("temp")}
            title="Celsius temperature"
          >
            <img
              src="svg/thermometer-celsius.svg"
              className={styles.weatherModeIcon}
            ></img>
          </button>
          <button
            className={
              styles.weatherModeBtn +
              " " +
              (weatherMode === "hmd" && styles.active)
            }
            onClick={() => setWeatherMode("hmd")}
            title="Humidity"
          >
            <img
              src="svg/humidity.svg"
              className={styles.weatherModeIcon}
            ></img>
          </button>
          <button
            className={
              styles.weatherModeBtn +
              " " +
              (weatherMode === "wind" && styles.active)
            }
            onClick={() => setWeatherMode("wind")}
            title="Wind speed"
          >
            <img src="svg/tornado.svg" className={styles.weatherModeIcon}></img>
          </button>
        </div>
      </div>
    </div>
  );
}

function ForecastHourInfo({
  fetchData,
  getWeatherIconURL,
  weatherMode,
  index,
}) {
  const date = new Date(fetchData.time);
  const hourTime = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
  const weatherModeText = {
    temp: `${Math.round(fetchData.temp_c)}°C`,
    hmd: `${fetchData.humidity}%`,
    wind: `${Math.round(fetchData.wind_kph)} kmh`,
  };
  return (
    <>
      <div className={styles.time}>{hourTime}</div>
      <div className={styles.info}>
        <img
          className={styles.weatherIcon}
          src={getWeatherIconURL(fetchData)}
          alt="Weather Icon"
        />
      </div>
      <div className={styles.info} key={index + weatherMode}>
        <div className={styles.temp}>{weatherModeText[weatherMode]}</div>
      </div>
    </>
  );
}
