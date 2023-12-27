
const DisplayWeather = ({ weather }) => {
    if(weather === null){
        return null
    }
    return (
        <div>
            <p>temperature {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}
export default DisplayWeather