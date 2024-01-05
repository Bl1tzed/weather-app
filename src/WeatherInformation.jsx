import { useState } from "react"


export default function WeatherInformation({ fetchData }) {
	const [showMax, setShowMax] = useState(3)

	if(!fetchData) return null
	if(!fetchData.location) return "Incorrect city"

	function handlePrevClick() {
		if(showMax > 3) {
			setShowMax(showMax - 1)
		}
	}

	function 	handleNextClick() {
		if(showMax < 6) {
			setShowMax(showMax + 1)
		}
	}

	return (
		<>
			<div id="column1">
				<div id="column1-header">{fetchData.location.name}</div>
				<div id="column1-content">
					<div className="button-wrapper"><button className="slide-button" onClick={handlePrevClick}>&lt;</button></div>
					<div className="forecast-day"><ForecastDayInfo index={showMax - 3} fetchData={fetchData}/></div>
					<div className="forecast-day"><ForecastDayInfo index={showMax - 2} fetchData={fetchData}/></div>
					<div className="forecast-day"><ForecastDayInfo index={showMax - 1} fetchData={fetchData}/></div>
					<div className="forecast-day"><ForecastDayInfo index={showMax} fetchData={fetchData}/></div>
					<div className="button-wrapper"><button className="slide-button" onClick={handleNextClick}>&gt;</button></div>
				</div>
			</div>
			<div id="column2">
				<CurrentDayInfo fetchData={fetchData}/>
			</div>
			<div id="column3">
				<MiscComponent fetchData={fetchData}/>
			</div>
		</>
	)
}

function ForecastDayInfo({fetchData, index}) {
	const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" ,"Saturday"];
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", 'November', "December"];

	const timestamp = fetchData.forecast.forecastday[index].date;
	const date = new Date (timestamp);
	const dateDay = date.getDate();
	const dateWeekDay = dayArray[date.getDay()];
	const dateMonth = months[date.getMonth()];

	const humidity = fetchData.forecast.forecastday[index].day.avghumidity;
	const dayTemp = fetchData.forecast.forecastday[index].hour[16].temp_c;
	const nightTemp = fetchData.forecast.forecastday[index].day.mintemp_c;
	const description = fetchData.forecast.forecastday[index].day.condition.text;
	const icon = fetchData.forecast.forecastday[index].day.condition.icon;

	return (
		<>
			<div className="forecast-info">{dateWeekDay}</div>
			<div className="forecast-info opacity-low">{dateDay} {dateMonth}</div>
			<div className="forecast-info"><img src={icon} alt="Weather Icon"/></div>
			<div className="forecast-info">{description}</div>
			<div className="forecast-info">
				<div className="mintemp opacity-medium">{Math.round(nightTemp)}°C</div> 
				<div>{Math.round(dayTemp)}°C</div>
			</div>
			<div className="forecast-info opacity-medium"> HMD {humidity}%</div>
		</>
	)
}

function CurrentDayInfo({fetchData}) {
	const timestamp = fetchData.current.last_updated;
	const date = new Date (timestamp);
	const dateTime = `${date.getHours()}:${date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes()}`;

	const humidity = fetchData.current.humidity;
	const temp = fetchData.current.temp_c;
	const location = fetchData.location.name;
	const icon = fetchData.current.condition.icon;
	const description = fetchData.current.condition.text;

	const rep = /64x64/gi;
	const resizedIcon = icon.replace(rep, "128x128");
	return(
		<>
			<div className="current-location">{location}</div>
			<div className="current-time opacity-medium">{dateTime}</div>
			<div className="current-icon">
				<img className="icon-img glow" src={resizedIcon} alt="Weather Icon"/>
			</div>
			<div className="current-description">{description}</div>
			<div className="current-humidity opacity-medium">HMD {humidity}%</div>
			<div className="current-temp opacity-medium">{Math.round(temp)}°C</div>
		</>
	)
}

function MiscComponent({fetchData}) {
	const sunrise = timeConversion(fetchData.forecast.forecastday[0].astro.sunrise);
	const sunset = timeConversion(fetchData.forecast.forecastday[0].astro.sunset);
	const rainChance = fetchData.forecast.forecastday[0].day.daily_chance_of_rain;
	const wind = fetchData.forecast.forecastday[0].day.maxwind_kph;
	const icon = fetchData.forecast.forecastday[0].day.condition.icon;

	const location = fetchData.location.name;

	const rep = /64x64/gi;
	const resizedIcon = icon.replace(rep, "128x128");
	return(
		<>
			<div className="current-location">{location}</div>
			<div className="wind-speed opacity-medium">{wind} km/h</div>
			<div className="current-icon">
				<img className="icon-img glow" src={resizedIcon} alt="Weather Icon"/>
			</div>
			<div className="probability">Precipitation {rainChance}%</div>
			<div className="sunrise opacity-medium">Rise {sunrise}</div>
			<div className="sunset opacity-medium">Set {sunset}</div>
		</>
	)
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