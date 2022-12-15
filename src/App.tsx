import { useEffect } from 'react';
import CitiesList from './components/CitiesList/CitiesList';
import AddCityDialog from './components/AddCityDialog/AddCityDialog';
import Loader from './components/Loader/Loader';
import { fetchCitiesWeather } from './store/thunks';
import { useAppDispatch } from './hooks/useActions';
import { useTypedSelector } from './hooks/useTypedSelector';

import './App.css';

function App() {
  const { cities, loading } = useTypedSelector(state => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCitiesWeather([703448, 2643743, 2988507]));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', fontSize: '40px' }}>Weather App</h1>
      <AddCityDialog />
      <CitiesList cities={cities} />
    </div>
  );
}

export default App;
