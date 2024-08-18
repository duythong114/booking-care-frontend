import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! The page you are looking for does not exist.</p>
      <a href="/" className="not-found-link">Go back to Home</a>
    </div>
  );
};

export default NotFound;