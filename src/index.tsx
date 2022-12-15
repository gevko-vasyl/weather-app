import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store, persistor } from './store';
import App from './App';
import WeatherDetailedPage from './pages/WeatherDetailedPage';
import NotFoundPage from './pages/NotFoundPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/weather-app" element={<App />}></Route>
            <Route path="/weather-app/details/:id" element={<WeatherDetailedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
);
