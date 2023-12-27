import axios from 'axios'
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_myKEY

const getWeather = (country) => {
    const request = axios.get(`${baseUrl}?lat=${country[0].latlng[0]}&lon=${country[0].latlng[1]}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
  }
  export default {getWeather}