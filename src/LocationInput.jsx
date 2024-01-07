//import T from 'prop-types'
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

export default function LocationInput({ setLocation }) {
  const [search, setSearch] = useState("");

  const options = {
    method: "GET",
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    setLocation(searchData);
  };

  const loadOptions = (inputValue) => {
    const key = process.env.REACT_APP_API_KEY;

    if (!key) return;

    return fetch(
      `http://api.weatherapi.com/v1/search.json?key=${key}&q=${inputValue}}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.map((city) => {
            return {
              value: `${city.name} ${city.country}`,
              label: `${city.name}, ${city.country}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div id="input-box">
        <AsyncPaginate
          placeholder="Search for city"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
          loadOptionsOnMenuOpen={false}
        />
      </div>
      {/* <button className="search-button" onClick={() => setLocation(search)}>
        Submit
      </button> */}
    </>
  );
}
