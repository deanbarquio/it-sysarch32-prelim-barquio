import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    fetchPokemonList(currentPage);
  }, [currentPage]);

  const fetchPokemonList = (page) => {
    setLoading(true); // Set loading state to true when fetching data
    fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${page}&limit=10`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPokemonList(data.data);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setLoading(false); // Set loading state to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading state to false in case of error
      });
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleBack = () => {
    goToPage(currentPage - 1);
  };

  const handleNext = () => {
    goToPage(currentPage + 1);
  };

  return (
    <div className="pokedex1">
      {loading && <div className="loading">Loading...</div>}
      <div className="page-info">
        Current Page: {currentPage} out of {totalPages}
      </div>
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange('english')}>English</button>
        <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')}>French</button>
      </div>
      <div className="pokemon-cards">
        {!loading && pokemonList.map(pokemon => (
          <Pokemon key={pokemon.id} pokemon={pokemon} selectedLanguage={selectedLanguage} />
        ))}
      </div>
      <div className="pagination">
        <div className="top-buttons">
          <button onClick={handleBack} disabled={currentPage === 1}>Back</button>
          {[...Array(totalPages).keys()].map(i => (
            <button key={i+1} onClick={() => goToPage(i+1)}>{i+1}</button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
