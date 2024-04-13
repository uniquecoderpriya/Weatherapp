import React from 'react';

function WeatherForecast({ forecastInfo, getWeatherIcon, getForecastDate }) {
    return (
        <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-300 group hover:shadow dark:bg-gray-600">
            <h3 className="text-lg font-semibold mt-4">Five-Day Forecast</h3>
            <table className="w-full mt-2">
                <thead>
                    <tr>
                        <th className="p-2">Today</th>
                        {forecastInfo.list.slice(1, 6).map((forecast, index) => (
                            <th key={index} className="p-2">{getForecastDate(forecast.dt, index)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2">
                            <img src={getWeatherIcon(forecastInfo.list[0].weather[0].icon)} alt="Today's Forecast Icon" className="w-12 h-12 mx-auto" />
                            <p>{forecastInfo.list[0].weather[0].description}</p>
                        </td>
                        {forecastInfo.list.slice(1, 6).map((forecast, index) => (
                            <td key={index} className="p-2">
                                <img src={getWeatherIcon(forecast.weather[0].icon)} alt="Forecast Icon" className="w-12 h-12 mx-auto" />
                                <p>{forecast.main.temp} °C</p>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default WeatherForecast;
