import styles from "styles/ForeastByHour.module.scss";
import getWeatherIconURL from "utils/getWeatherIconURL.jsx";
import { useState, useEffect, useContext } from "react";
import FetchDataContext from "context/FetchDataContext";
import { getCorrectTime } from "utils/helpers";
import months from "utils/months";
import GhostButton from "./GhostButton";
import clsx from "clsx";

export default function ForecastByHour({ dayRef }) {
  const [dayIndex, setDayIndex] = useState(dayRef);
  const [weatherMode, setWeatherMode] = useState("temp");
  const fetchData = useContext(FetchDataContext);
  const FD = fetchData.forecast.forecastday[dayIndex];
  const date = new Date(FD.date);
  const hourIndex = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

  useEffect(() => {
    setDayIndex(dayRef);
  }, [dayRef]);

  function handlePrevClick() {
    if (dayIndex > 0) {
      setDayIndex(dayIndex - 1);
    }
  }

  function handleNextClick() {
    if (dayIndex < 2) {
      setDayIndex(dayIndex + 1);
    }
  }

  return (
    <div className={clsx(styles.main, "column")}>
      <div className={styles.header}>
        <div className={styles.headerLabel}>
          <GhostButton onClick={handlePrevClick} aria-label="Previous day">
            <img src="svg/lt.svg" className="btnIcon" alt="Previous day" />
          </GhostButton>
          <div className={styles.headerText} key={date}>
            {date.getDate()} {months[date.getMonth()]}
          </div>
          <GhostButton onClick={handleNextClick} aria-label="Next day">
            <img src="svg/gt.svg" className="btnIcon" alt="Next day" />
          </GhostButton>
        </div>
      </div>
      <div className={styles.content}>
        {hourIndex.map((index) => {
          return (
            <div key={index + dayIndex} className={styles.hour}>
              <ForecastHourInfo
                dayIndex={dayIndex}
                weatherMode={weatherMode}
                index={index}
              />
            </div>
          );
        })}
        <div className={styles.weatherMode}>
          <GhostButton
            className={styles.weatherModeBtn}
            active={weatherMode === "temp"}
            title="Celsius temperature"
            onClick={() => setWeatherMode("temp")}
          >
            <img
              src="svg/thermometer-celsius.svg"
              alt="Weather Icon"
              className={styles.weatherModeIcon}
            />
          </GhostButton>
          <GhostButton
            className={styles.weatherModeBtn}
            active={weatherMode === "hmd"}
            title="Humidity"
            onClick={() => setWeatherMode("hmd")}
          >
            <img
              src="svg/humidity.svg"
              alt="Weather Icon"
              className={styles.weatherModeIcon}
            />
          </GhostButton>
          <GhostButton
            className={styles.weatherModeBtn}
            active={weatherMode === "wind"}
            title="Wind speed"
            onClick={() => setWeatherMode("wind")}
          >
            <img
              src="svg/tornado.svg"
              alt="Weather Icon"
              className={styles.weatherModeIcon}
            />
          </GhostButton>
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
