import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faWind, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

function WeatherInfoDetails({ weatherInfo, getTemperatureColor }) {
    return (
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] p-2">
            <div className="text-center">
                <p className="text-lg text-white">{weatherInfo.weather[0].description}</p>
                <p className={`text-white ${getTemperatureColor(weatherInfo.main.temp)}`}>Temperature: {weatherInfo.main.temp} °C</p>
                <div className="flex items-center justify-center mt-2">
                    <FontAwesomeIcon icon={faTint} className="text-white mr-2 hover:text-blue-400 transition-all duration-300 ease-in-out transform hover:scale-110" style={{ fontSize: "1.5em" }} />
                    <p className="text-white">Humidity: {weatherInfo.main.humidity}%</p>
                </div>
                <div className="flex items-center justify-center mt-2">
                    <FontAwesomeIcon icon={faWind} className="text-white mr-2 hover:text-blue-400 transition-all duration-300 ease-in-out transform hover:scale-110" style={{ fontSize: "1.5em" }} />
                    <p className="text-white">Wind Speed: {weatherInfo.wind.speed} m/s</p>
                </div>
                <div className="flex items-center justify-center mt-2">
                    <FontAwesomeIcon icon={faTachometerAlt} className="text-white mr-2 hover:text-blue-400 transition-all duration-300 ease-in-out transform hover:scale-110" style={{ fontSize: "1.5em" }} />
                    <p className="text-white">Pressure: {weatherInfo.main.pressure} hPa</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherInfoDetails;
