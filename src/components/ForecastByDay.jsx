import FetchDataContext from "context/FetchDataContext";
import { useContext, useState } from "react";
import clsx from "clsx";
import getWeatherIconURL from "utils/getWeatherIconURL.jsx";
import styles from "styles/ForecastByDay.module.scss";

export default function ForecastByDay({ setDayRef }) {
  const [lastCardIndex, setLastCardIndex] = useState(3);
  const FD = useContext(FetchDataContext);
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
    <div className={clsx(styles.main, "column")}>
      <div className={styles.header}>
        {FD.location.name}, {FD.location.country}
      </div>
      <div className={styles.content}>
        <div className={styles.btnWrap}>
          <button
            className={styles.btn}
            onClick={handlePrevClick}
            aria-label="Previous day"
          >
            <img src="svg/lt.svg" className="btnIcon" alt="Previous day" />
          </button>
        </div>
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
    </div>
  );
}

function ForecastDayInfo({ index }) {
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
        <div className={styles.mintemp + " opacity-medium"}>
          {Math.round(FD.day.mintemp_c)}°C
        </div>
        <div>{Math.round(FD.hour[16].temp_c)}°C</div>
      </div>
      <div className="opacity-medium">HMD {FD.day.avghumidity}%</div>
    </>
  );
}
