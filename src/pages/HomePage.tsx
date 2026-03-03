import { useState, useEffect } from 'react';
import { CarCard } from '../components/CarCard';
import { Navbar } from '../components/Navbar';
import type { Auto } from '../types/types';

const API_URL = 'https://przemekswiecinski.github.io/JSON-do-komisPWA/auta.json'; 

export const HomePage = () => {
  const [auta, setAuta] = useState<Auto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [sortType, setSortType] = useState<string>('');

  useEffect(() => {
    const fetchAuta = async () => {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error('Nie udało się pobrać danych');
        }

        const data = await response.json();
        setAuta(data);
        setLoading(false);
      } catch (err) {
        console.error("Błąd pobierania:", err);
        setError('Nie można załadować ofert. Sprawdź połączenie.');
        setLoading(false);
      }
    };

    fetchAuta();
  }, []);

  const sortedAuta = [...auta].sort((a, b) => {
    switch (sortType) {
      case 'cena_rosnaco':
        return a.cena - b.cena;
      case 'cena_malejaco':
        return b.cena - a.cena;
      case 'rocznik_mlodsze':
        return parseInt(b.rocznik) - parseInt(a.rocznik);
      case 'rocznik_starsze':
        return parseInt(a.rocznik) - parseInt(b.rocznik);
      default:
        return 0;
    }
  });

  return (
    <>
      <Navbar />

      <div className="filters-bar">
        <div className="filters-content">
          <label>Sortuj według:</label>
          <select 
            className="sort-select" 
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Domyślne</option>
            <option value="cena_rosnaco">Cena: rosnąco</option>
            <option value="cena_malejaco">Cena: malejąco</option>
            <option value="rocznik_mlodsze">Rocznik: najnowsze</option>
            <option value="rocznik_starsze">Rocznik: najstarsze</option>
          </select>
        </div>
      </div>

      <div className="container">
        
        {loading && (
          <div style={{textAlign: 'center', padding: '50px', fontSize: '1.5rem', color: '#64748b'}}>
            Ładowanie ofert...
          </div>
        )}

        {error && !loading && (
          <div style={{textAlign: 'center', padding: '50px', color: '#ef4444'}}>
            {error}
          </div>
        )}

        {!loading && !error && (
          <main className="car-grid">
            {sortedAuta.map((auto) => (
              <CarCard key={auto.id} auto={auto} />
            ))}
          </main>
        )}
        
      </div>
    </>
  );
};
