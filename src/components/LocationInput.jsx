// a11y Accessability w3c

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "styles/LocationInput.module.scss";

export default function LocationInput({ setLocation }) {
  const [search, setSearch] = useState("");
  const [results, setResult] = useState([]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const key = process.env.REACT_APP_API_KEY;
      if (!key) return;
      return fetch(
        `http://api.weatherapi.com/v1/search.json?key=${key}&q=${search}}`
      )
        .then((response) => response.json())
        .then((response) =>
          setResult(
            response.map((city) => ({
              value: `${city.name} ${city.country}`,
              label: `${city.name}, ${city.country}`,
              urlParam: city.name,
            }))
          )
        )
        .catch((err) => console.error(err));
    }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  function onOptionChoose(e, link, location) {
    e.preventDefault();
    history.pushState({}, undefined, `?q=${link}`);
    setLocation(location);
    setResult([]);
    setSearch("");
  }

  function handleOnKeyDown(event) {
    if (event.key === "Enter") {
      onOptionChoose(event, results[0].value || search, results[0]);
      event.target.blur();
    }
  }

  const handleOnChange = (searchData) => {
    setSearch(searchData.target.value);
  };

  return (
    <div className={styles.inputBox}>
      <div className={styles.inputWrapper}>
        <FaSearch id="search-icon fa-4x" />
        <input
          className={styles.inputField}
          type="text"
          placeholder="Type to search..."
          onChange={handleOnChange}
          value={search}
          onKeyDown={handleOnKeyDown}
        />
        {results.length ? (
          <div className={styles.resultsList} key={results}>
            {results.map((_, index) => {
              const link = results[index].value
                .replaceAll(" ", "_")
                .toLowerCase();
              return (
                <a
                  key={"search" + index}
                  className={styles.searchResult}
                  href={`/?q=${link}`}
                  onClick={(e) => {
                    onOptionChoose(e, link, results[index]);
                  }}
                >
                  {results[index].label}
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
