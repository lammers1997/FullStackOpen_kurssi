import Notification from './Notification'
import DisplayCountry from './DisplayCountry'

const DisplayResult = ({ countries, displayThis, weatherData }) => {
    if (countries.length === 0) {
        return null
    }
    else if (countries.length === 1) {
        // getWeather(countries[0].capitalInfo.latlng)
        return <DisplayCountry country={countries[0]} countryWeather={weatherData}/>
    } else if (countries.length > 10) {
        return <Notification message="Too many matches, specify another filter" />
    }
    return (
        <div className="lessTen">
            <ul>
                {countries.map(country => (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => displayThis(country.name.common)}>show</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default DisplayResult