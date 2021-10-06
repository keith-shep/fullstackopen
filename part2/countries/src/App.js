import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleClick = (country) => {
    if (selectedCountry === country) {
      setSelectedCountry("");
    } else {
      setSelectedCountry(country);
    }
  };

  const filteredCountries = filter
    ? countries.filter((c) =>
        c.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const detailsOf = (countryName) => {
    const country = filteredCountries.find(
      (country) => country.name.common === countryName
    );

    if (!country) {
      return;
    }

    const capital = country.capital[0];
    const region = country.region;
    const languages = country.languages;
    const flagUrl = country.flags.png;

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {capital}</p>
        <p>region {region}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={flagUrl} alt={country.name.common} />
      </div>
    );
  };

  const content = () => {
    if (filteredCountries.length === 0) {
      return "type to search";
    } else if (filteredCountries.length > 10) {
      return "too many matches, specify another filter";
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      return detailsOf(country.name.common);
    } else {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleClick(country.name.common)}>
                {selectedCountry === country.name.common ? "hide" : "show"}
              </button>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <p>
        find countries
        <input value={filter} onChange={handleChange} />
      </p>
      {content()}
      {detailsOf(selectedCountry)}
    </div>
  );
}

export default App;
