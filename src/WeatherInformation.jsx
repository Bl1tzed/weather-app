


export default function WeatherInformation({ fetchData }) {
	
	if(!fetchData) return null
	if(!fetchData.location) return "Incorrect city"
	return (
		<>
			<div id="column1">
				<div id="column1-header">{fetchData.location.name}</div>
				<div id="column1-content">
					<div className="forecast-day"><ForecastDayInfo index={0} fetchData={fetchData}/></div>
					<div className="forecast-day"><ForecastDayInfo index={1} fetchData={fetchData}/></div>
					<div className="forecast-day"><ForecastDayInfo index={2} fetchData={fetchData}/></div>
					<div className="forecast-day"><ForecastDayInfo index={3} fetchData={fetchData}/></div>
				</div>
			</div>
			<div id="column2">
				<CurrentDayInfo fetchData={fetchData}/>
			</div>
			<div id="column3">
			
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
	const dateTime = `${date.getHours()}:${date.getMinutes()}`;

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
				<div className="current-description">{description}</div>
			</div>
			<div className="current-humidity opacity-medium">HDM {humidity}</div>
			<div className="current-temp opacity-medium">{Math.round(temp)}°C</div>
		</>
	)
}