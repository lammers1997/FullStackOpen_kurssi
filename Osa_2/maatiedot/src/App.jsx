import { useState, useEffect } from 'react'
import DisplayResult from './components/DisplayResult'
import weatherService from './services/weather'
import countryService from './services/countries'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [current, setCurrent] = useState(null)
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = (country) => {

    weatherService
      .getWeather(country)
      .then(weather => {
        setWeatherData(weather)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      })
  }

  useEffect(() => {
    // skip if current is not defined
    if (current) {
      console.log('fetching countries...')
      countryService
        .getAll()
        .then(allCountries => {
          const filteredCountries = allCountries.filter(country =>
            country.name.common.toLowerCase().includes(current.toLowerCase()))
          setCountries(filteredCountries)
          if (filteredCountries.length === 1) {
            console.log("Set weather")
            getWeather(filteredCountries)
          }
        })
    } else {
      setCountries([])
    }

  }, [current])

  const handleChange = (event) => {
    setValue(event.target.value)
    setCurrent(event.target.value)

  }

  const displayThis = (country) => {
    setCurrent(country)
  }

  return (
    <div className='origin'>
      <p>
        Find countries: <input value={value} onChange={handleChange} />
      </p>
      <DisplayResult countries={countries} displayThis={displayThis} weatherData={weatherData} />
    </div>
  )
}
export default App