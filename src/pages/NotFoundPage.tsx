import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
  return (
    <div id="error-page">
      <h1>Page not found</h1>
      <p>
        We're sorry, the page you requsted could not be found. Plase go back to
        homepage.
      </p>
      <Link to="/weather-app">Go to homepage</Link>
    </div>
  );
};

export default NotFoundPage;
