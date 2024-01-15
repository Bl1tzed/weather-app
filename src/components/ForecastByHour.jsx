import styles from "styles/ForeastByHour.module.scss";
import getWeatherIconURL from "utils/getWeatherIconURL.jsx";
import { useState, useEffect, useContext } from "react";
import { FetchDataContext } from "App";
import { getCorrectTime } from "utils/helpers";

export default function ForecastByHour({ dayRef }) {
  const [dayIndex, setDayIndex] = useState(dayRef);
  const [weatherMode, setWeatherMode] = useState("temp");
  const fetchData = useContext(FetchDataContext);
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
            <button
              className={styles.btn}
              onClick={handlePrevClick}
              aria-label="Previous day"
            >
              <img src="svg/lt.svg" className="btnIcon" alt="Previous day" />
            </button>
          </div>
          <div className={styles.headerText} key={date}>
            {date.getDate()} {months[date.getMonth()]}
          </div>
          <div className={styles.btnWrap}>
            <button
              className={styles.btn}
              onClick={handleNextClick}
              aria-label="Next day"
            >
              <img src="svg/gt.svg" className="btnIcon" alt="Next day" />
            </button>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        {hourIndex.map((index) => {
          return (
            <div key={index + date} className={styles.hour}>
              <ForecastHourInfo
                dayIndex={dayIndex}
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
              alt="Weather Icon"
              className={styles.weatherModeIcon}
            />
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
              alt="Weather Icon"
              className={styles.weatherModeIcon}
            />
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
            <img
              src="svg/tornado.svg"
              alt="Weather Icon"
              className={styles.weatherModeIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function ForecastHourInfo({ dayIndex, weatherMode, index }) {
  const fetchData = useContext(FetchDataContext);
  const FD = fetchData.forecast.forecastday[dayIndex].hour[index];

  const hourTime = getCorrectTime(FD.time);

  const weatherModeText = {
    temp: `${Math.round(FD.temp_c)}°C`,
    hmd: `${FD.humidity}%`,
    wind: `${Math.round(FD.wind_kph)} kmh`,
  };

  return (
    <>
      <div className={styles.time}>{hourTime}</div>
      <div className={styles.info}>
        <img
          className={styles.weatherIcon}
          src={getWeatherIconURL(FD)}
          alt="Weather Icon"
        />
      </div>
      <div className={styles.info} key={index + weatherMode}>
        <div className={styles.temp}>{weatherModeText[weatherMode]}</div>
      </div>
    </>
  );
}
