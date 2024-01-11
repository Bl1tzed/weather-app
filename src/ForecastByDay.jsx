import { useState } from "react";
import styles from "scss/ForecastByDay.module.scss";

export default function ForecastByDay({
  fetchData,
  getWeatherIconURL,
  setDayRef,
}) {
  const [lastCardIndex, setLastCardIndex] = useState(3);
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
    <div className={styles.main + " column"}>
      <div className={styles.header}>
        {fetchData.location.name}, {fetchData.location.country}
      </div>
      <div className={styles.content}>
        <div className={styles.btnWrap}>
          <button className={styles.btn} onClick={handlePrevClick}>
            <img src="svg/lt.svg" className="btnIcon"></img>
          </button>
        </div>
        {forecastDays.map((index) => {
          return (
            <div
              key={index}
              className={styles.day}
              onClick={() => setDayRef(index)}
            >
              <ForecastDayInfo
                index={index}
                fetchData={fetchData}
                getWeatherIconURL={getWeatherIconURL}
              />
            </div>
          );
        })}
        <div className={styles.btnWrap}>
          <button className={styles.btn} onClick={handleNextClick}>
            <img src="svg/gt.svg" className="btnIcon"></img>
          </button>
        </div>
      </div>
    </div>
  );
}

function ForecastDayInfo({ fetchData, index, getWeatherIconURL }) {
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
