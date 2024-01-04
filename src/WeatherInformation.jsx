


export default function WeatherInformation({ fetchData }) {
	
	if(!fetchData) return null
	if(!fetchData.location) return "Incorrect city"
	return (
		<>
			<div id="column1">
				<div id="column1-header">{fetchData.location.name}</div>
				<div id="column1-wrapper">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div id="column2">
				
			</div>
			<div id="column3">
			
			</div>
		</>
	)
}