import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryWeather, setCountryWeather] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  useEffect(() => {
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${selectedCountry}`;
    axios.get(url).then((res) => {
      if (res.data.success === false) {
        return;
      } else {
        setCountryWeather(res.data);
      }
    });
  }, [selectedCountry, api_key]);

  const filteredCountries = filter
    ? countries.filter((c) =>
        c.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (filteredCountries.length === 1 && !selectedCountry) {
      setSelectedCountry(filteredCountries[0].name.common);
    }
  }, [selectedCountry, filteredCountries]);

  const handleChange = (e) => {
    setFilter(e.target.value);
    setSelectedCountry("");
  };

  const handleClick = (country) => {
    if (selectedCountry === country) {
      setSelectedCountry("");
    } else {
      setSelectedCountry(country);
    }
  };

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
        <h2>{countryName}</h2>
        <p>capital {capital}</p>
        <p>region {region}</p>
        <h3>languages</h3>
        <ul>
          {Object.values(languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={flagUrl} alt={countryName} />

        {countryWeather && (
          <>
            <h3>weather in {capital}</h3>
            <p>temperature: {countryWeather.current.temperature} Celsius</p>
            <img src={countryWeather.current.weather_icons} alt={countryName} />
            <p>
              wind:
              {`${countryWeather.current.wind_speed} mph | direction ${countryWeather.current.wind_dir}`}
            </p>
          </>
        )}
      </div>
    );
  };

  const countryList = () => {
    const countries = filteredCountries.map((country) => country.name.common);
    return (
      <>
        <ul>
          {countries.map((name) => (
            <li key={name}>
              {name}
              <button onClick={() => handleClick(name)}>
                {selectedCountry === name ? "hide" : "show"}
              </button>
            </li>
          ))}
        </ul>
        {detailsOf(selectedCountry)}
      </>
    );
  };

  const content = () => {
    if (filteredCountries.length === 0) {
      return "type to search";
    } else if (filteredCountries.length > 10) {
      return "too many matches, specify another filter";
    } else if (filteredCountries.length === 1) {
      return detailsOf(selectedCountry);
    } else {
      return countryList();
    }
  };

  return (
    <div>
      <p>
        find countries
        <input value={filter} onChange={handleChange} />
      </p>
      {content()}
    </div>
  );
}

export default App;
