import DisplayWeather from './DisplayWeather'

const DisplayCountry = ({ country, countryWeather }) => {    
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.keys(country.languages).map(code => (
                    <li key={code}>{country.languages[code]}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h2>Temperature in {country.capital}</h2>
            <DisplayWeather weather={countryWeather}/>
        </div>
    )
}
export default DisplayCountry