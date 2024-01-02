// SAAS, CSS Modules
// ed4085bc2beb5634b7a54841bf9c02bd
// Error Boundary
// try catch для fetch
import { useState, useEffect } from "react";
import LocationInput from "./LocationInput";

export default function App() {
  //eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useState("Omsk")
  //eslint-disable-next-line no-unused-vars
  const [fetchData, setFetchData] = useState("")
  //const appid = "ed4085bc2beb5634b7a54841bf9c02bd";
  //const url = "http://api.openweathermap.org/data/2.5/forecast/weather?"
  //const geoUrl = "http://api.openweathermap.org/geo/1.0/direct?"



  // useEffect(() => {
  //     // fetch(geoUrl + new URLSearchParams({
  //     //   q: location,
  //     //   appid: appid
  //     // }))
  //     //   .then(response => console.log(response))
  //     //   .then(data => setFetchData(data))
  //     const response = async () => await fetch("https://example.com/does-not-exist");
  //     response()
  //   }
  // }, [location])


  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => await fetch("http://api.openweathermap.org/geo/1.0/direct?q=Omsk&appid=72d5fce1d11fb4150113cca015c2c86d", {
      method: "GET"
    });
    
  
    // call the function
    fetchData().then(r => console.log(r))
      // make sure to catch any error
      .catch(console.error);
  }, [location])


  console.log(fetchData)
  

  return (
      <>
       <LocationInput setLocation={setLocation}/>
      </>
    );
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

