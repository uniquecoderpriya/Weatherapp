import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Loader from './weatherhelper/Loader';

function CityTable() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [page, setPage] = useState(1);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = () => {
        setIsLoading(true); 
        fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=100&page=${page}`)
            .then(response => response.json())
            .then(data => {
                setCities(prevCities => [...prevCities, ...data.records.map(record => record.fields)]);
                setIsLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false); 
            });
    };

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handleCityClick = (cityName) => {
        navigate(`/weather/${cityName}`); 
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-customBlue">
            {isLoading && <Loader />} 
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Population</th>
                        <th scope="col" className="px-6 py-3">Timezone</th>
                    </tr>
                </thead>
                <tbody onScroll={handleScroll}>
                    {cities.map((city, index) => (
                        <tr 
                            key={`${city.name}-${index}`} 
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" 
                            onClick={() => handleCityClick(city.name)}
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">{city.name}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{city.population}</td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{city.timezone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CityTable;
