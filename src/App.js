import './App.css';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const searchPressed = () => {
    setError(null); // Reset error state before making a new request.

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=5b292fada0b6f29dfdedfaa587d2a13e`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod === '404') {
          setError('City not found');
        } else {
          setWeather(result);
          console.log(result);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError('Error fetching weather data');
      });
      
  };

  return (
    <div className="App">
      <header className='App-header'>
        <h1>Weather App</h1>
        <div>
          <input
            type='text'
            placeholder='Search town/city.....'
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button onClick={searchPressed}>GO</button>
        </div>
        {weather && (
          <div>
            <p>{weather.name} <span class="country">({weather.sys.country})</span> </p>
            {/* Display other weather information here */}
            <p>Temperature : <span class='temp'>{weather.main.temp}</span>°C</p>
           
          </div>
        )}
        {error && <p>{error}</p>}
      </header>
    </div>
  );
}

export default App;
