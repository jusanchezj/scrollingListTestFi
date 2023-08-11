import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 20;

  const fetchCountries = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://restcountries.com/v3.1/all?_page=${page}&_limit=${limit}`);
      setCountries(prevCountries => [...prevCountries, ...response.data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop - clientHeight < clientHeight * 0.1) {
      fetchCountries();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Infinite Scrolling Country List</h1>
      </header>
      <div className="country-list" onScroll={handleScroll}>
        {countries.map((country, index) => (
          <div key={index} className="country-item" style={{ animationDelay: `${index * 0.1}s` }}>
            {country.name.common}
          </div>
        ))}
        {isLoading && <div className="loader">Loading...</div>}
      </div>
    </div>
  );
}

export default App;
