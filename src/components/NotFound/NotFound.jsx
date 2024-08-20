import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate()

  const handleComeBackBtn = () => {
    navigate(-1)
  }

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! The page you are looking for does not exist.</p>
      <button
        onClick={() => handleComeBackBtn()}
        className='btn btn-primary'>
        Come Back
      </button>
    </div>
  );
};

export default NotFound;