//import T from 'prop-types'
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "scss/LocationInput.module.scss";
// import { AsyncPaginate } from "react-select-async-paginate";
//eslint-disable-next-line no-unused-vars
export default function LocationInput({ setLocation }) {
  const [search, setSearch] = useState("");

  // const options = {
  //   method: "GET",
  // };

  const handleOnChange = debounce((searchData) => {
    setSearch(searchData);
    console.log("1");
    history.pushState({}, undefined, `?q=${search}`);
  }, 500);

  // const loadOptions = (inputValue) => {
  //   const key = process.env.REACT_APP_API_KEY;

  //   if (!key) return;

  //   return fetch(
  //     `http://api.weatherapi.com/v1/search.json?key=${key}&q=${inputValue}}`,
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       return {
  //         options: response.map((city) => {
  //           return {
  //             value: `${city.name} ${city.country}`,
  //             label: `${city.name}, ${city.country}`,
  //             urlParam: city.name,
  //           };
  //         }),
  //       };
  //     })
  //     .catch((err) => console.error(err));
  // };

  return (
    <div className={styles.inputBox}>
      <div className={styles.inputWrapper}>
        <FaSearch id="search-icon fa-4x" />
        <input
          type="text"
          placeholder="Type to search..."
          onChange={(e) => handleOnChange(e.target.value)}
          value={search}
        />
      </div>
      <div>SearchResults</div>
      {/* <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        loadOptionsOnMenuOpen={false}
        autoFocus
      /> */}
    </div>
  );
}

const debounce = (fn, wait) => {
  let timeout;
  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setInterval(later, wait);
  };
};
