// SAAS, CSS Modules
// ed4085bc2beb5634b7a54841bf9c02bd OpenWeather API
// 45bb6069dabf4c46911141051240201 Weather API
// Error Boundary
// try catch для fetch
import { useState, useEffect } from "react";
import LocationInput from "./LocationInput";

export default function App() {
  //eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useState("Omsk")
  //eslint-disable-next-line no-unused-vars
  const [fetchData, setFetchData] = useState(null)
  const key = "45bb6069dabf4c46911141051240201";
  const url = "http://api.weatherapi.com/v1/forecast.json?"



  useEffect(() => {
      fetchingData(location);
      // fetch(url + new URLSearchParams({
      //   q: location,
      //   key: key,
      //   days: 1,
      //   aqi: "no",
      //   alerts: "no"
      // }))
      //   .then(response => response.json())
      //   .then(data => setFetchData(data))
    }, [location])

    const fetchingData = async (location) => {
      try {
        const response = await fetch(url + new URLSearchParams({
          q: location,
          key: key,
          days: 1,
          aqi: "no",
          alerts: "no"
        }));
        const result = await response.json();
        setFetchData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }


  // useEffect(() => {
  //   // declare the data fetching function
  //   const fetchData = async () => await fetch("http://api.openweathermap.org/geo/1.0/direct?q=Omsk&appid=72d5fce1d11fb4150113cca015c2c86d", {
  //     method: "GET"
  //   });
    
  
  //   // call the function
  //   fetchData().then(r => console.log(r))
  //     // make sure to catch any error
  //     .catch(console.error);
  // }, [location])

  if(fetchData) {
    console.log(fetchData.forecast)
    return(
      //{fetchData.forecast.forecastday.day.avgtemp_c}
        <>
         <LocationInput setLocation={setLocation}/>
         <div>Средняя температура в {location}: {fetchData.forecast.forecastday[0].day.avgtemp_c}°С </div>
        </>
      );
  } else {
    console.log("No fetch data")
    return(
      <>
        <LocationInput setLocation={setLocation}/>
        <div>Средняя температура в {location}: loading...</div>
      </>
    )
  }


}

export const useData = (url) => {
  const [state, setState] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch(url)).json();

      setState(data);
    };

    dataFetch();
  }, [url]);

  return { data: state };
};

