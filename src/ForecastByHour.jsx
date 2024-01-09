import styles from "scss/ForeastByHour.module.scss";
import { useState } from "react";
export default function ForecastByHour({ fetchData, getWeatherIconURL }) {
  const [dayIndex, setDayIndex] = useState(0);
  const hourIndex = [0, 3, 6, 9, 12, 15, 18, 21];

  const FD = fetchData.forecast.forecastday[dayIndex];
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
  const date = new Date(FD.date);

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
              &lt;
            </button>
          </div>
          <div className={styles.headerText}>
            {date.getDate()} {months[date.getMonth()]}
          </div>
          <div className={styles.btnWrap}>
            <button className={styles.btn} onClick={handleNextClick}>
              &gt;
            </button>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        {hourIndex.map((index) => {
          return (
            <div key={index} className={styles.hour}>
              <ForecastHourInfo
                fetchData={fetchData.forecast.forecastday[dayIndex].hour[index]}
                getWeatherIconURL={getWeatherIconURL}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ForecastHourInfo({ fetchData, getWeatherIconURL }) {
  const date = new Date(fetchData.time);
  const hourTime = `${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;

  return (
    <>
      <div className={styles.time}>{hourTime}</div>
      <div className={styles.info}>
        <img src={getWeatherIconURL(fetchData)} alt="Weather Icon" />
      </div>
      <div>{fetchData.condition.text}</div>
      <div className={styles.info}>
        <div className={styles.temp}>{Math.round(fetchData.temp_c)}°C</div>
      </div>
    </>
  );
}
