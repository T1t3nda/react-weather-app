import React, { useEffect, useState, useRef } from "react"
import "./Weather.css"
import search_icon from "../assets/search.png"
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"

const Weather = () => {
  const InputRef = useRef()
  const [weatherData, setWeatherData] = useState(false)

  const search = async (city) => {
    if (city === "") {
      alert("enter city name")
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`

      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      console.log(data)
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temparature: Math.floor(data.main.temp),
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      })
    } catch (error) {
      setWeatherData(false)
      console.error("Error in fetching weather data")
    }
  }

  useEffect(() => {
    search("cape town")
  }, [])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={InputRef} type='text' placeholder='Search' />
        <img
          src={search_icon}
          alt=''
          onClick={() => search(InputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <div className='weather-content'>
            <img src={weatherData.icon} alt='' className='weather-icon' />
            <p className='temperature'>{weatherData.temparature}°C</p>
            <p className='location'>{weatherData.location}</p>
          </div>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt='' />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt='' />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {/* <>
        <div className='weather-content'>
          <img src={weatherData.icon} alt='' className='weather-icon' />
          <p className='temperature'>{weatherData.temparature}°C</p>
          <p className='location'>{weatherData.location}</p>
        </div>
        <div className='weather-data'>
          <div className='col'>
            <img src={humidity_icon} alt='' />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>humidity</span>
            </div>
          </div>
          <div className='col'>
            <img src={wind_icon} alt='' />
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>wind speed</span>
            </div>
          </div>
        </div>
      </> */}
    </div>
  )
}

export default Weather
