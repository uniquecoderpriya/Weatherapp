import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WeatherInfoDetails from './weatherhelper/WeatherInfoDetails';
import WeatherForecast from './weatherhelper/WeatherForecast';
import Loader from './weatherhelper/Loader';

function WeatherPage() {
    const { city } = useParams();
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [forecastInfo, setForecastInfo] = useState(null);
    const [error, setError] = useState(null);
    const [showForecast, setShowForecast] = useState(false);

    useEffect(() => {
        fetchWeatherInfo(city);
        fetchForecastInfo(city);
    }, [city]);

    const fetchWeatherInfo = async (cityName) => {
        try {
            const apiKey = 'f23bef7ab5446a4c1a6c402679626de2';
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
            if (!weatherResponse.ok) {
                throw new Error('Weather data not found');
            }
            const weatherData = await weatherResponse.json();
            setWeatherInfo(weatherData);
            setError(null);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherInfo(null);
            setError(error.message);
        }
    };

    const fetchForecastInfo = async (cityName) => {
        try {
            const apiKey = 'f23bef7ab5446a4c1a6c402679626de2';
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
            if (!forecastResponse.ok) {
                throw new Error('Forecast data not found');
            }
            const forecastData = await forecastResponse.json();
            setForecastInfo(forecastData);
            setError(null);
        } catch (error) {
            console.error('Error fetching forecast data:', error);
            setForecastInfo(null);
            setError(error.message);
        }
    };

    const toggleForecast = () => {
        setShowForecast(!showForecast);
    };

    const getWeatherIcon = (iconCode) => {
        const iconBaseUrl = 'http://openweathermap.org/img/wn/';
        return `${iconBaseUrl}${iconCode}@2x.png`;
    };

    const getTemperatureColor = (temperature) => {
        if (temperature < 0) {
            return 'text-blue-500';
        } else if (temperature >= 0 && temperature < 10) {
            return 'text-purple-500';
        } else if (temperature >= 10 && temperature < 20) {
            return 'text-green-500';
        } else if (temperature >= 20 && temperature < 30) {
            return 'text-yellow-500';
        } else {
            return 'text-red-500';
        }
    };

    const getDayOfWeek = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    const getForecastDate = (timestamp, index) => {
        const date = new Date(timestamp * 1000);
        const today = new Date();
        today.setDate(today.getDate() + index);
        return today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-customBlue">
            <div className="bg-gray-400 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                <div className="flex justify-between items-center mb-4 mx-auto">
                    {weatherInfo && (
                        <div className="flex items-center">
                            <img src={getWeatherIcon(weatherInfo.weather[0].icon)} alt="Weather Icon" className="w-12 h-12 mr-4" />
                            <h2 className="text-2xl font-bold mr-4">{city}</h2>
                        </div>
                    )}
                    <button onClick={toggleForecast} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg">
                        {showForecast ? 'Hide Forecast' : 'Show Forecast'}
                    </button>
                </div>
                <div className='my-5'>
                    {error ? (
                        <p>{error}</p>
                    ) : weatherInfo ? (
                        <WeatherInfoDetails weatherInfo={weatherInfo} getTemperatureColor={getTemperatureColor}/>
                    ) : (
                        <Loader />
                    )}
                </div>
                {showForecast && forecastInfo && (
                    <div className="mt-5">
                        <WeatherForecast forecastInfo={forecastInfo} getWeatherIcon={getWeatherIcon} getForecastDate={getForecastDate} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherPage;
