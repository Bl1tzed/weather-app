import FetchDataContext from "context/FetchDataContext";
import { memo, useContext, useState } from "react";
import clsx from "clsx";
import getWeatherIconURL from "utils/getWeatherIconURL.jsx";
import styles from "styles/ForecastByDay.module.scss";
import months from "utils/months";
import GhostButton from "./GhostButton";

export function ForecastByDay({ setDayRef }) {
  const [lastCardIndex, setLastCardIndex] = useState(2);
  const FD = useContext(FetchDataContext);
  const forecastDays = [lastCardIndex - 2, lastCardIndex - 1, lastCardIndex];

  function handlePrevClick() {
    if (lastCardIndex > 2) {
      setLastCardIndex(lastCardIndex - 1);
    }
  }

  function handleNextClick() {
    if (lastCardIndex < 2) {
      setLastCardIndex(lastCardIndex + 1);
    }
  }

  return (
    <div className={clsx(styles.main, "column")}>
      <div className={styles.header}>
        {FD.location.name}, {FD.location.country}
      </div>
      <div className={styles.content}>
        <GhostButton
          className={clsx(styles.btn, lastCardIndex < 4 && styles.hidden)}
          aria-label="Previous day"
          onClick={handlePrevClick}
        >
          <img src="svg/lt.svg" className="btnIcon" alt="Previous day" />
        </GhostButton>
        {forecastDays.map((index) => {
          return (
            <div
              key={index}
              className={styles.day}
              onClick={() => setDayRef(index)}
            >
              <ForecastDayInfo index={index} />
            </div>
          );
        })}
        <GhostButton
          className={clsx(styles.btn, lastCardIndex < 4 && styles.hidden)}
          aria-label="Next day"
          onClick={handleNextClick}
        >
          <img src="svg/gt.svg" className="btnIcon" alt="Next day" />
        </GhostButton>
      </div>
    </div>
  );
}

function ForecastDayInfo({ index }) {
  const fetchData = useContext(FetchDataContext);
  const FD = fetchData.forecast.forecastday[index];
  const date = new Date(FD.date);

  return (
    <>
      <div>{date.toLocaleString("en-us", { weekday: "long" })}</div>
      <div className="opacity-low">
        {date.getDate()} {months[date.getMonth()]}
      </div>
      <div className={styles.info}>
        <img src={getWeatherIconURL(FD.day)} alt="Weather Icon" />
      </div>
      <div>{FD.day.condition.text}</div>
      <div className={styles.info}>
        <div className={clsx(styles.mintemp, "opacity-medium")}>
          {Math.round(FD.day.mintemp_c)}°C
        </div>
        <div>{`${Math.round(FD.hour[16].temp_c)}°C`}</div>
      </div>
      <div className="opacity-medium">HMD {FD.day.avghumidity}%</div>
    </>
  );
}

export default memo(ForecastByDay);
