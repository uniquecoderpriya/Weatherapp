import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CityTable from './components/CityTable';
import WeatherPage from './components/WeatherPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <> <div className="App bg-customBlue">
        <div className='mb-3'>
        <Navbar />
        </div>
        
        <Router>
            <Routes>
                <Route path="/" element={<CityTable />} />
                <Route path="/weather/:city" element={<WeatherPage />} />
            </Routes>
        </Router>
        
    </div>
    <Footer/>
    </>
        
        
    );
}

export default App;
